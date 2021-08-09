import React from "react";
import Modal from "react-modal";
import "./Components.scss";
import processError from "../util/ErrorUtil";

class Login extends React.Component {
  async onLoginWithMetaMask() {
    try {
      await window.window.ethereum.request({ method: "eth_requestAccounts" });
      this.props.onLoginCallback();
    } catch (err) {
      processError(err);
    }
  }

  render() {
    Modal.setAppElement("body");

    return (
      <>
        <Modal isOpen={this.props.isLoginModalOpen}>
          <div className={"modal-header"}>
            <h4 style={{ margin: 0 }}>Login ( Ropsten Network )</h4>
          </div>
          <div className="modal-body modal-body-btn-right">
            <p>
              Welcome to NoteTogether! NoteTogether is a shared note-taking
              website for video media. Upload a video or get a video link from a
              friend and start taking notes together!
            </p>
            <p>
              NoteTogether runs on the Ropsten Ethereum Test Network. The
              Metamask extension is required to log in. Add your Ropsten network
              wallet to your Metamask account then hit the login button!
            </p>
            {!!window.ethereum ? (
              <button
                type="button"
                className="btn btn-primary modal-save-btn"
                onClick={this.onLoginWithMetaMask.bind(this)}
              >
                Login Using MetaMask
              </button>
            ) : (
              <p>
                Please Install MetaMask As A Plugin In Your Browser:{" "}
                <a className="link" href="https://metamask.io/">
                  https://metamask.io/
                </a>
              </p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

export default Login;
