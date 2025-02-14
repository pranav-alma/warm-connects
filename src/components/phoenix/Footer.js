import React from "react";
import PropTypes from "prop-types";
import URL from "url";
import axios from "axios";
import lodash from "lodash";
import Grid from "@material-ui/core/Grid";
import Hidden from '@material-ui/core/Hidden';

import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import { withStyles } from '@material-ui/core/styles';
import defaultMetadata from "./../defaultMetadata";

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import Section from "./Section";
import footer_brand_logo from "./../images/footerBrandLogo.png";

const styles = (theme) => ({
  footerContainer: {
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
});

class Footer extends React.Component{

  lineBreaker(index, footerLinksPerLine){
    if((index+1)%footerLinksPerLine==0) return true;
    return false;
  }
  render(){
    const {classes, metadata:{twitter_link, facebook_link, linkedin_link, instagram_link, youtube_link, footer_copyright_name, footer_address_name, footer_address, footer_links_per_line, footer_links, logo, powered_by_enabled}} = this.props;
    var footerLinksPerLine = parseInt(footer_links_per_line);
    const addressComponent = (
      <React.Fragment>
      {
        footer_address.map((line) => (
          <span>{line.detail} <br/></span>
        ))
     }
     </React.Fragment>
    );
    const logoComponent = (
      <Grid container item xs={6} sm={4} direction="column" alignItems="right">
        <Grid item>
          <div style={{marginBottom: 40}}><img style={{maxHeight: 80}} src={logo.url} alt="Logo"/></div>
          <div style={{fontWeight: 900, marginBottom: 8}}>{footer_address_name}</div>
          <div style={{fontSize: 12, marginBottom: 8}}>
              {addressComponent}
          </div>
          <div style={{fontSize: 16, marginBottom: 16}}>
          {twitter_link ?
            (<a
              href={twitter_link}
              style={{marginRight: 8}}
              >
              <FaTwitter />
              </a>):(null)
            }
            {facebook_link ?
              (<a
              href={facebook_link}
              style={{marginLeft: 8, marginRight: 8}}
            >
              <FaFacebookF />
              </a>):(null)
            }
            {linkedin_link ?
              (<a
              href={linkedin_link}
              style={{marginLeft: 8, marginRight: 8}}
            >
              <FaLinkedinIn />
              </a>):(null)
            }
            {youtube_link ?
              (<a
              href={youtube_link}
              style={{marginLeft: 8, marginRight: 8}}
            >
              <FaYoutube />
              </a>):(null)
            }
            {instagram_link ?
              (<a
              href={instagram_link}
              style={{marginLeft: 8, marginRight: 8}}
            >
              <FaInstagram />
              </a>):(null)
            }

          </div>
        </Grid>
      </Grid>
    );
    const homeComponent = (
      <Hidden smDown>
            <a href="/" className="ac_link">Home</a>
            <span className={classes.footerLinkSaperator}>|</span>
            <a href="http://www.almaconnect.com/privacy_policy_20120807.pdf" className="ac_link">Privacy</a>
      </Hidden>
    );
    const linkComponent = (
      <React.Fragment>
      {
        (
          <Grid item xs style={{fontSize: 14, fontWeight: 600, textAlign: "right"}}>
          {footer_links.map((link,index) => (
            <React.Fragment>
              <a href={link.url} className="ac_link">{link.name}</a>
                { //console.log(lineBreaker(index, footerLinksPerLine));
                  this.lineBreaker(index, footerLinksPerLine) ? (
                    <br/>
                ):(
                <span className={classes.footerLinkSaperator}>|</span>)
                }
              </React.Fragment>
          ))}
          {homeComponent}
          </Grid>
        )
      }
      </React.Fragment>
    );

    const linkComponentSmall = (
      <React.Fragment>
      {
        (
          <Grid item xs style={{fontSize: 14, fontWeight: 600, textAlign: "right"}}>
          {
            footer_links.map((link,index) => (
            <React.Fragment>
              <a href={link.url} className="ac_link">{link.name}</a>
                <br/>
              </React.Fragment>
          ))
          }
          {homeComponent}
          </Grid>
        )
      }
      </React.Fragment>
    );

    const copyRightComponent=(
        <Grid item xs style={{margin: "auto"}} >
          <div style={{fontSize: 12, paddingTop: 15, paddingBottom: 24}}>
            Copyright ©2020 {footer_copyright_name}. All rights reserved.
          </div>
        </Grid>
    );

    return(
      <React.Fragment>
        {logoComponent}
        <Grid container item xs direction="row">
          {
            isWidthUp("md", this.props.width) ? (
              <React.Fragment>{linkComponent}</React.Fragment>
            ):(
              <React.Fragment>{linkComponentSmall}</React.Fragment>
            )
          }
        </Grid>
        <Grid container>
        {copyRightComponent}
          {
            powered_by_enabled? 
            (<Grid item xs style={{marginTop: "auto"}}>
              <div ><img style={{maxHeight: 100, maxWidth: "100%", float: "right"}} src={footer_brand_logo} alt="Logo"/></div>
            </Grid>) : <></>
          }
        </Grid>
      </React.Fragment>
    );
  }
}
export default withWidth()(withStyles(styles)(Footer));
