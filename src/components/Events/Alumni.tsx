import React, { useState, useEffect } from "react";
import Section from "./Section";
import axios from "axios";
import metadata from "../../defaultMetadata.js";

const Alumni = () => {
  const [distinguishAlumni, setDistinguishAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axios.get(
          `${metadata.networkBaseUrl}${metadata.sectionUrls.distinguishedAlumni}?website=${metadata.deploymentUrl}`
        );
        console.log(`Fetching Dist Alumi ${metadata.networkBaseUrl}${metadata.sectionUrls.distinguishedAlumni}?website=${metadata.deploymentUrl}`);
        
        const data = response.data.data;
        setDistinguishAlumni(data);
      } catch (err) {
        setError("Failed to load alumni details. Please try again later.");
        console.error("Error fetching alumni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <Section sectionHeading="FEATURED ALUMNI">
      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading distinguished alumni...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : distinguishAlumni.length > 0 ? (
        <div className="max-h-96 overflow-y-auto pr-2">
          <div className="space-y-4">
            {distinguishAlumni.map((profile, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg">
                {/* Profile Picture */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  {profile.picture?.url ? (
                    <img src={profile.picture.url} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <p className="text-xs text-gray-500 text-center pt-2">No Image</p>
                  )}
                </div>

                {/* Profile Info */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">{profile.name || "Unknown"}</h3>
                  <p className="text-gray-600 text-sm">
                    {profile.current_designation || "Unknown Role"},{" "}
                    {profile.current_company || "Unknown Company"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No distinguished alumni available.</p>
      )}

      {/* Nomination Section */}
      <div className="mt-6 p-4 bg-orange-100">
        <p className="text-gray-900 font-medium">
          <b>Want to share your alumni story?</b> Write to us at{" "}
          <a href="mailto:alumni@sbs-school.org" className="text-teal-600 underline">
            alumni@sbs-school.org
          </a>
        </p>
      </div>
    </Section>
  );
};

export default Alumni;
