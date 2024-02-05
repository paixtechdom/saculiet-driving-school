import { useEffect, useState } from 'react';
import { CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader, FadeLoader, PacmanLoader, SyncLoader, SquareLoader, SkewLoader, ScaleLoader, RotateLoader, RingLoader, RiseLoader, PuffLoader, PropagateLoader } from 'react-spinners';
import transparentcar from '../assets/images/transparentcar.png'
import { ParallaxRight } from './Parallax';


export const Loading = () => {
    const [ color, setColor ] = useState(0)
    const [ opacity, setOpacity ] = useState(1)

    useEffect(() => {
        setTimeout(() => {
            setOpacity(50)
        }, 1000);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide('interval')
      }, 500); 
      // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [color]);
      
    const nextSlide = () =>{
        setColor(color == 'rgb(3, 3, 78)' ? 'rgb(219, 20, 20)' : 'rgb(3, 3, 78)')
    }
    const style = {
        // display: 'flex'
        // transiton: 'all'
    }
    return(
        <div className={`flex items-center justify-center w-full h-screen fixed text-blue flex-col opacity-${opacity} transition-all duration-200`}>
            <SyncLoader color={'rgb(3, 3, 78)'} size={15} loading={true}/>
            <SyncLoader color={'rgb(219, 20, 20)'} size={15} loading={true}/>
                <ParallaxRight id='loadCar'>
                <div className="flex justify-center w-full">
                    <img src={transparentcar} alt='' className='w-2/12'/>
                </div>
                </ParallaxRight>

        </div>
    )
}