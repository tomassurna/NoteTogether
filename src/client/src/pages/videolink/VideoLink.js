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

              <CCard
                className="video-notes"
                style={showAnalytics ? { display: "none" } : {}}
              >
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
