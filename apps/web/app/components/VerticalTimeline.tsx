"use client"
import React, { useEffect, useState } from "react";
import { GetAlltests } from "@/server";
import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Input } from "@ui/components/ui/input";

export default function TimeLine() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const data = await GetAlltests();
      setEvents(data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full rounded flex flex-col my-5 bg-gray-100 p-3">
      <Input
        type="text"
        placeholder="Search events by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-3 p-2 border border-gray-300 rounded"
      />

      <VerticalTimeline>
        {filteredEvents.map((event, index) => (
          <VerticalTimelineElement
            key={index}
            date={event.date}
            dateClassName="date"
            iconStyle={{ background: "#000", color: "#fff" }}
            contentStyle={{ textAlign: "left", paddingLeft: "2rem" }}
          >
            <h3 className="vertical-timeline-element-title">{event.Name}</h3>
            <p className="vertical-timeline-element-description "></p>
            <div className="h-3" />
            <Button>
              <Link href={`admin/test/${event.Name}`}>View</Link>
            </Button>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
