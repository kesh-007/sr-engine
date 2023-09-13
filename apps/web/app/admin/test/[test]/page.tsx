"use client"
import React from 'react'
import {FC} from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { data } from '@/app/components/data';
import { absent } from '@/app/components/absent';
import { HeaderComponent } from '@/app/components/header';


interface pageProps {
  params:{test:string}
}

const page = ({params}) => {
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
  addHeading(`Branch: ${branch}`, 'Some description or date');

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
  addHeading(`Absent - Branch: ${branch}`, 'Some description or date');

  // Define the table columns for the "Absent" table
  const absentColumns = [
    "Number",
    
    "Name",
    "Regn Num",
    "Branch",
    "Solved Count",
    "Total Submissions",

    // Add other column headers...
  ];

  // Convert branch-specific absentData into an array of arrays
  const absentTableData = branchAbsentData.map((item, index) => {
    return [
      index + 1, // Number column
      
      item["Name"],
      item["Regn Num"],
      item["Branch"],
      item["Solved Count"],
      item["Total Submissions"],
      // Add other fields as needed...
    ];
  });

  // Generate the "Absent" table using JSPDF AutoTable
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
doc.save('customized_table.pdf');

    };

  return (
    <div> 
              <title>Summary || SR Engine</title>
        <div className='flex justify-between p-4'>
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
<div className='p-4'>
  <div className='flex justify-between'>
    <p>Graph overall performance</p>
    <p>Top performers of the test with select option</p>

  </div>
  <div className='mt-4'>
    <select>
      <option>Depts</option>
    </select>
    <p>Table of results</p>
    <p>Table of absentence</p>
  </div>
  </div>

    </div>
  )
}

export default page