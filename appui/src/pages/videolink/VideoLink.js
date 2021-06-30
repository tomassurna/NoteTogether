import './VideoLink.scss';
import React from 'react';
import Player from './Player';
import Notes from './Notes';
import { useRef } from 'react';

function VideoLink() {

    const videoRef = useRef(null);

    return (
        <div id="videolink">
            <div className="flex-container-column">
                <h1 className="heading">Note Together</h1>
            </div>
            <div className="grid">
                <Player name='Video Title' url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' creator='Link Creator' videoRef={videoRef}/>
                <Notes videoRef={videoRef}/>
            </div>
        </div>
    )
}

export default VideoLink;