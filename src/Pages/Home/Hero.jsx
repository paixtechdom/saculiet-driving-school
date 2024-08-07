import { useEffect, useState } from "react";
import { CarouselItems } from "../../assets/Constants";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { ParallaxRight, Parallax } from "../../Components/Parallax";


export const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(CarouselItems[0]);


  

    return(
      <>
          <div className=" w-full h-full flex items-center justify-center bg-white overflow-hidden relative pt-9 md:pt-0 flex-col">
          <div className="pt-9 w-full"></div>
              <div className="absolute top-0 right-0 bg-blue h-90 w-full">
                <div className="absolute bg-white z-10 w-full h-2/5 bottom-0" style={{
                  width: 120+'%',
                  transform: 'rotate(355deg) translateY(80px) translateX(-20px)',

                }}>
                  
                </div>
               
              </div>
          <div className=" xl:w-9/12 w-11/12  flex flex-col items-center justify-between md:flex-row z-10 pt-9 md:pt-0">
            <Parallax id='heroText'>

            <div className="flex flex-col w-full justify-center z-20  gap-6 text-gray-200">
              <h3 className="text-3xl md:text-4xl leading-6">Learn to Drive Professionally with <span className="text-shadow-xl" style={{
                textShadow: '0px 0px 5px rgb(219, 20, 20)',
              }}>Saculiet Driving School</span></h3>
              <p className="text-sm  tracking-wide leading-relaxed">{currentSlide.p}</p>
              <PrimaryButton text={'GET STARTED now'} icon={'arrow-down'} btnClas={'border'} buttonLink='Contact'/>
            </div>
            </Parallax>

              {/* <div className="absolute left-0 bg-blue rounded-r-full w-3/12 h-full" style={{

              }}>
              </div> */}
            <ParallaxRight id='heroImg' >

            <div className="w-full flex items-center-justify-center z-10">

              <img src={currentSlide.img} alt="" className="h-fit"/>
            </div>
            </ParallaxRight>
          </div>
          </div>
      </>
    )
}