import { useState } from "react"
import { Link } from "react-router-dom"

const PrimaryButton = ({icon, text, clas, btnClas}) => {
    const [ scale, setScale ] = useState(1)
    return(
        <div className={`bg-blue flex cursor-pointer items-center shadow-xl rounded-full p-1 text-sm transition-all duration-500 w-fit ${btnClas}`}
        style={{
            transform: `scale(${scale})`
        }}
        onMouseOver={() =>{
            setScale(1.1)
        }}
        onMouseOut={() =>{
            setScale(1)
        }}>
            {
                text ?
                <div className='text-gray-100 px-3'>{text.toUpperCase()}</div> : ''
            }
            <i className={`bi bi-${icon} text-black bg-white rounded-full flex items-center justify-center ${clas ? clas : icon == 'arrow-down' ? 'updown' : 'slidetofro'} ${icon == 'chevron-down' ? 'updown' : icon == 'chevron-up' ?  'downUp' : ''}`} style={{
                height: 30+'px',
                width: 30+'px',
            }}></i>
        </div>
    )
}
const SecondaryButton = ({icon, text, clas }) => {
    const [ scale, setScale ] = useState(1)
    return(
        <div className={`flex cursor-pointer items-center bg-blue border border-gray-900 rounded-full p-1 text-sm transition-all duration-500 w-fit`} style={{
            transform: `scale(${scale})`
        }}
        onMouseOver={() =>{
            setScale(0.9)
        }}
        onMouseOut={() =>{
            setScale(1)
        }}>
            <div className='text-gray-300 px-3 '>{text.toUpperCase()}</div>
            <i className={`bi bi-${icon} text-black flex items-center justify-center bg-white rounded-full ${clas ? clas : icon == 'arrow-down' ? 'updown' : 'slidetofro'}`} style={{
                height: 30+'px',
                width: 30+'px',
            }}></i>
        </div>
    )
}

export { PrimaryButton, SecondaryButton }