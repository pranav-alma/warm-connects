import React from "react";

import Paper from "@material-ui/core/Paper";

export default class Dummy extends React.Component {
  render() {
    const {children, height} = this.props;
    return (
      <Paper elevation={1} style={{width: "100%", paddingBottom: (height || 100)}}>
        {children}
      </Paper>
    );
  }
}
