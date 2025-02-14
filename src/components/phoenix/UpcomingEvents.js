import React from "react";
import PropTypes from "prop-types";
import URL from "url";
import axios from "axios";
import lodash from "lodash";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { withStyles } from '@material-ui/core/styles';

import Section from "./Section";

import defaultMetadata from "./../defaultMetadata";

const styles = (theme) => {return {
  eventsContainer: {
    overflow: "auto",
    wordWrap: "break-word",

    [theme.breakpoints.down('sm')]: {
      maxHeight: 400,
    }
  },
  itemContainer: {
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  singleEventContainer: {
    borderColor: defaultMetadata.theme.colors.border,
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    width: "100%",
    display: "block",
    boxSizing: "border-box",
  },
  coverImage: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: 200,
  },
  eventContentContainer: {
    padding: 16,
    display: "flex",
    alignItems: "flex-start",
  },
  eventCalendar: {
    flex: 0,
    marginRight: 16,
    textAlign: "center",
    padding: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: defaultMetadata.theme.colors.rosyPink,
  },
  eventMonth: {
    color: defaultMetadata.theme.colors.rosyPink,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: 600,
  },
  eventContent: {
    width: "calc(100% - 64px)",
  },
}};



class UpcomingEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    let web = window.location.host;
    const {metadata: {network_base_url}} = this.props;    
    axios.get(URL.resolve(network_base_url, "/api/events.json"), {params: {website: web}}).then((response) => {
      this.setState({events: this.state.events.concat(response.data.data)});
    });
  }

  renderSingleEvent = (event, key) => {
    const {classes} = this.props;
    const {
      subject,
      event_url: url,
      start_date_month: eventMonth,
      start_date_day: eventDay,
      short_description: shortDescription,
      cover_picture: {url: imageUrl},
      contributor: {name: contributorName}
    } = event;

    const coverImageStyle = {backgroundImage: `url(${imageUrl})`};

    return (
      <ListItem key={key} className={classes.itemContainer}>
        <a href={url} className={classes.singleEventContainer}>
          <div className={classes.coverImage} style={coverImageStyle}/>
          <div className={classes.eventContentContainer}>
            <div className={classes.eventCalendar}>
              <div className={classes.eventMonth}>{eventMonth}</div>
              <div className="text_title">{eventDay}</div>
            </div>
            <div className={classes.eventContent}>
              <div className="ellipsis text_heading ac_link" style={{width: "100%"}}>
                {subject}
              </div>
              <div className="ellipsis text_caption_small" style={{width: "100%", lineHeight: 1.5}}>
                {shortDescription}
              </div>
              <div className="ellipsis text_caption" style={{width: "100%", marginTop: 4}}>
                <span className="text_caption">Created by&nbsp;</span>
                <span className="text_caption_dark">{contributorName}</span>
              </div>
            </div>
          </div>
        </a>
      </ListItem>
    );
  };

  renderEvents = () => {
    let eventsComponent = null;

    if (lodash.isEmpty(this.state.events)) {
      eventsComponent = (
        <div style={{textAlign: "center", padding: "32 80"}}>
          No events found...
        </div>
      );
    } else {
      eventsComponent = this.state.events.map(this.renderSingleEvent);
    };

    return (
      <List>
        {eventsComponent}
      </List>
    );
  };

  render() {
    const {classes, metadata: {network_base_url, upcoming_events_enabled}, scrollHeight} = this.props;

    if (!upcoming_events_enabled) return null;

    let scrollStyle = {};
    if (this.props.scrollHeight) scrollStyle = {height: scrollHeight};

    const viewAllUrl = URL.resolve(network_base_url, "/event_calendar");
    return (
      <Section
        sectionHeading="Events"
        action={{name: "View All", url: viewAllUrl}}
        style={this.props.style}
      >
        <div className={classes.eventsContainer} style={scrollStyle}>
          {this.renderEvents()}
        </div>
      </Section>
    );
  }
}


UpcomingEvents.propTypes = {
  scrollHeight: PropTypes.number,
  style: PropTypes.object,
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    upcomingEvents: PropTypes.shape({
      enabled: PropTypes.bool,
    }).isRequired
  }).isRequired
}

export default withStyles(styles)(UpcomingEvents);
