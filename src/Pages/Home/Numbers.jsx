import { useEffect, useState } from "react"
import { Nos } from "../../assets/Constants"
import { Parallax, ParallaxRight } from "../../Components/Parallax"

export const Numbers = () => {
    const [ showNo, setShowNo ] = useState(false)
    useEffect(() =>{
        document.addEventListener('scroll', handleScroll)
        
    }, [])

    const handleScroll = () => {
        const nums = document.querySelector('#numbers')
            const pos = nums.getBoundingClientRect()
            if( pos.top < 700) {
                setShowNo(true)
            } 
    }

    return(
        <div id='numbers' className="flex flex-col justify-center items-center w-full text-gray-900 py-9 border-t border-b bg-blue">
        <div className="justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 grid grid-cols-2 md:flex text-gray-200 py-[9vh] gap-y-[10vh]">
            {
                showNo ? 
                Nos.map((no, key)  =>(
                       <No key={key} no={no} />
                       )) : ''
            }
        </div>
    </div>
    )
}

const No = ({no}) => {
    const [ newNo, setNewNo ] = useState(0)

    useEffect(() => {
        const int = setInterval(() => {
            read()
        }, 30);
        return () => clearInterval(int)
    }, [newNo])

    const read = () => {
        setNewNo(newNo == no.no ? no.no : newNo + no.interval)
    }
    return(
        <div className='overflow-h idden relative left-0 rounded-xl w-full flex-col flex items-center justify-center gap-1'>
            <ParallaxRight id={`${no.title[0]}${no.title[1]}`}>
            <i className={`bi bi-${no.icon} text-gray-900 text-3xl bg-white rounded-full p-5 px-7 shadow-3xl`}></i>
            </ParallaxRight>

            {/* <Parallax key={key} id={`${no.title[1]}${no.title[0]}`}> */}
            <p className="text-3xl mt-7 text-white">{newNo}+</p>
            {/* </Parallax> */}
            <Parallax id={`${no.title[1]}${no.title[0]}`}>
            <h3 className='text-sm text-gray-300'>{no.title}</h3>
            </Parallax>
        </div>
    )
}