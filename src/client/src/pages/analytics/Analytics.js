import React from "react";
import SeekGraph from "./SeekGraph";
import NotesGraph from "./NotesGraph";

let store;

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    store = props.store;

    this.state = {
      videoRef: props.videoRef,
      videoId: props.videoId,
    };
  }

  render() {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
            }}
          >
            <NotesGraph
              videoRef={this.state.videoRef}
              store={store}
              videoId={this.state.videoId}
            />
          </div>
          <div style={{ height: "5vh" }} />

          <div
            style={{
              width: "100%",
            }}
          >
            <SeekGraph
              videoRef={this.state.videoRef}
              store={store}
              videoId={this.state.videoId}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Analytics;
