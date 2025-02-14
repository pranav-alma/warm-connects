import React from "react";
import PropTypes from "prop-types";
import URL from "url";
import axios from "axios";
import lodash from "lodash";

import { withStyles } from '@material-ui/core/styles';
import defaultMetadata from "./../defaultMetadata";

import classnames from "classnames";
import Section from "./Section";
import { Avatar } from "@material-ui/core";
import ReadMore from "./ReadMore";
import { JobPostingAnnouncement } from "./shared_link_announcements/JobPostingAnnouncement";
import { DCAnnouncement } from "./shared_link_announcements/DCAnnouncement";
import { ECAnnouncement } from "./shared_link_announcements/ECAnnouncement";
import { MemoryAnnouncement } from "./shared_link_announcements/MemoryAnnoncement";
import cover_pic from "../images/announcements/cover_picture.png"
import ConditionalRender from "./ConditionalRender";
 const styles = (theme) => { return {
   boxShadowcontent: {
     background: "#fff",
     boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.1)",
     borderRadius: 3,
   },

   textCaptionSmall: {
    fontWeight: 700,
    fontSize: 10,
    textTransform: "uppercase",
    color: "#b6b9bb",
  },

  textCaption: {
    fontWeight: 600,
    fontSize: 12,
    color: "#707274",
  },

  linkText: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline"
    }
  },

  Pullup: {
    position: "relative",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    backgroundColor: "#3a3f42",
  },
}};

class Announcements extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      announcements: []
    };
  }

  componentDidMount(){
    const {metadata: {network_base_url}} = this.props;
    let web = window.location.host;
    axios.get(URL.resolve(network_base_url, "/api/announcements.json"),{params:{website: web}}).then((response) => {
      this.setState({announcements: response.data.data});
    });
  }

  renderSingleAnnouncement = (announcement, key) => {
    const {classes} = this.props;
    let singleComp;
    if(announcement.shared_link) { 
      let {shared_link} = announcement ;
      if(shared_link && shared_link.type == 'JobPosting')
        singleComp = JobPostingAnnouncement(shared_link);
      if(shared_link && shared_link.type == 'Donations::DonationCampaign')
        singleComp = DCAnnouncement(shared_link);
      if(shared_link && shared_link.type == 'EventCalendar::Event')
        singleComp = ECAnnouncement(shared_link);
      if(shared_link && shared_link.type == 'Memories::Memory')
        singleComp = MemoryAnnouncement(shared_link);
    }
    var announcement_content;
    if(announcement.content)
    announcement_content = announcement.content;
    const{      
      contributor: {profile_title: announcer_profile_title},
      contributor: {name: announcer_name},
      contributor: {url: contributor_url},
    } = announcement;
    var contributor_currently_at = "";
    var contributor_current_city = "";

    if(announcement.contributor.currently_at) contributor_currently_at = announcement.contributor.currently_at.name
    if(announcement.contributor.current_city) contributor_current_city = announcement.contributor.current_city.name

    var announcement_course_name = null;
    var announcement_batch_small = null;
    var announcer_designation = null;

    if("course" in announcement.contributor){
      announcement_course_name = announcement.contributor.course.name;
      announcement_batch_small = announcement.contributor.batch_small;
    }
    if("designation" in announcement.contributor){
      announcer_designation = announcement.contributor.designation;
    }
    let profile_image = "";
    if(announcement.contributor.image)
      profile_image = announcement.contributor.image.url

    let matches = null;
    if(announcement_content)
      matches = announcement_content.match(/\bhttps?:\/\/\S+/gi);

    if(matches){
      matches.forEach(element => {
          announcement_content = announcement_content.replace(element, `<a href=${element} class='text_link'>${element}</a>`)
      });  
    }
    let ann_info = announcer_profile_title || "";
    if(contributor_currently_at) ann_info += " at " + contributor_currently_at;
    if(contributor_current_city) ann_info += ", " + contributor_current_city;

    return(
      <div style = {{border: "1px solid rgb(241, 240, 240)", marginBottom: "19px", fontWeight: 500, position: "relative"}}>
        <div style={{padding: "20px 15px 0px"}}>
          <div style={{display: "flex", alignItems: "center"}}>
            <Avatar style={{width: "40px", height: "40px"}}>
              <img src={profile_image} style={{maxWidth: "100%"}}/>
            </Avatar>
            <div style={{marginLeft: "16px", width: "calc(100% - 56px)"}}>
              <a href={contributor_url} className = {classes.linkText}>
                <span style = {{fontWeight: 700, fontSize: 14, color: "#3a3f42"}}>
                  {announcer_name}
                </span>
              </a>
              <span>
              {announcement_course_name ? (
                  <span className = {classes.textCaptionSmall} style = {{paddingLeft: 8}}>
                    {announcement_course_name} {announcement_batch_small}
                  </span>
                ):(null)
              }
                {announcer_designation ? (
                  <span className = {classes.textCaptionSmall} style = {{paddingLeft: 8}}>
                    {announcement.contributor.designation}
                  </span>
                ):(null)
                }
              </span>
              <div className={classes.textCaption} style={{marginTop: "3px"}}>
                <div style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow:"hidden", width: "100%"}}>
                {ann_info}
                </div>
              </div>
            </div>
          </div> 
          {announcement_content ? 
          <div style={{marginTop: "12px", color: "#3a3f42", fontSize: 14, fontWeight: 600, whiteSpace: "pre-wrap", overflow:"hidden", width: "100%"}}>
            {<ReadMore content={announcement_content} limit={announcement.shared_image ? 125 : announcement_content.length+1}/>}
          </div>
          :
          <ConditionalRender if={singleComp}>
          <div style={{marginTop: "12px", color: "#3a3f42", fontSize: 14, fontWeight: 600, whiteSpace: "pre-wrap", overflow:"hidden", width: "100%"}}>
          {singleComp}
          </div>
          </ConditionalRender>
          }         
        </div>
        {
          (announcement.shared_image ? (
              <img src={announcement.shared_image.url} style={{width: "100%", marginTop: "12px", bottom: 0}}></img>
            ) : <div style={{marginTop: "16px"}}></div> )
        }        
      </div>
    );
  }
  renderAnnouncements = () => {
    const {metadata:{network_base_url}} = this.props;
    const {classes} = this.props;
    let announcementsComponents = null;
    if(!lodash.isEmpty(this.state.announcements)){
      announcementsComponents = this.state.announcements.map(this.renderSingleAnnouncement);
    }
    return(
      <>
        {announcementsComponents}
      </>
    )
  }
  render(){
    const {classes, metadata: {network_base_url, announcements_enabled}, scrollHeight} = this.props;
    if(!announcements_enabled) return null;
    const viewAllUrl = URL.resolve(network_base_url, "/contributions/sneak_peek");
    const scrollStyle = {height: this.props.scrollHeight || 934, overflow: "auto"}
    return(
      <>
        <Section sectionHeading="Announcements"
          style={this.props.style}
          action={{name: "View All", url: viewAllUrl}}
          >
          <div style={scrollStyle}>
            {this.renderAnnouncements()}
          </div>
        </Section>
      </>
    );
  }

}
export default withStyles(styles, { withTheme: true })(Announcements);
