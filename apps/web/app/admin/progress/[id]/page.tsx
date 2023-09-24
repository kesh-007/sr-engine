"use client"
import React from 'react'

const Page = ({params}) => {
    console.log(params.id,'val\n\n')
  return (
    <div>{params.id}</div>
  )
}

export default Page