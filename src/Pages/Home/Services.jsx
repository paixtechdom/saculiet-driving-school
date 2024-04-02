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
            <div className="flex justify-center xl:w-9/12 w-11/12 items-cente transition-all duration-500 gap-5 flex-col">
            <h3 className='w-full text-3xl md:text-4xl text-blue'>Our Services</h3>
                <ParallaxRight id='serviceNav'>
                    <div className="flex w-full justify-between shadow-lg rounded-lg overflow-hidden">

                        {
                        ServicesRendered.map((service, key)  =>(
                                <button key={key} className={`flex items-center justify-center p-2 text-sm md:text-lg md:p-3 px- rounded- transition-all duration-500 ${
                                    currentService == key ?'border-bottom-sec text-gray-500' 
                                   : ''
                                
                                }`} 
                                    
                                    onClick={() => {setCurrentService(key)}}>
                                    {service.section}
                                </button> 
                            )) 
                        } 
                    </div>
                </ParallaxRight>
                <div className="fle justify-cente items-center w-full overflow-hidden">
                <Parallax id={'serv'}>
                    <div className="flex items-cente justify-between bg-blue-90 transition-all duration-500" style={{
                        width: 300+'vw',
                        transform: `translateX(-${currentService *100}vw)`
                    }}>
                        {
                            ServicesRendered.map((service, key) => (
                                <div key={key} className="flex w-full jistify-start flex-col md:flex-row items-start gap-9" style={{
                                }}>
                                    <div className="flex flex-col w-full gap-4 pr-4">
                                        {
                                            service.services.map((ser, key) => (
                                                <div key={key} className="flex gap-2 items-center">                        <i className="bi bi-check2-circle text-xl text-sec"></i>
                                                <p className="text-sm whitespace-normal break-words">{ser.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="flex items-center justify-between w-full">

                                        <img src={service.img} alt={service.section} className='w-fit'/>
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