"use client"
import React from 'react'
import { HeaderComponent } from '../components/header'
import TimeLine from '../components/VerticalTimeline'

const Page = () => {
  return (
    <div>
        <title>Dashboard || SR Engine</title>
        <div className='flex justify-between p-4'>
        <p className='text-2xl poppins-text font-bold'>

            <img 
            src={`https://firebasestorage.googleapis.com/v0/b/kraftcode-6e365.appspot.com/o/images%2Flogo%20(1).png?alt=media&token=e10d1c04-abfa-4bfd-8261-f335206489d7`}
            className='w-[6rem] h-[3rem] object-fill'
            alt='logo'
            />
        </p>
        <HeaderComponent/>
        <p></p>
        </div>
        <TimeLine/>

        
        
    </div>
  )
}

export default Page