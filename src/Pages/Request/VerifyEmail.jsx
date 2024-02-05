import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { AppContext } from "../../assets/Contexts/AppContext"

const formatCountdown = (time) =>{
    let minutes = (Math.floor(time/60) % 60)
    let seconds = Math.floor(time % 60)
    if(minutes < 10) minutes = '0' + minutes
    if(seconds < 10) seconds = '0' + seconds
    return  minutes + ' : ' + seconds
}

export const VerifyEmail = ({userName, setVerificationStatus, setRequestId, requestSuccessful}) => {
    const [ error, setError ] = useState('')
    const [ pin, setPin ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ buttonDisabled, setButtonDisabled ] = useState(false)
    const [ request, setRequest ] = useState({})
    const [ countDown, setCountDown ]  = useState(60)


    const { dbLocation } = useContext(AppContext)
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(prev => 
                Math.max(0, prev - 1))
            }, 1000)
            
            return () => clearInterval(interval)
        }, [])

        useEffect(() => {
            if(countDown == 0){
                setPin('')
                deleteRequst()
            }
        }, [countDown])
        
        const deleteRequst = () => {
            axios.post(`${dbLocation}/requests.php/${userName}/${pin}/emailVerificationPin`).then((response) => {
            })

        }
        
        const verify = (e) => {
            e.preventDefault()
            if(countDown == 0) {
                
            }else{
                setIsLoading(true)
                axios.get(`${dbLocation}/requests.php/${userName}/${pin}`).then((r) => {
                    const response = r.data
                    const currentTime = new Date()
                    const t = response.time
                    const counter = Math.floor((currentTime - new Date(t))/100000
                    )
                    if((60 - counter) < 1){
                        deleteRequst()
                        setButtonDisabled(true)
                    }
                    else{
                        axios.get(`${dbLocation}/organizations.php/${response.name}/get`).then(re => {
                            const resp = JSON.parse(JSON.stringify(re))
                            const res = resp.data
                            if(res === false){
                                axios.post(`${dbLocation}/organizations.php/newOrganization`, {
                                    name: response.name,
                                    email: response.email,
                                    location: response.location
                                }).then((res) => 
                                    {
                                        setVerificationStatus(2)
                                        setRequestId(response.id)
                                    }
                                    )
                                }
                                else{
                                    if(res.document == null || res.document.length < 2){
                                        setRequestId(response.id)
                                        setVerificationStatus(2)
                               }
                               else if (res.document !== null && res.document.length > 2 && res.documentType !== null && res.documentType.length > 2 ){
                                   axios.post(`${dbLocation}/requests.php/pending/${response.id}`)
                                   requestSuccessful()
                                }

                            }
                        })
                    }
                    setIsLoading(false)
                })
            }
    }

    return(
        <form action="" className="flex justify-center align-center flex-col my-9 gap-6 border border-gray-50 shadow-xl p-5 rounded-xl" 
                    onSubmit={(e) => verify(e)}
                    >


                        <div className="flex flex-col w-full">

                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-key-fill bg-blue text-gray-200 p-2"></i>
                                <input type="text" placeholder="Email" className="p-2 text-sm outline-none w-full" value={pin} onChange={(e) => setPin(e.target.value)}/>
                            </div>
                            {
                                error ?
                                <FormError message={error}/> : ''
                            }
                        </div>
                        <div className="flex flex-col text-sm">
                            <p className="">{formatCountdown(countDown)}</p>
                            <div className="font-bold ">Resend Email</div>
                        </div>
                        <button className="bg-blue w-full p-3 text-gray-100 rounded-full flex justify-center items-center gap-1 text-sm" disabled={buttonDisabled}>
                            {
                                isLoading ?
                                <>
                                <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> VERIFYING...
                                </>
                                
                                :
                                <>
                                VERIFY
                                </>
                            }
                        
                        </button>

                    </form>
    )
}