import './VideoLink.scss';
import React from 'react';
import Player from './Player';
import Notes from './Notes';

function VideoLink() {
    return (
        <div id="videolink">
            <div className="flex-container-column">
                <h1 className="heading">Note Together</h1>
            </div>
            <div className="grid">
                <Player name='Video Title' url='' creator='Link Creator'/>
                <Notes/>
            </div>
        </div>
    )
}

export default VideoLink;