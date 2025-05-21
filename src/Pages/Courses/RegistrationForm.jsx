import React from 'react'
import { FormError  } from '../../Components/FormError'

const RegistrationForm = ({course}) => {
  return (
    <section className='fixed top-0 w-full bg-blue-900 bg-opacity-30 backdrop-blur-md h-screen left-0 z-[1000] flex items-center justify-center
    '>
          <form action="" className="flex justify-center align-center flex-col my-9 gap-9 md:gap-9 shadow-xl p-7 rounded-xl w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 py-8 bg-black bg-opacity-45">
            <h2 className='text-xl font-bold text-gray-200 uppercase'>Register for {course.title}</h2>

            <div className="flex flex-col w-full">
                <div className="flex w-full overflow-hidden border-bottom-primary">
                    <i className="bi bi-people-fill bg-sec text-gray-50 p-2"></i>
                    <input type="text" placeholder="Name of Organization" className="p-2 px-4 text-sm outline-none bg-gray-50 w-full" />
                </div>
                <FormError message={"errors.name?.message"}/> 
                
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full overflow-hidden border-bottom-primary">
                    <i className="bi bi-people-fill bg-sec text-gray-50 p-2"></i>
                    <input type="text" placeholder="Name of Organization" className="p-2 px-4 text-sm outline-none bg-gray-50 w-full" />
                </div>
                <FormError message={"errors.name?.message"}/> 
                
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full overflow-hidden border-bottom-primary">
                    <i className="bi bi-people-fill bg-sec text-gray-50 p-2"></i>
                    <input type="text" placeholder="Name of Organization" className="p-2 px-4 text-sm outline-none bg-gray-50 w-full" />
                </div>
                <FormError message={"errors.name?.message"}/> 
                
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full overflow-hidden border-bottom-primary">
                    <i className="bi bi-people-fill bg-sec text-gray-50 p-2"></i>
                    <input type="text" placeholder="Name of Organization" className="p-2 px-4 text-sm outline-none bg-gray-50 w-full" />
                </div>
                <FormError message={"errors.name?.message"}/> 
                
            </div>

        </form>
    </section>
  )
}

export default RegistrationForm