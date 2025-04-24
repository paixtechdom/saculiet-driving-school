import { useEffect, useState } from "react"
import { useRef } from "react"
import { Logo } from '../../assets/Constants'
import { Video } from "./Video"
import ReactPlayer from "react-player"
import { Loading } from "../../Components/Loading"
import { ClipLoader } from "react-spinners"

export const VideoComponent = ({src, id }) => {
    // const videoRef = useRef(null)
    const [ playVideo, setPlayVideo ] = useState(false)


    useEffect(() => {
        // setInterval(() => {
        //     const pos = document.querySelector(`#${id}`).getBoundingClientRect()
        //     if(pos.top < -300){
        //         videoRef.current.pause()
        //     }
        //     if(pos.top > 300){
        //         videoRef.current.pause()
        //     }
        // }, 500);
    }, [])

    return(
        <>
            {/* <video src={src} controls
            className='my-9'
            preload=''
            playsInline
            id={`${id}`}
            ref={videoRef}
            height='500'
            ></video> */}
            <div className="wrapper flex items-center justify-center cursor-pointer bg-black overflow-hidden rounded-2xl max-h-48 " 
            onClick={() => {
                    console.log('click')
                    setPlayVideo(true)
                }}>
            <i className="bi bi-play-fill text-7xl absolute text-white z-50"></i>
             <ReactPlayer                    
                url={src}
                light={false}
                type='mp4'
                width='100%'
                controls={false}
                playbackRate={1}                
                />
            </div>
            {
                playVideo ?   
                <>
              
                <Video setPlayVideo={setPlayVideo} src={src}/> 
                </>
                : ''
            }

        </>
    )
}



