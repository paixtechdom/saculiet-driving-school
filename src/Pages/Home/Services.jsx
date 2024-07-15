import { useEffect, useState } from 'react'
import { AfterHeroContent, ServicesRendered } from '../../assets/Constants'
import { Logo } from '../../assets/Constants'
import { AnimatedBorder } from '../../Components/AnimatedBorder'
import { PrimaryButton } from '../../Components/Button'
import { Parallax, ParallaxRight } from '../../Components/Parallax'

export const Services = () => {
    const [ currentService, setCurrentService ] = useState(0)
    
    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide('interval')
      }, 5000); 
      // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [currentService]);
      
    const nextSlide = (curr) =>{
      if(curr == 'interval'){
        setCurrentService(currentService == ServicesRendered.length - 1 ? 0 : currentService + 1)
      }else{
        setCurrentService(curr) 
      }
    }

    return(
        
        <div id='Services' className=" flex flex-col justify-center items-center w-full text-gray-900 py-9 my-9">
            <div className="flex justify-center xl:w-10/12 w-11/12 items-center transition-all duration-500 mb-9 flex-col">
            
            <h3 className='w-full text-3xl md:text-4xl text-blue font-bold'>Our Services</h3>


            </div>
                <div className="flex justify-center lg:items-center w-11/12 lg:w-9/12 transition-all duration-500 gap-9 flex-col">

                    <ParallaxRight id='serviceNav'>
                        <div className="flex w-fit justify-between lg:justify-start shadow-lg rounded-lg overflow-hidden">

                            {
                            ServicesRendered.map((service, key)  =>(
                                    <button key={key} className={`flex items-c enter justify- center py-2 lg:py-3 px-[25px] rounded- transition-all duration-500 ${
                                        currentService == key ?'border-bottom-sec bg-blue text-white' 
                                    : 'hover:bg-gray-100'
                                    
                                    }`} 
                                        
                                        onClick={() => {setCurrentService(key)}}>
                                        {service.section}
                                    </button> 
                                )) 
                            } 
                        </div>
                    </ParallaxRight>

                    <div className="flex justify-start items-start  overflow-hidden w-full">
                    <Parallax id={'serv'}>
                        <div className="flex items-start justify-between transition-all duration-500" style={{
                            width: 300+'vw',
                            transform: `translateX(-${currentService *100}vw)`
                        }}>
                            {
                                ServicesRendered.map((service, key) => (
                                    <div key={key} className="flex w-[100vw] justify-start flex-col lg:flex-row items-cen ter gap-9 bg-red-30 0">
                                        <div className="flex flex-col lg:w-7/12 gap-4 pr-4">
                                            {
                                                service.services.map((ser, key) => (
                                                    <div key={key} className="flex gap-2 items-center">                 <i className="bi bi-check-circle-fill text-xl text-sec"></i>
                                                    <p className="text-black whitespace-normal break-words text-lg">{ser.title}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="flex items-center justify-between w-full lg:w-8/12 lg:h-[40vh] overflow-x-hidden">

                                            <img src={service.img} alt={service.section} className='w-fit lg:object-fit'/>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>                    

                    </Parallax>

                    </div>
                </div>
        </div>
    )
}