import React from 'react'

class ConditionalRender extends React.Component{
  render() {
    if(this.props.if){
      return this.props.children;
    }
    return null;
  }
}

export default ConditionalRender;
