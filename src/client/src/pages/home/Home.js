import { CButton, CCard, CCardBody } from '@coreui/react'
import React from 'react'
import { noteTogetherAddress, noteTogetherContract, web3 } from '../../config'
import './Home.scss'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videoUrl: null,
      videoBuffer: null,
      title: null,
    }
  }

  loadFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.onloadend = async function Response(event) {
      this.setState({ videoBuffer: Buffer(event.target.result) })
    }

    reader.readAsArrayBuffer(file)
  }

  async upload() {
    let results

    if (this.state.videoUrl != null) {
      results = await ipfs.add(Buffer(this.state.videoUrl))
    } else {
      results = await ipfs.add(this.state.videoBuffer)
    }

    const { hash } = results[0]

    const transactionParameters = {
      to: noteTogetherAddress,
      from: window.ethereum.selectedAddress,
      data: noteTogetherContract.methods
        .addVideo(hash, this.state.title)
        .encodeABI(),
    }

    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })

    // Hack to wait for transaction to be mined before redirecting page
    let loop = true
    while (loop) {
      const transaction = await web3.eth.getTransactionReceipt(txHash)

      if (!transaction.status) {
        await new Promise((resolve) => setTimeout(resolve, 6000))
      } else {
        loop = false
      }
    }

    this.props.history.push('/pages/videoLink/' + hash)
  }

  canUpload() {
    return (
      (!!this.state.videoBuffer || !!this.state.videoUrl) && !!this.state.title
    )
  }

  render() {
    return (
      <>
        <div className="card-container">
          <CCard style={{ width: '50%' }}>
            <CCardBody>
              <div style={{ textAlign: 'center', flexGrow: 1 }}>
                <span
                  className="display-inline"
                  style={{ fontSize: '3rem', color: 'blue' }}
                >
                  Note Together
                </span>
                <br></br>
                <p className="display-inline">
                  Upload using a Youtube Link or your own Video File! Then add a
                  title!
                </p>
              </div>
              <div className="form-container">
                <div className="video-section">
                  <label
                    htmlFor="videoTitle"
                    className="label-text"
                    style={{ width: '80%' }}
                  >
                    Video Title
                    <input
                      className="form-control"
                      id="videoTitle"
                      placeholder="Enter Video Title here"
                      onChange={(event) =>
                        this.setState({ title: event.target.value })
                      }
                    />
                  </label>
                  <label
                    htmlFor="videoLink"
                    className="label-text input-container"
                    style={{ maxWidth: '80%' }}
                  >
                    Video Link
                    <input
                      id="videoLink"
                      className="form-control"
                      placeholder="Put Youtube Link here"
                      onChange={(event) =>
                        this.setState({ videoUrl: event.target.value })
                      }
                    />
                  </label>
                  <h3 style={{ fontWeight: 600, marginTop: '4%' }}>OR</h3>
                  <label
                    htmlFor="vidFile"
                    className="label-text input-container"
                    style={{ maxWidth: '80%' }}
                  >
                    Video File
                    <input
                      type="file"
                      className="form-control"
                      id="vidFile"
                      onChange={this.loadFile}
                    ></input>
                  </label>
                </div>
              </div>
              <div className="float-right" style={{ marginTop: '5%' }}>
                <CButton
                  color="success"
                  className="height-25-rem btn-lg"
                  disabled={
                    (!this.state.videoBuffer || !this.state.videoUrl) &&
                    !this.state.title
                  }
                  onClick={this.upload.bind(this)}
                >
                  Upload
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </>
    )
  }
}

export default Home