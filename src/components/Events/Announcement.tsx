import React, { useState, useEffect } from "react";
import Section from "./Section";
import axios from "axios";
import metadata from "../../defaultMetadata.js";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${metadata.networkAlmaUrl}${metadata.sectionUrls.announcements}?website=${metadata.deploymentUrl}`
        );
        console.log(`${metadata.networkAlmaUrl}${metadata.sectionUrls.announcements}?website=${metadata.deploymentUrl}`);
        
        const data = response.data.data;
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Failed to load announcements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Section
      sectionHeading="NEWS AND ANNOUNCEMENTS"
      style={{
        fontFamily: "Cardo, serif",
        color: "#3A3F42",
      }}
    >
      <div className="max-h-96 overflow-y-auto pr-2">
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading announcements...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-4">{error}</p>
        ) : announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div key={index} className="border border-gray-300 p-4 bg-gray-50 mb-4">
              {/* Date */}
              <p style={{ color: "#707274", fontSize: "14px" }}>
                {announcement.created_at
                  ? new Date(announcement.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Unknown Date"}
              </p>

              {/* Title */}
              <h3 style={{ color: "#3A3F42", fontWeight: "700", fontSize: "16px" }}>
                {announcement.title}
              </h3>

              {/* Description */}
              <p style={{ color: "#707274", fontSize: "14px" }}>
                {announcement.description?.slice(0, 100)}...
                <a
                  href={announcement.external_url || "#"}
                  style={{ color: "#486AAE", marginLeft: "5px", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No announcements or news for now.</p>
        )}
      </div>
    </Section>
  );
};

export default Announcement;
