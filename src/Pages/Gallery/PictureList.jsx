import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../assets/Contexts/AppContext'
import { PrimaryButton, SecondaryButton } from '../../Components/Button'
import { Parallax } from '../../Components/Parallax'
import { LazyLoadImage } from "react-lazy-load-image-component"
import  "react-lazy-load-image-component/src/effects/blur.css"
import  "react-lazy-load-image-component/src/effects/opacity.css"


export const PictureList = ({type}) => {
    const [ images, setImages ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const { dbLocation, setShowZoom, setImageSource, setCurrentNav, setDisplayPisc } = useContext(AppContext)

    useEffect(() => {
        fetchImages()
        setCurrentNav(3)
        setDisplayPisc(true)
        document.documentElement.scrollTop = 0
    }, [])

    const fetchImages = () => {
        setLoading(true)
        if(images.length < 1){
            if(type == 'home'){
                axios.get(`${dbLocation}/images.php/latest/8`).then(function(res){
                    setImages(res.data)
                })
            }
            else{
                axios.get(`${dbLocation}/images.php`).then(function(res){
                    setImages(res.data)
                })
            }            
        }

        setLoading(false)
    }

    return(
        <div className="flex flex-col justify-center items-center w-full text-gray-900 border-t border-b mt-[5vh] md:mt-[10vh]">
            <div className="flex w-11/12 flex-col gap-5 mt-6">
                <h3 className='w-11/12 text-3xl md:text-4xl text-blue mt-9 font-bold'>Pictures</h3>
                {
                    type == 'home'?
                    <a href={`https://saculietdrivingschool.org/Gallery`} >
                    <SecondaryButton text={'View more'} icon={'arrow-right'} btnClas={'w-full'}/>
                    </a> : ''
                }
            </div>
            <div className="xl:w-9/12 w-11/12 items-center transition-all duration-500 flex-col grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 text-gray-200 py-5">
            {
                loading ? 
                <>
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                    <ImageLoad />
                </>
                 :
                React.Children.toArray(
                    images?.map((image) => (
                        <div  className='overflow-hidden relative left-0 rounded-lg w-full h-[20vh] lg:h-48 flex-col flex items-center justify-center md:my-0 border bg-gray-900' 
                        onClick={() => {
                            setShowZoom(true)
                            setImageSource(`${dbLocation}/images/${image.fileName}`)
                        }}>
                            <div className="center cursor-pointer hover:scale-150 transition-all duration-1000">
                                <LazyLoadImage 
                                    src={`${dbLocation}/images/${image.fileName}`} 
                                    //  height={550}
                                    placeholderSrc={image.fileName} 
                                    effect='blur'
                                    className="w-[100vw] h-[40vh] object-cover"
                                
                                />
                            </div>
                        </div>

                    ))
                )
            
            }
        </div>
    </div>
    
    )
}

const ImageLoad = () => {
    return(
        <div className='w-full rounded-lg bg-gray-900 h-[20vh] lg:h-48 animate-pulse'></div>
    )
}