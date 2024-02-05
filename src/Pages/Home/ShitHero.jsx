import { useEffect, useState } from "react";
import { CarouselItems } from "../../assets/Constants";
import { SecondaryButton } from "../../Components/Button";

export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide('interval')
      }, 6000); 
      // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [currentSlide]);
      
    const nextSlide = (curr) =>{
      if(curr == 'interval'){
        setCurrentSlide(currentSlide == CarouselItems.length - 1 ? 0 : currentSlide + 1)
      }else{
        setCurrentSlide(curr) 
      }
    }

    return(
        <div className="w-full relative overflow-hidden flex items-center justify-center mt-5 h-90" style={{
          width: 100+'%'
        }}>
        {
            CarouselItems.map((item, key) => (
              key == currentSlide &&
            <div key={key} className={`flex text-white overflow-hidde h-90 items-center justify-center relative`} style={{
                width: 100+'%'
            }}>
                <div className="z-20 text-center homeHero h-full w-full flex flex-col items-center justify-center gap-3 z-10" style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)'
                }}>
                    <h2 className="font-bold text-3xl text-gray-200  w-10/12 md:w-8/12">{item.title}</h2>
                    <p className="text-sm text-gray-300 w-10/12 md:w-8/12">{item?.p}</p>
                    <a href="#Contact">
                      <SecondaryButton text={'GET STARTED'} icon={'arrow-down'} buttonLink='Contact'/>
                    </a>
                </div>
                  <div className="absolute h-full w-full top-0 flex items-center justify-center bg-blue-100 overflow-hidden">
                    <img src={item.img} alt="" className="w-full scale-150"/>
                  </div>
            </div>

            ))
        }
        

            <div className="flex absolute bottom-0 w-full items-center justify-center z-50 mb-9 pb-9">
                <div className="flex gap-4 p-4">
                  {
                    CarouselItems.map((item, key) => (
                      <p key={key} className='rounded-full cursor-pointer' style={{
                        height: 12+'px',
                        width: 12+'px',
                        transform: key == currentSlide ? 'scale(1.1)' : '',
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