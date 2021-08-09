import { noteTogetherContract } from "../../config";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import "./Profile.scss";

class VideoHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = { videoCards: [], loading: true };
  }

  async componentDidMount() {
    const interactions = await noteTogetherContract.methods
      .getInteractions(window.ethereum.selectedAddress)
      .call();

    const videoCards = [];

    for (const videoId of interactions) {
      const videoData = await noteTogetherContract.methods
        .getVideoData(videoId)
        .call();

      const isOwner =
        window.ethereum.selectedAddress.toLowerCase() ===
        videoData.user.toLowerCase();

      videoCards.push({
        title: videoData.title,
        videoId,
        isOwner,
      });
    }

    this.setState({ videoCards, loading: false });
  }

  render() {
    return (
      <>
        {this.state.loading && (
          <div>
            <CCard>
              <CCardHeader>Loading...</CCardHeader>
            </CCard>
          </div>
        )}
        {!this.state.loading && (
          <CCard>
            <CCardHeader>
              <h3 className="history-title display-inline">Video History</h3>
            </CCardHeader>
            <CCardBody>
              {this.state.videoCards.map((videoData) => {
                return (
                  <a
                    href={"/#/pages/videoLink/" + videoData.videoId}
                    className="pointer"
                  >
                    <CCard>
                      <CCardBody>
                        <h4 className="display-inline">
                          {videoData.isOwner ? (
                            <span className="posted">Posted:</span>
                          ) : (
                            <span className="taken-notes-on">
                              Taken Notes On:
                            </span>
                          )}
                        </h4>
                        <div>
                          <span>{videoData.title}</span>
                        </div>
                      </CCardBody>
                    </CCard>
                  </a>
                );
              })}
            </CCardBody>
          </CCard>
        )}
      </>
    );
  }
}

export default VideoHistory;
