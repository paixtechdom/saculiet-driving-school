import { useState, useEffect } from 'react'
import { CircleLoader, GridLoader, DotLoader, ClimbingBoxLoader } from 'react-spinners';
import  ClipLoader  from 'react-spinners/ClipLoader';
import './assets/Styles/index.css';
import './assets/Styles/Animation.css';
import { createBrowserRouter, RouterProvider, Outlet, Link, useNavigate } from 'react-router-dom';
import { AppContext } from './assets/Contexts/AppContext'
import { Home } from './Pages/Home/Home';
import { Nav } from './Components/Nav';
import { Footer } from './Components/Footer';
import { Loading } from './Components/Loading';
import { Alert } from './Components/Alert';
import { Request } from './Pages/Request/Request';
import { Gallery } from './Pages/Gallery/Gallery';
import { HelmetProvider } from 'react-helmet-async';
import { db } from './assets/Constants';
import { ZoomedImage } from './Components/ZoomedImage';
import { PictureList } from './Pages/Gallery/PictureList';
import { VideoList } from './Pages/Gallery/VideoList';

const Layout = () =>{
  const url = document.baseURI
  const [ currentNav, setCurrentNav ] = useState(0)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ showAlert, setShowAlert ] = useState(false)
  const [ alertType, setAlertType ] = useState('success')
  const [ alertMessage, setAlertMessage ] = useState([])
  const [ showZoom, setShowZoom ] = useState(false)
  const [ displayPics, setDisplayPisc ] = useState(true)
  const [ imageSource, setImageSource ] = useState('')
  const  dbLocation = db


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [])
  return(
    <div className='app overflow-hidden'>
      <HelmetProvider>
        <AppContext.Provider value={{currentNav, setCurrentNav, dbLocation, alertType, setAlertType, alertMessage, setAlertMessage, showAlert, setShowAlert, showZoom, setShowZoom, imageSource, setImageSource, displayPics, setDisplayPisc }}> 
        <Nav currentNav={currentNav} setCurrentNav={setCurrentNav}/>  
            {
              isLoading ? 
              <Loading /> : 
              <>
                <Outlet />
                {
                  showZoom ?  
                  <ZoomedImage /> : ''
                }
                <Footer />

              </>
            }
            <Alert />
          </AppContext.Provider>

      </HelmetProvider>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        path: '/',
        element: <Home /> 
      },
      {
        path: '/Gallery',
        element: <Gallery /> 
      },
      {
        path: '/Gallery/Pictures',
        element: <PictureList /> 
      },
      {
        path: '/Gallery/Videos',
        element: <VideoList /> 
      },
      {
        path: '/certificate_verification',
        element: <Request /> 
      },
      {
        path: '/*',
        element: <div className='mt-9 w-full bg-gray-200 flex flex-col items-center justify-center h-96'>
        <i className="bi bi-exclamation-circle-fill text-5xl text-blue mb-3"></i>
        <p className="text-xl">
          Page not found 
        </p>

        <Link className='mt-9 text-white bg-blue p-3 text-sm px-8 rounded-xl ' to='/'>HOME PAGE</Link>
      </div>
      }
    ]
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} /> 
    </div>
  );

}


export default App;

