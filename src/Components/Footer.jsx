import { Link } from "react-router-dom"
import { Emails, NavInfo } from "../assets/Constants"
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
            <div className="flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 gap-9 flex-col ">
            <div className="flex w-full">
                <ContactForm />
            </div>

                <div className="flex flex-col w-full gap-5 text-gray-300 border-t pt-9 mt-9 items-centr">
                    <h3 className="text-gray-200 text-xl font-bold">Quick Links</h3>
                    {
                        NavInfo.map((nav, key) => (
                            <ParallaxRight key={key} id={nav.title.replaceAll(' ', '')}>
                                <a href={`#${nav.title}`} className='flex gap-3'>
                                    <i className={`bi bi-${nav.icon}-fill`}></i>
                                    <p className="underline">{nav.title}</p>
                                </a>
                            </ParallaxRight>
                  
                        ))
                    }
                </div>
                <div className="text-gray-300 flex flex-col items-center text-center">

                    {/* <p className="mt-9 mb-3 ">Read our  
                    <a href="" className="underline">Privacy policy</a> and
                     <a href="" className="underline ml-2">Terms of service</a></p> */}

                    <div className="flex flex-col items-center gap-1 text-sm">
                             <a href={"#Home"} className="text-xl font-bold">Saculiet Driving School</a>
                            <p>&copy; Copyright 2024</p> 
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}