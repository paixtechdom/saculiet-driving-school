import { useState } from "react"
import { useEffect } from "react"

const Parallax = ({children, id, center, clas}) => {
    const newId = id.replaceAll(' ', '')
    const [ isPosMatch, setIsPosMatch ] = useState(false)
    useEffect(() =>{
        
       handleScroll()
        
    }, [])
    const handleScroll = () => {
        const pos = document?.querySelector(`#${newId}`)
        const a = pos?.getBoundingClientRect()
        if(pos !== null){
            if(a.top < 700){
                setIsPosMatch(true)
            }  
        } 
        if(a){
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
      
        handleScroll()
    }, [])
    const handleScroll = () => {
        const pos = document?.querySelector(`#${newId}`)
        const a = pos?.getBoundingClientRect()
        if(pos !== null){
            if(a.top < 700){
                setIsPosMatch(true)
            }  
        } 
        if(a){
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