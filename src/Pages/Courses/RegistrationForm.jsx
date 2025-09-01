import React, { useContext, useEffect, useState } from 'react'
import { PrimaryButton } from '../../Components/Button'
import { AppContext } from '../../assets/Contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { NarrowedCourses } from '../../assets/Constants'
import axios from "axios"
import { ClipLoader } from "react-spinners"




const GetWeekdayDates = (dayOfWeek, weekInterval) => {
    const daysOfWeekMap = {"Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6};
    if (!(dayOfWeek in daysOfWeekMap)) {
        throw new Error("Invalid day of the week");
    }
    const formatDate = (date) => {
        const options = {day: 'numeric', month: 'long', year: 'numeric'}
        return date.toLocaleDateString('en-US', options)
    }

    let today = new Date(); let targetDay = daysOfWeekMap[dayOfWeek];
    // Find the next occurrence of the specified weekday
    let daysUntilTarget = (targetDay - today.getDay() + 7) % 7; let nextTargetDate = new Date();
    nextTargetDate.setDate(today.getDate() + daysUntilTarget);

    let datesArray = [];
    for (let i = 0; i < 4; i++) {
        let formattedTargetDate = formatDate(nextTargetDate); // Format as YYYY-MM-DD

        let afterIntervalDate = new Date(nextTargetDate);

        afterIntervalDate.setDate(afterIntervalDate.getDate() + (weekInterval * 7));

        let formattedAfterIntervalDate = formatDate(afterIntervalDate);

        datesArray.push({ weekday: formattedTargetDate, afterInterval: formattedAfterIntervalDate });

        // Move to the next occurrence of the weekday
        nextTargetDate.setDate(nextTargetDate.getDate() + 7);
    }

    return datesArray;
}


const RegistrationForm = () => {
    const { setShowAlert, setAlertMessage, setAlertType, setSelectedCourse, selectedCourse, formInputs, setFormInputs } = useContext(AppContext)
    
    const course = NarrowedCourses[selectedCourse.name]
    const date = GetWeekdayDates(course.day, course.interval)
    const dateOptions = date.map((d) => `${d.weekday} - ${d.afterInterval}`)


    const navigate = useNavigate()
    const [ isSending, setIsSending ] = useState(false)

    //  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNIvQCpJNrPms8jK6_SpEQ_Uz0YBFvL8HActvZBj1z8w5rE7bTq3ATSdgJ7ivEU9HsKA/exec"
     const BEST_SHEET_CONNECTION_URL = "https://api.sheetbest.com/sheets/7ccd4ca7-2dcf-4206-abd7-f45b256077a0"

     const today = new Date();
     const year = today.getFullYear();
     const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1, then pad with '0'
     const day = today.getDate().toString().padStart(2, '0'); // Pad with '0'
     const currentDate = `${year}-${month}-${day}`; 


     const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
    });


     const HandleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setShowAlert(false); // Hide previous alert

        if(formInputs.type == "Individual"){
            formInputs.companyName = ""
            formInputs.position = ""
        }

        formInputs.date= currentDate,
        formInputs.time= currentTime
      
        // console.log("Form Inputs:", formInputs);
        
        try {
        const response = await axios.post(
            BEST_SHEET_CONNECTION_URL,
            JSON.stringify(formInputs),
            {
            headers: {
                'Content-Type': 'application/json'
            }
            }
        );

        console.log("Response:", response.data);
        if (response.status === 200) {
            setShowAlert(true);
            setAlertType('success');
            setAlertMessage([response.data.message || 'Request Submitted successfully!']);
            
            navigate("/courses/payment")
        } else {
            setShowAlert(true);
            setAlertType('error');
            setAlertMessage([response.data.message || 'Failed to submit request.']);
        }
        } catch (error) {
        console.error("Error:", error);
        setShowAlert(true);
        setAlertType('error');
        // Provide more specific error messages if available from the error object
        if (error.response) {
            // Server responded with a status other than 2xx range
            setAlertMessage([`Server error: ${error.response.status} - ${error.response.statusText}`, JSON.stringify(error.response.data)]);
        } else if (error.request) {
            // Request was made but no response received (e.g., network error)
            setAlertMessage(['Network error: No response from server. Please check your internet connection or the server URL.']);
        } else {
            // Something else happened while setting up the request
            setAlertMessage([`Error setting up request: ${error.message}`]);
        }
        } finally {
        setIsSending(false);
        }
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

            <SelectInputComponent 
                formInputs={formInputs}
                HandleFormChange={HandleFormChange}
                placeholder="-- Start Date --"
                name="startDate"
                data={dateOptions}
            />

            <div className="flex gap-3 items-center">
                <button className="bg-blue w-full md:w-[200px] p-4 text-gray-100 rounded-lg flex justify-center items-center gap-1 text-sm col-span-2 uppercase" onSubmit={(e) => {
                    !isSending && HandleSubmit(e)
                }}>
                    {
                        isSending ?
                        <>
                        SENDING <ClipLoader color={'rgb(225, 225, 225)'} size={15} loading={true} speedMultiplier={0.5}/> 
                        </>
                        
                        :
                        <>
                        Submit
                        <i className="bi bi-chevron-right"></i> 
                        </>
                    }
                
                </button>

                <button className="border w-full md:w-[200px] p-4 text-gray-100 rounded-lg flex justify-center items-center gap-1 text-sm col-span-2 uppercase" onClick={() => {
                    setSelectedCourse({
                        index: 6
                    })
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
                value={formInputs[name]}
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

            <select name={name} id=""
            className={`p-2 px-4 text-sm outline-none bg-transparent w-full  focus:bg-black focus:bg-opacity-80 focus:text-white ${formInputs[name] !== "" ? "text-white" : "text-gray-400"}`}
            required 
            value={formInputs[name]}
            onChange={HandleFormChange}>
                <option value="">{placeholder}</option>
                {data.map((d, i) => (
                    <option value={d} key={i}>{d}</option>
                ))}
            </select>
            
        </div>
        
    </div>
    )
}







