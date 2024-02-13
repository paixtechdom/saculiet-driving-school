import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader, SyncLoader } from "react-spinners"
import { useForm } from "react-hook-form"
import * as  yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormError } from "../../Components/FormError"
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
        const randomCharacters = Array.from({ length : 4}, () => characters.charAt( Math.floor(Math.random() * characters.length)));
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
        axios.get(`${dbLocation}/requests.php/${organizationName}/active/pending`).then((res) => {
            console.log(res.data)
            if(res.data == false){
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
                        let from = 'studentverification@saculietdrivingschool.com'
                        let UserName = b
                        
                        sendVerificationEmail(data.email, subject, text, from, UserName)
                        setIsSending(false)
                        setVerificationStatus(1)
                    }, 2000);
        
                })
            }
            else{
                if(res.data.status == 'active'){
                    setAlertMessage(['You cannot place a request right now', 'You have an active request'])
                }
                if(res.data.status == 'pending'){
                    setAlertMessage(['You cannot place a request right now', 'You have a pending request'])
                }
                navigate('/')
                setShowAlert(true)
                setAlertType('Oops')
            }
        })
    }

    const sendVerificationMail = () => {
        let subject = 'Email Verfication Saculiet Driving School'
        let text =  'is your email verification pin'
        let from = 'studentverification@saculietdrivingschool.com'
        sendVerificationEmail(organizationEmail, subject, text, from, userName)
    }

    const requestSuccessful = () => {
        let subject = organizationName.replaceAll('_', ' ') + ' submitted a student verification request'
        let to = 'johnoluwaferanmi0106@gmail.com'
        let orgName =  organizationName.replaceAll('_', ' ')
        let link = 'studentverification.saculietdrivingschool.com'
        // let r = reason.replaceAll(/\n/g, '<br>')
        let firstname = firstName
        let lastname = lastName

        notifyAdminEmail(to, subject, orgName, link, firstname, lastname)
        setShowAlert(true)
        setAlertType('success')
        setAlertMessage(['Request sent successfully!', 'Keep browsing as you await a response to your email address'])
        navigate('/')
    }



    return(
        <div className="flex justify-center mt-9 pt-9 full min-h-screen">
             <Helmet>
            <title>
              Request Certificate Verification - Saculiet Driving School
            </title>
            </Helmet>
            {
                showInfo ? 
                <Info setShowInfo={setShowInfo} /> 
                : ''
            }

            <div className="w-11/12 center flex-col">
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
                    <form action="" className="flex justify-center align-center flex-col my-9 gap-6 border border-gray-50 shadow-xl p-5 rounded-xl" 
                    onSubmit={handleSubmit(HandleSendRequest)}
                    >
                        <div className="flex flex-col w-full">
                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-people-fill bg-sec text-gray-200 p-2"></i>
                            <input type="text" placeholder="Name of your organization" className="p-2 text-sm outline-none w-full" {...register("name")}/>
                        </div>
                        {
                            errors.name?.message ?
                            <FormError message={errors.name?.message}/> : ''
                        }
                        </div>

                        <div className="flex flex-col w-full">

                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-envelope-fill bg-blue text-gray-200 p-2"></i>
                                <input type="email" placeholder="Email" className="p-2 text-sm outline-none w-full" {...register("email")}/>
                            </div>
                            {
                                errors.email?.message ?
                                <FormError message={errors.email?.message}/> : ''
                            }
                        </div>
                        <div className="flex flex-col w-full">

                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-geo-fill bg-sec text-gray-200 p-2"></i>
                            <input type="text" placeholder="Location" className="p-2 text-sm outline-none w-full" {...register("location")}/>
                        </div>
                            {
                                errors.location?.message ?
                                <FormError message={errors.location?.message}/> : ''
                            }
                        </div>
                        <div className="flex flex-col w-full">

                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                            <input type="text" placeholder="Student's First Name" className="p-2 text-sm outline-none w-full" {...register("firstName")}/>
                        </div>
                            {
                                errors.firstName?.message ?
                                <FormError message={errors.firstName?.message}/> : ''
                            }
                        </div>
                        <div className="flex flex-col w-full">

                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                            <input type="text" placeholder="Student's Last Name" className="p-2 text-sm outline-none w-full" {...register("lastName")}/>
                        </div>
                            {
                                errors.lastName?.message ?
                                <FormError message={errors.lastName?.message}/> : ''
                            }
                        </div>
                        {/* <div className="flex flex-col w-full">
                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                                <textarea type="text" placeholder="Reason for request" className="min-h-32 max-h-32 p-2 text-sm outline-none w-full" {...register("reason")}/>
                            </div>
                                {
                                    errors.reason?.message ?
                                    <FormError message={errors.reason?.message}/> : ''
                                }

                        </div> */}

                        <button className="bg-blue w-full p-3 text-gray-100 rounded-full flex justify-center items-center gap-1 text-sm">
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
                    <VerifyEmail userName={userName} setVerificationStatus={setVerificationStatus} setRequestId={setRequestId} requestSuccessful={requestSuccessful} organizationEmail={organizationEmail} sendVerificationMail={sendVerificationMail}/> : 
                    verificationStatus == 2 ? 
                    <UploadDocument organizationName={organizationName} organizationEmail={organizationEmail} requestId={requestId} requestSuccessful={requestSuccessful}/> :
                    ''
                }

            </div>
        </div>
    )
}