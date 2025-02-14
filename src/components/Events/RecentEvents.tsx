import React from "react";
import Section from "./Section";
// import { Button } from "react-day-picker";
import { Button } from "../ui/button";

const RecentEvents = ({ recentEvents }) => {
  return (
    <Section
      sectionHeading="RECENT MEMORIES"
      // action={{ name: "View All", url: "/announcements" }}
    >
      {/* Scrollable Container */}
      <div className="max-h-96 overflow-y-auto pr-2 space-y-6">
        {recentEvents.map((event, index) => (
          <div key={index} className="bg-white shadow-lg border border-gray-200">
            {/* Event Image */}
            <div>
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Event Details Section */}
            <div className="p-5">
              <p className="text-gray-600 italic">{event.date}</p>
              <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default RecentEvents
