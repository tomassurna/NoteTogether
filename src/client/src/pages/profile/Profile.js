import React from "react";
import UserNameEditor from "./UserNameEditor.js";
import VideoHistory from "./VideoHistory";
import "./Profile.scss";

class Profile extends React.Component {
  render() {
    return (
      <div id="profile">
        <div id="pcontainer">
          <div id="video-history">
            <VideoHistory history={this.props.history} />
          </div>
          <div id="username-editor">
            <UserNameEditor />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
