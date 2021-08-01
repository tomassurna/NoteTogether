import React from "react";
import "./About.scss";
import { CCallout, CCard, CCardBody } from "@coreui/react";

function About() {
  return (
    <CCard>
      <CCardBody>
        <section className="about">
          <h1 className="title">About us</h1>
          <h2 className="description">
            NoteTogether is an application that was made to be used to help
            students and teachers in an online environment simply from using
            videos. This is especially beneficial due to remote learning that
            has been in place since the Covid pandemic. The application is
            simple and easy to understand for any user on any device to use.
          </h2>
          <h2 className="description">
            {" "}
            The process in using this application is straightforward. A video is
            uploaded either using a Youtube link or a video file from the user's
            device which will mostly be the teacher. After choosing a title, the
            creator and others that the video is shared with are able to utilize
            several different functionalities such as...
          </h2>
          <CCallout color="info">
            Adding private or public notes tied to a timestamp within the video
          </CCallout>
          <CCallout color="warning">
            Viewing notes in dynamic or static mode
          </CCallout>
          <CCallout color="info">
            Questions can be asked by students and answered by the teacher
          </CCallout>
          <CCallout color="warning">
            Analytics provided to showing where the most notes are taken and
            where users rewatch and skip over
          </CCallout>
        </section>
      </CCardBody>
    </CCard>
  );
}

export default About;
