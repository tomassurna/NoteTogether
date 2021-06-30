import React from 'react'
import { useState } from 'react'
import Player from './Player'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import './VideoLink.scss'
import Message from './Message'
import {
  noteTogetherAddress,
  noteTogetherContract,
  web3,
  serverAcountId,
} from '../../config'

const Tx = require('ethereumjs-tx').Transaction

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      videoRef: props.videoRef,
      userName: props.userName,
      static: true,
      videoId: props.videoId,
    }
  }

  async messageAdded(e) {
    const time = new Date(this.state.videoRef.current.getCurrentTime() * 1000)
      .toISOString()
      .substr(11, 8)
    const message = document.getElementById('note').value

    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: message,
          user: this.state.userName || 'Guest User',
          time: time,
        },
      ],
    })

    // const txCount = await web3.eth.getTransactionCount(
    //     this.props.accountId
    //   );

    //   const txObject = {
    //     nonce: web3.utils.toHex(txCount),
    //     gasLimit: web3.utils.toHex(6700000),
    //     gasPrice: web3.utils.toHex(
    //       Math.ceil((await web3.eth.getGasPrice()) * 1.25)
    //     ),
    //     to: noteTogetherContract._address,
    //     data: noteTogetherContract.methods
    //     .addNote(
    //       this.state.videoId,
    //       this.state.time,
    //       this.state.static ? "static" : "dynamic",
    //       this.state.description
    //     )
    //       .encodeABI(),
    //   };

    //   const tx = new Tx(txObject, { chain: "ropsten" });
    //   tx.sign(Buffer.from(this.props.privateKey.substr(2), "hex"));

    //   const serializedTx = tx.serialize();
    //   const raw = "0x" + serializedTx.toString("hex");

    //   await web3.eth.sendSignedTransaction(raw).catch((err) => {
    //     processError(err);
    //   });

    // noteTogetherContract.methods
    //   .addNote(
    //     this.state.videoId,
    //     this.state.time,
    //     this.state.static ? 'static' : 'dynamic',
    //     this.state.message,
    //   )
    //   .send({
    //     from: serverAcountId,
    //     gas: web3.utils.toHex(Math.ceil((await web3.eth.getGasPrice()) * 1.25)),
    //   })

    e.preventDefault()
    document.getElementById('note').value = ''
  }

  render() {
    return (
      <div className="flex-container-column">
        <h3>Note Log</h3>
        <CCard className="notes-section">
          <CCardBody className="notes-section-body">
            {this.state.messages.map((item, index) => (
              <Message
                key={index}
                name={item.user}
                message={item.message}
                timestamp={item.time}
              />
            ))}
          </CCardBody>
        </CCard>
        <form
          className="flex-container-row"
          style={{ width: '100%' }}
          onSubmit={this.messageAdded.bind(this)}
        >
          <input
            className="form-control"
            type="text"
            id="note"
            autoComplete="off"
            placeholder="Enter Note Here"
          />
          <input class="btn btn-dark notes-btn" type="submit" value="Enter" />
        </form>
        <div className="notes-radio">
          <label>
            <input
              type="radio"
              value="Dynamic"
              name="log-type"
              checked={this.state.static}
            />{' '}
            Dynamic
          </label>
          <label>
            <input
              type="radio"
              value="Static"
              name="log-type"
              checked={this.state.static}
            />{' '}
            Static
          </label>
        </div>
      </div>
    )
  }
}

export default Notes
