import React from "react";
import ReactPlayer from "react-player";
import "./VideoLink.scss";
import axios from "axios";
import processError from "../../util/ErrorUtil";

let store;
let view_analytics;

class Player extends React.Component {
  constructor(props) {
    super(props);

    store = props.store;

    this.state = {
      name: props.name,
      videoRef: props.videoRef,
      url: props.url,
      creator: props.creator,
      videoId: props.videoId,
    };
  }

  render() {
    return (
      <>
        <ReactPlayer
          width="100%"
          height="100%"
          ref={this.state.videoRef}
          url={this.state.url}
          controls={true}
          onProgress={(e) =>
            store.dispatch({
              type: "playerTimeReducer/setTime",
              time: e.playedSeconds,
            })
          }
          onDuration={(e) =>
            store.dispatch({
              type: "playerTimeReducer/setDuration",
              time: e,
            })
          }
          onPlay={() => {
            const time = new Date(
              this.state.videoRef.current.getCurrentTime() * 1000
            )
              .toISOString()
              .substr(11, 8);

            view_analytics = {
              video: this.state.videoId,
              startTime: time,
              endTime: null,
            };
          }}
          onPause={() => {
            if (
              !!view_analytics &&
              !(
                typeof this.state.videoId === "undefined" ||
                this.state.videoId === null
              )
            ) {
              view_analytics.endTime = new Date(
                this.state.videoRef.current.getCurrentTime() * 1000
              )
                .toISOString()
                .substr(11, 8);
              view_analytics.created_at = Date();

              const headers = {
                "Content-Type": "text/plain",
              };

              axios
                .post(
                  "http://localhost:3000/view_analytics/add",
                  view_analytics,
                  { headers }
                )
                .catch((e) => processError(e));

              view_analytics = undefined;
            }
          }}
        />
      </>
    );
  }
}

export default Player;
