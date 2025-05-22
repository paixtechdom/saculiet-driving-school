import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "./Button"
import { Parallax, ParallaxRight } from "./Parallax"


const Card = ({header, text, img, buttonText, buttonLink, clas, w, buttonIcon, goTo, id}) => {
    return(
        <div id={id} className="flex justify-center items-center w-full text-gray-900 py-9 lg:h-96 lg:my-[20vh] my-[15vh]">
            <div className={`flex justify-between xl:w-10/12 w-11/12 items-center transition-all duration-500 lg:gap-9 gap-8 lg:flex-row flex-col h-full`}>
                    <div className="flex flex-col lg:gap-5 gap-3 text-cente lg:text-left lg:w-8/12 w-full">
                    <ParallaxRight id={`${header[0][1]}${header[0][0]}`} >
                        <div className="text-2xl lg:text-3xl text-blue font-bold">{
                            header.map((h, i) =>(
                                <span className="" key={i} style={{
                                    // textShadow: i == 1 && '0px 0px 1px rgb(219, 20, 20)'
                                  }}> {h}</span>
                            ))
                        }</div>
                        </ParallaxRight>
                        <div className="text-base flex flex-col gap-3  leading-relaxed">
                            {
                                text.map((t, key) => (
                                    <ParallaxRight key={key} id={`${header[0][0]}${header[0][2]}`} >
                                    <p className="">{t}</p>
                                    </ParallaxRight>
                                ))
                            }
                        </div>
                        <ParallaxRight id={`${header[0][1]}${header[0][2]}`} >
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
                        <div className="lg:w-5/12">
                            <Parallax id={`${header[2]}${text[0][0]}`}>
                            <LazyLoadImage 
                             src={img} 
                            //  height={550}
                             placeholderSrc={header ? header : text} 
                             effect='blur'
                             className="w-full mt-6 lg:mt-0"
                        
                        />
                            {/* <img src={img} alt={header ? header : text} className='max-h-96 lg:h-full'/> */}
                        </Parallax>
                        </div>

                         :''
                }
            </div>
        </div>
    )
}

const CardImageOverlay = ({header1, header2, text, img, img2, buttonText, buttonLink, w, buttonIcon, goTo, id}) => {
    return(
        <div id={id} className="flex justify-center items-center w-full text-gray-200 py-9 min-h-96 relative my-[20vh]">
            <div className="absolute h-full w-full flex items-center justify-center overflow-hidden" style={{
            }}>
                <img src={img} alt={header1 ? header1 : text}         className='absolute z-0 scale-15 h-full w-full lg:scale-100 lg:h-fit lg:w-full hidden lg:block'/>

                <img src={img2} alt={header1 ? header1 : text}         className='absolute z-0 scale-15 h-full w-full lg:scale-100 lg:h-fit lg:w-full lg:hidden'/>
            </div>

            <div className={`flex xl:w-11/12 w-full items-center h-full z-10`}>

                <div className="flex flex-col py-[5vh] lg:gap-5 gap-3 items-center text-center lg:items-start lg:text-left z-10 p-9 lg:px-[60px] bg-blue-200 bg-opacity-10 lg:bg-opacity-30 lg:backdrop-blur-2xl backdrop-blur-xl">

                <Parallax id={`${header1[2]}${text[0][0]}`}>
                    <h2 className="text-3xl lg:text-5xl text-sec font-bold" style={{
                        // textShadow: '0px 0px 0px rgba(225, 225, 225, 0.7)'
                    }}> <span className="text-blue">{header1}</span> <span className="text-sec">{header2}</span>
                    </h2>
                </Parallax>
                <ParallaxRight id={`${header1[2]}${text[0][2]}`}>
                <div className="text-white gray-400 flex flex-col gap-3  leading-relaxed">
                    {
                        text.map((t, key) => (
                        <ParallaxRight key={key} id={`${header1[0]}${header2[2]}`} >
                        <p className="">{t}</p>
                        </ParallaxRight>
                    ))
                    }
                    </div>
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

