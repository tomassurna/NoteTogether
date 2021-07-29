import React from 'react'
import HeatMap from 'react-heatmap-grid'
import axios from 'axios'

let store
const TICK_CONSTANT = 30

class SeekGraph extends React.Component {
  constructor(props) {
    super(props)

    store = props.store

    this.state = {
      videoRef: props.videoRef,
      labels: [],
      datasets: [],
    }

    console.log(props.videoRef)
  }

  async componentDidMount() {
    const allGraphData = (
      await axios.get(
        'http://localhost:8080/analytics/generateViewLogGraphData',
      )
    ).data
    console.log(allGraphData)

    const labels = this.xLabels()
    const datasets = {}

    // for (const tag of Object.keys(allGraphData)) {
    //   const tagData = allGraphData[tag]

    //   const data = []

    //   for (const label of labels) {
    //     data.push(tagData[label])
    //   }

    //   datasets.push({
    //     label: `${tag} - Notes Data`,
    //     data: data,
    //     fill: false,
    //     backgroundColor: TAG_TO_COLOR[tag],
    //     borderColor: TAG_TO_COLOR[tag + '_Border'],
    //   })
    // }

    for (const y of this.yLabels()) {
      const yData = allGraphData[y] || {}

      const data = []

      for (const label of labels) {
        data.push(yData[label] || 1)
      }

      datasets[y] = data
    }

    console.log(datasets)
    console.log(datasets['Note'])

    this.setState({ labels, allGraphData, datasets })
  }

  xLabels() {
    let labels = []
    const duration = store.getState().duration

    const ticks = duration / TICK_CONSTANT + 1

    for (let i = 0; i <= ticks; i++) {
      const totalSecs = i * TICK_CONSTANT
      const hours = Math.floor(totalSecs / 3600)
      const minutes = Math.floor((totalSecs % 3600) / 60)
      const seconds = Math.floor(totalSecs % 60)

      labels.push(
        `${hours.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:${seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}`,
      )
    }

    console.log(labels)

    return labels
  }

  yLabels() {
    return ['Watchage', 'Question', 'Answer', 'Note']
  }

  render() {
    return (
      <>
      {console.log(this.state.datasets['Note'])}
        <div className={'heatmap'}>
          <HeatMap
            xLabels={this.state.labels}
            yLabels={['Watchage']}
            data={[this.state.datasets['Watchage'] || []] || []}
            yLabelWidth={100}
            xLabelsVisibility={false}
            // squares={true}
          />
        </div>
        <div className={'heatmap'}>
          <HeatMap
            xLabels={this.state.labels}
            yLabels={['Question']}
            data={[this.state.datasets['Question'] || []] || []}
            yLabelWidth={100}
            xLabelsVisibility={true}
            // squares={true}
          />
        </div>
        <div className={'heatmap'}>
          <HeatMap
            xLabels={this.state.labels}
            yLabels={['Answer']}
            data={[this.state.datasets['Answer'] || []] || []}
            yLabelWidth={100}
            xLabelWidth={0}
            xLabelsVisibility={true}
            // squares={true}
          />
        </div>
        <div className={'heatmap'}>
          <HeatMap
            xLabels={this.state.labels}
            yLabels={['Note']}
            data={[this.state.datasets['Note'] || []] || []}
            yLabelWidth={100}
            xLabelsVisibility={true}
            // squares={true}
          />
        </div>
      </>
    )
  }
}

export default SeekGraph
