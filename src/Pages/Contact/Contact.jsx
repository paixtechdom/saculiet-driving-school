import React from 'react'
import { ContactForm } from '../../Components/Forms'

const Contact = () => {
  return (
    <main className='flex items-center justify-center w-full mt-[10vh]'>
         <div className="flex w-11/12">
                <ContactForm />
            </div>
    </main>
  )
}

export default Contact