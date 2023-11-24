"use client"
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { HeaderComponent } from '@/app/components/header';
import { DataTableDemo } from '@/app/components/table';
import { Skeleton } from "@ui/components/ui/skeleton"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@ui/components/ui/button';
import { useSession } from "next-auth/react"
import { Input } from '@ui/components/ui/input';
import { TestDetailsApi } from '@/server';
import { HoverCardDemo } from '@/app/components/Hovercard';
import { TabsDemo } from '@/app/components/Tabs';
import { CustomSheet } from '@/app/components/Sheet';


const Page = ({params}) => {

  const departmentCounts = {};
  const [data,setData] = useState([])
  const[absent,setAbsent] = useState([])
  const { data: session, status } = useSession()
  const [_status,_setstatus] = useState(false)
  const [loading,setloading] = useState(false)
  const[count,setcount] = useState(5);
  const[solvedcount,setsolvedcount] = useState([])

  async function GetResults()
  {
    setloading(true)
    const results= await TestDetailsApi(decodeURIComponent(params.test))
    console.log( results,"Results")
    let counter = 1;

const newArray = results.students.map((obj) => ({
  ...obj,
  "#": counter++,
}));

const newArrayA = results.studentAbsents.filter((objA) =>
  newArray.some((objB) => objB["Branch"] === objA.Branch)
).map((objA) => ({ ...objA }));


    setData(newArray)
    setAbsent(newArrayA)
    const studentsByProgramCount = {};

newArray.forEach((student) => {
  const solvedCount = parseInt(student["Solved Count"], 10); 

  if (!isNaN(solvedCount)) {
    if (!studentsByProgramCount[solvedCount]) {
      studentsByProgramCount[solvedCount] = [];
    }
    studentsByProgramCount[solvedCount].push(student);
  }
});
const ResultArray = Object.keys(studentsByProgramCount).map((key) => ({
  key: parseInt(key, 10),
  value: studentsByProgramCount[key],
}));

setsolvedcount(ResultArray)

    setloading(false)
  }

  useEffect(()=>{
 GetResults()
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




const departmentaCounts = {};


absent.forEach((person) => {
  const department = person["Branch"];
  if (departmentCounts[department])
 { if (departmentaCounts[department]) {
    departmentaCounts[department]++;
  } else {
    departmentaCounts[department] = 1;
  }}
});

const filteredData1 = absent.filter((person) => {
  const department = person["Branch"];
  return departmentCounts[department] > departmentaCounts[department];
});
const remainingData = data.filter((person) => {
  const department = person["Branch"];
  return departmentCounts[department] >= departmentaCounts[department];
});

console.log("Filtered data",filteredData1)
const daCounts= {}
filteredData1.forEach((person) => {
  const department = person["Branch"];
  
  if (daCounts[department])
 { 
    daCounts[department]++;
  } else {
    daCounts[department] = 1;
  }
});


const dpCounts= {}
remainingData.forEach((person) => {
  const department = person["Branch"];
  
  if (dpCounts[department])
 { 
    dpCounts[department]++;
  } else {
    dpCounts[department] = 1;
  }
});
const departmentData = Object.keys(dpCounts).map((department) => ({
  name: department,
  dept: departmentCounts[department],
}));

console.log("Da coins",daCounts);
const departmentaData = Object.keys(daCounts).map((department) => ({
  name: department,
  dept: departmentaCounts[department],
}));








const filteredData = data.filter((person) => {
  const department = person["Branch"];
  return departmentCounts[department] < departmentaCounts[department];
});


console.log("Data \n \n \n",filteredData[0])




const mergedData = Object.keys(daCounts).map((department)=>({
  name:department,
  present:departmentCounts[department],
  absent:departmentaCounts[department],
}))

function DeptResults(dept: string) {
  const data_ = remainingData.filter((key) => key["Branch"] === dept);
  const absent_ = filteredData1.filter((key) => key["Branch"] === dept);

  const doc = new jsPDF('landscape');

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

  //@ts-ignore
  const uniqueSections = [...new Set(data_.map((item) => item["Batch/Section"]))];
  uniqueSections.sort(); 

  for (const section of uniqueSections) {
    const sectionData = data_.filter((item) => item["Batch/Section"] === section);

    const sectionAbsentData = absent_.filter((item) => item["Batch/Section"] === section);

    addHeading(`Section: ${section?section:"Lateral Entry"}`,  `Present: ${sectionData.length}`);

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
      ];
    });

    //@ts-ignore
    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: yOffset + 10,
    });

    //@ts-ignore
    const mainTableHeight = doc.autoTable.previous.finalY - yOffset;
    yOffset += mainTableHeight + 20; 

    addHeading(`Absent - Section: ${section?section:"Lateral Entry"}`, `Absent: ${sectionAbsentData.length}`);

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
      head: [absentColumns],
      body: absentTableData,
      startY: yOffset + 10, 
    });

    //@ts-ignore
    yOffset = doc.autoTable.previous.finalY + 10;
  }

  doc.save(`results-${dept}.pdf`);
}



  function GenerateTopPerformers()
  {
    const doc =new jsPDF();
    doc.setFontSize(14);
    doc.text(`${params.test}`,10,10)
    const columns = [
      "#",
      "Name",
      "Regn Num",
      "Branch",
      "Batch\/Section",
      "Solved Count",
      "Score",
    ];
    const tabledata = remainingData.slice(0,count).map((item, index) => {
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
      head: [columns], 
      body: tabledata, 
      startY:   20,
    });
    doc.save('toppers-list.pdf');

  
  


  }
  const generatePDF = () => {
    
    const doc = new jsPDF('landscape');

function addHeading(heading, subheading) {
  doc.setFontSize(16);
  doc.text(heading, 10, yOffset);
  yOffset += 10;

  doc.setFontSize(12);
  doc.text(subheading, 10, yOffset);
  yOffset += 10;
}

let yOffset = 10;

//@ts-ignore
for (const branch of [...new Set(data.map((item) => item["Branch"]))]) {
  const branchData = remainingData.filter((item) => item["Branch"] === branch);

  const branchAbsentData = filteredData1.filter((item) => item["Branch"] === branch);

  addHeading(`Branch: ${branch}`,  `Present: ${branchData.length}`);

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
  ];

  const tableData = branchData.map((item, index) => {
    return [
      index + 1, 
      item["#"],
      item["Name"],
      item["Regn Num"],
      item["Branch"],
      item["Solved Count"],
      item["Score"],
      item["Resume Count"],
      item["Active Utilization"],

    ];
  });

  //@ts-ignore
  doc.autoTable({
    head: [columns], 
    body: tableData, 
    startY: yOffset + 10, 
  });

  //@ts-ignore
  const mainTableHeight = doc.autoTable.previous.finalY - yOffset;
  yOffset += mainTableHeight + 20;

  addHeading(`Absent - Branch: ${branch}`, `Absent: ${branchAbsentData.length}`);

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
    head: [absentColumns], 
    body: absentTableData, 
    startY: yOffset + 10,
  });

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
        {decodeURIComponent(params.test)}
        <Button onClick={generatePDF} variant='outline' className='ml-1'>
          Export
          </Button>
          <HoverCardDemo one={remainingData.length} two={filteredData1.length}/>

        </p>
        {loading &&
          <div className='flex gap-4'>
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />


      </div>

        }
{ !loading &&   <BarChart width={730} height={250} data={departmentData} className='max-md:hidden'>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="dept" fill="#8884d8" />
</BarChart>}
<h1 className='font-bold text-xl '>Absent List</h1>
{loading &&
<div className='flex gap-4'>
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />
      <Skeleton className="h-[13rem] w-[6rem] rounded-md" />


      </div>

        }
{!loading && <BarChart width={730} height={250} data={departmentaData} className='max-md:hidden'>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="dept" fill="#FF6263" />
</BarChart>
}
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
          {loading &&
          <div className='space-y-4'>
      <Skeleton className="h-[3rem] w-full rounded-md" />
      <Skeleton className="h-[3rem] w-full rounded-md" />
      <Skeleton className="h-[3rem] w-full rounded-md" />
      <Skeleton className="h-[3rem] w-full rounded-md" />
      </div>


        }


    {!loading && <table className=" divide-y divide-gray-200">
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
          {remainingData.slice(0, count).map((datum, index) => (
            <tr key={datum.Name}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum.Branch}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{datum['Batch/Section']}</td>
            </tr>
          ))}
        </tbody>
      </table>}
      <CustomSheet
  title="Additional Students"
  description="The following students asked for test keys from others "
  buttonText="Close"
  trigger={<Button variant='outline' onClick={()=>{}}>Additional Students</Button>
}
>
<div>
  {
    filteredData.map((data)=>(
      <div>
        <p><strong>Name</strong>:{data["Name"]}</p>
        <p><strong>Reg Num</strong>: {data["Regn Num"]}</p>
        <p><strong>Branch</strong>:{data["Branch"]}</p>
        <p><strong>Section</strong>: {data["Batch\/Section"]}</p>
        <p><strong>Score</strong>: {data["Score"]}</p>
        <p><strong>Submissions</strong>: {data["Total Submissions"]}</p>
        <hr className='my-3'/>
        </div>
    ))
  }

</div>
</CustomSheet>

    </div>

  </div>
  <div className='mt-4'>

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
   
    {show && <DialogDemo dept={name} data={data} absent={absent}/>}
  </div>
  </div>
  <TabsDemo values={solvedcount}/>

  

    </div>
  )
}

interface DialogDemoProps {
  dept: string;
  data:any,
  absent:any
   // Specify the type for the 'dept' prop
}


 function DialogDemo(props:DialogDemoProps,) {
  const result = props.data.filter((item)=>item.Branch===props.dept)
  const absents = props.absent.filter((item)=>item.Branch===props.dept)
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