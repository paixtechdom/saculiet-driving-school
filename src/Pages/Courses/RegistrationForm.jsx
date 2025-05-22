import React, { useContext, useEffect, useState } from 'react'
import { PrimaryButton } from '../../Components/Button'
import { AppContext } from '../../assets/Contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { NarrowedCourses } from '../../assets/Constants'

const RegistrationForm = () => {
    const { setShowAlert, setAlertMessage, setAlertType, selectedCourseName, setSelectedCourse } = useContext(AppContext)
    
    const course = NarrowedCourses[selectedCourseName]
    

    const navigate = useNavigate()
    const [ isSending, setIsSending ] = useState(false)
    const [ formInputs, setFormInputs ] = useState({
        startDate: "",
        endDate: "",

        fullName: "",
        type: "",
        companyName: "",
        position: "",
        email: "",
        number: ""
    })


    const HandleSubmit = (e) => {
        // console.table(formInputs)
        e.preventDefault()
        setShowAlert(true)
        setAlertType('success')
        setAlertMessage(['Request Submitted successfully!'])
        navigate("/courses/payment")
    }

    const types = ["Individual", "Corporate Organization"]

    const HandleFormChange = (e) => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        })
    }
    // on change of type, the company and other should change, or i can ahndle it when sending the details to wherever
    /*
        Date, Name, Coporate or Individual, Name of Company, Title in the Company, Email Address, Phone Number, register
    */
  return (
    <section className='fixed top-0 w-full bg-blue-900 bg-opacity-30 backdrop-blur-md h-screen left-0 z-[501] flex items-center justify-center
    '>
          <form action="" className="flex justify-center align-center flex-col my-9 gap-4 shadow-xl p-7 rounded-xl w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 py-8 bg-black bg-opacity-55" onSubmit={HandleSubmit}>
            <h2 className='text-xl font-bold text-gray-200 uppercase mb-2'>Register for {course?.title}</h2>

           
           <FormInputComponent 
                formInputs={formInputs}
                HandleFormChange={HandleFormChange}
                placeholder="Full Name"
                name="fullName"
                required={true}
            />
            <SelectInputComponent 
                formInputs={formInputs}
                HandleFormChange={HandleFormChange}
                placeholder="-- Individual / Corporate Organization --"
                name="type"
                data={types}
            />

            {
                formInputs.type == "Corporate Organization" &&
                <>
                <FormInputComponent 
                        formInputs={formInputs}
                        HandleFormChange={HandleFormChange}
                        placeholder="Name of Organization"
                        name="companyName"
                        required={formInputs.type == "Corporate Organization"}
                    />
                <FormInputComponent 
                        formInputs={formInputs}
                        HandleFormChange={HandleFormChange}
                        placeholder="Position Held in the Organization"
                        name="position"
                        required={formInputs.type == "Corporate Organization"}
                    />
                </>
            }
           <FormInputComponent 
                formInputs={formInputs}
                HandleFormChange={HandleFormChange}
                placeholder="Email Address"
                name="email"
                required={false}
            />
           <FormInputComponent 
                formInputs={formInputs}
                HandleFormChange={HandleFormChange}
                placeholder="Phone Number"
                name="number"
                required={true}
            />

                <div className="flex gap-3 items-center">
                    <button className="bg-blue w-full md:w-[200px] p-4 text-gray-100 rounded-lg flex justify-center items-center gap-1 text-sm col-span-2 uppercase">
                        {
                            isSending ?
                            <>
                            <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> SENDING...
                            </>
                            
                            :
                            <>
                            Submit
                            <i className="bi bi-chevron-right"></i> 
                            </>
                        }
                    
                    </button>

                    <button className="border w-full md:w-[200px] p-4 text-gray-100 rounded-lg flex justify-center items-center gap-1 text-sm col-span-2 uppercase" onClick={() => {
                        setSelectedCourse(6)
                    }}>
                        Close
                    </button>

                </div>

        </form>
    </section>
  )
}

export default RegistrationForm


const FormInputComponent = ({formInputs, HandleFormChange, placeholder, name, required}) => (

    <div className="flex flex-col w-full">
        <div className="flex w-full overflow-hidden rounded-lg h-[7vh] bg-black bg-opacity-40">
            <div className="w-2 h-full bg-blue"></div>
            <input 
                type="text" 
                name={name}
                placeholder={placeholder} 
                value={formInputs[name].toUpperCase()}
                onChange={HandleFormChange}
                required={required}
                className="p-2 px-4 text-sm outline-none bg-transparent w-full text-white placeholder:text-gray-400" />
        </div>      
    </div>
)


const SelectInputComponent = ({formInputs, HandleFormChange, placeholder, name, data}) => {
    return(
        <div className="flex flex-col w-full">
        <div className="flex w-full overflow-hidden rounded-lg h-[7vh] bg-black bg-opacity-40">
            <div className="w-2 h-full bg-blue"></div>

            <select name="type" id=""
            className='p-2 px-4 text-sm outline-none bg-transparent w-full text-white focus:bg-black focus:bg-opacity-80'
            required value={formInputs[name]}
            onChange={HandleFormChange}
            >
                <option value="">{placeholder}</option>
                {data.map((d, i) => (
                    <option value={d} key={i}>{d}</option>
                ))}
            </select>
            
        </div>
        
    </div>
    )
}