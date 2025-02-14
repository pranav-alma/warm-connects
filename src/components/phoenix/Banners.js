import React from 'react';
import PropTypes from 'prop-types';
import lodash from "lodash";

import Slider from "react-slick";
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import defaultMetadata from './../defaultMetadata';

import axios from "axios";
import URL from 'url';


const styles = {
  bannerImage: {
    backgroundSize: "cover",
    width: "100vw",
    paddingBottom: "44%",
    boxSizing: 'border-box',
  },
  bannetTextContainer: {
    minHeight: 240,
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    lineHeight: 1.5,
    backgroundColor: defaultMetadata.theme.colors.charcoalGrey,
  },
  bannerText: {
    marginRight: 24,
  },
  divider: {
    height: 2,
    margin: "auto",
    width: "60%",
  }
};



class Banners extends React.Component {

  initialState = {
    banners: []
  };

  constructor(props) {
    super(props);

    this.state = {...this.initialState};
  }


  componentDidMount() {
    const {metadata: {network_base_url}} = this.props;

    axios.get(URL.resolve(network_base_url, "/api/banners.json")).then((response) => {
      this.setState({banner_urls: response.data.banner_urls});
    });
  }

  bannerImageComponents = () => {
    const {classes} = this.props;

    if(lodash.isEmpty(this.state.banner_urls)) return null;

    return this.state.banner_urls.map((bannerImage, index) => {
      const inlineStyle = {backgroundImage: `url(${bannerImage})`, margin: (this.props.metadata.banner_image_type === 'large')?  "0px auto" : "0px", backgroundRepeat: "no-repeat", };
      return (
          <div key={index}>
            <img src={bannerImage} style={{width: "100%"}}></img>
          </div>
      );
    });
  };

  bannerTextFooter = () => {
    const {classes, metadata: {banner_text}} = this.props;
    var primary_text = "This is Primary text";
    var secondary_text = "this is secondary text";
    if(banner_text){
      primary_text = banner_text.primary_text;
      secondary_text = banner_text.secondary_text;
    }

    return (
      <div style={{padding: "0px 8px 8px"}}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={16}
          className="banner-text-container"
        >
          <Grid item className={classes.bannerText}>
            <div dangerouslySetInnerHTML={{__html: primary_text}} />
          </Grid>

          <Grid container item className={classes.bannerText}>
            <div className={classes.divider} style={{background: this.props.theme.palette.primary.main}}/>
          </Grid>

          <Grid item
            className={classes.bannerText}
            dangerouslySetInnerHTML={{__html: secondary_text}}>
          </Grid>
        </Grid>
      </div>
    )
  };

  render() {

    const sliderConfig = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      autoplaySpeed: 5000,
      dots: false,
      pauseOnHover: false,
    };

    return (
      <React.Fragment>
        <Slider {...sliderConfig}>
          {this.bannerImageComponents()}
        </Slider>
        {
          this.props.metadata.banner_text_enabled ? (
            <div style={{maxWidth: "100%", margin: '4px auto 0px'}}>
              {this.bannerTextFooter()}
            </div>
          ):null
        }
      </React.Fragment>
    )
  }
}

Banners.propTypes = {
  metadata: PropTypes.shape({
    networkBaseUrl: PropTypes.string.isRequired,
    bannerImages: PropTypes.array.isRequired,
    bannerText: PropTypes.shape({
      primaryText: PropTypes.string.isRequired,
      secondaryText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles, {withTheme: true})(Banners);
