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
    const [ id, setId ] = useState(10)
    const { dbLocation } = useContext(AppContext)

    useEffect(() => {
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
        <div className="flex flex-col justify-center items-center w-full text-gray-900 border-t border-b">
        <div className="flex justify-between w-11/12 flex-col gap-5">
            <h3 className='w-11/12 text-3xl md:text-4xl text-blue mt-9'>Videos</h3>
            {
                type == 'home'?
                <a href={`https://saculietdrivingschool.com/Gallery`} >
                <SecondaryButton text={'View more'} icon={'arrow-right'} btnClas={'w-full'}/>
                </a> : ''
            }
        </div>
        <div className="justify-center xl:w-9/12 w-11/12 items-center transition-all duration-500 flex-col md:grid md:grid-cols-3 gap-10 md:flex text-gray-200 pb-9">
                {
                    React.Children.toArray(
                        videos?.map((video, i) => (
                            <VideoComponent src={`${dbLocation}/videos/${video.fileName}`} id={video.fileName.replaceAll(' ', '').replaceAll('/', '').replaceAll('-','').replaceAll('(', '').replaceAll(')','').replaceAll('.', '')}

                            // fetchMoreVideo={fetchMoreVideo} setId={setId} video={video}
                            />
                        ))
                    )
                
                        }
            </div>
        </div>

    )
}