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
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import GreyArrowDown from "../images/greyarrowdown.png";
import WhiteArrowDown from "../images/whitearrowdown.svg";

import defaultMetadata from "./../defaultMetadata";

const styles = theme => ({
  menuLink: {
    color: defaultMetadata.theme.colors.battleshipGrey,
  },
  menuLinkExpanded: {
    marginLeft: 16,
    marginRight: 16,
  },
  drop_arrow:{
      "before":{content:"",
      position: "absolute",
      width:0,
      height:0,
      border: "8px solid",
      borderColor: "white transparent transparent transparent",
      right:30,
      top:30,}
 },

 double_line_dropdown:{
   height: "100%",
   margin: 0,
   justifyContent: "center",
   display: "flex",
   "&:hover":{
     minWidth: "max-content"
   }
 },

 double_line_drop_ac_link:{
   height: "100%",
   display: "flex",
   alignItems: "center",
   width: "100%",
   justifyContent: "center",
   color: '#fff',
   padding: '0px 16px',
   "&:hover":{
      background: theme.palette.secondary.main,
      textDecoration: "none",
   }
 },

 ac_link_no_underline:{
  cursor: "pointer",
  "&:hover":{
     textDecoration: "none",
  }
},
 double_line_drop_li:{
   color: '#fff',
   "&:hover":{
      textDecoration: "none",
   }
 }
});


class DropItem extends React.Component{
  constructor(){
    super();
    this.state = {
      dropOpen: false,
      minUlWidth: 0,
    };
    this.toggleDropdownMenu = this.toggleDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    this.toggleMobileDropdownMenu = this.toggleMobileDropdownMenu.bind(this);
    this.hideMobileDropdownMenu = this.hideMobileDropdownMenu.bind(this);
    this.dropdownBoxRef = React.createRef();
  };
  toggleDropdownMenu(event) {
    event.preventDefault();
    this.setState({ dropOpen: true });
  }
  toggleMobileDropdownMenu(event) {
    event.preventDefault();
    this.setState({ dropOpen: true} , () => {
    document.addEventListener('click', this.hideMobileDropdownMenu);
  });
  }

  componentDidMount() {
    const dropdownBoxWidth = this.dropdownBoxRef.current.clientWidth;
    this.setState({ minUlWidth: dropdownBoxWidth });
  }

  hideDropdownMenu() {
    this.setState({ dropOpen: false });
  }
  hideMobileDropdownMenu() {
    this.setState({ dropOpen: false}, () => {
      document.removeEventListener('click', this.hideMobileDropdownMenu);
    });
  }

  render(){
    const {classes,index, menuItem, mobile} = this.props;
    let backgroudcolor = "#fff"
    let dropgridclasses = [classes.menuLink, classes.menuLinkExpanded, "dropdown"]
    let dropnameclasses = ["ac_link"]
    let drop_li_classes = ["drop_li"]
    let isDoubleLiner = (this.props.headerTemplate=="Double liner")? true : false;
    let border_radius = "0px";
    if(this.props.headerTemplate=="Double liner"){
      backgroudcolor = this.props.theme.palette.primary.main
      dropnameclasses = [classes.double_line_drop_ac_link, "ac_link"]
      drop_li_classes = [classes.double_line_drop_li, "drop_li"]
      border_radius = "4px"
      dropgridclasses = [classes.menuLink, classes.menuLinkExpanded, classes.double_line_dropdown, "dropdown"]
    }
    if(this.props.headerTemplate != "Double liner"){
      dropnameclasses = [classes.ac_link_no_underline, "ac_link"]
      border_radius = "8px";
    }
    if(!mobile){
    return(
      <Grid item key={index} className={dropgridclasses.join(" ")} onMouseEnter = {this.toggleDropdownMenu} onMouseLeave={this.hideDropdownMenu}>
        <div className={dropnameclasses.join(" ")}>
          <div ref={this.dropdownBoxRef} style={{display: "flex", alignItems: "center", margin: (this.props.headerTemplate == "Double liner")? "0px": "0px 0px 6px"}}>
            <span style={{whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis", padding: "0px 4px"}}>{menuItem.dropname}</span>
            <img src={(isDoubleLiner)? WhiteArrowDown : GreyArrowDown} style={{ transform: this.state.dropOpen ? "rotate(180deg)" : "", width: !(isDoubleLiner)? "9px" : "", marginLeft: 4 }}></img>
          </div>
          {this.state.dropOpen ?(
              <ul className="drop_ul" style={{minWidth: `max(${this.minUlWidth}px, ${Math.max(...menuItem.menuItemList.map(drop_item => drop_item.name.length))}em)`, width: "max-content", textAlign: "left", left:0, background: "#fff", borderBottomLeftRadius: border_radius, borderBottomRightRadius: border_radius}}>{menuItem.menuItemList.map((drop_item, idx) =>(
                <a href={drop_item.url} className="drop_a"><li className={drop_li_classes.join(" ")} style={{color: "#707274", borderBottomLeftRadius: idx == menuItem.menuItemList.length -1 ? border_radius : 0, borderBottomRightRadius: idx == menuItem.menuItemList.length - 1 ? border_radius : 0 }}>{drop_item.name}</li></a>
              ))}
              </ul>
          ):(null)}
        </div>
      </Grid>
    );
    }
    else {
      return(
        <List style={{clear: "both", padding: "11px 16px 11px 16px"}}>
          <a className="ac_link" onClick = {this.toggleMobileDropdownMenu} >{menuItem.dropname}
          {this.state.dropOpen ?(
              <ul className="drop_ul" style={{display: "inline-table"}}>{menuItem.menuItemList.map((drop_item, item) =>(
                <a href={drop_item.url} className="drop_a"><li className="drop_li">{drop_item.name}</li></a>
              ))}
              </ul>
          ):(null)}
          </a>
      </List>
      );
    }
  };

};
export default withWidth()(withStyles(styles, {withTheme: true})(DropItem));
