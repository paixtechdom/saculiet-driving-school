import { Card, CardImageOverlay } from "../../Components/Card"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
import car from "../../assets/images/IMG_20200210_095940.jpg"
import about from "../../assets/images/gettyimages-1335863186-612x612.jpg"
import why from "../../assets/images/gettyimages-813079014-612x612.jpg"
import international from "../../assets/images/gettyimages-78465904-612x612.jpg"
import { useEffect } from "react"
import { PrimaryButton } from "../../Components/Button"
import { Values } from "./Values"
import { Hero } from "./Hero"
import { Services } from "./Services"
import { Numbers } from "./Numbers"
import { Reviews } from "./Reviews"
import { PictureList } from "../Gallery/PictureList"
import { Helmet } from "react-helmet-async"

export const Home = () => {
  const { setCurrentNav, dbLocation } = useContext(AppContext)
    useEffect(() => {
      setCurrentNav('Home')
      document.documentElement.scrollTop = 0
    }, [])
    
    return(
        <div id='Home' className=" w-full overflow-hidden">
          <Helmet>
            <title>
              Home - Saculiet Driving School
            </title>
          </Helmet>
          <div className="section h-screen mt-9">
            <Hero />  
          </div>
     
          <Values />
          <div className="section">
            <Card id={'About'} header={'About Saculiet Driving School'} text={['An accredited driving training institute approved by FRSC, where we impart the art of driving and instill the paramount importance of safe driving', ' Our mission is to not only save lives and protect properties but also to nurture individuals into professionals confidently navigating the roads with their own steering mastery.', 'Give us a try today and testify']} buttonText={'GET STARTED'} buttonLink={'Contact'} img={`${dbLocation}/images/IMG-20240131-WA0009.jpg`} buttonIcon={'arrow-down'}/>
          </div>
          <Numbers />

          <Card header={'Why Choose Saculiet Driving School?'} text={['We are an approved driving training institute by the FRSC, ensuring the highest standards of safety and excellence', 'Beyond steering mastery, we prioritize the art of driving and emphasize the critical importance of safe driving, creating responsible and skilled drivers.', 'Our goal extends beyond obtaining a license; we are dedicated to transforming students into professionals, instilling confidence and competence for a lifetime of safe and enjoyable driving experiences']} buttonText={'GET STARTED'} buttonLink={'Contact'} img={`${dbLocation}/images/IMG-20240114-WA0037.jpg`} buttonIcon={'arrow-down'}/>

          <CardImageOverlay header1={'International and'} header2={' Local Clients'} text={["Whether it's international partners seeking global solutions or local connections seeking personalized services, our commitment remains unwavering", "At the crossroads of international and local expertise, we prioritize client satisfaction, delivering tailored solutions to meet the unique needs of every individual and organization we serve"]} buttonText={'GET STARTED'} buttonLink={'Contact'} img={international} buttonIcon={'arrow-down'}/>

          <div className="section">

          <Services />
          </div>
          <Reviews />
          <Card header={'Book a training session now'} text={['Get started by booking a training session', 'Adult Lessons', 'Private Lessons', 'Teens Lessons']} buttonText={'GET STARTED'} buttonLink={'Contact'} img={car} buttonIcon={'arrow-down'}/>

          {/* reviews, google map */}
          <PictureList type={'home'}/>
        </div>
    )
}