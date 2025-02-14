import React from "react";
import PropTypes from 'prop-types';

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { withStyles } from '@material-ui/core/styles';

import defaultMetadata from './../defaultMetadata';

const styles = {
  subGrid: {
    width: "auto",
  },
  sectionContainer: {
    width: "100%",
    padding: 24,
    boxSizing: "border-box",
  },
  sectionHeading: {
    fontWeight: 900,
    lineHeight: 1.5,
    fontSize: 14,
    textTransform: "uppercase",
    color: defaultMetadata.theme.colors.charcoalGrey,
  },
  greenLine: {
    height: 2,
    width: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  actionLink: {
    display: "inline-block",
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 600,
    color: defaultMetadata.theme.colors.turquoise,

    "&:hover": {
      textDecoration: "underline",
    }
  }
};

class Section extends React.Component {
  render() {
    const {children, classes, sectionHeading, action} = this.props;
    let actionItem = null;
    if (action) {
      actionItem = (
        <a href={action.url} className={classes.actionLink} style={{color: this.props.theme.palette.primary.main}}>
          {action.name}
        </a>
      );
    }

    return (
      <Paper elevation={1} className={classes.sectionContainer} style={this.props.style}>
        <Grid container direction="row" justify="space-between" alignItems="baseline">
          <Grid container item direction="column" className={classes.subGrid}>
            <Grid item>
              <span className={classes.sectionHeading}>
                {sectionHeading}
              </span>
            </Grid>
            {/* <Grid item>
              <div className={classes.greenLine} style={greenLineStyle} />
            </Grid> */}
          </Grid>

          <Grid container item justify="center" alignItems="center" className={classes.subGrid}>
            {actionItem}
          </Grid>
        </Grid>
        <div className={classes.greenLine} style={{background: this.props.theme.palette.primary.main}}/>

        {children}
      </Paper>
    );
  }
}

Section.propTypes = {
  style: PropTypes.object,
  sectionHeading: PropTypes.string.isRequired,
  action: PropTypes.object,
};


export default (withStyles(styles, { withTheme: true })(Section))
