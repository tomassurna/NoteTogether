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
            {!!window.ethereum ? (
              <button
                type="button"
                className="btn btn-primary modal-save-btn"
                onClick={this.onLoginWithMetaMask.bind(this)}
              >
                Login Using MetaMask
              </button>
            ) : (
              <span>Please Install MetaMask</span>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

export default Login;
