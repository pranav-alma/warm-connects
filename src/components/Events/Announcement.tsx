import React, { useState, useEffect } from "react";
import Section from "./Section";
import axios from "axios";
import metadata from "../../defaultMetadata.js";
import DCAnnouncement from "./shared_link_announcements/DCAnnouncement";
import ECAnnouncement from "./shared_link_announcements/ECAnnouncement";
import JobPostingAnnouncement from "./shared_link_announcements/JobPostingAnnouncement";
import MemoryAnnouncement from "./shared_link_announcements/MemoryAnnouncement";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementsResponse, newsResponse] = await Promise.all([
          axios.get(`${metadata.networkAlmaUrl}${metadata.sectionUrls.announcements}?website=${metadata.deploymentUrl}`),
          axios.get(`${metadata.networkAlmaUrl}${metadata.sectionUrls.news}?website=${metadata.deploymentUrl}`)
        ]);

        setAnnouncements(announcementsResponse.data.data || []);
        setNews(newsResponse.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load announcements and news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderSingleAnnouncement = (announcement, key) => {
    let singleComp;
    if (announcement.shared_link) {
      let { shared_link } = announcement;
      switch (shared_link.type) {
        case "JobPosting":
          singleComp = <JobPostingAnnouncement {...shared_link} />;
          break;
        case "Donations::DonationCampaign":
          singleComp = <DCAnnouncement {...shared_link} />;
          break;
        case "EventCalendar::Event":
          singleComp = <ECAnnouncement {...shared_link} />;
          break;
        case "Memories::Memory":
          singleComp = <MemoryAnnouncement {...shared_link} />;
          break;
        default:
          singleComp = null;
      }
    }

    return (
      <div key={key} className="border border-gray-300 p-4 bg-gray-50 mb-4">
        <p style={{ color: "#707274", fontSize: "14px" }}>
          {announcement.created_at
            ? new Date(announcement.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Unknown Date"}
        </p>
        <h3 style={{ color: "#3A3F42", fontWeight: "700", fontSize: "16px" }}>
          {announcement.title || "Announcement"}
        </h3>
        {announcement.content ? (
          <p style={{ color: "#707274", fontSize: "14px", whiteSpace: "pre-line" }}>
            {announcement.content}
          </p>
        ) : (
          singleComp && <div>{singleComp}</div>
        )}
        {announcement.shared_image && (
          <img src={announcement.shared_image.url} alt="Shared" style={{ width: "100%", marginTop: "12px" }} />
        )}
      </div>
    );
  };

  const combinedData = [...announcements, ...news];

  return (
    <Section
      sectionHeading="NEWS AND ANNOUNCEMENTS"
      style={{ fontFamily: "Cardo, serif", color: "#3A3F42" }}
    >
      <div className="max-h-96 overflow-y-auto pr-2">
        {loading ? (
          <p className="text-gray-500 text-center mt-4">Loading announcements and news...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-4">{error}</p>
        ) : combinedData.length > 0 ? (
          combinedData.map((item, index) =>
            item.type === "announcement" ? renderSingleAnnouncement(item, index) : (
              <div key={index} className="border border-gray-300 p-4 bg-gray-50 mb-4">
                <p style={{ color: "#707274", fontSize: "14px" }}>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Unknown Date"}
                </p>
                <h3 style={{ color: "#3A3F42", fontWeight: "700", fontSize: "16px" }}>
                  {item.title || "News"}
                </h3>
                <p style={{ color: "#707274", fontSize: "14px" }}>
                  {item.content?.slice(0, 100) || item.description?.slice(0, 100)}...
                  {item.external_url && (
                    <a
                      href={item.external_url}
                      style={{ color: "#486AAE", marginLeft: "5px", textDecoration: "underline" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read more
                    </a>
                  )}
                </p>
              </div>
            )
          )
        ) : (
          <p className="text-gray-500 text-center mt-4">No announcements or news available.</p>
        )}
      </div>
    </Section>
  );
};

export default Announcement;
