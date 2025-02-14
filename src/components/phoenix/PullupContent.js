import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import defaultMetadata from "./../defaultMetadata";

const styles = (theme) => {return {
  pullupContainer: {
    paddingTop: 40,
    position: "relative"
  },
  pullupAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    backgroundColor: defaultMetadata.theme.colors.charcoalGrey
  },
  contentWrapper: {
    position: "relative",
  }
}};


class PullupContent extends React.Component {
  render() {
    const {classes, children, pullupSize} = this.props;

    let pullupStyle = {};
    if (pullupStyle) pullupStyle = {height: pullupSize};

    return (
      <div className={classes.pullupContainer}>
        <div className={classes.pullupAbsolute} style={pullupStyle} />
        <div className={classes.contentWrapper}>
          {children}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PullupContent);
