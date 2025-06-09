import { useEffect, useRef, useState } from "react";
import { CarouselItems } from "../../assets/Constants";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export const SHero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [startX, setStartX ] = useState(0)
    const sliderRef = useRef(null)


    const handleTouchStart = (e) => {
      setStartX(e.touches[0].clientX)
    }
    const handleTouchEnd = (e) => {
        const deltaX = e.changedTouches[0].clientX - startX
        const threshold = 100;
        if(Math.abs(deltaX) > threshold){
            nextSlide(0)
        }else if(deltaX< 0 && currentSlide < CarouselItems.length - 1){
            setCurrentSlide(currentSlide === CarouselItems.length - 1 ? 0 : prev => prev + 1 )
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide(0)
      }, 6000); 
      // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [currentSlide]);
      
    const nextSlide = (curr) =>{
      if(curr == 0){
        setCurrentSlide(currentSlide == CarouselItems.length - 1 ? 0 : currentSlide + 1)
      }else{
        setCurrentSlide(curr) 
      }
    }

    return(
        <div className="w-full relative overflow-hidden flex items-start justify-center mt 5 h-[80vh] lg:h-[90vh]">
      
            <div className={`flex text-white overflow-hidde h-full items-center justify-center relative w-full`}
            >
                <div className="z-20 homeHero h-full w-full flex flex-col items-center justify-center gap-3" style={{
                backgroundColor: 'rgba(0, 0, 10, 0.85)'
                }}>
                  <div className="flex flex-col w-11/12 xl:w-9/12 gap-4" 
                     onTouchStart={handleTouchStart}
                     onTouchEnd={handleTouchEnd}
                     ref={sliderRef}
                  >
                    <div className={`flex justify-start transition-all duration-1000`} style={{
                      width: CarouselItems.length*100+'vw',
                      transform: `translateX(-${currentSlide *100}vw)`
                      // transform: 'translate(100vw)'
                    }}>
                      {
                        CarouselItems.map((c, i) => (
                          <HeroComponent key={i} item={c}/>


                        ))
                      }

                    </div>
                  </div>
                </div>
                  <div className="absolute h-full w-full top-0 flex items-center justify-center overflow-hidden bg-blue-300">
                    <img 
                      src={CarouselItems[0].img} 
                      alt="" 
                      className="w-full"
                    />
                  </div>
            </div>


            <div className="flex absolute bottom-0 w-full items-center justify-center z-50 pb-9">
                <div className="flex gap-4 p-4 px-9 bg-blue-900 bg-opacity-10 border border-blue-900 rounded-full">
                  {
                    CarouselItems.map((item, key) => (
                      <p key={key} className='rounded-full cursor-pointer' style={{
                        height: 12+'px',
                        width: 12+'px',
                        transform: key == currentSlide ? 'scale(1.3)' : '',
                        backgroundColor: key == currentSlide ? 'white' : 'rgba(225, 225, 225, 0.6)'
                      }}
                        onClick={() => setCurrentSlide(key)}
                      ></p>
                    ))
                  }
                </div>
            
            </div>
        </div>
    )
}


const HeroComponent = ({item}) => {
  return(
    <div className="flex flex-col w-[100vw] gap-4">
    <div className="flex flex-col w-10/12 md:w-8/12 lg:w-6/12 gap-6">
      <h1 className="text-4xl md:text-5xl font-bold">
        {
          item.title.map((t, i) => (
            <span className="tracking-[0.8px] leading-[1.2]" key={i} style={{
              textShadow: i == 1 && '0px 0px 5px rgb(219, 20, 20)',
              }}>
                {t}
            </span>
          ))
        }
      </h1>
      <p className="text-gray-200 text-lg tracking-wide leading-6 w-full">{item?.p}</p>
      <Link to="/contact">
        <SecondaryButton text={'GET STARTED'} icon={'arrow-right'} btnClas={'border'} buttonLink='Contact'/>
      </Link>

    </div>
    </div>
  )
}