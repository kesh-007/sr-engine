"use client"
import { Metadata } from "next"
import React,{useState} from 'react'
import Image from "next/image"
import Link from "next/link"

import { cn } from "@ui/lib/utils"
import { Button, buttonVariants } from "@ui/components/ui/button"
import { signIn } from 'next-auth/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card"
import { Checkbox } from "@ui/components/ui/checkbox"
import { Input } from "@ui/components/ui/input"
import { Label } from "@ui/components/ui/label"
import { useRouter } from "next/router"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
   // const router = useRouter()
    const [email,setemail] = useState('')
const [password,setpassword] = useState('')
const[iserror,seterror] = useState(false)
const handleLogin = async (e) => {
    seterror(false)
    
    e.preventDefault();
    const result = await signIn('credentials', {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/admin",

    });
    console.log("\n\n result",result)

    if (!result.error) {
        //router.push('/admin')
        
      // Handle successful login, e.g., redirect to dashboard
    } else {
      // Handle login error
      console.error(result.error);
      alert("error da")
      seterror(true)
    }
  };

  return (
    <>

      <div className="container relative  h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            SR Engine
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Streamline your workflow with our result automation platform&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg md:max-w-md sm:max-w-sm ">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl text-center">
                    Sign in
                  </CardTitle>
                  <CardDescription className="text-center">
                    {iserror && <h1 className="bg-red-500 text-white px-2">Email password mismatch</h1>}
                    Enter your email and password to login
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="" name="email" onChange={(e)=>setemail(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password"  onChange={(e)=>setpassword(e.target.value)}/>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full" onClick={handleLogin}>Login</Button>
                  <p className="mt-2 text-xs text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <span className=" text-blue-600 hover:underline">
                      Sign up
                    </span>
                  </p>
                </CardFooter>
              </Card>
            

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
