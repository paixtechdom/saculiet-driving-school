import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../assets/Contexts/AppContext'
import { PrimaryButton, SecondaryButton } from '../../Components/Button'
import { Parallax } from '../../Components/Parallax'
import { VideoComponent } from './VideoComponent'


export const VideoList = ({type}) => {
    const [ videos, setVideos ] = useState([])
    const { dbLocation, setCurrentNav, setDisplayPisc } = useContext(AppContext)
    useEffect(() => {
        document.documentElement.scrollTop = 0
        setDisplayPisc(false)
        setCurrentNav(3)
        // fetchMoreVideo()
        fetchVideos()
    }, [])

    const fetchVideos = () => {
        if(type == 'home'){
            axios.get(`${dbLocation}/videos.php/latest/2`).then(function(res){
                setVideos(res.data)
            })
        }
        else{
            axios.get(`${dbLocation}/videos.php`).then(function(res){
                setVideos(res.data)
            })
        }
    }  
    
    // const fetchMoreVideo = () => {
    //     axios.get(`${dbLocation}/videos.php/${id}/1`).then(function(res){
    //         const newVideo = res.data
    //         setVideos((prev) => [...prev, newVideo])
    //         console.log(id)
    //         console.log(videos)

    //     })

    // }


    return(
        <div className="flex flex-col justify-center items-center w-full text-gray-900 border-t border-b mt-[5vh] md:mt-[10vh]">
        <div className="flex justify-between w-11/12 md:w-9/12 flex-col gap-5 mt-6">
            <h3 className='w-11/12 text-3xl md:text-4xl text-blue mt-9 font-bold '>Videos</h3>
            {
                type == 'home'?
                <a href={`https://saculietdrivingschool.org/Gallery`} >
                <SecondaryButton text={'View more'} icon={'arrow-right'} btnClas={'w-full'}/>
                </a> : ''
            }
        </div>
        <div className="xl:w-9/12 w-11/12 transition-all duration-500 grid md:grid-cols-3 lg:grid-cols-4 text-gray-200 py-5 grid-cols-2 gap-4">
                {
                    React.Children.toArray(
                        videos?.map((video, i) => (
                            <VideoComponent src={`${dbLocation}/videos/${video.fileName}`} id={video.fileName.replaceAll(' ', '').replaceAll('/', '').replaceAll('-','').replaceAll('(', '').replaceAll(')','').replaceAll('.', '')}
                            />
                        ))
                    )
                
                        }
            </div>
        </div>

    )
}