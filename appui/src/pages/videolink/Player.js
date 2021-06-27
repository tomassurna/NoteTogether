import React, { Component } from 'react'
import ReactPlayer from 'react-player'

export default function Player ({name, url, creator, videoRef}) {

    return (
        <div className="flex-container-column">
            <div className="label">
                {name}
            </div>
            <div className="video-box">
                <ReactPlayer className="video-player"  ref={videoRef} url={url} controls={true}/>
            </div>
            <div className="selected">
                {creator}
            </div>
        </div>
        ) 
}
