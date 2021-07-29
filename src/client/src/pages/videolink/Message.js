import React from 'react'

class Message extends React.Component {
  render() {
    let tagStyle = {}
    switch (this.props.tag) {
      case "Question":
        tagStyle = {color: "red"}
        break;
      case "Note":
        tagStyle = {color: "black"}
        break;
      case "Answer":
        tagStyle = {color: "blue"}
        break;
      default:
        tagStyle = {color: "black"}
        break;
    }
    return (
      <>
        <div className="message" key={this.props.index}>
          <span>{this.props.timestamp}</span>
          <span>  </span>
          <span style={tagStyle}>{this.props.tag}</span>
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