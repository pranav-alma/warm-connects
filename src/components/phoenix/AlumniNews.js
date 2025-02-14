import React from "react";
import PropTypes from "prop-types";
import lodash from "lodash";
import axios from "axios";
import URL from 'url';

import Avatar from '@material-ui/core/Avatar';

import { withStyles } from '@material-ui/core/styles';
import classnames from "classnames";

import Section from "./Section";

import defaultMetadata from './../defaultMetadata';
import {acConcat, truncate} from './../utils/String';



const styles = (theme) => { return {
  newsContainer: {
    overflow: "auto",
    wordWrap: "break-word",

    [theme.breakpoints.down('sm')]: {
      maxHeight: 400,
    }
  },
  newsItemContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: "solid",
    borderColor: defaultMetadata.theme.colors.border,
    marginTop: 8,
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
  },
  relatedUserContainer: {
    marginBottom: 8,
  },
  userImageLink: {
    display: "block",
    float: "left",
    marginRight: 16,
  },
  userInfoContainer: {
    float: "left",
    fontSize: 15,
    width: "calc(100% - 64px)",
  },
  relationInfo: {
    marginLeft: 8,
  },
  articleLink: {
    display: "block"
  },
  articleContainer: {
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: defaultMetadata.theme.colors.paleGrey,
    borderRadius: 3,
  },
  articleDescription: {
    marginTop: 4,
    marginBottom: 4,
  },
  articleImage: {
    width: "100%",
    paddingBottom: "40%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  articleContenContainer: {
    padding: 16,
  }
}};



class AlumniNews extends React.Component {
  initialState = {
    news: []
  };

  constructor(props) {
    super(props);

    this.state = {...this.initialState};
  }


  componentDidMount() {
    const {metadata: {network_base_url}} = this.props;
    let web = window.location.host;
    axios.get(URL.resolve(network_base_url, "/api/news.json"), {params: {website: web}}).then((response) => {
      this.setState({news: response.data.data});
    });
  }

  renderUserImage = (user) => {
    const {classes} = this.props;
    const {
      url: profileUrl,
      image_url: imageUrl,
    } = user;

    let userImage = null;
    if (imageUrl) {
      userImage = (
        <a href={profileUrl} className={classes.userImageLink}>
          <Avatar>
            <img src={imageUrl} alt="Avatar" />
          </Avatar>
        </a>
      );
    }

    return userImage;
  }

  renderRelationInfo = (user) => {
    const {classes} = this.props;
    const {
      course,
      designation,
      batch_small: batchSmall,
    } = user;

    let relationInfo = null;
    if(course) {
      relationInfo = (
        <span className={classnames(classes.relatedInfo, "text_caption_small")} style={{marginLeft: '4px'}}>
          {course.name} '{batchSmall}
        </span>
      );
    } else if(designation) {
      relationInfo = (
        <span className={classnames(classes.relatedInfo, "text_caption_small")} style={{marginLeft: '4px'}}>
          {designation}
        </span>
      );
    }

    return relationInfo;
  };

  currentInfoText = (user) => {
    const {metadata: {network_base_url}} = this.props;
    const {
      profile_title: profileTitle,
      currently_at: currentlyAt,
      current_city: currentCity,
    } = user;

    return acConcat({
      values: [profileTitle, ' at ', currentlyAt, ', ', currentCity],
      baseUrl: network_base_url
    });
  };

  renderRelatedUser = (related_user, key) => {
    const {classes} = this.props;
    const {
      url: profileUrl,
      name,
    } = related_user;

    return (
      <div key={key} className={classes.relatedUserContainer}>
        {this.renderUserImage(related_user)}

        <div className={classes.userInfoContainer}>
          <div>
            <a href={profileUrl} className="ac_link">
              <span className="text_heading">{name}</span>
            </a>
            {this.renderRelationInfo(related_user)}
          </div>

          <div
            className="text_caption"
            dangerouslySetInnerHTML={{__html: this.currentInfoText(related_user)}}
          ></div>
        </div>

        <div style={{clear: "both"}} />
      </div>
    );
  };

  renderArticle = (newsItem) => {
    const {classes} = this.props;
    const {
      external_url: newsUrl,
      image_url: imageUrl,
      title,
      description,
      site_url: siteUrl
    } = newsItem;

    let articleImage = null;
    if (imageUrl) {
      const imageUrlStyle = {backgroundImage: `url(${imageUrl})`}
      articleImage = (
        <div className={classes.articleImage} style={imageUrlStyle}></div>
      )
    }

    return (
      <div className={classes.articleContainer}>
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className={classes.articleLink}>
          {articleImage}

          <div className={classes.articleContenContainer}>
            <div className="text_heading">{title}</div>
            <div className={classnames(classes.articleDescription, "text_caption")}>
              {truncate(description, 200, 180)}
            </div>
            <div className="text_caption_light">{siteUrl}</div>
          </div>
        </a>
      </div>
    );
  };

  renderSingleNews = (newsItem, key) => {
    const {classes} = this.props;
    let {related_users} = newsItem;

    related_users = related_users ? related_users : [];

    return (
      <div key={key} className={classes.newsItemContainer}>
        {related_users.map(this.renderRelatedUser)}
        {this.renderArticle(newsItem)}
      </div>
    );
  };

  renderNews = () => {
    const {classes, scrollHeight} = this.props;

    let scrollStyle = {};
    if (this.props.scrollHeight) scrollStyle = {height: scrollHeight};

    if (lodash.isEmpty(this.state.news)) {
      return (
        <div style={{textAlign: "center", padding: "32 80"}}>
          No news found
        </div>
      );
    } else {
      return (
        <div className={classes.newsContainer} style={scrollStyle}>
          {this.state.news.map(this.renderSingleNews)}
        </div>
      );
    }
  };

  render() {
    const {metadata: {network_base_url, alumni_news_enabled}} = this.props;

    if (!alumni_news_enabled) return null;

    const viewAllUrl = URL.resolve(network_base_url, "/contributions/sneak_peek");
    return (
      <Section
        sectionHeading="Alumni in News"
        action={{name: "View All", url: viewAllUrl}}
        style={this.props.style}
      >
        {this.renderNews()}
      </Section>
    );
  }
}

AlumniNews.propTypes = {
  scrollHeight: PropTypes.number,
  style: PropTypes.object,
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    alumniNews: PropTypes.shape({
      enabled: PropTypes.bool
    }).isRequired,
  }).isRequired
}

export default withStyles(styles)(AlumniNews);
