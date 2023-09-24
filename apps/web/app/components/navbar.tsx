"use client"
import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './header'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const { data: session, status } = useSession()
  const [_status,_setstatus] = useState(false)
  useEffect(()=>{
       if (status === "authenticated") {
         _setstatus(true)
       }
     
     },[status])
   

  return (
    <div>
         <div>
      <title>Dashboard || SR Engine</title>
      <div className="flex justify-between p-4">
        <p className="text-2xl poppins-text font-bold">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/kraftcode-6e365.appspot.com/o/images%2Flogo%20(1).png?alt=media&token=e10d1c04-abfa-4bfd-8261-f335206489d7"
            className="w-[6rem] h-[3rem] object-fill"
            alt="logo"
          />
        </p>
        {_status && <HeaderComponent/>}
        <p></p>
      </div>
   
    </div>
    </div>
  )
}

export default Navbar