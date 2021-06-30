import './Home.scss'
import UploadImage from '../../assets/upload.svg'
import React, { useState } from 'react'
import { noteTogetherAddress, noteTogetherContract, web3 } from '../../config'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'

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
        <CCard>
          <CCardHeader>
            <h3 className="display-inline">Upload Video</h3>
            <br></br>
            <p className="display-inline">
              Upload your own video to enter a Youtube video link!
            </p>
          </CCardHeader>
        </CCard>
        <CCard>
          <CCardBody>
            <div>
              <label htmlFor="videoTitle">
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
            </div>
            <br />
            <div className="video-section">
              <label htmlFor="videoLink">
                Video Link
                <input
                  id="videoLink"
                  className="form-control container"
                  placeholder="Put Youtube Link here"
                  onChange={(event) =>
                    this.setState({ videoUrl: event.target.value })
                  }
                />
              </label>
              <h1 className="or-text">OR</h1>

              <label htmlFor="vidFile">
                <input
                  type="file"
                  className="form-control container"
                  id="vidFile"
                  onChange={this.loadFile}
                ></input>
              </label>
            </div>
            <div className="float-right">
              <CButton
                color="success"
                className="height-25-rem"
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
      </>
    )
  }
}

export default Home
