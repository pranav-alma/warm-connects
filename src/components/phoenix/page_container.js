import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url';
import axios from "axios";
import lodash from "lodash";

import {Helmet} from "react-helmet";
import { Redirect } from "react-router-dom"

import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import Grid from "@material-ui/core/Grid";

import PageContent from "./page_content"
import Footer from "./Footer";
import Header from "./Header";

import defaultMetadata from "./../../base/defaultMetadata";

const styles = (theme) => ({
  root: {
    height: "100%",
    width: "100%",
    // maxWidth: 1280,
    margin: "auto",
    backgroundColor: "rgb(243, 244, 245)",
    minHeight: "100vh",
    fontFamily: ["Nunito Sans", "Roboto", "Helvetica", "Arial", "sans-serif"],
  },
  container: {
    display: 'flex',
    paddingTop: 16,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'grid',
    }
  },
  left_column: {
    float: 'left',
    minWidth: 240,
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      padding: 'unset',
      paddingTop: 16
    }
  },
  box_shadow_content: {
    background: "#FFF",
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)',
    borderRadius: 3,
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      textAlign: 'center',
    }
  },
  box_spacing: {
    padding: 16,
    cursor: 'pointer',
  },
  footerContainer:{
    margin: 'auto'
  },
  footerContentContainer: {
    maxWidth: 1156,
    margin: 'auto',
    padding: '0 32px',
    color: defaultMetadata.theme.colors.battleshipGrey,
  },
  footerDivider: {
    backgroundColor: defaultMetadata.theme.colors.coolGrey,
    height: 1,
  },
  footerLinkSaperator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
  },
  footerToggleAlign: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-end',
      textAlign: 'right',
    }
  },
})

class PageContainer extends React.Component{
  constructor(){
    super();
    this.state = {
      page:{page_not_found: false},
      selected_section: 0,
      metadata: [],
    }
  }
  changeSections = (section_number) => {
    this.setState({selected_section: section_number})
  }

  componentDidMount(){    
    axios.get("https://www.almaconnect.com/api/page_metadata.json?website=" + window.location.host +"&page_address="+ this.props.match).then((response) => {            
      this.setState({page: response.data.data.page, metadata: response.data.data.metadata})
    });
  }

  renderFooter = () => {
    const {classes} = this.props;
    const {metadata} = this.state;
    return(
      <div style={{lineHeight: 1.5, marginTop: 40, background: '#fff'}}>
        <div className={classes.footerContainer}>
          <div className={classes.footerDivider} style={{height: 2}}></div>
          <div className={classes.footerDivider} style={{marginTop: 2, marginBottom: 24}}></div>
          <div className={classes.footerContentContainer}>
            <Grid container justify="center">
              <Footer metadata={metadata} />
            </Grid>
          </div>
        </div>
      </div>
    );
  };

  renderColumnsPageContent = () => {
    const {classes} = this.props;
    let comp = this;
    return(
      <div className={classes.container}>
        <div className={classes.left_column}>
          {this.state.page.section_tabs.map((val,index) => {
            return(
              <div className={classes.box_spacing} style={this.state.selected_section == index ? {backgroundColor: "#E7ECEB", borderLeft: `2px solid ${this.state.metadata.primary_color || '#00a99c'}`} : {}}onClick={() => comp.changeSections(index)}>
                {val.section_name}
              </div>
            )
          })}
        </div>
        <PageContent section_data={this.state.page.section_tabs[this.state.selected_section]}/>
      </div>
    )
  }
  renderScrollPageContent = () => {
    const {classes} = this.props;
    return(
      <div className={classes.container} style={{flexDirection: "column"}}>
        {this.state.page.section_tabs.map((val,index) => {
          return(
            <PageContent section_data={val} page_template={this.state.page.page_template}/>
          )
        })}
      </div>
    )
  }
  render(){
    const {classes} = this.props;
    let comp = this;
    if(this.state.page.page_not_found){
      return <Redirect to="/" />
    }
    if(!this.state.page.page_template) return(null)
    var favicon = "";
    if(this.state.metadata.favicon){
      favicon = this.state.metadata.favicon.url
    }
    let primary = this.state.metadata.primary_color || '#00a99c';
    let secondary = this.state.metadata.secondary_color || '#02A89B';
    const theme = createMuiTheme({
      palette: {
        primary:{
          main: primary,
        },
        secondary:{
          main: secondary
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
            background: primary,
            padding: '8px 24px',
            textTransform: 'capitalize',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            "&:hover":{
              background: secondary,
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
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <Header metadata={this.state.metadata} />
            <Helmet>
              <title>{this.state.page.page_title}</title>
              <link rel="shortcut icon" href={favicon} />
            </Helmet>
            <div style={{maxWidth: 1280, margin: 'auto'}}>
              {this.state.page.page_template =='Columns Format' ? this.renderColumnsPageContent() : null}
              {this.state.page.page_template =='Scroll Format' ? this.renderScrollPageContent() : null}
            </div>
            {this.renderFooter()}
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    )
  }
}

export default withWidth()(withStyles(styles)(PageContainer))
