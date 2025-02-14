import {React, useState, useEffect} from "react";
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
    <Section sectionHeading="FEATURED ALUMNI">
      {/* Apply scrolling only inside this div */}

    <div className="max-h-96 overflow-y-auto pr-2">
        <div className="space-y-4"> {/* Ensures proper spacing */}
          {distinguishAlumni.map((profile, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={profile.picture.url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{profile.name}</h3>
                <p className="text-gray-600">{profile.current_designation}, {profile.current_company}</p>
              </div>
            </div>
          ))}
        </div>
        
    </div>

      <div className="mt-6 bg-[#FDE1D3] p-4">
        <p className="text-gray-700">
          Want to nominate someone for an award? Write to us at{" "}
          <a href="mailto:abc@delhi.sbs.in" className="text-[#1A73E8]">
            abc@delhi.sbs.in
          </a>
        </p>
      </div>
    </Section>
  );
};

export default Alumni;
