import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LogoText, Logo, NavInfo } from "../assets/Constants"
import { PrimaryButton } from "./Button"
import { Parallax } from "./Parallax"
export const Nav = ({currentNav, setCurrentNav}) => {
    const [dropdownPos, setDropDownPos ] = useState(100)
    const [ posWidth, setPosWidth ] = useState(2)
    const [ navPos, setNavPos ] = useState(0)


    useEffect(() =>{
        document.addEventListener('scroll', handleScroll)
        
    }, [])

    const handleScroll = () => {
        document.querySelectorAll('.section').forEach((parent, i) =>{
            const pos = parent.getBoundingClientRect()
            if( pos.top > -10 && pos.top < 100) {
                setCurrentNav(i)
            } 
        })

        // const pageHeight = document.documentElement.scrollHeight - window.innerHeight
        // const currentPos = window.scrollY
        // setPosWidth(currentPos / pageHeight * 100 < 2 ? 2 : currentPos / pageHeight * 100)
     
      
    }


    return(
    <div className={`flex justify-center items-center w-full py-2 fixed top-0 z-50 bg-white shadow-lg`} style={{
        zIndex: 400
    }}>
        <div className="flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 md:bg-none z-50">

            {/* <a href='https://saculietdrivingschool.com' className="logo text-2xl text-gray-300"> */}
            <a href='http://localhost:5173' className="logo text-2xl text-gray-300">

                <img src={Logo} alt="Logo" className="w-2/12 md:w-3/12"/>
            </a>
            <div className="flex gap-4">

                <div className="md:hidden" onClick={()=> setDropDownPos(dropdownPos == 0 ? -100 : 0)}>
                    <i className={`bi bi-${dropdownPos == 0 ? 'x-lg' : 'justify'} text-gray-900 text-2xl cursor-pointer`}></i>
                </div>

            </div>
            <div className={`flex gap-8 absolute 
            top-9 p-5 transition-all duration-1000 flex-col bg-white w-full mt-6 ${dropdownPos == 0 ? 'left-0' : '-left-100'}
            md:flex-row md:flex md:relative md:p-0 md:mt-0 md:top-0 md:w-fit md:bg-transparent md:left-0 md:items-center`} style={{
                // left: dropdownPos+'%',
            }}>

                {
                    NavInfo.map((nav, key) => (
                        // <a key={key} href={`https://saculietdrivingschool.com/${nav.link}`} className={`flex items-center gap-3 items-center md:gap-0 md:flex-col ${currentNav == key ? 'opacity-50' : ''}`} onClick={()=> {
                        <a key={key} href={`http://localhost:5173/${nav.link}`} className={`flex items-center gap-3 items-center md:gap-0 md:flex-col text-sm ${currentNav == key ? 'opacity-50' : ''}`} onClick={()=> {
                            setCurrentNav(key)
                            setDropDownPos(100)
                            }}>
                            <i className={`bi bi-${nav.icon}-fill text-sec text-lg md:hidden`}></i>
                            <div className='text-blue text'>{nav.title}</div>
                        </a>
                      

                        ))
                    }
                
                  
            </div>
        </div>
    </div>
    )
}