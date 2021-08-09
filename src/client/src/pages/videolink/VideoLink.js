import "./VideoLink.scss";
import React, { useEffect, useState } from "react";
import Player from "./Player";
import Notes from "./Notes";
import Analytics from "../analytics/Analytics";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { noteTogetherContract } from "../../config";
import { createStore } from "redux";
import playerTimeReducer from "../../redux/PlayerTimeReducer";

const store = createStore(playerTimeReducer);

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

function VideoLink() {
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [invalidLink, setInvalidLink] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    async function getUrlInfo() {
      if (!!videoId) {
        try {
          const videoUrl = await ipfs.get(videoId);
          const videoUrlParsed = JSON.parse(
            videoUrl[0]?.content?.toString()
          ).video;
          setUrl(videoUrlParsed);

          const userNameData = await noteTogetherContract.methods
            .getUsernameById(window.ethereum.selectedAddress)
            .call();
          setUserName(userNameData);

          const videoData = await noteTogetherContract.methods
            .getVideoData(videoId)
            .call();

          setTitle(videoData?.title);
          setLoading(false);
        } catch (e) {
          setInvalidLink(true);
        }
      }
    }

    getUrlInfo();
  }, [videoId]);

  return (
    <>
      <div>
        {!invalidLink && !loading && (
          <>
            <div className="video-container">
              <CCard style={{ flexGrow: "1" }}>
                <CCardHeader>
                  <div>
                    <CButton
                      color="info"
                      onClick={() => setShowAnalytics(!showAnalytics)}
                    >
                      {showAnalytics ? "Video" : "Analytics"}
                    </CButton>
                    <h3 className="float-right">{title}</h3>
                  </div>
                </CCardHeader>
                <CCardBody style={showAnalytics ? { display: "none" } : {}}>
                  <div className="aspect-ratio-box">
                    <div className="aspect-ratio-box-inside">
                      <Player
                        name={title}
                        url={url}
                        videoId={videoId}
                        creator="Link Creator"
                        videoRef={videoRef}
                        store={store}
                      />
                    </div>
                  </div>
                </CCardBody>

                {showAnalytics && (
                  <CCardBody>
                    <Analytics
                      videoRef={videoRef}
                      store={store}
                      videoId={videoId}
                    />
                  </CCardBody>
                )}
              </CCard>

              <div
                className="video-notes"
                style={showAnalytics ? { display: "none" } : {}}
              >
                <CCard className="quick-links">
                  <CCardHeader>
                    <div className="quick-links-title">
                      <h3
                        className="display-inline"
                        style={!showInfo ? { display: "none" } : {}}
                      >
                        Notes Info
                      </h3>
                      <span
                        className="quick-links-hide-btn"
                        onClick={() => setShowInfo(!showInfo)}
                      >
                        {showInfo ? "Hide Info" : "Show Info"}
                      </span>
                    </div>
                  </CCardHeader>
                  <CCardBody style={!showInfo ? { display: "none" } : {}}>
                    <p>
                      Take notes below. Annotations will be tied to the video's
                      current time stamp. Annotations can be tagged as either a
                      Note, a Question, or an Answer. View notes either all at
                      once via the static note log or displayed as the video
                      plays via dynamic note log.
                    </p>
                  </CCardBody>
                </CCard>
                <CCard className="video-notes-component">
                  <CCardBody>
                    <Notes
                      videoRef={videoRef}
                      userName={userName}
                      videoId={videoId}
                      store={store}
                    />
                  </CCardBody>
                </CCard>
              </div>
            </div>
          </>
        )}

        {!invalidLink && loading && (
          <div>
            <CCard>
              <CCardHeader>Loading...</CCardHeader>
            </CCard>
          </div>
        )}

        {invalidLink && loading && (
          <div>
            <CCard>
              <CCardHeader>Invalid Link</CCardHeader>
            </CCard>
          </div>
        )}
      </div>
    </>
  );
}

export default VideoLink;
