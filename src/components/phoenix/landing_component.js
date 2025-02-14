import React, { Component } from 'react';
import PropTypes from 'prop-types';
import URL from "url";
import axios from "axios";
import lodash from "lodash";
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Root from "../../networks/IITD/Root";

const styles = {
  root: {
    height: "100%",
    width: "100%",
    margin: "auto",
    backgroundColor: "rgb(243, 244, 245)",
    minHeight: "100vh",
    fontFamily: ["Nunito Sans", "Roboto", "Helvetica", "Arial", "sans-serif"],
  }
};

class LandingComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      metadata: [],
      primary: '#ffa99c',
      secondary: '#02A89B'
    };
  }
  componentDidMount(){
    axios.get("https://www.almaconnect.com/api/metadata.json?website=" + window.location.host).then((response) => {
      let primary_col = response.data.data.theme.primary_color || '#ffa99c';
      let secondary_col = response.data.data.theme.secondary_color || '#02A89B';
      this.setState({metadata: response.data.data, primary: primary_col, secondary: secondary_col});
    });
  }
  render(){
    const {classes} = this.props;
    if(this.state.metadata.name === undefined) return null;
    const theme = createMuiTheme({
      palette: {
        primary:{
          main: this.state.primary
        },
        secondary:{
          main: this.state.secondary
        }
      },
      typography: {
        fontFamily: ["Nunito Sans", "Roboto", "Helvetica", "Arial", "sans-serif"],
        useNextVariants: true,
      },
      overrides: {
        MuiButton: {
          text: {
            borderRadius: 3,
            color: '#fff',
            background: this.state.primary,
            padding: '8px 24px',
            textTransform: 'capitalize',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            "&:hover":{
              background: this.state.secondary,
              cursor: 'pointer',
            },
            "&:disabled, &.disabled, &[disabled='disabled']":{
              background: '#acc4bf',
              opacity:0.2,
              cursor: 'default',
            }
          },
        },
      },
    });
    return(
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Root metadata = {this.state.metadata}/>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default withStyles(styles)(LandingComponent);
