import React, { useState, useEffect } from "react";
import Section from "./Section";
import axios from "axios";
import metadata from "../../defaultMetadata.js";

const RecentEvents = () => {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await axios.get(
          `${metadata.networkAlmaUrl}${metadata.sectionUrls.recentMemories}?website=${metadata.deploymentUrl}`
        );
        console.log(`${metadata.networkAlmaUrl}${metadata.sectionUrls.recentMemories}?website=${metadata.deploymentUrl}`);
        

        setRecentEvents(response.data.data);
      } catch (err) {
        setError("Failed to load recent events. Please try again later.");
        console.error("Error fetching recent events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <Section sectionHeading="RECENT MEMORIES" action={{ name: "View All", url: "/announcements" }}>
      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading recent events...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : recentEvents.length > 0 ? (
        <div className="max-h-96 overflow-y-auto pr-2 space-y-6">
          {recentEvents.map((event, index) => (
            <div key={index} className="bg-white shadow-lg border border-gray-200">
              {/* Event Image */}
              {event.cover?.image_url && (
                <img
                  src={event.cover.image_url}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Event Details */}
              <div className="p-5">
                <p className="text-gray-600 italic">
                  {event.month && event.year
                    ? `${new Date(0, event.month - 1).toLocaleString("en-US", {
                        month: "long",
                      })}, ${event.year.toString().slice(-2)}`
                    : "Date Unknown"}
                </p>
                <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No recent events available.</p>
      )}
    </Section>
  );
};

export default RecentEvents;
