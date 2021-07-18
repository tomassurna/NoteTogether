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
import playerTimeReducer from '../../redux/PlayerTimeReducer'

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
  }

  generateDynamicMessages() {
    // Loop through all the messages the filter out which ones are past the current timestamp
    const currentPlayerTime = store.getState().time
    console.log(currentPlayerTime)

    this.setState({
      dynamicMessages: this.state.messages.filter(
        (element) => currentPlayerTime >= element.timestampInSeconds,
      ),
    })
    this.scrollToBottom()
  }

  async componentDidMount() {
    if (!!this.state.videoId) {
      const notesData = await noteTogetherContract.methods
        .getNotes(this.state.videoId)
        .call()

      const userIdToNameMap = {}
      userIdToNameMap[window.ethereum.selectedAddress] = this.state.userName

      const data = await Promise.all(
        notesData.map(async (element) => {
          const userId = element.user

          if (!userIdToNameMap[userId]) {
            const userNameData = await noteTogetherContract.methods
              .getUsernameById(userId)
              .call()

            userIdToNameMap[userId] = userNameData
          }

          return {
            message: element.message,
            user: element.user,
            tag: element.tag,
            timestamp: element.timestamp,
            userName: userIdToNameMap[userId] || 'Guest User',
            timestampInSeconds: this.getSeconds(element.timestamp),
          }
        }),
      )

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

    if (!this.state.static) {
      this.generateDynamicMessages()
    }

    e.preventDefault()
    document.getElementById('note').value = ''

    noteTogetherContract.methods
      .addNote(
        this.state.videoId,
        time,
        tag,
        message,
        window.ethereum.selectedAddress,
      )
      .send({
        from: serverAcountId,
        gas: 6700000,
      })
    this.scrollToBottom()
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

  render() {
    return (
      <>
        {!this.state.loading && (
          <div className="flex-container-column">
            <h3>Note Log</h3>
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
              />
              <input
                class="btn btn-dark notes-btn"
                type="submit"
                value="Enter"
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
