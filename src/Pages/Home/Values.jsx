import { AfterHeroContent } from '../../assets/Constants'
import { AnimatedBorder } from '../../Components/AnimatedBorder'
import { Parallax, ParallaxRight } from '../../Components/Parallax'

export const Values = () => {
    return(
        <div className="flex justify-center items-center w-full text-gray-900 py-9" style={{
            // marginTop: -20+'vh'
        }}>
            <div className="flex justify-center xl:w-9/12 w-11/12 items-center transition-all duration-1000 gap-7 md:grid md:grid-cols-3 sm:flex-col flex-col z-50 items-stretch">

                {
                    AfterHeroContent.map((content, key)  =>(
                        <div  key={key} className='overflow-hidden relative p-3 left-0 rounded-xl bg-blue-100 bg-opacity-10' style={{
                            boxShadow: '0px 10px 10px 0.2px rgba(0,0,0,0.1)'
                        }}>

                            <div className='flex flex-col gap-2 m-3 items-center text-center'>
                                <ParallaxRight id={`${content.title[2]}${content.title[0]}`}>
                                    <i className={`bi bi-${content.img} text-5xl text-sec`}></i>
                                </ParallaxRight> 

                                <ParallaxRight id={`${content.title[2]}${content.title[1]}`}>
                                    <h3 className='text-xl text-blue pt-2 mt-4 border-t border-[rgb(219,20,20)]'>{content.title}</h3>
                                </ParallaxRight> 

                                <ParallaxRight id={`${content.title[0]}${content.title[1]}`}>
                                    <p className='text-sm tracking-wide leading-relaxed'>{content.content}</p>
                                </ParallaxRight>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}