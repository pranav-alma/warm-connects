import React, { useState, useEffect } from "react";
import Section from "./Section";
import axios from "axios";
import metadata from "../../defaultMetadata.js";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(
          `${metadata.networkAlmaUrl}${metadata.sectionUrls.upcomingEvents}?website=${metadata.deploymentUrl}`
        );
        console.log(`${metadata.networkAlmaUrl}${metadata.sectionUrls.upcomingEvents}?website=${metadata.deploymentUrl}`);
        
        setUpcomingEvents(response.data.data);
      } catch (error) {
        setError("Failed to load upcoming events.");
        console.error("Error fetching upcoming events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <Section
      sectionHeading="UPCOMING ALUM EVENTS"
      action={{ name: "View All", url: metadata.networkAlmaUrl }}
    >
      {/* Loading & Error Handling */}
      {loading && <p className="text-gray-500 text-center">Loading upcoming events...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Events List or No Events Message */}
      {!loading && !error && (
        <div className="max-h-96 overflow-y-auto pr-2 space-y-6">
          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500 text-center">No upcoming events at the moment.</p>
          ) : (
            upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white shadow-lg border border-gray-200">
                {/* Event Image */}
                {event.cover_picture?.url && (
                  <img
                    src={event.cover_picture.url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                {/* Event Details */}
                <div className="p-5 flex items-start">
                  {/* Date Box */}
                  <div className="border border-[#EF5D60] px-4 py-3 shadow-md text-center w-16 flex-shrink-0">
                    <div className="text-sm font-semibold text-[#EF5D60]">{event.start_date_month}</div>
                    <div className="text-2xl font-bold text-[#3A3F42]">{event.start_date_day}</div>
                  </div>

                  {/* Event Description */}
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-bold text-gray-900">{event.subject}</h3>
                    <p className="text-sm text-gray-600">
                      {event.start_date} | {event.short_description}
                    </p>

                    {/* Register Button */}
                    {event.registeration_url && (
                      <div className="mt-2">
                        <button
                          onClick={() => window.open(event.registeration_url, "_blank")}
                          className="bg-[#EBFBF9] text-[#00C4B5] font-semibold px-5 py-2 text-sm hover:bg-[#00C4B5] hover:text-white transition duration-200"
                        >
                          Register
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Section>
  );
};

export default UpcomingEvents;
