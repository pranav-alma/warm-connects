import React from "react";
import ConditionalRender from "../../ConditionalRender";
import coverPic from "../../images/announcements/cover_picture.png";

interface Contributor {
  url: string;
  name: string;
}

interface Event {
  event_url: string;
  start_date_month: string;
  start_date_day: string;
  subject: string;
  short_description: string;
  rsvp_count: number;
  contributor: Contributor;
  reg_allowed: boolean;
  registeration_url: string;
}

interface ECAnnouncementProps {
  event: Event;
}

export const ECAnnouncement: React.FC<ECAnnouncementProps> = ({ event }) => {
  return (
    <div>
      <a href={event.event_url}>
        {/* <img
          className="border-box"
          src={coverPic}
          style={{ cursor: "pointer", height: "300px" }}
          alt="Event Cover"
        /> */}
      </a>
      <div style={{ padding: "20px 15px", minHeight: "1%", overflow: "hidden" }}>
        <div style={{ float: "left", textAlign: "center", paddingRight: "12px", marginTop: "16px" }}>
          <div style={{ color: "#ef5d60", textTransform: "uppercase", fontSize: "12px", fontWeight: 600 }}>
            {event.start_date_month}
          </div>
          <div className="text_title">{event.start_date_day}</div>
        </div>

        <div style={{ float: "left", minWidth: "200px", width: "calc(100% - 114px)", marginTop: "16px" }}>
          <div style={{ width: "100%" }} className="ellipsis text_heading">
            <a className="ac_link" href={event.event_url} style={{ width: "100%" }}>
              {event.subject}
            </a>
          </div>
          <div className="spaced-text text_body_light ellipsis" style={{ width: "100%" }}>
            {event.short_description}
          </div>
          <div className="text_caption ellipsis" style={{ width: "100%" }}>
            <ConditionalRender if={event.rsvp_count > 0}>
              <span>{event.rsvp_count} Going </span>
            </ConditionalRender>
            <ConditionalRender if={event.rsvp_count === 0}>
              <span>
                <span className="text_caption">Created by&nbsp;</span>
                <a href={event.contributor.url} className="text_caption_dark">
                  {event.contributor.name}
                </a>
              </span>
            </ConditionalRender>
          </div>
        </div>

        <ConditionalRender if={event.reg_allowed}>
          <a
            href={event.registeration_url}
            style={{ display: "block", float: "left", marginTop: "16px" }}
            className="ac_button_small"
          >
            Register
          </a>
        </ConditionalRender>

        <div style={{ clear: "both" }}></div>
      </div>
    </div>
  );
};

export default ECAnnouncement;
