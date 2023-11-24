"use client"
import React, { useState,useEffect, ReactNode } from 'react'

import { Button } from "@ui/components/ui/button"
import { DataTableDemo } from "./table"
import { string } from 'zod';

export function TabsDemo(props) {
    const values = props.values;
    const [clicked, setclicked] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [branchcounts,setbranchcounts] = useState({}) 
    const [tablshow,setTableShow] = useState(false)
    const [dept,setdept] = useState('') 
    


    const handleButtonClick = (value) => {
        setSelectedValue(value); 
        setclicked(true); 
        const counts = {};
    
        value.forEach((ele) => {
            const branch = ele["Branch"];
            if (!counts[branch]) {
                counts[branch] = 0;
            }
            counts[branch]++;
        });
    
        
        const countsArray = Object.entries(counts).map(([department, count]) => ({ department, count }));
//@ts-ignore
        countsArray.sort((a, b) => b.count - a.count);
        
        const sortedCounts = countsArray.reduce((acc, { department, count }) => {
            acc[department] = count;
            return acc;
        }, {});
        
        console.log("Sorted Branch Counts", sortedCounts);
        
        setbranchcounts(sortedCounts);
        
    };
    
    return (
        <>
            <div className="flex gap-2 px-3">
                {values.map((value) => (
                    <div key={value.key} className="">
                        <Button
                            onClick={() => handleButtonClick(value.value)}
                            variant="secondary"
                        >
                            {value.key} solved {value.value.length}
                        </Button>
                    </div>
                ))}
            </div>
            {clicked && <div>
                <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Count
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {Object.entries<ReactNode>(branchcounts).map(([department, count]) => (
 
            <tr key={department}>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                {department}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                
                {count}
              </td>
              <td><Button 
              variant='ghost'
              onClick={()=>{
                setTableShow(true)
                setdept(department)
              }}>View</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

                
                 </div>}

                 {   tablshow &&             <DataTableDemo data={selectedValue.filter((val)=>val["Branch"]===dept)} />
                }
        </>
    );
}
