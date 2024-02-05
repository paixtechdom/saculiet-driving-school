import { useEffect, useState } from "react"
import { useRef } from "react"
import { Logo } from '../../assets/Constants'

export const VideoComponent = ({src, id }) => {
    const videoRef = useRef(null)

    useEffect(() => {
        
        setInterval(() => {
            const pos = document.querySelector(`#${id}`).getBoundingClientRect()
            if(pos.top < -300){
                videoRef.current.pause()
            }
        }, 500);
    }, [])

    return(
        <>
            <video src={src} controls
            className='my-9'
            preload=''
            playsInline
            id={`${id}`}
            ref={videoRef}
            height='500'
            ></video>

        </>
    )
}