import { Card, CardImageOverlay } from "../../Components/Card"
import { useContext } from "react"
import { AppContext } from "../../assets/Contexts/AppContext"
import car from "../../assets/images/IMG_20200210_095940.jpg"
import award from "../../assets/images/award.jpg"
import international from "../../assets/images/gettyimages-78465904-612x612.jpg"
import trailer from "../../assets/images/trailer.jpg"
import { useEffect } from "react"
import { Values } from "./Values"
import { Services } from "./Services"
import { Numbers } from "./Numbers"
import { Reviews } from "./Reviews"
import { PictureList } from "../Gallery/PictureList"
import { Helmet } from "react-helmet-async"
import { SHero } from "./SHero"

export const Home = () => {
  const { setCurrentNav, dbLocation } = useContext(AppContext)
    useEffect(() => {
      setCurrentNav('Home')
      document.documentElement.scrollTop = 0
    }, [])
    
    return(
        <div id='Home' className=" w-full overflow-hidden ">
          <Helmet>
            <title>
              Home - Saculiet Driving School
            </title>
          </Helmet>
          <div className="section h-screen mt-9">
            {/* <Hero />   */}
            <SHero />
          </div>
     
          <Values />
          <Numbers />
          <div className="section">

            <Services />
          </div>

          <section className="section">
            Courses
          </section>

          <CardImageOverlay header1={'International and'} header2={' Local Clients'} text={["Whether it's international partners seeking global solutions or local connections seeking personalized services, our commitment remains unwavering", "At the crossroads of international and local expertise, we prioritize client satisfaction, delivering tailored solutions to meet the unique needs of every individual and organization we serve"]} buttonText={'GET STARTED'} buttonLink={'Contact'} img={international} img2={trailer} buttonIcon={'arrow-down'} />

            
          <Card id={'About'} header={['Top', ' Driving School ',' of The Year']} text={['Saculiet Nigeria Enterprises as the Top Driving School of the Year in Lagos State', 'TNNBP AWARD: Top Notch Nigeria Business & Professional Award', 'We are dedicated to transforming students into professionals, instilling confidence and competence for a lifetime of safe and enjoyable driving experiences']} buttonText={'GET  now'} buttonLink={'Contact'} img={award} buttonIcon={'arrow-down'}/>

          <Reviews />
          <Card header={['Book a training session now']} text={['Get started by booking a training session.', 'Adult, Private or Teens lesson, all available for your convenience.']} buttonText={'GET STARTED now'} buttonLink={'Contact'} img={car} buttonIcon={'arrow-down'}/>

          {/* reviews, google map */}
          <PictureList type={'home'}/>
        </div>
    )
}