import './VideoLink.scss';

function VideoLink() {
    return (
        <div id="videolink">
            <div className="flex-container-column">
                <h1 className="heading">Note Together</h1>
            </div>
            <div className="flex-container-row">
                <div className="flex-container-column">
                    <div className="label">
                        Video Title 
                    </div>
                    <div className="video-player">
                        Video Player
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