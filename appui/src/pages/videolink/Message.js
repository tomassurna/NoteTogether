import React, { useEffect, useState } from 'react'

class Message extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="message" key={this.props.index}>
          <span>{this.props.timestamp}</span>
          <br />
          <span>
            <span className="message-name">{this.props.name}</span>
            <span> : </span>
            <span>{this.props.message}</span>
          </span>
        </div>
      </>
    )
  }
}

export default Message
