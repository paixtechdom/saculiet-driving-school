import { useContext, useState } from "react"
import { PrimaryButton } from "./Button"
import logo from '../assets/Images/IMG-20240114-WA0052.jpg'
import { SocialMediaInfo, Emails } from "../assets/Constants"
import { ParallaxRight } from "../Components/Parallax"
import { CircleLoader, ClipLoader, FadeLoader, RotateLoader } from "react-spinners"
import axios from "axios"
import { AppContext } from "../assets/Contexts/AppContext"
const Suscribe = () => {
    const [ scale, setScale ] = useState(1)

    return(
        <>
            <div className="pt-9">
            </div>
            <div className="flex justify-center items-center w-full text-gray-200 py-9 bg-blue-30">
                <div className="flex justify-between xl:w-9/12 w-11/12 items-center transition-all duration-500 gap-3 flex-col ">
                <div className="w-full ">
                    <h2 className="text-2xl">Suscribe to receive updates</h2>
                </div>
                <form className="flex justify-between w-full items-center transition-all duration-500 gap-3 md:flex-row flex-col h-full">
                <div className="flex border w-full rounded-lg overflow-hidden">
                        <i className="bi bi-person-fill bg-black p-2 text-white opacity-50"></i>
                        <input type="text" placeholder="Name" className="bg-transparent p-2"/>
                </div>
                <div className="flex border w-full rounded-lg overflow-hidden">
                        <i className="bi bi-envelope-fill bg-black p-2 text-white opacity-50"></i>
                        <input type="mail" placeholder="Email" className="bg-transparent p-2"/>
                </div>
                    <div className={`flex cursor-pointer items-center bg-gradient-to-r from-gray-900 to-pink-900 shadow-xl rounded-lg p-1 text-lg transition-all duration-500 w-full justify-center cursor-pointer`}
                    style={{
                        transform: `scale(${scale})`
                    }}
                    onMouseOver={() =>{
                        setScale(0.95)
                    }}
                    onMouseOut={() =>{
                        setScale(1)
                    }}>

                        <i className="bi bi-bell-fill text-gray-300 bg-gray-90 rounded-full flex items-center justify-center p-2 subscriptionBell"></i>
                        <input type="submit" placeholder="Name" className="bg-transparent" value={'SUSCRIBE'}/>
                    </div>
                </form>
                </div>
            </div>
            <div className="pb-9">
            </div>
        </>
    )
}


