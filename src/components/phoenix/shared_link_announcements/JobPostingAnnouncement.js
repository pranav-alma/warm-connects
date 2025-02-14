import React from 'react';
import ConditionalRender from '../ConditionalRender';
export const JobPostingAnnouncement = (props) => {
    let job_posting = props
    return (
        <div>
            <div style={{padding: '20px 15px', minHeight: '1%', overflow: 'hidden'}}>
            <a href={job_posting.url} target="_blank" style={{ background: '#eef0f2'}}>
                <div className="text_title_small">
                    {job_posting.subject}
                </div>
            </a>
            <div style={{margin: '8px -2px',marginBottom: '0px'}}>
            {job_posting.institute && 
            <div className='text_caption job_posting_tag' style={{border: '1px solid #fcda00', backgroundColor: '#fefbe5'}}>
                Posted in {job_posting.institute.title}
            </div>
            }
            <ConditionalRender if={job_posting.max_ctc}>
            <div className='text_caption job_posting_tag' style={{border: '1px solid #fcda00', backgroundColor: '#fefbe5'}}>
                ₹ {job_posting.min_ctc ? (job_posting.min_ctc + " - " + job_posting.max_ctc) : job_posting.max_ctc} LPA
            </div>
            </ConditionalRender>
            <ConditionalRender if={job_posting.min_experience && job_posting.max_experience}>
            <div className="text_caption job_posting_tag">
                {job_posting.min_experience}-{job_posting.max_experience} Yrs Exp.
            </div>
            </ConditionalRender>
            <ConditionalRender if={!(job_posting.min_experience) && job_posting.max_experience}>
            <div className="text_caption job_posting_tag">
                Upto {job_posting.max_experience} Yrs Exp.
            </div>
            </ConditionalRender>
            <ConditionalRender if={!(job_posting.max_experience) && job_posting.min_experience}>
            <div class="text_caption job_posting_tag">
                {job_posting.min_experience}+ Yrs Exp.
            </div>
            </ConditionalRender>
            </div>
            </div>
        </div>
    )
}