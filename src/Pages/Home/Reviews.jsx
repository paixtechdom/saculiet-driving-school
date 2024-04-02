import { useEffect, useState } from "react";
import { ReviewsData } from "../../assets/Constants"
import { Parallax, ParallaxRight } from "../../Components/Parallax"

export const Reviews = () => {

    const [ currentReview, setCurrentReview ] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
          nextSlide('interval')
      }, 5000); 
      // Change slide every 3 seconds
      return () => clearInterval(interval);
    }, [currentReview]);
      
    const nextSlide = (curr) =>{
      if(curr == 'interval'){
        setCurrentReview(currentReview == ReviewsData.length - 1 ? 0 : currentReview + 1)
      }else{
        setCurrentReview(curr) 
      }
    }

    
    return(
        <div id='reviews' className="flex flex-col justify-center items-center w-full text-gray-900 py-9 border-t border-b bg-blue mt-9">
        <div className="justify-center xl:w-9/12 w-11/12 items-center transition-all duration-500 flex flex-col text-gray-200  gap-y-9 ">
        <h2 className="text-2xl w-full text-center ">WHAT PEOPLE SAY ABOUT US</h2>
        <div className="w-full overflow-hidde">
            <Parallax id={'review'}>
                <div className="flex items-cente justify-between bg-blue-90 transition-all duration-500" style={{
                    width: 400+'%',
                    transform: `translateX(-${currentReview *25}%)`
                }}>
                    {
                        ReviewsData.map((review, key) => (
                            <div key={key} className="flex w-full justify-center items-center text-center" style={{
                              width: 100+'%'  
                            }}>
                                <div className="w-11/12 md:w-8/12 flex flex-col justify-center items-center gap-1">

                                <p className="text-lg">{review.name}</p>
                                <div className="flex gap-3 items-center text-yellow-500 text-sm">
                                  <i className={`bi bi-star${review.rating > 0 ? '-fill' : ''}`}></i>
                                  <i className={`bi bi-star${review.rating > 1 ? '-fill' : ''}`}></i>
                                  <i className={`bi bi-star${review.rating > 2 ? '-fill' : ''}`}></i>
                                  <i className={`bi bi-star${review.rating > 3 ? '-fill' : ''}`}></i>
                                  <i className={`bi bi-star${review.rating > 4 ? '-fill' : ''}`}></i>
                                </div>
                                <p className="text-sm text-gray-300">{review.review}</p>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>                    

            </Parallax>
                      <ParallaxRight id='reviewBtn'>
                        <div className="flex justify-center items-center gap-3 mt-9">
                          {
                            ReviewsData.map((p, key) => (
                              <p key={key} className={`rounded-full cursor-pointer ${currentReview == key ? 'bg-gray-200' : 'border'}`} style={{
                                width: currentReview == key ? 17+'px' : 12+'px',
                                height: currentReview == key ? 17+'px' : 12+'px'
                              }} 
                              onClick={() => {setCurrentReview(key)}}></p>
                            ))
                          }
                        </div>

                      </ParallaxRight>
                </div>
        </div>
    </div>
    )
}