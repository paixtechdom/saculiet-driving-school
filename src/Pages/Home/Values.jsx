import { AfterHeroContent } from '../../assets/Constants'
import { AnimatedBorder } from '../../Components/AnimatedBorder'
import { Parallax, ParallaxRight } from '../../Components/Parallax'

export const Values = () => {
    return(
        <div className="flex justify-center items-center w-full text-gray-900 py-9" style={{
            // marginTop: -20+'vh'
        }}>
            <div className="flex justify-center xl:w-9/12 w-11/12 items-center transition-all duration-1000 gap-2 md:grid md:grid-cols-3 sm:flex-col flex-col z-50">

                {
                    AfterHeroContent.map((content, key)  =>(
                        <div  key={key} className='overflow-hidden relative p-3 left-0 rounded-xl'>
                                <AnimatedBorder />
                                <div className='flex flex-col gap-2 m-3 items-center text-center'>
                            <ParallaxRight id={`${content.title[2]}${content.title[0]}`}>
                                    <i className={`bi bi-${content.img} text-5xl text-sec`}></i>
                            </ParallaxRight>
                                <ParallaxRight id={`${content.title[2]}${content.title[1]}`}>
                                    <h3 className='text-lg'>{content.title}</h3>
                            </ParallaxRight>
                                <ParallaxRight id={`${content.title[0]}${content.title[1]}`}>
                                    <p className='text-gray-700 text-sm'>{content.content}</p>
                            </ParallaxRight>

                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}