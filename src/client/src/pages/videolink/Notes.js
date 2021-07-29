import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import './VideoLink.scss'
import Message from './Message'
import axios from 'axios'
import { noteTogetherContract, serverAcountId, web3 } from '../../config'
import processError from '../../util/ErrorUtil'

const Tx = require('ethereumjs-tx').Transaction

let store

class Notes extends React.Component {
  constructor(props) {
    super(props)

    store = props.store

    this.state = {
      messages: [],
      dynamicMessages: [],
      videoRef: props.videoRef,
      userName: props.userName,
      static: true,
      videoId: props.videoId,
      selectedTag: 'Note',
      loading: true,
    }

    store.subscribe(() => this.generateDynamicMessages())
    this.textInput = React.createRef()
    this.textButton = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  generateDynamicMessages() {
    if (this.state.static) {
      return
    }
    console.log('s')

    // Loop through all the messages the filter out which ones are past the current timestamp
    const currentPlayerTime = store.getState().time
    this.setState({
      dynamicMessages: this.state.messages.filter(
        (element) => currentPlayerTime >= element.timestampInSeconds,
      ),
    })
    this.scrollToBottom()
  }

  focusTextInput() {
    this.textInput.current.focus()
  }

  async componentDidMount() {
    if (!!this.state.videoId) {
      const notesData = await noteTogetherContract.methods
        .getNotes(this.state.videoId)
        .call()

      const userIdToNameMap = {}
      userIdToNameMap[window.ethereum.selectedAddress] =
        this.state.userName || 'Guest User'

      const data = []

      for (const element of notesData) {
        const userId = element.user

        if (!userIdToNameMap[userId]) {
          const userNameData =
            (await noteTogetherContract.methods
              .getUsernameById(userId)
              .call()) || 'Guest User'

          userIdToNameMap[userId] = userNameData
        }

        data.push({
          message: element.message,
          user: element.user,
          tag: element.tag,
          timestamp: element.timestamp,
          userName: userIdToNameMap[userId] || 'Guest User',
          timestampInSeconds: this.getSeconds(element.timestamp),
        })
      }

      console.log(data)

      // default to static note state
      this.setState({ messages: data, loading: false, static: true })
      this.scrollToBottom()
    }
  }

  async messageAdded(e) {
    const time = new Date(this.state.videoRef.current.getCurrentTime() * 1000)
      .toISOString()
      .substr(11, 8)
    const message = document.getElementById('note').value
    const tag = this.state.selectedTag

    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: message,
          userName: this.state.userName || 'Guest User',
          time: time,
          tag: tag,
          timestamp: time,
          timestampInSeconds: this.getSeconds(time),
        },
      ],
    })

    this.scrollToBottom()

    if (!this.state.static) {
      this.generateDynamicMessages()
    }

    e?.preventDefault()
    document.getElementById('note').value = ''

    // noteTogetherContract.methods
    //   .addNote(
    //     this.state.videoId,
    //     time,
    //     tag,
    //     message,
    //     window.ethereum.selectedAddress,
    //   )
    //   .send({
    //     from: serverAcountId,
    //     gas: 6700000,
    //   })

    // console.log()

    const txCount =
      '0x' +
      ((await web3.eth.getTransactionCount(serverAcountId)) + 1).toString(16)
    const txObject = {
      nonce: txCount,
      gasLimit: web3.utils.toHex(6700000),
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      to: noteTogetherContract._address,
      data: noteTogetherContract.methods
        .addNote(
          this.state.videoId,
          time,
          tag,
          message,
          window.ethereum.selectedAddress,
        )
        .encodeABI(),
    }

    console.log(txObject)

    const tx = new Tx(txObject, { chain: 'ropsten' })
    tx.sign(
      Buffer.from(
        '728f029b58d3d7fa8e23fd8889333e9e64ea26d6938f53642a04a9a18629d13b',
        'hex',
      ),
    )

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    web3.eth
      .sendSignedTransaction(raw)
      .catch((err) => {
        processError(err)
      })
      .then(() => {
        const note_analytic = {
          video: this.state.videoId,
          timestamp: time,
          tag: tag,
          created_at: Date(),
        }

        axios
          .post('http://localhost:8080/analytics/saveNoteLog', note_analytic)
          .then((res) => console.log(res.data))
          .catch((e) => processError(e))
      })
  }

  scrollToBottom = () => {
    this.messagesEnd?.scrollIntoView({ behavior: 'smooth' })
  }

  // https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
  getSeconds(timestamp) {
    var a = timestamp.split(':')
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
    return seconds
  }

  async generateTestData() {
    for (let i = 0; i < 10; i++) {
      const duration = store.getState().duration
      const time = Math.random() * duration
      this.state.videoRef.current.seekTo(time, 'seconds')

      const tag = ['Answer', 'Question', 'Note'][Math.floor(Math.random() * 3)]
      this.setState({ selectedTag: tag })

      document.getElementById('note').value = Math.random()
        .toString(36)
        .substring(7)
      // this.textButton.current.click()
      await new Promise((r) => setTimeout(r, 2000))
      await this.messageAdded()
    }
  }

  render() {
    return (
      <>
        {!this.state.loading && (
          <div className="flex-container-column">
            <div style={{ display: 'flex' }}>
              <h3>Note Log</h3>
              <CButton
                style={{ marginLeft: '10px' }}
                color="info"
                onClick={() => this.generateTestData()}
              >
                Test Data
              </CButton>
            </div>
            <CCard className="notes-section">
              <CCardBody className="notes-section-body">
                {this.state.static
                  ? this.state.messages.map((item, index) => (
                      <Message
                        key={index}
                        name={item.userName}
                        message={item.message}
                        timestamp={item.timestamp}
                        tag={item.tag}
                      />
                    ))
                  : this.state.dynamicMessages.map((item, index) => (
                      <Message
                        key={index}
                        name={item.userName}
                        message={item.message}
                        timestamp={item.timestamp}
                        tag={item.tag}
                      />
                    ))}
                <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={(el) => {
                    this.messagesEnd = el
                  }}
                ></div>
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
                ref={this.textInput}
              />
              <input
                class="btn btn-dark notes-btn"
                type="submit"
                value="Enter"
                onClick={this.focusTextInput}
                ref={this.textButton}
              />
            </form>
            <div className="notes-radio">
              <label>
                <input
                  type="radio"
                  name="tag-type"
                  checked={this.state.selectedTag === 'Question'}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: 'Question' })
                  }
                />{' '}
                Question
              </label>
              <label>
                <input
                  type="radio"
                  name="tag-type"
                  checked={this.state.selectedTag === 'Note'}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: 'Note' })
                  }
                />{' '}
                Note
              </label>
              <label>
                <input
                  type="radio"
                  name="tag-type"
                  checked={this.state.selectedTag === 'Answer'}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: 'Answer' })
                  }
                />{' '}
                Answer
              </label>
            </div>
            <div className="notes-radio">
              <label>
                <input
                  type="radio"
                  value="Dynamic"
                  name="log-type"
                  checked={!this.state.static}
                  onChange={() => this.setState({ static: !this.state.static })}
                />{' '}
                Dynamic
              </label>
              <label>
                <input
                  type="radio"
                  value="Static"
                  name="log-type"
                  checked={this.state.static}
                  onChange={() => this.setState({ static: !this.state.static })}
                />{' '}
                Static
              </label>
            </div>
          </div>
        )}

        {this.state.loading && (
          <div>
            <CCard>
              <CCardHeader>Loading...</CCardHeader>
            </CCard>
          </div>
        )}
      </>
    )
  }
}

export default Notes
