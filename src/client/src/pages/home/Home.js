import { CButton, CCard, CCardBody, CCardHeader } from "@coreui/react";
import React from "react";
import { noteTogetherAddress, noteTogetherContract, web3 } from "../../config";
import "./Home.scss";

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUrl: null,
      videoBuffer: null,
      title: null,
      loading: false,
    };
  }

  loadFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.onloadend = async function Response(event) {
      this.setState({ videoBuffer: Buffer(event.target.result) });
    };

    reader.readAsArrayBuffer(file);
  };

  async upload() {
    let results;

    this.setState({ loading: true });

    if (this.state.videoUrl != null) {
      // Attach date to the url since IPFS will return a hash of the bytes as the key.
      // We need the key to always be unique therefore we add "salt" to the value
      results = await ipfs.add(
        Buffer(
          JSON.stringify({
            video: this.state.videoUrl,
            time: new Date().toISOString(),
          })
        )
      );
    } else {
      results = await ipfs.add(this.state.videoBuffer);
    }

    const { hash } = results[0];

    const transactionParameters = {
      to: noteTogetherAddress,
      from: window.ethereum.selectedAddress,
      data: noteTogetherContract.methods
        .addVideo(hash, this.state.title)
        .encodeABI(),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });

    // Hack to wait for transaction to be mined before redirecting page
    let loop = true;
    while (loop) {
      const transaction = await web3.eth.getTransactionReceipt(txHash);

      if (!transaction?.status) {
        await new Promise((resolve) => setTimeout(resolve, 6000));
      } else {
        loop = false;
      }
    }

    this.props.history.push("/pages/videoLink/" + hash);
  }

  canUpload() {
    return (
      (!!this.state.videoBuffer || !!this.state.videoUrl) && !!this.state.title
    );
  }

  render() {
    return (
      <>
        <div className="home card-container">
          <CCard style={{minWidth: "255px"}}>
            <CCardBody>
              <div style={{ textAlign: "center", flexGrow: 1 }}>
                <h1
                  className="title display-inline"
                  style={{ fontSize: "3rem", color: "blue", }}
                >
                  Note Together
                </h1>
                <br />
                <p className="description display-inline">
                  Upload using a Youtube Link or your own Video File! Then add a
                  title!
                </p>
              </div>
              <div className="form-container">
                <div className="video-section">
                  <label
                    htmlFor="videoTitle"
                    className="label-text"
                    style={{ width: "80%" }}
                  >
                    Video Title
                    <input
                      className="form-control"
                      id="videoTitle"
                      placeholder="Enter Video Title here"
                      onChange={(event) =>
                        this.setState({ title: event.target.value })
                      }
                      disabled={this.state.loading}
                    />
                  </label>
                  <label
                    htmlFor="videoLink"
                    className="label-text input-container"
                    style={{ maxWidth: "80%" }}
                  >
                    Video Link
                    <input
                      id="videoLink"
                      className="form-control"
                      placeholder="Put Youtube Link here"
                      onChange={(event) =>
                        this.setState({ videoUrl: event.target.value })
                      }
                      disabled={this.state.loading}
                    />
                  </label>
                  <h3 style={{ fontWeight: 600, marginTop: "4%" }}>OR</h3>
                  <label
                    htmlFor="vidFile"
                    className="label-text input-container"
                    style={{ maxWidth: "80%" }}
                  >
                    Video File
                    <input
                      type="file"
                      className="form-control"
                      id="vidFile"
                      onChange={this.loadFile}
                      disabled={true}
                    />
                  </label>
                </div>
              </div>
              <div className="float-right" style={{ marginTop: "5%" }}>
                <CButton
                  color="success"
                  className="height-25-rem btn-lg"
                  disabled={
                    ((!this.state.videoBuffer || !this.state.videoUrl) &&
                      !this.state.title) ||
                    this.state.loading
                  }
                  onClick={this.upload.bind(this)}
                >
                  {this.state.loading ? "Waiting For Transaction..." : "Upload"}
                </CButton>
              </div>
            </CCardBody>
          </CCard>
          <CCard className="quick-links">
            <CCardHeader>
              <div className="quick-links-title">
                <h3 className="title display-inline">Welcome</h3>
              </div>
            </CCardHeader>
            <CCardBody>
              <p>
                Welcome to NoteTogether! NoteTogether is a shared note-taking
                website for video media. Upload a video or get a video link from
                a friend and start taking notes together!
              </p>
              <p>
                Here, you can upload a video by link or video file. Videos
                you've added will appear in the Video History section located on
                your{" "}
                <a className="link" href="/#/pages/profile">
                  Profile page
                </a>
                .
              </p>
            </CCardBody>
          </CCard>
        </div>
      </>
    );
  }
}

export default Home;
