import React from 'react'
import SeekGraph from './SeekGraph'
import NotesGraph from './NotesGraph'

let store

class Analytics extends React.Component {
  constructor(props) {
    super(props)


    store = props.store

    this.state = {
      videoRef: props.videoRef,
    }
    
  }

  render() {
    return (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '60%',
              // height: '80vh',
            }}
          >
            <NotesGraph videoRef={this.state.videoRef}
                        store={store}></NotesGraph>
          </div>
          <div style={{height: "5vh"}}>

          </div>

          <div
            style={{
              width: '100%',
              // height: '80vh',
            }}
          >
            <SeekGraph videoRef={this.state.videoRef}
                        store={store}></SeekGraph>
          </div>
        </div>
      </>
    )
  }
}

export default Analytics
