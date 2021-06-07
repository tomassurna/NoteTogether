import './Home.scss';
import UploadImage from "../../assets/upload.svg"

function Home() {
  return (
    <div id="home" className="flex-container">
        <h1 className="heading">Note Together</h1>
        <h2 className="instructions">Upload your own video to enter a Youtube video link!</h2>
        <div className="video-section">
            <input className="youtube-link" placeholder="Put Youtube Link here"></input> 
            <h1 className="or-text">OR</h1>
            <img className="upload-icon" src={UploadImage} width="53.90" height="71.87"></img>
        </div>
        <h2 className="instructions">Enter a title and upload!</h2>
        <div className="title-section">
            <input className="video-title" placeholder="Enter Video Title here"></input>
            <button className="upload-button">Upload</button>
        </div>
        
    </div>
  );
}

export default Home;