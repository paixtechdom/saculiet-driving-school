import { Link } from "react-router-dom"
import { NavInfo } from "../assets/Constants"
import { ContactForm } from "./Forms"
import { ParallaxRight } from "./Parallax"
import { GalleryNav } from "../Pages/Gallery/Gallery"
import { useContext } from "react"
import { AppContext } from "../assets/Contexts/AppContext"

export const Footer = () => {
    const { currentNav } = useContext(AppContext)
    return(
        <>
        {
            currentNav == 4 ?
            <GalleryNav />
            : ''
        }
        <div className="section relative flex justify-center items-center w-full text-gray-200 py-9 bg-blue mt-9" style={{
            zIndex: 505
        }}>
            <div className="flex justify-between xl:w-10/12 w-11/12 items-center transition-all duration-500 gap-9 flex-col ">
            <div className="flex w-full">
                <ContactForm />
            </div>

                <div className="flex flex-col w-full gap-5 text-gray-300 border-t border-gray-500z pt-[10vh] mt-[10vh] items-centr">
                    <h3 className="text-white text-xl font-bold">Quick Links</h3>

                    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
                    {
                        NavInfo.map((nav, key) => (
                            <ParallaxRight key={key} id={nav.title.replaceAll(' ', '')}>
                                <a href={`#${nav.title}`} className='flex gap-3'>
                                    <i className={`bi bi-${nav.icon}-fill`}></i>
                                    <p className="">{nav.title}</p>
                                </a>
                            </ParallaxRight>
                  
                        ))
                    }
                    </div>
                </div>
                <div className="text-gray-300 flex flex-col items-center text-center mt-9">
                    <div className="flex flex-col items-center gap-1 text-sm">
                            <p className="text-lg">&copy; Copyright {new Date().getFullYear()} <strong>Saculiet Driving School</strong></p> 

                             <a target="_blank" href={"https://paixtechdom.com"} className="">Developed by <strong>Paix Techdom</strong></a>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}