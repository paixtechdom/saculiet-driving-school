import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import './Video.css'
import { Loading } from "../../Components/Loading";
import { ClipLoader } from "react-spinners";

const formatTime = (time ) =>{
    let hours = Math.floor(time/3600) % 24
    let minutes = (Math.floor(time/60) % 60)
    let seconds = Math.floor(time % 60)
    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds
    return hours + ':' + minutes + ':' + seconds
}


const Video = ({setPlayVideo, src}) =>{

    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ showVideo, setShowVideo ] = useState(false)
    const [ duration, setDuration ] = useState(0)
    const [ currentTime, setCurrentTime ] = useState(0)
    const [ volume, setVolume ] = useState(0.5)
    const [ isMuted, setIsMuted ] = useState(true)
    const [ showVolumeControl, setShowVolumeControl ] = useState(false)
    const [ showPausePlay, setShowPausePlay ] = useState(false)
    const [ buffering, setBuffering ] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
  
    const handleReady = () => {
        setIsLoading(false);
        setIsPlaying(true)
        setShowVideo(true)
    };
  
    const handleError = (e) => {
      setIsError(true);
      console.error('Video error:', e);
    };



    const videoRef = useRef(null)
    const rangeRef = useRef(0)

    // useEffect(() =>{
    //     setInterval(() => {
    //         if(videoRef.onReady){
    //             handleReady()
    //         }
    //     }, 20);
    // }, [])
    useEffect(() =>{
        setShowPausePlay(true)
        setTimeout(() => {
            setShowPausePlay(false)
        }, 500);
        
    }, [isPlaying])

    useEffect(() =>{
        if(volume > 0) setIsMuted(false)
        
    }, [volume])
    useEffect(() =>{
        if(currentTime/duration == 1 ){
            endVideo()
        }
        
    }, [currentTime])
    
    
    const endVideo = () =>{
        setIsPlaying(false)
        setCurrentTime(0)
    }
    const handleTimeChange = (e) =>{
        setCurrentTime((e.target.value * duration) / 100)
        videoRef.current.seekTo((e.target.value * duration) / 100)
    }
    const handleVolumeChange = (e) =>{
        setVolume(e.target.value/100)
    }
    return(
        <div className={`videocontainerParent py-3 fixed bg-gray-900` }>
            <div className="videocontainer p-2">
            {/* {isError && <div className="text-light flex items-center justify-center">
                <h3 className="text-white">An error occured</h3>
            </div>} */}
            
            {/* {!isLoading && !isError && ( */}
            
                <ReactPlayer                    
                    url={src}
                    type='mp4'
                    ref={videoRef}
                    width='100%'
                    height={75+'vh'}
                    controls={false}
                    playbackRate={1}
                    volume={volume}
                    // light={true}
                    muted={isMuted}
                    playing={isPlaying}
                    onReady={handleReady}
                    onDuration={(duration) => {
                        setDuration(duration)
                    }}
                    onProgress={(e) => {
                    setCurrentTime(e.playedSeconds)
                    }}
                    currenttime={currentTime}
                    progressInterval = {1000}
                    onBuffer={() =>setBuffering(true)}
                    onBufferEnd={() =>setBuffering(false)}
                    // endVideo={true}
                    onError={handleError}
                    />
            
            {/* )} */}

               
                {/* CONTROLS */}
            {
            showVideo ? 
                <div className="controlsParent  w-full h-screen px-3 py-4">
                    <div className="controls flex flex-col w-full h-full justify-between items-center">
                        {/* TOP */}
                        <div className="top w-full flex justify-between items-center ">
                            
                            <button className="close font-bold text-2xl" onClick={() =>{
                                setIsPlaying(false)
                                setShowVideo(false)
                                setPlayVideo(false)
                            }}> <i className="bi bi-x-lg"></i> </button>
                            <div className="flex flex-col text-white relative items-center" >
                            
                            <h3 className="vol text-2xl" onClick={() =>{
                                setShowVolumeControl(!showVolumeControl)
                            }}>
                                {
                                    volume * 100 == 0 || isMuted?
                                    <i className="bi bi-volume-mute-fill"></i>
                                    :
                                    volume * 100 > 0 && volume * 100 < 15 ?
                                    <i className="bi bi-volume-off-fill"></i>
                                    :
                                    volume * 100 > 15 && volume * 100 < 56 ?
                                    <i className="bi bi-volume-down-fill"></i>
                                    :
                                    <i className="bi bi-volume-up-fill"></i>
                                }</h3>
                                {
                                    showVolumeControl ? 
                                <div className="flex items-center absolute
                                 mt-8 text-light border bg-gray-600 p-2 gap-2" style={{
                                    left: -150,
                                    minWidth : 150+'px'
                                 }}>
                                    <h3 className="vol text-2xl" onClick={() =>{
                                        setIsMuted(!isMuted)
                                    }}>
                                        {
                                            volume * 100 == 0 || isMuted?
                                            <i className="bi bi-volume-mute-fill"></i>
                                            :
                                            volume * 100 > 0 && volume * 100 < 15 ?
                                            <i className="bi bi-volume-off-fill"></i>
                                            :
                                            volume * 100 > 15 && volume * 100 < 56 ?
                                            <i className="bi bi-volume-down-fill"></i>
                                            :
                                            <i className="bi bi-volume-up-fill"></i>
                                        }</h3>
                                        
                                        <h3>
                                    <input type="range" 
                                            
                                            min='0'
                                            max='100'
                                            step='1'
                                            className="progress" 
                                            // ref={rangeRef}
                                            value={volume * 100}
                                        
                                            onChange={(e) =>{
                                                handleVolumeChange(e)
                                            }}
                                            />
                                        </h3>
                                        <h4 className="text-small">{parseInt(volume * 100)} </h4> 

                                        
                                      </div> : ''
                                      }
                                </div>
                        </div>
                        {/* TOP END */}
                        {/* MIDDLE */}
                        {
                            buffering ?
                            <div className="flex items-center justify-center fixed top-0 bg-transparent h-screen w-full left-0 flex-col" style={{
                                zIndex: 506
                            }}>
                                
                                <ClipLoader color={'rgb(225, 225, 225)'} size={45} loading={true}/>
                            </div> : 
                        <div className="middle w-full h-screen flex items-center justify-center" onClick={() =>{setIsPlaying(!isPlaying)}} >
                              {
                                showPausePlay ? 
                                <button className="playPause flex items-center justify-center mb-2">{isPlaying ? <i className="bi bi-pause-fill text-4xl"></i> : <i className="bi bi-play-fill fs-1 text-4xl"></i>}</button> :''
                              }
                            </div>
                        }

                            {/* BOTTOM */}
                            <div className="dwn flex w-full justify-between gap-2 relative items-center mb-9 pb-4" >
                            <button className="playPaus flex items-center justify-center text-2xl" onClick={() =>{
                                setIsPlaying(!isPlaying)
                                setShowVideo(true)
                                // hm()
                            }}>{isPlaying ? <i className="bi bi-pause-fill fs-1"></i> : <i className="bi bi-play-fill fs-1"></i>}</button>

                            <div className="bottom w-full p-0 ">

                                <div className="w-full flex flex-col relative">

                                    <input type="range" 
                                    min='0'
                                    max='100'
                                    step='1'
                                    className="progress" 
                                    ref={rangeRef}
                                    value={(currentTime / duration) * 100}
                                    onChange={handleTimeChange}/>
                                    <div className="w-full flex text-white justify-between absolute top-90 mt-4 text-sm ">
                                        <p className="current">
                                        {formatTime(currentTime)}
                                        </p>
                                        <p className="duration">
                                            {formatTime(duration)}
                                        </p>

                                    </div>
                                </div>

                            

                            </div>
                        </div>
                    </div>
                </div>
                : ''
                }

            
            </div>
        </div>
    )
}


export { Video }

// const useDebounce = (value, delay) => {
//     const [ debounceValue, setDebounceValue ]= useState(3)

//     useEffect(() =>{
//         const timeoutId = setTimeout(() => {
//             setDebounceValue(value)
//         }, delay);

//         return () => clearTimeout(timeoutId)
//     }, [value])
// }