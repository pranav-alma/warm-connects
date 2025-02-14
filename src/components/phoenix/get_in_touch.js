import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url';
import axios from "axios";
import lodash from "lodash";

import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";

import defaultMetadata from "./../../base/defaultMetadata";

const styles = (theme) => {console.log(theme);return {
  git_title: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: "44px",
    textAlign: "center",
    color: "#3a3f42",
    paddingTop: "85px"
  },
  section_title_container: {
    textAlign: "center",
    maxWidth: 950,
    margin: "auto",
    borderBottom: "1px solid #e7eceb",
    paddingTop: "69px"
  },
  section_title_tab: {
    display: "inline-block",
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "24px",
    color: "#b6b9bb",
    paddingBottom: "15px",
    cursor: "pointer",
    paddingTop: 5,
    marginRight: 48,
    "&:last-child": {
      marginRight: 0
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: "18px",
      marginRight: 24,
    }
  },
  selected_tab: {
    color: "#3a3f42",
  },
  section_content_container: {
    maxWidth: 966,
    margin: "auto",
    paddingTop: 23,
  }
}}

class GetInTouch extends React.Component{
  constructor(){
    super();
    this.state = {
      active_sec: 0,
    }
  }
  changeSections = (section_number) => {
    this.setState({active_sec: section_number})
  }

  renderContent = () => {
    const {classes, getInTouch} = this.props;
    return(
      <div className={classes.section_content_container}>
        <div class="quill-content" style={{whiteSpace: "break-spaces" , textAlign: "left", padding: "34px 8px 135px"}} dangerouslySetInnerHTML={{__html: getInTouch.get_in_touch_sections[this.state.active_sec].section_content}}>
        </div>
      </div>
    )
  }

  render(){
    let comp = this;
    const {classes, getInTouch} = this.props;
    return(
      <React.Fragment>
        <div className={classes.git_title}>{getInTouch.title}</div>
        <div className={classes.section_title_container} >
          {getInTouch.get_in_touch_sections.map((section, index) => {
            return(
              <div className={(comp.state.active_sec == index) ? `${classes.section_title_tab} ${classes.selected_tab}` : classes.section_title_tab} style={{borderBottom: (comp.state.active_sec == index) ?  ("3px solid " + this.props.theme.palette.primary.main) : "none" }} onClick={() => comp.changeSections(index)}>
                {section.section_title}
              </div>
            )
          })}
        </div>
        {comp.renderContent()}
      </React.Fragment>
    )
  }
}
export default withWidth()(withStyles(styles, { withTheme: true })(GetInTouch))
