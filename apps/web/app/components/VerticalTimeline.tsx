"use client"

import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import { useState } from "react";

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default function TimeLine(){



    const [events , setEvents] = useState([
        {
          date: "2023-07-03",
          description: "dailytest-03-07-23(CSE,IT,AIDS)",
        },
        {
            date: "2023-07-03",
            description: "dailytest-03-07-23(MECH,MCT)",
          },
      ]);
    
      return (
        <div className="w-full rounded flex flex-col my-5 bg-gray-100 p-3">

            

            <VerticalTimeline>
      {
        events.map((event, index) => (
            <VerticalTimelineElement
            key={index}
            date={event.date}
            dateClassName="date"
            iconStyle={{ background: "#000", color: "#fff" }}
            contentStyle={{ textAlign: "left", paddingLeft: "2rem" }}            
            >
            <h3 className="vertical-timeline-element-title">{event.description}</h3>
            <p className="vertical-timeline-element-description "></p>
            <div className="h-3"/>
            <Button>
              <Link href={`admin/test/${event.description}`}>
                View </Link>
            </Button>
            </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
        </div>
    );

}
