import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import classnames from "classnames";
import {Button} from '@material-ui/core'


const styles = {
  networkAndLoginContainer: {
    backgroundColor: "#fff",    
    width: "100%",
    padding: 24,
    boxSizing: "border-box",
    textAlign: "center",
  },
  collage: {
    maxWidth: "100%",
    width: 384,
  },
  loginPrompt: {
    fontSize: 24,
    maxWidth: 400,

    b: {
      fontWeight: 700,
    },
    '@media (max-width: 450px)': {
      fontSize: 16,
      maxWidth: 250,
    },
  },
  largeLoginButton: {
    display: "inline-block",
    padding: '13px 110px',
    // padding: '1em 5em',
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '30px',
    '@media (max-width: 450px)': {
      padding: '13px 80px'
    },
  },
};

class NetworkAndLogin extends React.Component {
  constructor(){
    super();
    this.state = {
    dropOpen: false,
  };
  this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  };
  toggleDropdownMenu(event) {
    event.preventDefault();
    this.setState({ dropOpen: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ dropOpen: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });
  }
  render() {
    const {classes, metadata, metadata: {network_base_url, network_and_login_enabled, network_and_login_text, network_and_login, multiple_institutes, institute_list, powered_by_enabled}} = this.props;
    var collage_url = "";
    if(metadata.collage){
      collage_url = metadata.collage.url;
    }

    const collage = (<img src={collage_url} className={classes.collage} alt="collage"/>);

    const loginContent = (
      <div style={{padding: 12}}>
        <Grid container direction="column" spacing={24} justify="center" alignItems="center">
          <Grid item>
            <div className={[classes.loginPrompt]} dangerouslySetInnerHTML={{__html: network_and_login_text}} style={{margin: "-1em"}}></div>
          </Grid>
          {multiple_institutes ?(          
          <div item className="dropdown" style = {{display: 'flex', alignItems: 'center', padding: 0}}>
            <div className = {classnames("drop_button", classes.largeLoginButton)} style = {{display: 'flex', alignItems: 'center'}}onClick = {this.toggleDropdownMenu}>
              <div>
                Select Institute/Login
              </div>
              <div className='drop_button_caret'>

              </div>
            </div>
              {this.state.dropOpen ? (
                <ul className = "drop_ul" style={{zIndex: 99}}>{institute_list.map((inst, index)=>(
                  <a className = "drop_a" href = {inst.url}><li className = "drop_li">{inst.name}</li></a>))}
                </ul>
              ): (null)
            }
          </div>
          ):
            (
              <Grid item>
                <Button target="_blank" className={classnames("ac_button", classes.largeLoginButton)} href={network_base_url}>Login/Signup</Button>
              </Grid>
            )
          }
          {
            powered_by_enabled? 
            (<Grid item style={{paddingTop: multiple_institutes ? 12 : 0}}>
              <span className="text_caption_light">
                Powered by <a href="https://www.almaconnect.com/" className="ac_link">AlmaConnect</a>
              </span>
            </Grid>) : <></>
          }
        </Grid>
      </div>
    );

    return (
      <Paper className={classes.networkAndLoginContainer}>
        <div style={{padding: 12}}>
          <Grid container direction="row" spacing={24} justify="center" alignItems="center">
            <Grid item>
              {collage}
            </Grid>
            <Grid item>
              {loginContent}
            </Grid>
          </Grid>
        </div>
      </Paper>
    );
  }
}



NetworkAndLogin.propTypes = {
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    networkAndLogin: PropTypes.shape({
      enabled: PropTypes.bool,
      college: PropTypes.string,
    }).isRequired,
  }).isRequired
};

export default withStyles(styles)(NetworkAndLogin);