const ContactForm = () => {
    const [ scale, setScale ] = useState(1)
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ nameError, setNameError ] = useState(false)
    const [ messageError, setMessageError ] = useState(false) 
    const [ isLoading, setIsLoading ] = useState(false) 
    const { setShowAlert, setAlertType, setAlertMessage, dbLocation } = useContext(AppContext)


    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        const newName = name.split(' ').join('')
        const newMessage = message.split(' ').join('')
        if(newName.length < 5 || newName == 0){
            setIsLoading(false)
            setNameError(true)
            setMessageError(false)
        }else if(newMessage.length < 5 || newMessage == 0){
            setIsLoading(false)
            setMessageError(true)
            setNameError(false)
        }else{
            setIsLoading(true)
            setMessageError(false)
            setNameError(false)
            const subject = 'Message from ' + name + ' to Saculiet Driving School'

            sendContactEmail('customerservice@saculietdrivingschool.com', subject, message, email)

           

           
     }
    }
    const sendContactEmail = (email, subject, message, from ) => {
        const newMessage = message.replaceAll(/\n/g, '<br>')

        axios.post(`${dbLocation}/contactEmail.php/` ,{
            to: email,
            subject: subject,
            message: newMessage,
            from: from,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            setShowAlert(true)
            setAlertType('success')
            setIsLoading(false)
            setAlertMessage(['Message Sent successfully'])
            // setName('')
            // setEmail('')
            // setMessage('')
        })
        .catch(error => {
                setShowAlert(true)
                setAlertType('error')
                setIsLoading(false)
                setAlertMessage(['Error sending message'])
            });
    
          
      }



    return(
        <div id={'Contact'} className="flex flex-col gap-1 justify-center items-center w-full text-gray-200 ">
            <h3 className="text-2xl w-full">Contact Us</h3>
            <div className="flex justify-between items-center w-full md:gap-9 gap-8 md:flex-row flex-col h-full bg-blue-70">
              
                <div className="flex md:w-9/12 w-full h-full gap-6 flex-col justify-center">
                    {
                        SocialMediaInfo.map((media, key) => (
                            <ParallaxRight key={key} id={`${media.icon}`}>

                                <a  key={key} href={`${media.link}`}
                                className="flex gap-4">
                                        <i className={`bi bi-${media.icon} text-lg text-gray-300 text-2xl`}></i>
                                    <div className="flex flex-col w-full gap-1"> 
                                        <h3 className="text-lg">{media.title}</h3>
                                        <p className="text-sm text-gray-300" style={{
                                            lineHeight: 22+'px'
                                        }}>{media.text}</p>
                                    </div>
                                </a>
                            </ParallaxRight>
                        ))
                    }
                    {
                        Emails.map((email, key) => (
                            <ParallaxRight key={key} id={`${email.icon}`}>

                                <a  href={`${email.link}`}
                                className="flex gap-4">
                                        <i className={`bi bi-${email.icon} text-lg text-gray-300 text-2xl`}></i>
                                    <div className="flex flex-col w-full gap-1"> 
                                        <h3 className="text-lg">{email.title}</h3>
                                        <a className="truncate" href={`mailto:${email.text}`}>{email.text}</a>
                                        
                                    </div>
                                </a>
                            </ParallaxRight>
                        ))
                    }
                   
                </div>
                <form className="flex justify-between w-full items-center transition-all duration-500 gap-3 flex-col h-full md:w-full bg-blue-30" onSubmit={handleSubmit}>
                    <div className="w-full ">
                        <h2 className="text-2xl text-gray-300">Send us a message</h2>
                    </div>
                    <ParallaxRight clas='w-full' id='name'>
                        <div className="flex border w-full rounded-lg overflow-hidden">
                                    <i className="bi bi-person-fill bg-black p-2 text-white opacity-50"></i>
                                    <input type="text" placeholder="Enter your name" className="bg-transparent p-2 w-full"  value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required />

                        </div>
                            {
                        nameError ? 
                        <p className="text-red-500 small-lg text-center my-1">Name is too short</p> : ''
                    }
                    </ParallaxRight>
                    <ParallaxRight clas='w-full' id='email'>
                        <div className="flex border w-full rounded-lg overflow-hidden">
                                <i className="bi bi-envelope-fill bg-black p-2 text-white opacity-50"></i>
                                <input type="email" placeholder="Enter your email address" className="bg-transparent p-2 w-full"  value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required/>
                        </div>
                    </ParallaxRight>
                    <ParallaxRight clas='w-full' id='message'>
                        <div className="flex border w-full rounded-lg overflow-hidden">
                                <i className="bi bi-chat-fill bg-black p-2 text-white opacity-50"></i>
                                <textarea name="" id="" placeholder="Enter your Message" className="p-2 bg-transparent" style={{
                                    minHeight: 100+'px',
                                    maxHeight: 100+'px',
                                    minWidth: 100+'%',
                                    maxWidth: 100+'%',
                                }} value={message}
                                onChange={(e) => setMessage(e.target.value)} required></textarea>
                        </div>
                        {
                            messageError ? 
                            <p className="text-red-500 my-1 small-lg text-center">Message is too short</p> : ''
                        }
                    </ParallaxRight>
                    <ParallaxRight clas='w-full' id='send'>
                        <div className={`flex cursor-pointer items-center bg-transparent shadow-xl rounded-lg p-1 text-lg transition-all duration-500 w-full justify-center cursor-pointer border`}
                        style={{
                            transform: `scale(${scale})`
                        }}
                        onMouseOver={() =>{
                            setScale(0.95)
                        }}
                        onMouseOut={() =>{
                            setScale(1)
                        }}>

                            <input type="submit" placeholder="Name" className="bg-transparent p-2" value={isLoading ? 'SENDING' : 'SEND MESSAGE'}/>
                            {
                                isLoading ? 
                                <ClipLoader color='white' size={15}/> : 
                                <i className="bi bi-chevron-right text-gray-100 bg-gray-90 rounded-full flex items-center justify-center slidetofro"></i>
                            }
                        </div>
                    </ParallaxRight>
                </form>

                {/* <img src={logo} alt="Contact Us" className="md:w-5/12 max-h-96 md:h-full"/> */}
            </div>
        </div>
    )
}

export { Suscribe, ContactForm }