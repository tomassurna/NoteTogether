import { noteTogetherAddress, noteTogetherContract, web3 } from '../../config'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import React from 'react'

class UserNameEditor extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      userName: "",
    }
  }

  onChange = (event) => {
    this.setState({ userName: event.target.value })
  }

  async applyChanges() {
    const transactionParameters = {
      to: noteTogetherAddress,
      from: window.ethereum.selectedAddress,
      data: noteTogetherContract.methods
        .changeUsername(this.state.userName)
        .encodeABI(),
    }

    const txHash = await window.window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })

    await web3.eth.getTransaction(txHash)
  }

  render() {
    return (
      <>
        <CCard className="username-section">
          <CCardHeader>
            <h3 className="display-inline">Change Username</h3>
          </CCardHeader>
          <CCardBody>
            <input
              className="input"
              placeholder="Change Username"
              value={this.state.userName}
              onChange={this.onChange.bind(this)}
            ></input>
            <CButton
              color="success"
              className="height-25-rem"
              onClick={this.applyChanges.bind(this)}
            >
              Apply Changes
            </CButton>
          </CCardBody>
        </CCard>
      </>
    )
  }
}
export default UserNameEditor
