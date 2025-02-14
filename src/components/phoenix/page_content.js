import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classnames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Section from './Section';


const styles = (theme) => ({
  content_section: {
    float: 'left',
    width: "100%",
    padding: 16,
    [theme.breakpoints.down('sm')]: {
      display: 'grid'
    }
  },
  middle_column:{
    width: '63%',
    padding: '16px 0px',
  },
  right_column: {
    width: '27%',
    padding: '16px 0px',
  },
  text_title:{
    fontWeight: 700,
    fontSize: 18,
    color: '#3a3f42',
  },
  userImageContainer: {
    marginTop: 4,
  },
  userImage: {
    maxWidth: "100%",
  },
  itemContainer: {
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
  },
})
class PageContent extends React.Component{
  constructor(){
    super();
  }
  renderColumnsFormat = () => {
    const {classes} = this.props;
    const quillClass = this.props.section_data.is_custom_html ? "" : "quill-content"
    return(
      <div className={classes.content_sectionfd} style={{display: "flex", width: "100%", padding: 24, boxSizing: "border-box"}}>
        <div style={{background: "#fff", boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)', borderRadius: 3, padding: 24, boxSizing: "border-box", width: this.props.section_data.right_column_content ? "63%" : "100%"}} className={(this.props.section_data.right_column_content ? classes.middle_column : "") + ` ${quillClass}`}>
          <div className={classes.text_title} style={{paddingBottom: 16, borderBottom: "1px solid rgba(182,185,187,0.6)", marginBottom: 24}}>
            {this.props.section_data.section_title}
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.section_data.middle_column_content}}>
          </div>
        </div>
        {
          this.props.section_data.right_column_content ? (
            <div style={{background: "#fff", boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)', borderRadius: 3, padding: 24, marginLeft: 24, height: 'max-content'}} className={classes.right_column + ` ${quillClass}`}>
              <div dangerouslySetInnerHTML={{__html: this.props.section_data.right_column_content}} >
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
  renderPeoplesFormat = () => {
    const {classes} = this.props;
    const quillClass = this.props.section_data.is_custom_html ? "" : "quill-content"

    return(
      <div className = {classes.content_section}>
        <div style={{background: "#fff", boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)', borderRadius: 3, padding: 24}}>
          <div className={classes.text_title} style={{paddingBottom: 16, borderBottom: "1px solid rgba(182,185,187,0.6)", marginBottom: 24}}>
            {this.props.section_data.section_title}
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.section_data.section_description}} className={quillClass}>
          </div>
          <div>
            <Grid container style={{maxWidth: "95%", margin: 'auto', paddingTop: 24}}>
              {
                this.props.section_data.associated_people.map(person =>{
                return(
                  <Grid item sm={3} align="center">
                    <ListItem className={classes.itemContainer}>
                      <Avatar className={classes.userImageContainer}>
                        <img src={person.picture? person.picture.url : ""} alt={person.name} className={classes.userImage}/>
                      </Avatar>
                      <ListItemText primary={person.name} secondary={person.current_designation} />
                    </ListItem>
                  </Grid>
                  )
                })
              }
            </Grid>
          </div>
        </div>
      </div>
    )
  }

  renderTilesFormat = () => {
    const {classes, section_data} = this.props;
    const quillClass = this.props.section_data.is_custom_html ? "" : "quill-content"
    return(
      <div  className={classes.content_section}>
        <div style={{background: "#fff", boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.1)', borderRadius: 3, padding: 24}}>
          <div className={classes.text_title} style={{paddingBottom: 16, borderBottom: "1px solid rgba(182,185,187,0.6)", marginBottom: 24}}>
            {this.props.section_data.section_title}
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.section_data.section_description}} className={quillClass}>
          </div>
        </div>
        <Grid container spacing={2} justify="flex-start">
          { section_data.tiles.map( tile => {
            return(
              <Grid item sm={6} md={4} style={{marginTop: 24}}>
                <a href={tile.tile_url} target="_blank">
                  <Section sectionHeading={tile.tile_title} style={{maxWidth: 300}}>
                    <img src={tile.tile_image.url} style={{maxWidth: 268, width: "100%"}}/>
                  </Section>
                </a>
              </Grid>
            )
            })
          }
        </Grid>
      </div>
    )
  }

  render(){
    const {classes, section_data} = this.props;
    return(
      <React.Fragment>
      {(section_data.section_template == "Columns Format") ? this.renderColumnsFormat() : null}
      {(section_data.section_template == "Peoples Format") ? this.renderPeoplesFormat() : null}
      {(section_data.section_template == "Tiles Format") ? this.renderTilesFormat() : null}
      </React.Fragment>
    )
  }
}

export default withWidth()(withStyles(styles)(PageContent))
