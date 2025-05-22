import React, { useContext, useEffect, useState } from 'react'
import { Card } from '../../Components/Card'
import img from "../../assets/images/images (19).jpeg"
import { CoursesList, NarrowedCourses } from '../../assets/Constants'
import { EachCourse } from './EachCourse'
import RegistrationForm from './RegistrationForm'
import { AppContext } from '../../assets/Contexts/AppContext'

const Courses = () => {
  const { selectedCourse } = useContext(AppContext)
  // show all courses and their outlines
  // register for a course

  

  return (
    <main className='w-full flex flex-col items-center justify-center'>
      
      <Card id={'award'} header={['Our Training Programs']} 
        text={["We offer a top-notch Drivers Education Program, which consists of theory and practical training. We also focus and place emphasis on the student driver’s behavior and attitudes. Moreover, we also develop the concept of safety and courtesy while driving."
        ]}  
        img={img} buttonIcon={'arrow-down'}/>
      
      <div className="w-11/12 lg:w-10/12 flex flex-col">


        <div className="flex flex-col gap-[20vh] relative">        

          {
            CoursesList.map((course, key) => (
              <EachCourse 
                course={course}
                key={key}
                i={key}
              />
            ))
          }
        
        {
          selectedCourse < CoursesList.length &&
          <RegistrationForm />
        }



        </div>

      </div>
       
    </main>
  )
}


export default Courses