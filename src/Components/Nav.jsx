import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LogoText, Logo, NavInfo } from "../assets/Constants"
import { PrimaryButton } from "./Button"
import { Parallax } from "./Parallax"
import { AppContext } from "../assets/Contexts/AppContext"
export const Nav = () => {
    const [dropdownPos, setDropDownPos ] = useState(100)
    const [ posWidth, setPosWidth ] = useState(2)
    const {currentNav, setCurrentNav} = useContext(AppContext)

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
      
    }


    return(
    <div className={`flex justify-center items-center w-full py-4 fixed top-0 z-50 bg-white shadow-lg`} style={{
        zIndex: 506
    }}>
        <div className="flex justify-between xl:w-10/12 w-11/12 items-center transition-all duration-500 lg:bg-none z-50">

            <Link to='/' className="logo text-2xl text-gray-300">
            {/* <a href='http://localhost:5173' className="logo text-2xl text-gray-300"> */}

                <img src={Logo} alt="Logo" className="w-2/12 lg:w-3/12"/>
            </Link>
            <div className="flex gap-4">

                <div className="lg:hidden" onClick={()=> setDropDownPos(dropdownPos == 0 ? -100 : 0)}>
                    <i className={`bi bi-${dropdownPos == 0 ? 'x-lg' : 'list'} text-gray-900 text-3xl cursor-pointer`}></i>
                </div>
 
            </div>
            <div className={`flex gap-8 absolute 
            top-9 p-5 pb-6 transition-all duration-1000 flex-col bg-white w-full mt-3 ${dropdownPos == 0 ? 'left-0' : '-left-100'}
            lg:flex-row lg:flex lg:relative lg:p-0 lg:mt-0 lg:top-0 lg:w-fit lg:bg-transparent lg:left-0 lg:items-center`} style={{
                // left: dropdownPos+'%',
            }}>

                {
                    NavInfo.map((nav, key) => (
                        <Link key={key} to={`/${nav.link}`} className={`flex gap-3 items-center lg:gap-0 lg:flex-col ${currentNav == key ? 'border-b border-blue-900' : ''}`} onClick={()=> {
                            setCurrentNav(key)
                            setDropDownPos(100)
                            }}>
                            <i className={`bi bi-${nav.icon}-fill text-sec text-lg lg:hidden`}></i>
                            <div className='text-blue text'>{nav.title}</div>
                        </Link>
                      

                        ))
                    }
                
                  
            </div>
        </div>
    </div>
    )
}