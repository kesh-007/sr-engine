"use client"
import React, { useState } from 'react'
import { Button } from "@ui/components/ui/button"
import { ChangePasswordApi } from '@/server'
import toast, { Toaster } from 'react-hot-toast';

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

export default function  DialogDemo() {
    const [password,setpassword] = useState('')
  
  
    const Handleclick=async()=>{
      const response = await ChangePasswordApi(password)
      console.log(response,": ena iruku")
      if (response.message ==='Password changed successfully')
  
      {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUqSl2WR2tgn2eMTHnK9i0w4ezNS0MmGeYw&usqp=CAU"
                    alt="Profile"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    SR Engine
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Password changed succesfully
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
        
    
  
      }
  
    }
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
              <Input id="password"
              onChange={(e)=>setpassword(e.target.value)}
               defaultValue="****" type='password' className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={Handleclick}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  