import { useContext, useEffect } from "react"
import { AppContext } from "../assets/Contexts/AppContext"
import { LazyLoadImage } from "react-lazy-load-image-component"
import  "react-lazy-load-image-component/src/effects/blur.css"
import  "react-lazy-load-image-component/src/effects/opacity.css"

export const ZoomedImage = () => {
    const { setShowZoom, imageSource, showZoom} = useContext(AppContext)
    useEffect(() =>{
        if(showZoom){
            document.body.style.overflow= 'hidden'
        }
    }, [showZoom])
    return(
        <div className="bg-black fixed top-0 h-screen w-full flex justify-center items-center" style={{
            zIndex: 507
        }}>
            <p className="fixed rounded-full bg-gray-700 top-0 left-0 flex justify-center items-center text-white m-2 p-2 px-3 text-xl cursor-pointer" onClick={()=>  {
                setShowZoom(false)
                document.body.style.overflowY= 'scroll'
            }} style={{
                height: 40+'px',
                width: 40+'px',
                zIndex: 507
            }}><i className="bi bi-x-lg"></i></p>

             <LazyLoadImage 
                src={imageSource} 
            //  height={550}
                placeholderSrc={'An Image'} 
                effect='blur'
                className="w-full max-h-screen"
        
        />
        </div>
    )
}