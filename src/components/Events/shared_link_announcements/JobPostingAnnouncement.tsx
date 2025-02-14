import React from "react";
import ConditionalRender from "../../ConditionalRender";

interface Institute {
  title: string;
}

interface JobPosting {
  url: string;
  subject: string;
  institute?: Institute;
  min_ctc?: number;
  max_ctc?: number;
  min_experience?: number;
  max_experience?: number;
}

interface JobPostingAnnouncementProps {
  job_posting: JobPosting;
}

export const JobPostingAnnouncement: React.FC<JobPostingAnnouncementProps> = ({ job_posting }) => {
  return (
    <div>
      <div style={{ padding: "20px 15px", minHeight: "1%", overflow: "hidden" }}>
        <a href={job_posting.url} target="_blank" rel="noopener noreferrer" style={{ background: "#eef0f2" }}>
          <div className="text_title_small">{job_posting.subject}</div>
        </a>
        <div style={{ margin: "8px -2px", marginBottom: "0px" }}>
          {job_posting.institute && (
            <div
              className="text_caption job_posting_tag"
              style={{ border: "1px solid #fcda00", backgroundColor: "#fefbe5" }}
            >
              Posted in {job_posting.institute.title}
            </div>
          )}
          <ConditionalRender if={!!job_posting.max_ctc}>
            <div
              className="text_caption job_posting_tag"
              style={{ border: "1px solid #fcda00", backgroundColor: "#fefbe5" }}
            >
              ₹ {job_posting.min_ctc ? `${job_posting.min_ctc} - ${job_posting.max_ctc}` : job_posting.max_ctc} LPA
            </div>
          </ConditionalRender>
          <ConditionalRender if={!!job_posting.min_experience && !!job_posting.max_experience}>
            <div className="text_caption job_posting_tag">
              {job_posting.min_experience}-{job_posting.max_experience} Yrs Exp.
            </div>
          </ConditionalRender>
          <ConditionalRender if={!job_posting.min_experience && !!job_posting.max_experience}>
            <div className="text_caption job_posting_tag">Upto {job_posting.max_experience} Yrs Exp.</div>
          </ConditionalRender>
          <ConditionalRender if={!job_posting.max_experience && !!job_posting.min_experience}>
            <div className="text_caption job_posting_tag">{job_posting.min_experience}+ Yrs Exp.</div>
          </ConditionalRender>
        </div>
      </div>
    </div>
  );
};

export default JobPostingAnnouncement;
