import React from "react";
import { TheContent, TheFooter, TheHeader } from "./index";
import Login from "./Login";

class TheLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginModalOpen: true,
      accountId: "",
      width100: false,
    };

    if (!!window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (!!window.ethereum.selectedAddress && this.state.isLoginModalOpen) {
          this.setState({ isLoginModalOpen: false });
        }

        if (!this.state.accountId && accounts.length > 0) {
          this.setState({ accountId: window.ethereum.selectedAddress });
        }

        if (
          (this.state.accountId !== window.ethereum.selectedAddress ||
            accounts.length === 0) &&
          !this.state.isLoginModalOpen
        ) {
          window.location.reload();
        }
      });
    }
  }

  onLoginCallback() {
    this.setState({ isLoginModalOpen: false });
  }

  width100Callback(width100) {
    if (this.state.width100 !== width100) {
      this.setState({ width100 });
    }
  }

  render() {
    return (
      <div className="c-app c-default-layout">
        <div className="c-wrapper">
          <TheHeader
            // Hack to reconstruct the entire component in order for the account info to be passed in
            key={this.state.isLoginModalOpen ? "1" : "2"}
          />
          <div
            className={
              this.state.width100 ? "c-body layout-100" : "c-body layout"
            }
          >
            {!!window?.ethereum?.selectedAddress && (
              <TheContent
                // Hack to reconstruct the entire component in order for the account info to be passed in
                width100Callback={this.width100Callback.bind(this)}
                key={this.state.isLoginModalOpen ? "3" : "4"}
              />
            )}
            <Login
              onLoginCallback={this.onLoginCallback.bind(this)}
              isLoginModalOpen={
                !window.ethereum || !window.ethereum.selectedAddress
              }
              // Hack to reconstruct the entire component in order for the account info to be passed in
              key={this.state.isLoginModalOpen ? "5" : "6"}
            />
          </div>
          <TheFooter />
        </div>
      </div>
    );
  }
}

export default TheLayout;
