// import {React, } from "react";
import React, {useState, useEffect} from "react";
import Section from "./Section";
import { Button } from "../ui/button";
import axios from "axios"; 

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get("http://mica.almaconnect.com/api/events.json?website=www.mican.in"); // Replace with actual API URL
        const data = response.data.data;
        // console.log(data);
        
        setUpcomingEvents(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);


  return (
    <Section
      sectionHeading="UPCOMING ALUM EVENTS"
      action={{ name: "View All", url: "/announcements" }}
      style={{ fontFamily: "Cardo, serif" }} // Applying Cardo font
    >
      {/* Scrollable Container inside Announcement */}
      <div className="max-h-96 overflow-y-auto pr-2">
        {upcomingEvents.map((event, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-4">
            <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
              {/* Event Image */}
              <div>
                <img
                  src={event.cover_picture.url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Details Section */}
              <div className="p-5 flex items-start">
                {/* Left: Enlarged Date Box */}
                <div className="border border-[#EF5D60] px-4 py-3 shadow-md text-center w-16 flex-shrink-0 flex flex-col items-center justify-center">
                  <div className="text-sm font-semibold text-[#EF5D60]">{event.start_date_month}</div>
                  <div className="text-2xl font-bold text-[#3A3F42]">{event.start_date_day}</div>
                </div>

                {/* Right: Description Container */}
                <div className="ml-4 flex-grow">
                  {/* Event Details */}
                  <h3 className="text-lg font-bold text-gray-900">{event.subject}</h3>
                  <p className="text-sm text-gray-600">{event.start_date} | {event.short_description}</p>
                  {/* <p className="text-sm text-gray-700 mt-1">
                    {event.organizer} / {event.email}
                  </p> */}

                  {/* Register Button - Left-Aligned */}
                  <div className="mt-2 flex">
                    {event.registeration_url && (
                      <button
                        onClick={() => window.open(event.registeration_url, "_blank")}
                        className="bg-[#EBFBF9] text-[#00C4B5] font-semibold px-5 py-2 text-sm font-['Nunito Sans'] hover:bg-[#00C4B5] hover:text-white transition duration-200"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

  );
};

export default UpcomingEvents
