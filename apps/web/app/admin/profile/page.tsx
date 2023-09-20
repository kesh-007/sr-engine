"use client"
import React from 'react'
import { Button } from "@ui/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog"
import { Input } from "@ui/components/ui/input"
import { Label } from "@ui/components/ui/label"
import Navbar from '@/app/components/navbar'
import Welcome from '../../../assets/undraw_welcome.svg'
import Image from 'next/image'

 function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Passsword
            </Label>
            <Input id="password" defaultValue="****" type='password' className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




const Page = () => {
  return (
    <div>
      <Navbar/>
      <div className='h-[50vh]'>
      <Image
        src={Welcome}
        alt="welcome"
        style={{
          width:'100%',
          height:'100%',
          objectFit:'contain'

        }}
        
      />
      </div>
      <div className='flex  justify-center gap-4'>

      <img
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUqSl2WR2tgn2eMTHnK9i0w4ezNS0MmGeYw&usqp=CAU'
  width={200}
  height={200}
  alt='Profile'
  className="rounded-full border-2 border-black"
/>
<div className='mt-[4rem]'>
<DialogDemo/>
</div>

      </div>
    </div>
  )
}

export default Page