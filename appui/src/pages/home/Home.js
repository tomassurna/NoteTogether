import './Home.scss';
import UploadImage from "../../assets/upload.svg"
import React, {useState} from "react";

function Home() {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  }



  return (
    <div id="home" className="flex-container">
      <div className="username-section">
        <input className="input" placeholder="Change Username" value={value} onChange={onChange}></input>
        <button className="apply-Button">Apply Changes</button>
      </div>
        <h1 className="heading">Note Together</h1>
        <h2 className="instructions">Upload your own video to enter a Youtube video link!</h2>
        <div className="video-section">
            <input className="youtube-link" placeholder="Put Youtube Link here"></input> 
            <input className="link-radio" type="radio" name="video-source" value="1" checked></input>
            <h1 className="or-text">OR</h1>
            <img className="upload-icon" src={UploadImage} width="53.90" height="71.87"></img>
            <input className="link-radio" type="radio" name="video-source" value="2"></input>
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