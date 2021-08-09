import React from "react";
import "./About.scss";
import { CCallout, CCard, CCardBody } from "@coreui/react";
import NoteTogetherLogoFull from "../../NoteTogetherLogoFull.png";

function About() {
  return (
    <CCard>
      <CCardBody>
        <section className="about">
          <h1 className="title">About us</h1>
          <div className="container">
            <div className="info">
              <h2 className="description">
                NoteTogether is a distributed web application designed to bring
                interactivity to a very crucial aspect of online learning: video
                media. NoteTogether provides a shared space for watching and
                annotating video media. Analytics are provided to all users to
                highlight how users interact with the video media. NoteTogether
                utilizes Ethereum Blockchain to ensure data security and
                scalability by offloading data storage and processing
                requirements to the distributed Ethereum network
              </h2>
              <h2 className="description">
                What does this mean for the end user? The user incures a small
                cost when uploading videos and changing their username. However,
                users can rest assured that videos and notes stored on
                NoteTogether are permanent and secure on blockchain. Users have
                access to the following features free of charge:
              </h2>
              <CCallout className="feature" color="info">Share a video with other users</CCallout>
              <CCallout className="feature" color="warning">Add notes to a video</CCallout>
              <CCallout className="feature" color="info">View your and others notes</CCallout>
              <CCallout className="feature" color="warning">
                View analytics of note-taking and viewership on a video
              </CCallout>
              <CCallout className="feature" color="info">
                View a history of all videos you have posted or added a note to
              </CCallout>
            </div>
            <div>
              <img
                src={NoteTogetherLogoFull}
                alt="[NoteTogether Logo]"
                className="logo-large"
              />
            </div>
          </div>
        </section>
      </CCardBody>
    </CCard>
  );
}

export default About;
