import { useState } from "react"
import { PrimaryButton } from "../../Components/Button"

export const EachCourse = ({course}) => {
    const [ showOutline, setShowOutline ] = useState(false)
    return(
      <div className="flex flex-col lg:flex-row gap-3 relative">
  
          <div className="flex flex-col lg:w-7/12 pr-4 gap-2">
            <h2 className='text-2xl font-bold text-blue'>{course.title}</h2>
  
            <div className="flex flex-col">
              {course.categories.length > 1 &&
                <h3 className='font-bold mt-2 mb-1'>
                  Categories
                </h3>
              }
  
              <div className="flex justify-between gap-6 ">
              {
                course.categories.map((cat, i) => (
                  <div key={i} className="flex flex-col gap-1 bg-gray-50 w-full p-3 rounded-xl shadow">
                    {
                      course.categories.length > 1 &&
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-sec rounded-full"></div>
                        <h5 className='text-blue font-bold'>{cat.title}</h5>
                      </div>
                    }
                    <div className="flex flex-col gap-1 text-[15px]">
                      <p className=''>Duration: {cat.duration}</p>
                      <p>Price: #{cat.cost}</p>
                    </div>
                  </div>
                ))
              }
              </div>
            </div>
  
          <div className="flex flex-col gap-5 bg-gray-50 rounded-xl p-4 w-full shadow-xl mt-4">
            <div className="flex items-center gap-3 justify-between cursor-pointer"  onClick={() => setShowOutline(!showOutline)}>
              <p className='font-bold'>
                {showOutline ? "Hide " : "View"} Course Outline
              </p>
              <p className='cursor-pointer bg-gray-200 rounded-full w-8 flex items-center justify-center'>
              {
                showOutline ?
                <i className="bi bi-chevron-up text-lg"></i>:
                <i className="bi bi-chevron-down text-lg mt-1"></i>
                
              }
              </p>
            </div>
  
            {
              showOutline &&
              <div className='flex flex-col gap-3 mb-4'>
                {
                  course.outline.map((c, key) => (
                    <div key={key} className="flex gap-1 items-center">                 
                      <i className="bi bi-circle-fill text-blue scale-[0.7] opacity-50"></i>
                      <p className="text-black whitespace-normal break-word">{c}</p>
                    </div>
                  ))
                }
              </div>
            }
  
          </div>
            
            <PrimaryButton
              icon={'chevron-right'} 
              text="Register"
              btnClas={"mt-5"}
            />
          </div>
  
  
  
          <div className="flex items-center justify-between w-full lg:w-8/12 lg:h-[40vh] sticky top-52">  
            <img src={course.img} alt="" />
          </div>
  
  
      </div>
    )
  }