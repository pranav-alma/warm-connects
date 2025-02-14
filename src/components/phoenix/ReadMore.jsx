import React from 'react'
import { useState } from 'react';

class ReadMore extends React.Component{
    constructor(){
        super();
        this.state = {
            isReadMore: true
        }
    }    
    renderLink = () => {
        const {isReadMore} = this.state;
        return (
            <span>... <span className='text_link' onClick={() => this.setState(s => ({isReadMore: !s.isReadMore}))}>{isReadMore ? "Read more" : "Read less"}</span></span>
        )
    }
    render(){
        if(!this.props.content) return <></>
        let {content} = this.props;
        const {isReadMore} = this.state;
        let limit = this.props.limit || 250;
        if(content.indexOf("<a") <= limit ){
            limit = Math.max(limit, content.indexOf("</a>") + 4);
        }
        content = isReadMore ? content.substring(0, limit) : content;
        content = "<span>"+ content + "</span>"
        return (
            <span>
                <span dangerouslySetInnerHTML={{__html: content}}>
                </span>
                {(this.props.content.length > limit ? this.renderLink() : null)}
            </span>
        )

    }

}

export default ReadMore