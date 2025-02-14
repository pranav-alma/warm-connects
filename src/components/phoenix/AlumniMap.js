import React from "react";
import PropTypes from "prop-types";
import URL from "url";

import Grid from "@material-ui/core/Grid";

import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'


const styles = (theme) => {return {
  chaptersContentAbsolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    boxSizing: "border-box",
    padding: 32,
  },
  alumni_chapter_text: {
    fontSize: 32,
    fontWeight: 700,
    color: "#FFF"
  },
  '@media (max-width: 650px)': {
    network_btn: {
      display: "none",
    },
    alumni_chapter_text: {
      fontSize: 24,
    },
    chaptersContentAbsolute: {
      padding: 12,
    },
  },
  '@media (max-width: 450px)': {
    alumni_chapter_text: {
      fontSize: 12,
    },
  },
}};



class AlumniMap extends React.Component {
  render() {
    const {classes, metadata: {network_base_url, alumni_map_enabled, alumni_chapters, alumni_chapters_title}} = this.props;

    if (!alumni_map_enabled) return null;
    var alumni_chapters_image = "";
    if(alumni_chapters){
        alumni_chapters_image = alumni_chapters.url;
    }
    let default_style = {backGroundColor: '#fff', position: 'relative'}
    let computed_style= {...default_style, ...this.props.style}
    return (
      <div style={computed_style}>
        <a href={URL.resolve(network_base_url, "/directory/map")}>
          <img src={alumni_chapters_image} alt="Alumni Chapters" style={{width: "100%", display: "block"}}/>

          <div className={classes.chaptersContentAbsolute}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <div className={classes.alumni_chapter_text}>
                  {alumni_chapters_title}
                </div>
              </Grid>

              <Grid item>
                  <Button className={classes.network_btn}>Explore & Network with Alums</Button>
              </Grid>
            </Grid>
          </div>

        </a>

      </div>
    );
  }
}


AlumniMap.propTypes = {
  metadata: PropTypes.shape({
    network_base_url: PropTypes.string.isRequired,
    alumniMap: PropTypes.shape({
      enabled: PropTypes.bool,
      image: PropTypes.string,
    }).isRequired
  }).isRequired
}

export default withStyles(styles)(AlumniMap);
