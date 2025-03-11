import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader, SyncLoader } from "react-spinners"
import { useForm } from "react-hook-form"
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormError } from "../../Components/FormError"
import { FormLabel } from "../../Components/FormLabel"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
import { Removespaces } from "../../assets/Functions"
import axios from "axios"
import { Helmet } from "react-helmet-async"
import { sendVerificationEmail, notifyAdminEmail } from "../../assets/SendEmail"
import { VerifyEmail } from "./VerifyEmail"
import { UploadDocument } from "./UploadDocument"
import { Info } from "./Info"


export const Request = () => {
    const [ isSending, setIsSending ] = useState(false)
    const { dbLocation, setShowAlert, setAlertType, setAlertMessage, setCurrentNav } = useContext(AppContext)
    const navigate = useNavigate()
    const [ verificationStatus, setVerificationStatus ] = useState(0)
    const [ userName, setUserName ] = useState('')
    const [ organizationName, setOrganizationName ] = useState('')
    const [ organizationEmail, setOrganizationEmail ] = useState('')
    const [ reason, setReason ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ showInfo, setShowInfo ] = useState(true)
    const [ requestId, setRequestId ] = useState('')

    useEffect(() => {
        setCurrentNav(5)
    }, [])
    
    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [verificationStatus])

    const schema = yup.object().shape({
        name: yup.string().required('Name cannot be empty').min(3, 'Name is too short'),
        email: yup.string().email('Input a valid email').required('Email cannot be empty'),
        location: yup.string().required('Location cannot be empty').min(10, 'Location provided is too short'),
        // reason: yup.string().required('Reason for request cannot be empty').min(10, 'Reason is too short'),
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        
    })
    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm({
        resolver: yupResolver(schema)
    })


    const HandleSendRequest = (data) => {
        setValue('status', 'unconfirmed-email')
        setIsSending(true)
        const characters = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuioplkjhgfdsazxcvbnm'
        const randomCharacters = Array.from({ length : 3}, () => characters.charAt( Math.floor(Math.random() * characters.length)));
        const x = Removespaces(data.name)
        const c = x.replaceAll(' ', '_').toUpperCase()
        
        const a = randomCharacters+c.toLowerCase()
        const b =  a.replaceAll(',', '')
        setValue('userName', b)

        setValue('name', c)
        setValue('firstName', data.firstName.toUpperCase())
        setValue('lastName', data.lastName.toUpperCase())
        setUserName(b)
        setOrganizationName(c)
        setOrganizationEmail(data.email)
        // setReason(data.reason)
        setFirstName(data.firstName)
        setLastName(data.lastName)

        // console.log(data)
        // axios.get(`${dbLocation}/requests.php/${organizationName}/active/pending`).then((res) => {
            // console.log(res.data)
            // if(res.data == false){
                axios.post(`${dbLocation}/requests.php/request`, data).then(function(res) {
                    // console.log(res)
                    reset({
                        name : '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        location: '',
                        reason: '',
                    })
                    setTimeout(() => {
                        let subject = 'Email Verfication Saculiet Driving School'
                        let text =  'is your email verification pin'
                        let from = 'studentverification@saculietdrivingschool.org'
                        let UserName = b
                        
                        sendVerificationEmail(data.email, subject, text, from, UserName)
                        setIsSending(false)
                        setVerificationStatus(1)
                    }, 2000);
        
                })
         
    }

    const sendVerificationMail = () => {
        
        let subject = 'Email Verfication Saculiet Driving School'
        let text =  'Your email verification pin is '
        let from = 'studentverification@saculietdrivingschool.org'
        sendVerificationEmail(organizationEmail, subject, text, from, userName)
    }

    const requestSuccessful = () => {
        let subject = organizationName.replaceAll('_', ' ') + ' submitted a student verification request'
        let orgName =  organizationName.replaceAll('_', ' ')
        let link = 'studentverification.saculietdrivingschool.org'
        // let r = reason.replaceAll(/\n/g, '<br>')
        let firstname = firstName
        let lastname = lastName
        setVerificationStatus(3)
        setTimeout(() => {
            notifyAdminEmail(subject, orgName, link, firstname, lastname)
            setShowAlert(true)
            setAlertType('success')
            setAlertMessage(['Request sent successfully!', 'Keep browsing as you await a response to your email address'])
            navigate('/')
        }, 1500);
    }



    return(
        <div className="flex justify-center mt-[10vh] pt-9 w-full min-h-screen">
             <Helmet>
            <title>
              Request Certificate Verification - Saculiet Driving School
            </title>
            </Helmet>
            {
                showInfo ? 
                <Info setShowInfo={setShowInfo} /> 
                : 
                <div className="w-11/12 flex justify-center items-center flex-col  xl:w-9/12 transition-all duration-500 md:mt-9">
                <div className="mt-[8vh] fixed left-0 w-full flex justify-center top-0 lg:top-[5vh]">
                    <div className="flex w-11/12 md:w-9/12 p-3 rounded-full shadow items-center justify-center my-9 bg-blue-200 bg-opacity-10 ">
                        <ProgressCircle check={verificationStatus > 0}/>
                        <div className={`w-4/12 h-1 ${verificationStatus > 0 ? 'bg-green-700' : 'bg-green-200'}`}></div>
                        <ProgressCircle check={verificationStatus > 1}/>
                        <div className={`w-4/12 h-1 ${verificationStatus > 1 ? 'bg-green-700' : 'bg-green-200'}`}></div>
                        <ProgressCircle check={verificationStatus > 2}/>
                    </div>
                </div>
                <div className="my-9"></div>
                    { verificationStatus == 3 ?
                        <div className="flex flex-col items-center min-h-screen gap-3 mt-9">
                            <i className="bi bi-check-circle-fill text-green-600 text-5xl"></i>
                            <p className="text-lg flex ">You are all set</p>
                            <p className="text-lg flex ">Processing your request...</p>
                        </div> : ''
                    }



                    <h3 className="text-center text-2xl">
                        {
                            verificationStatus == 0 ? 
                            "Send a Request to Verify Our Students' Certificate" :
                            verificationStatus == 1 ? 
                            "Verify Your Email Account"
                            : ''
                        }
                    </h3>

                    {
                        verificationStatus == 0 ?
                        <form action="" className="flex justify-center align-center w-full flex-col my-9 gap-9 md:gap-9 shadow-xl p-7 rounded-xl md:w-9/1 lg:grid grid-cols-2 py-8" 
                        onSubmit={handleSubmit(HandleSendRequest)}
                        >
                            <div className="flex flex-col w-full">
                                <div className="flex w-full overflow-hidden  border-bottom-primary">
                                    <i className="bi bi-people-fill bg-sec text-gray-50 p-2"></i>
                                    <input type="text" placeholder="Name of Organization" className="p-2 px-4 text-sm outline-none bg-gray-50 w-full" {...register("name")}/>
                                </div>
                                {
                                    errors.name?.message ?
                                    <FormError message={errors.name?.message}/> : ''
                                }
                            </div>

                            <div className="flex flex-col w-full">
                                <div className="flex w-full overflow-hidden border-gray-50 border-bottom-primary">
                                    <i className="bi bi-envelope-fill bg-blue text-gray-50 p-2"></i>
                                    <input type="email" placeholder="Email" className="p-2 text-sm outline-none bg-gray-50 w-full px-4" {...register("email")}/>
                                </div>
                                {
                                    errors.email?.message ?
                                    <FormError message={errors.email?.message}/> : ''
                                }
                            </div>
                            <div className="flex flex-col w-full col-span-2">
                                {/* <FormLabel text={'Location'} icon={'geo-fill'}/> */}
                                <div className="flex w-full border-bottom-primary overflow-hidden bg-gray-50">
                                    <i className="bi bi-geo-fill bg-sec text-gray-50 p-2"></i>
                                    <input type="text" placeholder="Location" className="p-2 text-sm outline-none bg-gray-50 w-full px-4" {...register("location")}/>
                                </div>
                                {
                                    errors.location?.message ?
                                    <FormError message={errors.location?.message}/> : ''
                                }
                            </div>
                            <div className="flex flex-col w-full">
                                {/* <FormLabel text={"Student's First Name"} icon={'person-fill'}/> */}

                                <div className="flex w-full overflow-hidden bg-gray-50 border-bottom-primary">
                                    <i className="bi bi-person-fill bg-blue text-gray-50 p-2"></i>
                                    <input type="text" placeholder="Student's First Name" className="p-2 text-sm outline-none bg-gray-50 w-full px-4" {...register("firstName")}/>
                                </div>
                                {
                                    errors.firstName?.message ?
                                    <FormError message={errors.firstName?.message}/> : ''
                                }
                            </div>
                            <div className="flex flex-col w-full">
                                {/* <FormLabel text={"Student's Last Name"} icon={'person-fill'}/> */}

                                <div className="flex w-full overflow-hidden bg-gray-50 border-bottom-primary">
                                    <i className="bi bi-person-fill bg-sec text-gray-50 p-2"></i>
                                    <input type="text" placeholder="Student's Last Name" className="p-2 text-sm outline-none bg-gray-50 w-full px-4" {...register("lastName")}/>
                                </div>
                                {
                                    errors.lastName?.message ?
                                    <FormError message={errors.lastName?.message}/> : ''
                                }
                            </div>
                          

                            <button className="bg-blue w-full md:w-[200px] p-4 text-gray-100 rounded-lg flex justify-center items-center gap-1 text-sm col-span-2">
                                {
                                    isSending ?
                                    <>
                                    <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> SENDING...
                                    </>
                                    
                                    :
                                    <>
                                    SEND REQUEST
                                    <i className="bi bi-chevron-right"></i> 
                                    </>
                                }
                            
                            </button>

                        </form> : 
                        verificationStatus == 1 ?
                        <VerifyEmail userName={userName} setVerificationStatus={setVerificationStatus} setRequestId={setRequestId} requestSuccessful={requestSuccessful} organizationEmail={organizationEmail} sendVerificationMail={sendVerificationMail} requestId={requestId}/> : 
                        verificationStatus == 2 ? 
                        <UploadDocument organizationName={organizationName} organizationEmail={organizationEmail} requestId={requestId} requestSuccessful={requestSuccessful}/> :
                        ''
                    }

                </div>
                // ''
            }

        </div>
    )
}


const ProgressCircle = ({check}) => {
    return(
        <div className={`flex items-center justify-center rounded-full bg-green-00 border border-green- shadow scale-90`} style={{
            height: 30+'px',
            width: 30+'px'
        }}>
            <div className={`flex items-center justify-center rounded-full ${check ? 'bg-green-700' : 'bg-green-200'} text-gray-100 text-xl shadow scale-90`} style={{
            height: 20+'px',
            width: 20+'px'
        }}>
            {
                check ?
                <i className="bi bi-check"></i> : ''
            }
            </div>
        </div>
    )
}