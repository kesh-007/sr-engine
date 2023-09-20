"use client"
import React, { useEffect, useState } from 'react'
import {FC} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { data } from '@/app/components/data';
import { absent } from '@/app/components/absent';
import { HeaderComponent } from '@/app/components/header';
import { DataTableDemo } from '@/app/components/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@ui/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog"
import { useSession } from "next-auth/react"
import { Input } from '@ui/components/ui/input';



const Page = () => {

  const departmentCounts = {};
  const { data: session, status } = useSession()
  const [_status,_setstatus] = useState(false)
  const[count,setcount] = useState(5);
  useEffect(()=>{
    if (status === "authenticated") {
      _setstatus(true)
    }
  
  },[status])
  


data.forEach((person) => {
  const department = person["Branch"];
  if (departmentCounts[department]) {
    departmentCounts[department]++;
  } else {
    departmentCounts[department] = 1;
  }
});

// Convert the department counts into the desired format
const departmentData = Object.keys(departmentCounts).map((department) => ({
  name: department,
  dept: departmentCounts[department],
}));

const departmentaCounts = {};

// Loop through the data and count the persons in each department
absent.forEach((person) => {
  const department = person["Branch"];
  if (departmentCounts[department])
 { if (departmentaCounts[department]) {
    departmentaCounts[department]++;
  } else {
    departmentaCounts[department] = 1;
  }}
});

// Convert the department counts into the desired format
const departmentaData = Object.keys(departmentaCounts).map((department) => ({
  name: department,
  dept: departmentaCounts[department],
}));
const mergedData = Object.keys(departmentaCounts).map((department)=>({
  name:department,
  present:departmentCounts[department],
  absent:departmentaCounts[department],
}))

function DeptResults(dept: string) {
  const data_ = data.filter((key) => key["Branch"] === dept);
  const absent_ = absent.filter((key) => key["Branch"] === dept);

  const doc = new jsPDF('landscape');

  // Helper function to add heading and subheading
  function addHeading(heading, subheading) {
    doc.setFontSize(16);
    doc.text(heading, 10, yOffset);
    yOffset += 10;

    doc.setFontSize(12);
    doc.text(subheading, 10, yOffset);
    yOffset += 10;
  }

  let yOffset = 10;

  doc.text(`Dept ${dept}`, 10, yOffset);
  yOffset += 10;

  // Get unique sections and sort them in ascending order
  //@ts-ignore
  const uniqueSections = [...new Set(data_.map((item) => item["Batch/Section"]))];
  uniqueSections.sort(); // Sort sections in ascending order

  // Iterate over each section in ascending order
  for (const section of uniqueSections) {
    // Filter data for the current section
    const sectionData = data_.filter((item) => item["Batch/Section"] === section);

    // Filter absentData for the current section
    const sectionAbsentData = absent_.filter((item) => item["Batch/Section"] === section);

    // Add a heading and subheading for the section
    addHeading(`Section: ${section?section:"Lateral Entry"}`,  `Present: ${sectionData.length}`);

    // Define the table columns
    const columns = [
      "Number",
      "#",
      "Name",
      "Regn Num",
      "Branch",
      "Solved Count",
      "Score",
      "Resume Count",
      "Active Utilization"
      // Add other column headers...
    ];

    // Convert section-specific data into an array of arrays
    const tableData = sectionData.map((item, index) => {
      return [
        index + 1, // Number column
        item["#"],
        item["Name"],
        item["Regn Num"],
        item["Branch"],
        item["Solved Count"],
        item["Score"],
        item["Resume Count"],
        item["Active Utilization"],
        // Add other fields as needed...
      ];
    });

    // Generate the main table using JSPDF AutoTable
    //@ts-ignore
    doc.autoTable({
      head: [columns], // Table header
      body: tableData, // Table rows
      startY: yOffset + 10, // Start the table below the heading and subheading
    });

    // Calculate yOffset for the "Absent" table
    //@ts-ignore
    const mainTableHeight = doc.autoTable.previous.finalY - yOffset;
    yOffset += mainTableHeight + 20; // Add extra space between tables

    // Add a heading for the "Absent" table
    addHeading(`Absent - Section: ${section?section:"Lateral Entry"}`, `Absent: ${sectionAbsentData.length}`);

    // Define the table columns for the "Absent" table
    const absentColumns = [
      "Number",
      "Name",
      "Regn Num",
      "Branch",
      "Solved Count",
      "Total Submissions",
    ];

    const absentTableData = sectionAbsentData.map((item, index) => {
      return [
        index + 1,
        item["Name"],
        item["Regn Num"],
        item["Branch"],
        item["Solved Count"],
        item["Total Submissions"],
      ];
    });
//@ts-ignore
    doc.autoTable({
      head: [absentColumns], // Table header
      body: absentTableData, // Table rows
      startY: yOffset + 10, // Start the table below the heading and subheading
    });

    // Update the yOffset for the next section
    //@ts-ignore
    yOffset = doc.autoTable.previous.finalY + 10;
  }

  // Save or display the PDF
  doc.save(`results-${dept}.pdf`);
}



  function GenerateTopPerformers()
  {
    const doc =new jsPDF();
    doc.setFontSize(14);
    doc.text("Top Performers of daiytest-03-09-23(CSE,IT,AIDS,ECE) 2025 ",10,10)
    const columns = [
      "#",
      "Name",
      "Regn Num",
      "Branch",
      "Batch\/Section",
      "Solved Count",
      "Score",
    ];
    const tabledata = data.slice(0,count).map((item, index) => {
      return [
        item["#"],
        item["Name"],
        item["Regn Num"],
        item["Branch"],
        item["Batch\/Section"],
        item["Solved Count"],
        item["Score"],
  
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
  const generatePDF = () => {
    
    const doc = new jsPDF('landscape');

// Helper function to add heading and subheading
function addHeading(heading, subheading) {
  doc.setFontSize(16);
  doc.text(heading, 10, yOffset);
  yOffset += 10;

  doc.setFontSize(12);
  doc.text(subheading, 10, yOffset);
  yOffset += 10;
}

let yOffset = 10;

// Iterate over each branch
//@ts-ignore
for (const branch of [...new Set(data.map((item) => item["Branch"]))]) {
  // Filter data for the current branch
  const branchData = data.filter((item) => item["Branch"] === branch);

  // Filter absentData for the current branch
  const branchAbsentData = absent.filter((item) => item["Branch"] === branch);

  // Add a heading and subheading for the branch
  addHeading(`Branch: ${branch}`,  `Present: ${branchData.length}`);

  // Define the table columns
  const columns = [
    "Number",
    "#",
    "Name",
    "Regn Num",
    "Branch",
    "Solved Count",
    "Score",
    "Resume Count",
    "Active Utilization"
    // Add other column headers...
  ];

  // Convert branch-specific data into an array of arrays
  const tableData = branchData.map((item, index) => {
    return [
      index + 1, // Number column
      item["#"],
      item["Name"],
      item["Regn Num"],
      item["Branch"],
      item["Solved Count"],
      item["Score"],
      item["Resume Count"],
      item["Active Utilization"],

      // Add other fields as needed...
    ];
  });

  // Generate the main table using JSPDF AutoTable
  //@ts-ignore
  doc.autoTable({
    head: [columns], // Table header
    body: tableData, // Table rows
    startY: yOffset + 10, // Start the table below the heading and subheading
  });

  // Calculate yOffset for the "Absent" table
  //@ts-ignore
  const mainTableHeight = doc.autoTable.previous.finalY - yOffset;
  yOffset += mainTableHeight + 20; // Add extra space between tables

  // Add a heading for the "Absent" table
  addHeading(`Absent - Branch: ${branch}`, `Absent: ${branchAbsentData.length}`);

  // Define the table columns for the "Absent" table
  const absentColumns = [
    "Number",
    
    "Name",
    "Regn Num",
    "Branch",
    "Solved Count",
    "Total Submissions",

  ];

  const absentTableData = branchAbsentData.map((item, index) => {
    return [
      index + 1, 
      
      item["Name"],
      item["Regn Num"],
      item["Branch"],
      item["Solved Count"],
      item["Total Submissions"],

    ];
  });

  //@ts-ignore
  doc.autoTable({
    head: [absentColumns], // Table header
    body: absentTableData, // Table rows
    startY: yOffset + 10, // Start the table below the heading and subheading
  });

  // Update the yOffset for the next section
  //@ts-ignore
  yOffset = doc.autoTable.previous.finalY + 10;
}

// Save or display the PDF
doc.save('results.pdf');

    };
    const[name,setname] = useState('')
    const[show,setshow] = useState(false)
    function ViewDetails(name:string)
    {
      setname(name)
      setshow(true)

    }

  return (
    <div className='overflow-hidden max-md:overflow-scroll'> 
              <title>Summary || SR Engine</title>
        <div className='flex justify-between p-4'>
        <p className='text-2xl poppins-text font-bold'>

            <img 
            src={`https://firebasestorage.googleapis.com/v0/b/kraftcode-6e365.appspot.com/o/images%2Flogo%20(1).png?alt=media&token=e10d1c04-abfa-4bfd-8261-f335206489d7`}
            className='w-[6rem] h-[3rem] object-fill'
            alt='logo'
            />
        </p>
       {_status && <HeaderComponent/>}
        <p></p>
        </div>
<div className='p-4'>
  <div className='flex justify-between max-md:flex-col'>
    <div className='flex flex-col'>
      <p className='mb-2 font-bold text-xl'>
        dailytest-03-07-23(CSE,IT,AIDS)2025
        <Button onClick={generatePDF} variant='outline' className='ml-1'>
          Export
          </Button>
        </p>
    <BarChart width={730} height={250} data={departmentData} className='max-md:hidden'>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="dept" fill="#8884d8" />
</BarChart>
<h1 className='font-bold text-xl '>Absent List</h1>
<BarChart width={730} height={250} data={departmentaData} className='max-md:hidden'>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="dept" fill="#FF6263" />
</BarChart>

</div>
      <div className='flex flex-col'>
        <div className='flex justify-between px-3'>
        <p className='mb-2 font-bold text-xl'>Top Performers</p>
        <Button variant='outline'
        onClick={GenerateTopPerformers}
        >Export Top Performers</Button>
        </div>
          <Input type='number' onChange={(e)=>setcount(Number(e.target.value))}
          placeholder='Count...'
          className='w-1/3 mb-4'
          />
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(0, count).map((datum, index) => (
            <tr key={datum.Name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Branch}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum['Batch/Section']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
  <div className='mt-4'>

    
     <table className=" w-full bg-gray-50">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
              Number
            </th>
            <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
              Present
              
            </th>
            <th scope="col" className="px-6 py-3 text-left  font-medium text-gray-500 uppercase tracking-wider">
              Absent
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mergedData.map((datum, index) => (
            <tr key={index}>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{datum.name}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{datum.present}</td>
              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">{datum.absent}</td>
              <td>
              <div className='flex justify-center items-center'>
              <Button variant='outline' className='mt-4' onClick={()=>ViewDetails(datum.name)}>View</Button>
              </div>
              </td>
              <div className='flex justify-center items-center'>
              <Button variant='outline' className='mt-4' onClick={()=>DeptResults(datum.name)}>Export</Button>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
   
    {show && <DialogDemo dept={name}/>}
  </div>
  </div>

    </div>
  )
}

interface DialogDemoProps {
  dept: string; // Specify the type for the 'dept' prop
}


 function DialogDemo(props:DialogDemoProps) {
  const result = data.filter((item)=>item.Branch===props.dept)
  const absents = absent.filter((item)=>item.Branch===props.dept)
  return (
    <div>
    <h1 className='text-2xl font-bold'>Department {props.dept}</h1>
    <h1>Attended {result.length}</h1>
      
            <DataTableDemo data={result}/>
            <h1 className='text-xl font-bold'>Absent List {absents.length}</h1>
            <DataTableDemo data={absents}/>
    </div>
       
  )
}




export default Page