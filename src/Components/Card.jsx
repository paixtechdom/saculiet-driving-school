import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "./Button"
import { Parallax, ParallaxRight } from "./Parallax"


const Card = ({header, text, img, buttonText, buttonLink, clas, w, buttonIcon, goTo, id}) => {
    return(
        <div id={id} className="flex justify-center items-center w-full text-gray-900 py-9 md:h-96 my-9">
            <div className={`flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 md:gap-9 gap-8 md:flex-row flex-col-reverse flex-col h-full`}>
                    <div className="flex flex-col md:gap-5 gap-3 text-cente md:text-left md:w-8/12 w-full">
                    <ParallaxRight id={`${header[1]}${header[0]}`} >
                        <h2 className="text-2xl md:text-3xl text-blue">{header}</h2>
                        </ParallaxRight>
                        <div className="text-gray-700 text-sm flex flex-col gap-3">
                            {
                                text.map((t, key) => (
                                    <ParallaxRight key={key} id={`${header[0]}${header[2]}`} >
                                    <p className="">{t}</p>
                                    </ParallaxRight>
                                ))
                            }
                        </div>
                        <ParallaxRight id={`${header[1]}${header[2]}`} >
                        {
                            buttonText ? 
                            
                            <a href={`#${buttonLink}`}>
                                <PrimaryButton text={buttonText} icon={!buttonIcon == '' ? buttonIcon :'arrow-right'}/>
                            </a> : ''
                            
                        }
                        </ParallaxRight>
                    </div>

                
                {
                    img ? 
                        <div className="md:w-5/12">
                            <Parallax id={`${header[2]}${text[0][0]}`}>
                            <LazyLoadImage 
                             src={img} 
                            //  height={550}
                             placeholderSrc={header ? header : text} 
                             effect='blur'
                             className="w-full"
                        
                        />
                            {/* <img src={img} alt={header ? header : text} className='max-h-96 md:h-full'/> */}
                        </Parallax>
                        </div>

                         :''
                }
            </div>
        </div>
    )
}

const CardImageOverlay = ({header1, header2, text, img, buttonText, buttonLink, w, buttonIcon, goTo, id}) => {
    return(
        <div id={id} className="flex justify-center items-center w-full text-gray-200 py-9 h-96 relative">
            <div className="absolute h-full w-full flex items-center justify-center overflow-hidden" style={{
            }}>
                <img src={img} alt={header1 ? header1 : text}         className='absolute z-0 scale-15 h-full w-full md:scale-100 md:h-fit md:w-full'/>
            </div>

            <div className={`flex xl:w-9/12 w-11/12  items-center h-full z-10`}>

                <div className="flex flex-col md:gap-5 gap-3 items-center text-center md:items-start md:text-left z-10 p-5" style={{
                    backgroundColor: 'rgba(225, 225, 225, .9)'
                }}>
                <Parallax id={`${header1[2]}${text[0][0]}`}>
                    <h2 className="text-3xl md:text-5xl text-sec font-bold" style={{
                        // textShadow: '0px 0px 0px rgba(225, 225, 225, 0.7)'
                    }}> <span className="text-blue">{header1}</span> <span className="text-sec">{header2}</span>
                    </h2>
                    </Parallax>
                    <ParallaxRight id={`${header1[2]}${text[0][2]}`}>
                    <p className="text-gray-900 text-sm flex flex-col gap-3">
                        {
                         text.map((t, key) => (
                            <ParallaxRight key={key} id={`${header1[0]}${header2[2]}`} >
                            <p className="">{t}</p>
                            </ParallaxRight>
                        ))
                        }
                        </p>
                        </ParallaxRight>
                    <Parallax id={`${header1[2]}${text[0][1]}`}>
                    {
                        buttonText ? 
                        
                        <a href={`#${buttonLink}`}>
                            <SecondaryButton text={buttonText} icon={!buttonIcon == '' ? buttonIcon :'arrow-right'}/>
                        </a> : ''
                        
                    }
                </Parallax>
                </div>
            </div>
        </div>
    )
}

export { Card, CardImageOverlay }

