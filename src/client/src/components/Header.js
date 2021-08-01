import { brandSet, freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CHeader, CHeaderNav } from "@coreui/react";
import React from "react";
import { noteTogetherContract, web3 } from "../config";
import processError from "../util/ErrorUtil";
import "./Components.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
    };

    this.getBalance();
  }

  async getBalance() {
    try {
      // If private key is not set then do not proceed
      if (!window.ethereum || !window.ethereum.selectedAddress) {
        return;
      }

      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(window.ethereum.selectedAddress)
      );

      const userName = await noteTogetherContract.methods
        .getUsernameById(window.ethereum.selectedAddress)
        .call();

      if (balance !== this.state.balance) {
        this.setState({ balance: balance, userName: userName });
      }
    } catch (error) {
      processError(error);
    }
  }

  render() {
    this.getBalance();

    return (
      <CHeader withSubheader>
        <CHeaderNav className="px-3 width-100">
          <a
            className="c-header-brand"
            href="//github.com/tomassurna/NoteTogether"
          >
            {/* <img src={NoteTogetherLogo} alt="[NoteTogether Logo]" className="logo" /> */}
            NoteTogether
          </a>
          <span className="c-header-toggler">
            <span className="c-header-toggler-icon" />
          </span>
          <ul className="c-header-nav mr-auto">
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/home">
                Home
              </a>
            </li>
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/aboutUs">
                About Us
              </a>
            </li>
            <li className="c-header-nav-item">
              <a className="c-header-nav-link" href="#/pages/profile">
                Profile
              </a>
            </li>
          </ul>
          <div className="profile-info">
            <a href="#/pages/profile">
              <span className="userId">
                {!!window.ethereum
                  ? this.state.userName || window.ethereum.selectedAddress
                  : "Guest User"}{" "}
                -
              </span>
              <span>
                <CIcon content={brandSet.cibEthereum} />
                {this.state.balance}
              </span>
              <CIcon
                content={freeSet.cilAddressBook}
                size={"2xl"}
                className="contract-book-icon"
              />
            </a>
          </div>
        </CHeaderNav>
      </CHeader>
    );
  }
}

export default Header;
