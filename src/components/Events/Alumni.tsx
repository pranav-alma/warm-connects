import React, {useState, useEffect} from "react";
import Section from "./Section";
import axios from "axios"

const Alumni = () => {
  const [distinguishAlumni, setDistinguishAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get("https://www.almaconnect.com/api/metadata.json?website=www.mican.in"); // Replace with actual API URL
        // console.log("Fetched data:", response.data.data); // Debugging API response

        const data = response.data.data.distinguished_alumni;
        setDistinguishAlumni(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  // useEffect(() => {
  //   // console.log("Updated alumni:", distinguishAlumni);    
  // }, [distinguishAlumni]);

  return (
    <Section 
      sectionHeading="FEATURED ALUMNI"
      style={{
        fontFamily: "Cardo, serif",
        color: "#3A3F42" // Default text color
      }}
    >
      {/* Scrollable Alumni List */}
      <div className="max-h-96 overflow-y-auto pr-2">
        <div className="space-y-0"> {/* Ensures proper spacing */}
          {distinguishAlumni.map((profile, index) => (
            <div 
              key={index} 
              className="flex items-center space-x-4 p-4 rounded-lg"
              style={{
                // backgroundColor: "#F1F0F0", // Light background for alumni card
                fontFamily: "Cardo, serif"
              }}
            >
              {/* Profile Picture */}
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={profile.picture.url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Profile Info */}
              <div>
                <h3 style={{ color: "#3A3F42", fontWeight: "bold", fontSize: "16px" }}>
                  {profile.name}
                </h3>
                <p style={{ color: "#707274", fontSize: "14px" }}>
                  {profile.current_designation}, {profile.current_company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nomination Section */}
      <div 
        className="mt-6 p-4" 
        style={{
          backgroundColor: "#FDE1D3",
          fontFamily: "Cardo, serif"
        }}
      >
        <p style={{ color: "#3A3F42" }}>
          <b>Want to share your alumni story?</b> Write to us at{" "}
          <a href="mailto:alumni@sbs-school.org" style={{ color: "#00C8B5", textDecoration: "underline" }}>
            alumni@sbs-school.org
          </a>
        </p>

      </div>
    </Section>
  );
};

export default Alumni;
