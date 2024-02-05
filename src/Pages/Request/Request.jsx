import { useState } from "react"
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


export const Request = () => {
    const [ isSending, setIsSending ] = useState(false)
    const { dbLocation, setShowAlert, setAlertType, setAlertMessage } = useContext(AppContext)
    const navigate = useNavigate()
    const [ verificationStatus, setVerificationStatus ] = useState(2)
    const [ userName, setUserName ] = useState('')
    const [ organizationName, setOrganizationName ] = useState('')
    const [ organizationEmail, setOrganizationEmail ] = useState('')
    const [ requestId, setRequestId ] = useState('')

    const requestSuccessful = () => {
        let organizationName =  organizationName.replaceAll('_', ' ')
        let subject = organizationName + ' submitted a student verification request'
        let to = 'johnoluwaferanmi0106@gmail.com'
        let link = ''

        notifyAdminEmail(to, subject, organizationName, link)
        setShowAlert(true)
        setAlertType('success')
        setAlertMessage(['Request sent successfully!', 'Keep browsing as you await a response to your email address'])
        navigate('/request_certificate_verification')
    }



    const schema = yup.object().shape({
        name: yup.string().required('Name cannot be empty').min(3, 'Name is too short'),
        email: yup.string().email('Input a valid email').required('Email cannot be empty'),
        location: yup.string().required('Location cannot be empty').min(10, 'Location provided is too short'),
        reason: yup.string().required('Reason for request cannot be empty').min(10, 'Reason is too short'),

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
        const c = x.replaceAll(' ', '_')
        const a = randomCharacters+c.toLowerCase()
        const b =  a.replaceAll(',', '')
        setValue('userName', b)

        setValue('name', c)
        setUserName(b)
        setOrganizationName(c)
        setOrganizationEmail(data.email)
        console.log(data)
        axios.post(`${dbLocation}/requests.php/request`, data).then(function(res) {
            // console.log(res)
            reset({
                name : '',
                email: '',
                location: '',
                reason: '',
            })
            setTimeout(() => {
                let subject = 'Email Verfication Saculiet Driving School'
                let text =  'is your email verification pin'
                let from = 'johnoluwaferanmi0106@gmail.com'
                let UserName = b
                
                sendVerificationEmail(data.email, subject, text, from, UserName)
                setIsSending(false)
                setVerificationStatus(1)
            }, 2000);

        })
    }

    return(
        <div className="flex justify-center mt-9 pt-9 full min-h-screen">
             <Helmet>
            <title>
              Request Certificate Verification - Saculiet Driving School
            </title>
            </Helmet>


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
                            <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                            <input type="text" placeholder="Name of your organization" className="p-2 text-sm outline-none w-full" {...register("name")}/>
                        </div>
                        {
                            errors.name?.message ?
                            <FormError message={errors.name?.message}/> : ''
                        }
                        </div>

                        <div className="flex flex-col w-full">

                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                                <input type="email" placeholder="Email" className="p-2 text-sm outline-none w-full" {...register("email")}/>
                            </div>
                            {
                                errors.email?.message ?
                                <FormError message={errors.email?.message}/> : ''
                            }
                        </div>
                        <div className="flex flex-col w-full">

                        <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                            <i className="bi bi-person-fill bg-blue text-gray-200 p-2"></i>
                            <input type="text" placeholder="Location" className="p-2 text-sm outline-none w-full" {...register("location")}/>
                        </div>
                            {
                                errors.location?.message ?
                                <FormError message={errors.location?.message}/> : ''
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="flex w-full rounded-xl overflow-hidden border border-gray-50 shadow-lg">
                                <i className="bi bi-person-fill bg-sec text-gray-200 p-2"></i>
                                <textarea type="text" placeholder="Reason for request" className="min-h-32 max-h-32 p-2 text-sm outline-none w-full" {...register("reason")}/>
                            </div>
                                {
                                    errors.reason?.message ?
                                    <FormError message={errors.reason?.message}/> : ''
                                }

                        </div>

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
                    <VerifyEmail userName={userName} setVerificationStatus={setVerificationStatus} setRequestId={setRequestId} requestSuccessful={requestSuccessful}/> : 
                    verificationStatus == 2 ? 
                    <UploadDocument organizationName={organizationName} organizationEmail={organizationEmail} requestId={requestId} requestSuccessful={requestSuccessful}/> :
                    ''
                }

            </div>
        </div>
    )
}