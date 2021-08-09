import React from "react";
import UserNameEditor from "./UserNameEditor.js";
import VideoHistory from "./VideoHistory";
import "./Profile.scss";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";

class Profile extends React.Component {
  render() {
    return (
      <div id="profile">
        <div id="pcontainer">
          <div id="video-history">
            <VideoHistory history={this.props.history} />
          </div>
          <div id="username-editor">
            <CCard className="quick-links">
              <CCardHeader>
                <div className="quick-links-title">
                  <h3 className="title display-inline">Welcome</h3>
                </div>
              </CCardHeader>
              <CCardBody>
                <p className="description">
                  Welcome to NoteTogether! NoteTogether is a shared note-taking
                  website for video media. Upload a video or get a video link
                  from a friend and start taking notes together!
                </p>
              </CCardBody>
            </CCard>
            <UserNameEditor />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
