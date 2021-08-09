import React from "react";
import HeatMap from "react-heatmap-grid";
import axios from "axios";
import { apiUrl } from "../../config";

let store;
const TICK_CONSTANT = 30;

class SeekGraph extends React.Component {
  constructor(props) {
    super(props);

    store = props.store;

    this.state = {
      videoRef: props.videoRef,
      labels: [],
      datasets: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const allGraphData = (
      await axios.get(
        `${apiUrl}/analytics/generateViewLogGraphData?video=${this.props.videoId}`
      )
    ).data;

    const labels = SeekGraph.xLabels();
    const datasets = {};

    for (const y of SeekGraph.yLabels()) {
      const yData = allGraphData[y] || {};

      const data = [];

      for (const label of labels) {
        data.push(yData[label] || 0);
      }

      datasets[y] = data;
    }

    this.setState({ labels, allGraphData, datasets, loading: false });
  }

  static xLabels() {
    let labels = [];
    const duration = store.getState().duration;

    const ticks = duration / TICK_CONSTANT + 1;

    for (let i = 0; i <= ticks; i++) {
      const totalSecs = i * TICK_CONSTANT;
      const hours = Math.floor(totalSecs / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = Math.floor(totalSecs % 60);

      labels.push(
        `${hours.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`
      );
    }

    return labels;
  }

  static yLabels() {
    return ["Viewership", "Question", "Answer", "Note"];
  }

  render() {
    return (
      <>
        {this.state.loading && <div>Loading...</div>}
        {!this.state.loading && (
          <>
            <div className={"heatmap"}>
              <HeatMap
                xLabels={this.state.labels}
                yLabels={["Viewership"]}
                data={[this.state.datasets["Viewership"] || []] || []}
                yLabelWidth={100}
                xLabelsVisibility={false}
              />
            </div>
            <div className={"heatmap"}>
              <HeatMap
                xLabels={this.state.labels}
                yLabels={["Question"]}
                data={[this.state.datasets["Question"] || []] || []}
                yLabelWidth={100}
                xLabelsVisibility={true}
              />
            </div>
            <div className={"heatmap"}>
              <HeatMap
                xLabels={this.state.labels}
                yLabels={["Answer"]}
                data={[this.state.datasets["Answer"] || []] || []}
                yLabelWidth={100}
                xLabelWidth={0}
                xLabelsVisibility={true}
              />
            </div>
            <div className={"heatmap"}>
              <HeatMap
                xLabels={this.state.labels}
                yLabels={["Note"]}
                data={[this.state.datasets["Note"] || []] || []}
                yLabelWidth={100}
                xLabelsVisibility={true}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

export default SeekGraph;
