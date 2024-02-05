import { useState } from "react"
import { useEffect } from "react"

const Parallax = ({children, id, center, clas}) => {
    const newId = id.replaceAll(' ', '')
    const [ isPosMatch, setIsPosMatch ] = useState(false)
    useEffect(() =>{
        
        const pos = document.querySelector(`#${newId}`).getBoundingClientRect()
        if(pos.top < 700){
            setIsPosMatch(true)
        }      
        
    }, [])
    const handleScroll = () => {
        const pos = document.querySelector(`#${newId}`).getBoundingClientRect()
        if(pos.top < 700){
            setIsPosMatch(true)
        }  
      
    }

    useEffect(() =>{
        document.addEventListener('scroll', handleScroll)
        
    }, [])

    return(
        <div id={newId} className={`transition-all duration-500 ${center ? 'justify-center flex' : ''} relative ${clas}`}>
            <div className={`relative  ${isPosMatch ? 'animateParallaxBottom ' : 'opacity-0'}`}>
                {children}
            </div>
        </div>
    )
}
const ParallaxRight = ({children, id, center, clas}) => {
    const newId = id.replaceAll(' ', '')
    const [ isPosMatch, setIsPosMatch ] = useState(false)
    useEffect(() =>{
        
        const pos = document.querySelector(`#${newId}`).getBoundingClientRect()
        if(pos.top < 700){
            setIsPosMatch(true)
        }      
        
    }, [])
    const handleScroll = () => {
        const pos = document.querySelector(`#${newId}`).getBoundingClientRect()
        if(pos.top < 700){
            setIsPosMatch(true)
        }  
      
    }

    useEffect(() =>{
        document.addEventListener('scroll', handleScroll)
        
    }, [])

    return(
        <div id={newId} className={`transition-all duration-500 ${center ? 'justify-center flex' : ''} position-relative ${clas}`}>
            <div className={`relative  ${isPosMatch ? 'animateParallaxRight ' : 'opacity-0'}`}>
                {children}
            </div>
        </div>
    )
}

export { Parallax, ParallaxRight }