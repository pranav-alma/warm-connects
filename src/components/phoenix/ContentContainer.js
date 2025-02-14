import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {return {
  contentContainer: {
    maxWidth: 960,
    margin: "auto",
    padding: '24px 0px',
  }
}};


class ContentContainer extends React.Component {
  render() {
    return (
      <div className={this.props.classes.contentContainer} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
export default withStyles(styles)(ContentContainer);
