import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { PictureList } from "./PictureList"
import { VideoList } from "./VideoList"

export const Gallery = () => {
    document.documentElement.scrollTop = 0
    const [ displayPics, setDisplayPisc ] = useState(true)

   return(
    <div className="flex flex-col justify-center items- mt-9 w-full relative">
         <Helmet>
            <title>
              Gallery - Saculiet Driving School
            </title>
            </Helmet>

        <div className="flex justify-center items-center w-full bg-gray-90 fixed bottom-0  text-gray-200 h-12 p-1 bg-blue" style={{
                zIndex: 500,
                // backgroundColor: 'rgb(0, 0, 0, 0.9)'
            }}>

            <div className="flex justify-between items-center w-11/12 md:w-9/12 xl:7/12 text-xl h-full" >
                <h3 className={`w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-xl p-2 ${!displayPics ? '' : 'border border-gray-200'}`} onClick={()=> setDisplayPisc(true)}>                
                <i className="bi bi-image-fill"></i>
                </h3>


                <h3 className={` w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-xl p-2 ${displayPics ? '' : 'border border-gray-200'}`} onClick={()=> setDisplayPisc(false)}>
                    <i className="bi bi-youtube"></i>
                    </h3>
                
            </div>
        </div>



        <div className="flex transition-all duration-500 justify-between" style={{
            width: 200+'vw',
            transform: `translateX(-${displayPics ? 0 : 100}vw)`
        }}>
            <div className={`w-ful`}  style={{
                width: 100+'vw'
            }}>
            <PictureList />
            </div>

            <div className={`w-ful`}  style={{
            width: 100+'vw'
            }}>
                    <VideoList />

            </div>
        </div>


    </div>
   )
}