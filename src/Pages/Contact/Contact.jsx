import React, { useContext, useEffect } from 'react'
import { ContactForm } from '../../Components/Forms'
import { AppContext } from '../../assets/Contexts/AppContext'

const Contact = () => {
  const { setCurrentNav } = useContext(AppContext)
  useEffect(() => {
    document.documentElement.scrollTop = 0
    setCurrentNav(4)
  }, [])

  return (
    <main className='flex items-center justify-center w-full mt-[10vh]'>
         <div className="flex w-11/12">
                <ContactForm />
            </div>
    </main>
  )
}

export default Contact