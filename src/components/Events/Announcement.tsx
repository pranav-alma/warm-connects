import React, {useState, useEffect} from "react";
import Section from "./Section";
import axios from "axios"
const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("https://mica.almaconnect.com/api/news.json?website=www.mican.in"); // Replace with actual API URL
        // console.log("Fetched data:", response.data.data); // Debugging API response

        const data = response.data.data;
        setAnnouncements(data);
        // if (Array.isArray(data)) {
        // } else if (typeof data === "object" && data !== null) {
        //   setAnnouncements(Object.values(data)); // Convert object to array
        // }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // useEffect(() => {
    // console.log("Updated announcements:", announcements); // Debugging state updates
    // console.log(announcements[0].shared_link.title);
    
  // }, [announcements]);
  
  return (
    <Section 
      sectionHeading="NEWS AND ANNOUNCEMENTS"
      style={{
        fontFamily: "Cardo, serif",
        color: "#3A3F42" // Default text color
      }}
    >
      {/* Scrollable Container inside Announcement */}
      <div className="max-h-96 overflow-y-auto pr-2">
        {announcements.map((announcement, index) => (
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
            <h3 style={{ color: "#3A3F42", fontWeight: "bold", fontSize: "16px" }}>
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
        ))}
      </div>
    </Section>
  );
};

export default Announcement;
