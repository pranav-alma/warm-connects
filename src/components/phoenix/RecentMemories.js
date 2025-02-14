import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import URL from "url";
import lodash from "lodash";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {FaImage} from 'react-icons/fa'

import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';

import Section from "./Section";

import defaultMetadata from "./../defaultMetadata";

const styles = (theme) => {return {
  memoriesContainer: {
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
  singleMemoryContainer: {
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
    width: "100%",
    paddingBottom: "70%",
  },
  memoryContent: {
    padding: 16,
    display: "flex",
    alignItems: "flex-end",
  },
  memoryContenMinSize: {
    flex: 0,
  },
  memoryContentMain: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,

    "&:hover": {
      textDecoration: "underline",
    }
  },
}};



class RecentMemories extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      memories: []
    };
  }

  componentDidMount() {
    const {metadata: {network_base_url}} = this.props;
    let web = window.location.host;    
    axios.get(URL.resolve(network_base_url, "/api/memories.json"), {params:{website: web}}).then((response) => {
      this.setState({memories: this.state.memories.concat(response.data.data)});
    });
  }

  renderSingleMemory = (memory, key) => {
    const {classes} = this.props;
    const {url, title, year, cover: {image_url: imageUrl}} = memory;

    const coverImageStyle = {backgroundImage: `url(${imageUrl})`};

    return (
      <ListItem key={key} className={classes.itemContainer}>
        <a href={url} className={classes.singleMemoryContainer}>
          <div className={classes.coverImage} style={coverImageStyle}/>
          <div className={classes.memoryContent}>
            <div className={classes.memoryContenMinSize}>
              <div style={{marginBottom: -3}}><FaImage /></div>
            </div>
            <div className={classnames(classes.memoryContentMain, "ellipsis", "text_heading")}>
              {title}
            </div>
            <div className={classnames(classes.memoryContenMinSize, "text_title")}>
              '{year.toString().substring(2,4)}
            </div>
          </div>
        </a>
      </ListItem>
    );
  };

  renderMemories = () => {
    if (lodash.isEmpty(this.state.memories)) {
      return (
        <div style={{textAlign: "center", padding: "32 80"}}>
          No Memories found...
        </div>
      );
    } else {
      return (
        <List>
          {this.state.memories.map(this.renderSingleMemory)}
        </List>
      );
    }
  };

  render() {
    const {classes, metadata: {network_base_url, recent_memories_enabled}, scrollHeight} = this.props;

    if (!recent_memories_enabled) return null;

    let scrollStyle = {};
    if (this.props.scrollHeight) scrollStyle = {height: scrollHeight};

    const viewAllUrl = URL.resolve(network_base_url, "/memories");
    return (
      <Section
        sectionHeading="Recent Memories"
        action={{name: "View All", url: viewAllUrl}}
        style={this.props.style}
      >
        <div className={classes.memoriesContainer} style={scrollStyle}>
          {this.renderMemories()}
        </div>
      </Section>
    );
  }
}

RecentMemories.propTypes = {
  scrollHeight: PropTypes.number,
  style: PropTypes.object,
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    recentMemories: PropTypes.shape({
      enabled: PropTypes.bool,
    }).isRequired
  }).isRequired
}

export default withStyles(styles)(RecentMemories);
