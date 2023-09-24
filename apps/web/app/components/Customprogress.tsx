"use client"
import React, { useState } from 'react'
import { Separator } from "@ui/components/ui/separator"
import { progress } from './progress'
import { Button } from '@ui/components/ui/button'
import { CustomTooltip } from './Tooltip'
import { CustomSheet } from './Sheet'


const Customprogress = () => {
    const [show,setShow] = useState(false)
    const data = progress


  return (
    <div>
      
        <div className='mx-[3rem]'>
            <h1 className='mt-3 text-xl font-bold'>Summary Details of Students</h1>
          {data.map((datum)=>(
                <div key={datum["Regn Num"]} className='w-2/3 flex justify-center flex-col align-center mb-2'>  
                <div className="space-y-1  mt-[1rem]">
                  <h1 className="text-xl font-medium leading-none mb-3"> {datum['Name']}</h1>
                  <div className='flex gap-3'>
                  <p className="text-sm text-muted-foreground">
                    Reg Number <span className='font-bold'>{datum["Regn Num"]}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Branch  <span className='font-bold'>{datum["Branch"]}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Section <span className='font-bold'>{datum["Batch\/Section"]}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Login <span className='font-bold'>{datum["Login"]}</span>
                  </p>
                  
                  
                  </div>
                  
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <CustomTooltip content={'Attended tests and score achieved'}>
                  <div className='text-green-500 bg-green-200 p-2 rounded-sm'> Attended {datum["PRESENT COUNT"]} Score {datum["Score"]}</div>
                  </CustomTooltip>
                  <Separator orientation="vertical" />
                  <CustomTooltip content={'Count of Absent in test'}>
                  <div className='text-red-500 bg-red-200 p-2 rounded-sm'>Absent {datum["ABSENT COUNT"]}</div>
                  </CustomTooltip>
                  <Separator orientation="vertical" />
                  <CustomSheet
  title="Questions"
  description="Make changes to your profile here. Click save when you're done."
  buttonText="Save changes"
  trigger={<Button variant='outline' onClick={()=>setShow(!show)}>View</Button>
}
>
<div>
  {datum['test-names'].map((key)=>(
    <div key={key.name}>
      <h1 className='font-bold'>{key.name}</h1>
      <h3 className='mt-2 mb-2 text-gray-500'>{key.descp}</h3>
      <h5 className={key.status==='present'?'bg-green-200 text-green-500 w-[3.9rem] text-center rounded-md':'bg-red-200 text-red-500 w-[3.9rem] text-center rounded-md '}>
        {key.status}

      </h5>
      <hr className='mt-2 mb-2'/>
      </div>
  ))}
</div>
</CustomSheet>


                </div>

                
              </div>
          
          ))}
    
            
        </div>
      
    
    </div>
  )
}

export default Customprogress