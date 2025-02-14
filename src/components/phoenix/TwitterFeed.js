import React from "react";
import URL from 'url';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import twttr from 'twitter-text';

import Section from "./Section";
import twitterVerified from "./../images/twitter_verified.png"

import defaultMetadata from './../defaultMetadata';
import { Helmet } from "react-helmet";

const styles = (theme) => {return {
  tweetsContainer: {
    overflow: "auto",
    wordWrap: "break-word",

    [theme.breakpoints.down('sm')]: {
      maxHeight: 400,
    }
  },
  tweetContainer: {
    marginBottom: 24,
  },
  networkTwitterLogo: {
    maxWidth: 40,
    width: 40,
    borderRadius: 40,
    float: "left",
  },
  tweetContentContainer: {
    float: "left",
    paddingLeft: 16,
    width: "calc(100% - 40px)",
    boxSizing: "border-box",
    display: "inline-block",
  },
  contentHeader: {
    display: "flex",
    verticalAlign: "middle",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  verifiedImage: {
    width: 12,
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
  },
  screenName: {
    color: defaultMetadata.theme.colors.coolGrey,
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  tweet: {
    "& a": {
      color: defaultMetadata.theme.colors.turquoise,

      "&:hover": {
        textDecoration: "underline",
      }
    }
  }
}};

class TwitterFeed extends React.Component {

  constructor(props) {
    super(props);

    const {metadata} = props;
    var twitter_screen_name = "";
    if(metadata.twitter_screen_name) twitter_screen_name = metadata.twitter_screen_name;


    this.twitterUrl = URL.resolve("https://twitter.com/", twitter_screen_name);

    this.state = {tweets: []};
  }

  componentDidMount() {
    const {metadata: {network_base_url, twitter_screen_name}} = this.props;

    // const apiUrl = `${URL.resolve(network_base_url, "/api/tweets.json")}?screen_name=${twitter_screen_name}`
    // axios.get(apiUrl).then((response) => {
    //   this.setState({tweets: response.data.tweets});
    // });
  }

  renderTweet = (tweet) => {
    const {
      classes,
      metadata: {
        twitter_screen_name,
        twitter_display_name,
        twitter_logo:{url: twitter_logo_url},
      }
    } = this.props;

    const tweetText = twttr.autoLink(tweet);


    return (
      <React.Fragment>
        <img src={twitter_logo_url} alt="Network Logo" className={classes.networkTwitterLogo}/>
        <div className={classes.tweetContentContainer}>
          <div className={classes.contentHeader}>
            <a href={this.twitterUrl}><b>{twitter_display_name}</b></a>
            <img className={classes.verifiedImage} src={twitterVerified} alt="Verified" />
            <span className={classes.screenName}>{twitter_screen_name}</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: tweetText }}
            className={classes.tweet}
          ></div>
        </div>
        <div style={{clear: "both"}} />
      </React.Fragment>
    );
  };

  renderTweets = () => {
    const {classes, metadata: {twitter_screen_name}} = this.props;

      return (
        <a className="twitter-timeline" href={this.twitterUrl}>Fetching tweets by {twitter_screen_name}...</a>
      )
    
  };

  render() {
    const {classes, metadata: {twitter_feed_enabled}, scrollHeight} = this.props;
    if (!twitter_feed_enabled) return null;

    let scrollStyle = {};
    if (this.props.scrollHeight) scrollStyle = {height: scrollHeight || 400};
    return (
      <React.Fragment>
      <Helmet>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
      </Helmet>
      <Section
        sectionHeading="Trending"
        action={{name: "View All", url: this.twitterUrl}}
        style={this.props.style}
      >
        <div className={classes.tweetsContainer} style={scrollStyle}>
          {this.renderTweets()}
        </div>
      </Section>
      </React.Fragment>
    );
  }
}

TwitterFeed.propTypes = {
  scrollHeight: PropTypes.number,
  style: PropTypes.object,
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    twitterFeed: PropTypes.shape({
      enabled: PropTypes.bool,
      screenName: PropTypes.string,
      displayName: PropTypes.string,
      logo: PropTypes.string,
    })
  }).isRequired,
};


export default withStyles(styles)(TwitterFeed);
