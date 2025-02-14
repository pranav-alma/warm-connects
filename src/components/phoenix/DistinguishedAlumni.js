import React from "react";
import PropTypes from "prop-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { withStyles } from '@material-ui/core/styles';

import Section from "./Section";

import defaultMetadata from './../defaultMetadata';

const styles = (theme) => {return {
  relatedUsersScroll: {
    overflow: "auto",
    wordWrap: "break-word",
  },
  itemContainer: {
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
  userImageContainer: {
    marginTop: 4,
  },
  userImage: {
    maxWidth: "100%",
  },
  nominationContainer: {
    marginTop: 50,
    padding: 16,
    fontSize: 12,
    lineHeight: 1.4,
    backgroundColor: defaultMetadata.theme.colors.lightTurquoise,
    color: defaultMetadata.theme.colors.battleshipGrey,

    "& a": {
      color: defaultMetadata.theme.colors.turquoise,
    }
  },
}};



class DistinguishedAlumni extends React.Component {
  componentDidMount(){
    const {metadata:{distinguished_alums}}= this.props;
  }


  renderSingleAlum = (alum, key) => {
    const {classes} = this.props;
    var secondary_description = "";
    if (alum.course) secondary_description = secondary_description + alum.course;
    if (alum.batch) secondary_description = secondary_description + " - " +alum.batch;
    if (alum.branch) secondary_description = secondary_description + ", " +alum.branch;
    if (alum.current_designation) secondary_description = secondary_description + ", " +alum.current_designation;
    if (alum.current_company) secondary_description = secondary_description + ", " +alum.current_company;
    if (alum.location) secondary_description = secondary_description + ", " +alum.location;

    return (
      <ListItem key={key} className={classes.itemContainer}>
        <Avatar className={classes.userImageContainer}>
          <img src={alum.picture? alum.picture.url : ""} alt={alum.name} className={classes.userImage}/>
        </Avatar>
        <ListItemText primary={alum.name} secondary={secondary_description} />
      </ListItem>
    );
  }

  render() {

    const {classes, metadata:{distinguished_alumni, distinguished_alum_nomination_email, distinguished_alumni_enabled}, scrollHeight} = this.props;
    if(!distinguished_alumni_enabled) return (null);
    let scrollStyle = {};
    if (this.props.scrollHeight) scrollStyle = {height: (scrollHeight - (distinguished_alum_nomination_email ? 136 : 0))};

    const alumsComponent = (
      <div className={classes.relatedUsersScroll} style={scrollStyle}>
        <List dense>
          {distinguished_alumni.filter((alum) => alum.associated_as === "Alumni").map(this.renderSingleAlum)}
        </List>
      </div>
    );

    let nominationComponent = null;
    if (distinguished_alum_nomination_email) {
      const nominationEmailHref = `mailto:${distinguished_alum_nomination_email}`;
      nominationComponent = (
        <div className={classes.nominationContainer}>
          <div style={{marginBottom: 4}}>
            <b>Want to nominate someone for an award?</b>
          </div>
          <div>
            <span>
              Write to us at&nbsp;
              <a href={nominationEmailHref} className="ac_link">
                {distinguished_alum_nomination_email}
              </a>
              &nbsp;& we will let you know the process for nominating.
            </span>
          </div>
        </div>
       );
     }

    return (
      <Section sectionHeading="Distinguished Alumni" style={this.props.style}>
        {alumsComponent}
        {nominationComponent}
      </Section>
    );
  }
}

DistinguishedAlumni.propTypes = {
  scrollHeight: PropTypes.number,
  style: PropTypes.object,
  metadata: PropTypes.shape({
    distinguishedAlumni: PropTypes.shape({
      enabled: PropTypes.bool,
      nominationEmail: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }))
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(DistinguishedAlumni);
