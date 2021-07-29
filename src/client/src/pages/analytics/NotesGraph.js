import React from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

let store
const TICK_CONSTANT = 5
const TAG_TO_COLOR = {
  Answer: 'rgb(255, 99, 132)',
  Answer_Border: 'rgb(255, 99, 132, 0.2)',
  Note: 'rgb(54, 162, 235)',
  Note_Border: 'rgb(54, 162, 235, 0.2)',
  Question: 'rgb(153, 102, 255)',
  Question_Border: 'rgb(153, 102, 255, 0.2)',
}

class NotesGraph extends React.Component {
  constructor(props) {
    super(props)

    store = props.store

    this.state = {
      videoRef: props.videoRef,
      labels: [],
      allGraphData: {},
    }
  }

  async componentDidMount() {
    const allGraphData = (
      await axios.get(
        'http://localhost:8080/analytics/generateNoteLogGraphData',
      )
    ).data
    console.log(allGraphData)

    const labels = this.labels()
    const datasets = []

    for (const tag of Object.keys(allGraphData)) {
      const tagData = allGraphData[tag]

      const data = []

      for (const label of labels) {
        data.push(tagData[label] || 0)
      }

      datasets.push({
        label: `${tag} - Notes Data`,
        data: data,
        fill: false,
        backgroundColor: TAG_TO_COLOR[tag],
        borderColor: TAG_TO_COLOR[tag + '_Border'],
      })
    }

    this.setState({ labels, allGraphData, datasets })
  }

  labels() {
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

    return labels
  }

  data() {
    return {
      labels: this.state.labels,
      datasets: this.state.datasets,
    }
  }

  options() {
    return {
      scales: {
        yAxes: [
          {
            type: 'time',
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
  }

  render() {
    return (
      <>
        <div>
          <Line
            data={this.data()}
            options={this.options()}
          />
        </div>
      </>
    )
  }
}

export default NotesGraph
