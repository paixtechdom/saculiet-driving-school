import { useContext, useState } from "react"
import { PrimaryButton } from "../../Components/Button"
import { AppContext } from "../../assets/Contexts/AppContext"

export const EachCourse = ({course, i}) => {
  const { setSelectedCourse } = useContext(AppContext)

    const [ showOutline, setShowOutline ] = useState(false)
    return(
      <div className="flex flex-col lg:flex-row gap-3 relative">
  
          <div className="flex flex-col lg:w-7/12 pr-4 gap-2">
            <h2 className='text-2xl font-bold text-blue'>{course.title}</h2>
            <p className="text-gray-700 text-[15px]">{course?.desc}</p>
  
        {/* course categories */}
            <div className="flex flex-col">
              {course.categories.length > 1 &&
                <h3 className='font-bold mt-2 mb-1'>
                  Categories
                </h3>
              }
  
              <div className="flex flex-col gap-6 ">
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
                      {cat.desc && <div className="my-2 flex flex-col gap-1">
                        {cat?.desc.map((c, i) => <p key={i}>{c}</p>)}
                        </div>}

                      <p className='text-gray-800'>Duration: {cat.duration}</p>
                      <p className="text-gray-800">Price: #{cat.cost}</p>
                    </div>

                    <div onClick={() => {
                      setSelectedCourse({
                        index: i,
                        name: cat.name
                        })
                    }}>
                      <PrimaryButton
                        icon={'chevron-right'} 
                        text="Register"
                        btnClas={"mt-5"}
                        />
                    </div>
                  </div>
                ))
              }
              </div>
            </div>


            {/* course outline */}
  
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
          </div>
  
  
  
          <div className="fl ex items-c enter justify-bet ween w- full lg:w- 8/12 lg:h -[40vh] sticky top-[20vh] right-[10px] "> 
            <img src={course.img} alt="" />
          </div>
  
  
      </div>
    )
  }