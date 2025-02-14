import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';

import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'

import {Helmet} from "react-helmet";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import DropItem from "./DropItem";
import defaultMetadata from "./../defaultMetadata";


const styles = theme => ({
  headerRoot: {
    background: "#fff",
  },
  headerContent: {
    maxWidth: 1280,
    margin: 'auto',
    height: 80,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    [theme.breakpoints.down(720)]: {
      padding: '0 16px'
    },
    [theme.breakpoints.down(1281)]:{      
      maxWidth: 1120,      
      padding: '0px 24px'
    }
  },
  subGrid: {
    width: "auto",
  },
  logo: {
    maxHeight: 64,
    marginRight: 24,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  networkTitle: {
    fontWeight: 700,
    fontSize: 24,
  },
  titleCaption: {
    fontSize: 16,
    lineHeight: '1.5em',
  },
  menuDrawerContainer: {
    width: 200
  },
  menuIcon: {
    cursor: 'pointer'
  },
  menuLink: {
    color: defaultMetadata.theme.colors.battleshipGrey,
  },
  menuLinkExpanded: {
    marginLeft: 16,
    marginRight: 16,
  },

  double_line_nav_content:{
    maxWidth: 1280,
    margin: 'auto',
    color: "#fff",
    height: 48,
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'uppercase',
    boxSizing: 'unset',

    [theme.breakpoints.down(1281)]:{      
      padding: '0px 24px',
      maxWidth: 1120,      
    }
    
  },
  double_line_ac_link:{
    color: "#fff",
    width: "100%",
    height:"100%",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    padding: '0px 16px',
    "&:hover":{
      background: theme.palette.secondary.main,
      textDecoration: "none",      
    }
  },
  double_line_menu_link:{
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    height:"100%",
    display: "flex",
    "&:hover":{
      minWidth: "max-content"
    }
  },
  double_line_link_name:{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "0px 4px",
    display: "inline"
  }
});


class Header extends React.Component {
  constructor(){
    super();
    this.state = {
    menuOpen: false,
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

  toggleMenuDrawer = (open) => () => {
    this.setState({menuOpen: open});
  }

  renderLogoAndTitle() {
    const {classes, metadata} = this.props;
    const {logo, primary_header_title, secondary_header_title} = metadata;

    return (
      <React.Fragment>
        <Grid item>
          <a href="/">
            <img className="header-logo" src={logo.url} alt="logo" />
          </a>
        </Grid>
        <Grid item className={classes.titleContainer}>
          <Grid item>
            <a href="/" className="network-title">{primary_header_title}</a>
          </Grid>
          <Grid item>
            <a href="/" className="title-caption">{secondary_header_title}</a>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  renderMenuAndLoginExpanded() {
    const {classes, metadata: {main_menu_items, network_base_url, institute_list, multiple_institutes}} = this.props;
    const menuItemComponents = main_menu_items.map((menuItem, index) => {
      if(!menuItem.dropdown){
        return (
            <Grid item key={index} className={classnames(classes.menuLink, classes.menuLinkExpanded)}>
              <a href={menuItem.menuItemList[0].url} target="_blank" className="ac_link" style={{padding: "0px 4px", paddingBottom: "5px"}}>{menuItem.menuItemList[0].name}</a>
            </Grid>
        );
      }
      else{
        return(
          <DropItem index={index} menuItem={menuItem}/>
       )
      }
    });
    const loginComponent = (
      <Grid item key="login" style={{marginLeft: 16}}>
        <Button style={{fontSize: 16}} href={network_base_url}>Login/Signup</Button>
      </Grid>
    );
    const loginComponentMult = (
      <Grid item className = "dropdown">
        <Button className = "ac_button" style={{padding: "12px 68px"}} onClick = {this.toggleDropdownMenu}>Login/Signup</Button>
          {
            this.state.dropOpen ? (
            <ul className = "drop_ul">{institute_list.map((inst, index)=>(
              <a className = "drop_a" href={inst.url} target="_blank"><li className = "drop_li">{inst.name}</li></a>))}
            </ul>
          ): (null)
        }
      </Grid>
    );

    return (
        <React.Fragment>
          {menuItemComponents}
          {multiple_institutes ? (loginComponentMult) : (loginComponent)}
        </React.Fragment>
    );
  };

  renderMenuAndLoginList() {
    const {classes, metadata: {main_menu_items, network_base_url,institute_list, multiple_institutes}} = this.props;

    const menuItemComponents = main_menu_items.map((menuItem, index) => {
        if(!menuItem.dropdown)
          {
            return(
            <ListItem key={index} className={classes.menuLink} button component="a" href={menuItem.menuItemList[0].url} >
            <ListItemText primary={menuItem.menuItemList[0].name} />
          </ListItem>
          )
        }
        else{
          return(
            <DropItem index={index} menuItem={menuItem} mobile={true}/>
         )
        }
    });
    const loginComponent = (
      <ListItem key="login" button component="a" href={network_base_url} className={classes.menuLink}>
        <ListItemText primary="Login/Signup" />
      </ListItem>
    );

    const loginComponentMult = (
      <Grid item >
        <div className = {classnames("ac_button")}  onClick = {this.toggleDropdownMenu}>Login/Signup</div>
          {this.state.dropOpen ? (
            <ul className = "drop_ul">{institute_list.map((inst, index)=>(
              <a className = "drop_a" href = {inst.url} target="_blank"><li className = "drop_li">{inst.name}</li></a>))}
            </ul>
          ): (null)
        }
      </Grid>
    );

    return (
      <div className={classes.menuDrawerContainer}>
        <List>{menuItemComponents}</List>
        <Divider />
        {multiple_institutes ? (<List>{loginComponentMult}</List>) : (<List>{loginComponent}</List>)}
      </div>
    );
  };

  renderMenuAndLogin() {
    const {classes} = this.props;
    if (isWidthUp("md", this.props.width)) {
      return this.renderMenuAndLoginExpanded();
    } else {
      const list = this.renderMenuAndLoginList();
      return (
        <React.Fragment>
          <IconButton className={classes.menuIcon} onClick={this.toggleMenuDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={this.state.menuOpen} onClose={this.toggleMenuDrawer(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      );
    }
  };

  renderDoubleLineMenuAndLoginExpanded(){
    const {classes, metadata: {network_base_url, institute_list, multiple_institutes}} = this.props;
    const loginComponent = (
      <Grid item key="login" style={{marginLeft: 16}}>
        <Button href={network_base_url} target="_blank">Login/Signup</Button>
      </Grid>
    );
    const loginComponentMult = (
      <Grid item className = "dropdown">
        <Button className = "ac_button" style={{padding: "12px 68px"}} onClick = {this.toggleDropdownMenu}>Login/Signup</Button>
          {
            this.state.dropOpen ? (
            <ul className = "drop_ul">{institute_list.map((inst, index)=>(
              <a className = "drop_a" href = {inst.url} target="_blank"><li className = "drop_li">{inst.name}</li></a>))}
            </ul>
          ): (null)
        }
      </Grid>
    );

    return(
      <React.Fragment>
        {multiple_institutes ? (loginComponentMult) : (loginComponent)}
      </React.Fragment>
    )
  }

  renderDoubleLineFirstLine(){
    const {classes} = this.props;
    if (isWidthUp("md", this.props.width)) {
      return this.renderDoubleLineMenuAndLoginExpanded();
    } else {
      const list = this.renderMenuAndLoginList();
      return (
        <React.Fragment>
          <IconButton className={classes.menuIcon} onClick={this.toggleMenuDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={this.state.menuOpen} onClose={this.toggleMenuDrawer(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      );
    }
  }

  renderDoubleLineMenu(){
    const {classes, metadata: {main_menu_items, header_template}} = this.props;

    const menuItemComponents = main_menu_items.map((menuItem, index) => {
      if(!menuItem.dropdown){
        return (
            <Grid item key={index} className={classnames(classes.menuLink, classes.menuLinkExpanded, classes.double_line_menu_link)}>
              <div className={[classes.double_line_ac_link, "ac_link"].join(" ")}>
                <a href={menuItem.menuItemList[0].url} target="_blank" className={classes.double_line_link_name}>{menuItem.menuItemList[0].name}</a>
              </div>
            </Grid>
        );
      }
      else{
        return(
          <DropItem index={index} menuItem={menuItem} headerTemplate={"Double liner"}/>
       )
      }
    });
    return(
      <React.Fragment>
        <div style={{background: this.props.theme.palette.primary.main}}>
          <Grid className={classes.double_line_nav_content} container direction="row" spacing={0} alignItems="center">            
            {menuItemComponents}            
          </Grid>
        </div>
      </React.Fragment>
    )
  }

  renderDoubleLinerHeader(){
    const {classes} = this.props;
    return(
      <div className={classes.headerRoot}>
        <div className={classes.headerContent}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid container className={classes.subGrid}>
              {this.renderLogoAndTitle()}
            </Grid>
            <Grid container className={classes.subGrid} alignItems="center">
              {this.renderDoubleLineFirstLine()}
            </Grid>
          </Grid>
        </div>
        {isWidthUp("md", this.props.width) ? this.renderDoubleLineMenu() : null}
      </div>
    )
  }

  renderStandardHeader(){
    const {classes} = this.props;
    return(
      <div className={classes.headerRoot}>
        <div className={classes.headerContent}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid container className={classes.subGrid}>
              {this.renderLogoAndTitle()}
            </Grid>
            <Grid container className={classes.subGrid} alignItems="baseline">
              {this.renderMenuAndLogin()}
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }

  renderMetaTags(){
    return(
      <Helmet>
        {this.props.metadata.static_meta_tags.map((tag) => {
          return(
            <meta name={tag.tag_name} content={tag.tag_content}/>
          )
        })}
      </Helmet>
    )
  }

  render() {
    let {classes, metadata: {header_template}} = this.props;
    return(
      <React.Fragment>
        {this.props.metadata.static_meta_tags ? this.renderMetaTags() : null}
        {header_template == "Standard" ? (this.renderStandardHeader()) : null}
        {header_template == "Double liner" ? (this.renderDoubleLinerHeader()) : null}
      </React.Fragment>
    )
  }
}



Header.propTypes = {
  metadata: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    network_base_url: PropTypes.string.isRequired,
    mainMenuItems: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Header));
