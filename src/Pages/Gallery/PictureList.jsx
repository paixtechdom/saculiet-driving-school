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
    const { dbLocation, setShowZoom, setImageSource, setCurrentNav, setDisplayPisc } = useContext(AppContext)

    useEffect(() => {
        fetchImages()
        setCurrentNav(4)
        setDisplayPisc(true)
        document.documentElement.scrollTop = 0
    }, [])

    const fetchImages = () => {
        if(images.length < 1){
            if(type == 'home'){
                axios.get(`${dbLocation}/images.php/latest/6`).then(function(res){
                    setImages(res.data)
                })
            }
            else{
                axios.get(`${dbLocation}/images.php`).then(function(res){
                    setImages(res.data)
                })
            }

        }
    }

    return(
        <div className="flex flex-col justify-center items-center w-full text-gray-900 border-t border-b">
            <div className="flex justify-between w-11/12 flex-col gap-5 mt-6">
                <h3 className='w-11/12 text-3xl md:text-4xl text-blue mt-9'>Pictures</h3>
                {
                    type == 'home'?
                    <a href={`https://saculietdrivingschool.com/Gallery`} >
                    <SecondaryButton text={'View more'} icon={'arrow-right'} btnClas={'w-full'}/>
                    </a> : ''
                }
            </div>
            <div className="justify-center xl:w-9/12 w-11/12 items-center transition-all duration-500 flex-col md:grid md:grid-cols-3 gap-2 md:flex text-gray-200 py-9">
            {
                React.Children.toArray(
                    images?.map((image) => (
                        <div  className='overflow-hidden relative left-0 rounded-lg w-full h-full min-h-48 md:h-48 flex-col flex items-center justify-center my-3 md:my-0 border bg-gray-900' onClick={() => {
                            setShowZoom(true)
                            setImageSource(`${dbLocation}/images/${image.fileName}`)
                        }}>
                        <LazyLoadImage 
                             src={`${dbLocation}/images/${image.fileName}`} 
                            //  height={550}
                             placeholderSrc={image.fileName} 
                             effect='blur'
                             className="w-full"
                        
                        />
                        </div>

                    ))
                )
            
            }
        </div>
    </div>
    
    )
}