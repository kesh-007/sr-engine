import Navbar from '@/app/components/navbar'

import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@ui/components/ui/select"
import Customprogress from '@/app/components/Customprogress'

  
const page = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex gap-4'>
        <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="apple">2024</SelectItem>
          <SelectItem value="banana">2025</SelectItem>
          <SelectItem value="blueberry">2026</SelectItem>
          <SelectItem value="grapes">2027</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Departement" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Year</SelectLabel>
          <SelectItem value="apple">CSE</SelectItem>
          <SelectItem value="banana">AIDS</SelectItem>
          <SelectItem value="blueberry">BME</SelectItem>
          <SelectItem value="grapes">Civil</SelectItem>
          <SelectItem value="grapes">Mech</SelectItem>

        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
    <div>
      <Customprogress/>

          </div>


    </div>
  )
}

export default page