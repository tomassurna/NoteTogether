import './VideoLink.scss';
import React from 'react';
import ReactPlayer from 'react-player';

function VideoLink() {
    return (
        <div id="videolink">
            <div className="flex-container-column">
                <h1 className="heading">Note Together</h1>
            </div>
            <div className="grid">
                <div className="flex-container-column">
                    <div className="label">
                        Video Title 
                    </div>
                    <div className="video-box">
                        <ReactPlayer className = "video-player" url='https://www.youtube.com/watch?v=dQw4w9WgXcQ' controls={true}/>
                    </div>
                    <div className="selected">
                        Link Creator:
                    </div>
                </div>
                <div className="flex-container-column">
                    <div className="label">
                        Note Log
                    </div>
                    <div className="notes-section">
                        Notes
                    </div>
                    <div className="label"> 
                        <label>
                            <input type="radio" value="Dynamic" name="log-type" /> Dynamic
                        </label>
                        <label>
                            <input type="radio" value="Static" name="log-type" /> Static
                        </label>    
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default VideoLink;