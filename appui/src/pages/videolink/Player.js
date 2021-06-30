import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import './VideoLink.scss'

class Player extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    this.state = {
      name: props.name,
      videoRef: props.videoRef,
      url: props.url,
      creator: props.creator,
    }
  }

  render() {
    return (
      <>
        <ReactPlayer
          width="100%"
          height="100%"
          ref={this.state.videoRef}
          url={this.state.url}
          controls={true}
        />
      </>
    )
  }
}

export default Player
