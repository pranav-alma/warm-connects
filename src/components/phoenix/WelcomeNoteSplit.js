import React from "react";
import {Button} from '@material-ui/core';
import {
  ContentContainer
} from "./../../base/components/CommonComponents";

const WelcomeNoteSplit = (props) => {

    const {metadata:{theme, left_note_heading, right_note_heading, welcome_note_split_image_first, welcome_note_split_image_second,
        welcome_note_text_first, welcome_note_text_second, button_text_first, button_text_second, button_url_first, button_url_second}} = props.metadata;
 
    return (
        <div className="welcome_note_split">
        <ContentContainer style={{maxWidth: 456, margin: 0}}> 
          <div style={{backgroundColor: "#FFFFFF", height: "100%"}}>
            <div style={{padding: "24px 24px 0px"}}>
              {left_note_heading && 
                <>
                  <div style={{color: "#3a3f42", fontWeight: 900, fontSize: 18, lineHeight: "24px"}}>{left_note_heading}</div>
                  <div style={{background: theme.primary_color, height: 2,width: 16,marginTop: 4,marginBottom: 16}}/>
                </>
              } 
            </div>
            <div style={{display: "flex", padding: "24px", paddingTop: "0px"}}>
              {welcome_note_split_image_first != "" && <div style={{margin: "10px auto"}}>
                <img src={welcome_note_split_image_first.url} style={{width: "100px", paddingRight: 12}} ></img> 
              </div>}
              <div style={{maxWidth: 408}}>
                <div className="paragraph_text"
                  style={{fontSize: 14, lineHeight: "20px", fontWeight: 600, marginTop: 4}}
                  dangerouslySetInnerHTML={{ __html: welcome_note_text_first}}>
                </div>
                {button_text_first && 
                  <div style={{marginTop: 20}}>
                    <a href={button_url_first}><Button style={{fontSize: 12}} rel="noopener noreferrer" target="_blank" href={button_url_first}>{button_text_first}
                    </Button></a>
                  </div>
                }
              </div>
            </div>
          </div>
        </ContentContainer>
        <ContentContainer style={{maxWidth: 456, margin: 0}}> 
          <div style={{backgroundColor: "#FFFFFF", height: "100%"}}>
            <div style={{padding: "24px 24px 0px"}}>  
              {right_note_heading && 
                <>
                <div style={{color: "#3a3f42", fontWeight: 900, fontSize: 18, lineHeight: "24px"}}>{right_note_heading}</div>
                <div style={{background: theme.primary_color, height: 2,width: 16,marginTop: 4,marginBottom: 16}}/>
                </>
              }
            </div>
            <div style={{display: "flex", padding: "20px", paddingTop: "0px"}}>
              {welcome_note_split_image_second !== "" && <div style={{margin: "10px auto"}}>
                  <img src={welcome_note_split_image_second.url} style={{width: "100px", paddingRight: 12}} ></img> 
                </div>
              }
              <div style={{maxWidth: 408}}>
                <div className="paragraph_text"
                  style={{fontSize: 14, lineHeight: "24px", fontWeight: 600, marginTop: 4}} 
                  dangerouslySetInnerHTML={{ __html: welcome_note_text_second}}>
                </div>
                {button_text_second &&
                  <div style={{marginTop: 20}}>
                    <Button style={{fontSize: 12}} target="_blank" href={button_url_second}>{button_text_second}
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    );
}

export default WelcomeNoteSplit;