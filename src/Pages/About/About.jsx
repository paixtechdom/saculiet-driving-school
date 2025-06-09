import React, { useContext, useEffect } from 'react'
import { Card } from '../../Components/Card'
import { AppContext } from '../../assets/Contexts/AppContext'
import { Services } from '../Home/Services'
import ceoImage from "../../assets/images/saculiet ceo.jpg"
import { db } from '../../assets/Constants'

const About = () => {

    const { setCurrentNav } = useContext(AppContext)

    useEffect(() => {
      document.documentElement.scrollTop = 0
      setCurrentNav(1)
    }, [])

  return (
    <main>
      <div className="section">


      <Card id={'award'} header={['About', ' Saculiet Driving School']} 
        text={['An accredited driving training institute approved by FRSC, where we impart the art of driving and instill the paramount importance of safe driving', ' Our mission is to not only save lives and protect properties but also to nurture individuals into professionals confidently navigating the roads with their own steering mastery.', 
          "Saculiet Driving School was founded in Lagos State to provide professional driving course experience in diverse category of mobility. As one of the largest driving training schools in Lagos, Saculiet Driving School quickly became successful through dedication to safe driving techniques, and by tailoring the training curriculum to accommodate students’ driving needs.",
          'Give us a try today and testify']} 
        
        buttonText={'GET STARTED'} buttonLink={'contact'} img={`${db}/images/IMG-20240131-WA0009.jpg`} buttonIcon={'arrow-right'}/>
      </div>


      <Card id={'award'} header={['CHIEF EXECUTIVE OFFICER’S', ' MESSAGE']} 
        text={['We provide driving training services that comply with international standards & best practices.', 'The quality and professionalism of all Saculiet Driving School instructors is consistently maintained and further developed through an inhouse ‘Instructor Training Centre’ that keeps instructors updated with the latest information and training techniques within the international driving fraternity.',
          "Our Vision is to become the best version of ourselves on a daily bases and to see everyone safe behind the wheels."
        ]}  
        img={ceoImage} buttonIcon={'arrow-right'}/>
      

      <div className="section">

          <Services />
      </div>
              
      <Card header={['Why Choose', ' Saculiet Driving School?']} text={['We are an approved driving training institute by the FRSC, ensuring the highest standards of safety and excellence', 'Beyond steering mastery, we prioritize the art of driving and emphasize the critical importance of safe driving, creating responsible and skilled drivers.', 'Our goal extends beyond obtaining a license; we are dedicated to transforming students into professionals, instilling confidence and competence for a lifetime of safe and enjoyable driving experiences']} buttonText={'get started'} buttonLink={'contact'} img={`${db}/images/IMG-20240114-WA0037.jpg`} buttonIcon={'arrow-right'}/>
    </main>
  )
}

export default About