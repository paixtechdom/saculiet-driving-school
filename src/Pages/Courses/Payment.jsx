import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../assets/Contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { CoursesList, NarrowedCourses } from '../../assets/Constants'

const accounts = {
    name: "Saculiet Global Ventures",
    general: {
        number: "1027124995",
        bank: "United Bank of Africa (UBA)",
        icon: "",
    },
    forklift: {
        number: "0097850297",
        bank: "Sterling Bank",
        icon: "",
    }
}



export const Payment = () => {
    const { selectedCourse, formInputs } = useContext(AppContext)
    
    const course = NarrowedCourses[selectedCourse.name]


    const navigate = useNavigate()
    useEffect(() => {
        document.documentElement.scrollTop = 0
        if(selectedCourse.index == 6){
            navigate("/courses")
        }
    }, [])
    const date = new Date()
    const currentDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
  return (
    <main className='w-full center mt-[15vh] '>
        <div className="flex flex-col gap-3 w-11/12 lg:w-10/12 xl:w-9/12">

        <h1 className='font-bold text-xl uppercase'>Details</h1>

        <div className="flex flex-col gap-3">
            <InfoComponent 
                title={"Full Name"}
                info={formInputs?.fullName}
            />
            <InfoComponent 
                title={"Phone Number"}
                info={formInputs?.number}
            />
            <InfoComponent 
                title={"Course Title"}
                info={course?.title}
            />
            <InfoComponent 
                title={"Amount"}
                info={course?.price}
            />
            <InfoComponent 
                title={"Training Date"}
                info={formInputs?.startDate}
            />
            <InfoComponent 
                title={"Duration"}
                info={course?.duration}
            />
            <InfoComponent 
                title={"Date Of Payment"}
                info={currentDate}
            />
        </div>


        <h1 className='font-bold text-xl mt-8'>Proceed to Payment</h1>
        <div className="flex flex-col gap-3">
            <p>
                Kindly make payment via bank transfer and forward your receipt to the whatsapp account below or Pay with cash at our office
            </p>
            
            <div className="flex flex-col gap-2 bg-gray-100 rounded-xl p-6 shadow-xl w-full lg:w-fit">
                <InfoComponent 
                    title={"Account Name"}
                    info={accounts.name}
                />
                <InfoComponent 
                    title={"Bank Name"}
                    info={selectedCourse.name == "forklift" ? accounts.forklift.bank : accounts.general.bank}
                />
                <InfoComponent 
                    title={"Account Number"}
                    info={selectedCourse.name == "forklift" ? accounts.forklift.number : accounts.general.number}
                />
            </div>
        </div>
        </div>
    </main>
  )
}


const InfoComponent = ({title, info}) => (
        <div className="flex items-center gap-2">
            <h4 className='text-sm font-bold text-gray-600'>{title}: </h4>
            <p className=''>{info}</p>
        </div>
)