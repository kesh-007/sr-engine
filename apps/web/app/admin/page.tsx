"use client"
import React,{useState} from 'react'
import { HeaderComponent } from '../components/header'
import TimeLine from '../components/VerticalTimeline'
import Welcome from '../../assets/undraw_dashboard.svg'
import Image from 'next/image'
import { Input } from '@ui/components/ui/input'
import { data } from '@/app/components/data';
import { Button } from '@ui/components/ui/button'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Page = () => {

  const generatePdf = () => {

    const doc =new jsPDF();
    doc.setFontSize(14);
    doc.text("Top Performers",10,10)
    const columns = [
      "#",
      "Name",
      "Regn Num",
      "Branch",
      "Batch\/Section",
      "Batch",
    ];
    const tabledata = data.slice(0,count).map((item, index) => {
      return [
        item["#"],
        item["Name"],
        item["Regn Num"],
        item["Branch"],
        item["Batch\/Section"],
        item["Batch"],
  
      ];
    });
  //@ts-ignore
    doc.autoTable({
      head: [columns], // Table header
      body: tabledata, // Table rows
      startY:   20, // Start the table below the heading and subheading
    });
    doc.save('toppers-list.pdf');


  }
  const [count,setcount]= useState(5)
  return (
    <div className='scrollbar '>
        <title>Dashboard || SR Engine</title>
        <div className='flex justify-between p-4 '>
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
        <div className='flex '> 
        <div className='w-[30rem]'>
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
      <div>
      <div className='flex flex-col'>
        <p className='mb-2 font-bold text-xl'>Top Performers</p>
        <div className='flex gap-5 px-3'>

          <Input type='number' onChange={(e)=>setcount(Number(e.target.value))}
          placeholder='Count...'
          className='w-1/3 mb-4'
          />
                  <Button onClick={generatePdf} variant='outline'>Export</Button>
                  </div>


    <table className=" divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Branch
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Section
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Batch
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(0, count).map((datum, index) => (
            <tr key={datum.Name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Branch}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum['Batch/Section']}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum['Batch']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
      </div>
      </div>


        
        
  )
}

export default Page