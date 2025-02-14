import React from "react";
import PropTypes from "prop-types";
import URL from "url";
import axios from "axios";
import lodash from "lodash";

import { withStyles } from '@material-ui/core/styles';
import defaultMetadata from "./../defaultMetadata";
import card_border from "./../images/card_border_bg.png"
import RightMove from "../images/RightMove.png";
import LeftMove from "../images/LeftMove.png";


const styles = (theme) => {return {
  vertical_middle: {
    height: "100%",
    verticalAlign: "middle",
    display: "inline-block",
  }
}};

class NewsLetter extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      newsletters: [],
      scrollPosition: 0
    };
  }

  componentDidMount(){
    const {metadata: {network_base_url}} = this.props;

    axios.get(URL.resolve(network_base_url,"/api/newsletters.json")).then((response) => {
      this.setState({newsletters: response.data.data});
    });
  }

  renderSingleNewsLetter = (newsletter, key) => {
    const {classes} = this.props;
    const {
      asset: { url: newsletter_file_url } = {},
      image: { url: newsletter_image_url } = {},
      upload_link,
      upload_type
    } = newsletter;
    return (
        <div key={key} style = {{display: "inline-block", marginRight: 24, marginLeft: 24, position: "relative"}}>
            <img src={card_border} style={{display: "block", maxWidth: 178, maxHeight: 226}} />
            <a href={(upload_type == "Upload_pdf")? newsletter_file_url : upload_link} style={{position: "absolute", height: "100%", width: "100%", top: 12, left: 0, textAlign: "center"}}>
              <img src={newsletter_image_url} style={{display: "inline-block", maxWidth: 148, maxHeight: 202}} />
            </a>
        </div>
    );
  };

  scrollLeft = () => {
    const container = document.getElementById("scrollContainer");
    container.scrollTo({
      left: container.scrollLeft - 350,
      behavior: "smooth",
    });
  
    this.setState((prevState) => {
      return {
        scrollPosition: prevState ? prevState.scrollPosition - 1 : 0,
      };
    });
  }
  
  scrollRight = () => {
    const container = document.getElementById("scrollContainer");
    container.scrollTo({
      left: container.scrollLeft + 350,
      behavior: "smooth",
    });
  
    this.setState((prevState) => {
      return {
        scrollPosition: prevState ? prevState.scrollPosition + 1 : 0,
      };
    });
  }  

  renderNewsLetters = () => {
    let newsLettersComponent = null;
    const { scrollPosition } = this.state;
    const {metadata: {newsletters_heading}} = this.props;
      if(!lodash.isEmpty(this.state.newsletters)){
        newsLettersComponent = this.state.newsletters.map(this.renderSingleNewsLetter);
      }
    return(
      <div style={{maxWidth: 966,margin: "auto"}}>
         <div className="text_title" style={{padding: "64px 0px 24px 34px",fontWeight: 900, lineHeight: "20px"}}>
            {newsletters_heading}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{scrollPosition >0 && <img src={LeftMove} onClick={this.scrollLeft} style={{cursor: "pointer", paddingBottom: 80, paddingRight: 8}}></img>}
          </div>
          <div
            id="scrollContainer"
            style={{
              textAlign: 'center',
              marginBottom: 80,
              padding: '0px 8px 0px',
              overflow: 'hidden',
              display: 'flex',
              overflowY: 'hidden'
            }}
          >
            {newsLettersComponent}
          </div>
          <div>
          {scrollPosition < (this.state.newsletters.length - 1) && <img src={RightMove} onClick={this.scrollRight} style={{ cursor: "pointer", paddingBottom: 80, paddingLeft: 8 }}></img>}
          </div>
        </div> 
      </div>
    );
  };

  render(){
    const {classes, metadata: {network_base_url, newsletters_enabled}, scrollHeight} = this.props;
    if(!newsletters_enabled) return null;
    return(
      <div>
      {this.renderNewsLetters()}
      </div>
    );
  }
}

NewsLetter.propTypes = {
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    newsletter: PropTypes.shape({
       enabled: PropTypes.bool,
     }).isRequired
  }).isRequired
}
export default withStyles(styles)(NewsLetter);
