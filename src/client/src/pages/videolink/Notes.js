import React from "react";
import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import "./VideoLink.scss";
import Message from "./Message";
import axios from "axios";
import {
  noteTogetherContract,
  web3,
  apiUrl,
  serverAcountPrivateKey,
} from "../../config";
import processError from "../../util/ErrorUtil";
import sortBy from "lodash/sortBy";

const Tx = require("ethereumjs-tx").Transaction;

let store;

class Notes extends React.Component {
  constructor(props) {
    super(props);

    store = props.store;

    this.state = {
      messages: [],
      dynamicMessages: [],
      videoRef: props.videoRef,
      userName: props.userName,
      static: true,
      videoId: props.videoId,
      selectedTag: "Note",
      loading: true,
    };

    // When redux is updated, recalc the dynamic messages
    store.subscribe(() => this.generateDynamicMessages());

    // HTML refs
    this.textInput = React.createRef();
    this.textButton = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  generateDynamicMessages() {
    if (this.state.static) {
      return;
    }

    // Loop through all the messages the filter out which ones are past the current timestamp
    const currentPlayerTime = store.getState().time;
    this.setState({
      dynamicMessages: sortBy(
        this.state.messages.filter(
          (element) => currentPlayerTime >= element.timestampInSeconds
        ),
        (element) => element.timestampInSeconds
      ),
    });
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  async componentDidMount() {
    if (!!this.state.videoId) {
      const notesData = await noteTogetherContract.methods
        .getNotes(this.state.videoId)
        .call();

      const userIdToNameMap = {};
      userIdToNameMap[window.ethereum.selectedAddress] =
        this.state.userName || "Guest User";

      const data = [];

      for (const element of notesData) {
        const userId = element.user;

        // Grab username of the account if not present
        if (!userIdToNameMap[userId]) {
          const userNameData =
            (await noteTogetherContract.methods
              .getUsernameById(userId)
              .call()) || "Guest User";

          userIdToNameMap[userId] = userNameData;
        }

        data.push({
          message: element.message,
          user: element.user,
          tag: element.tag,
          timestamp: element.timestamp,
          userName: userIdToNameMap[userId] || "Guest User",
          timestampInSeconds: Notes.getSeconds(element.timestamp),
        });
      }

      // default to static note state
      this.setState({ messages: data, loading: false, static: true });
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  async messageAdded(e) {
    const message = document.getElementById("note").value;

    // if message is empty return
    if (!message) {
      return;
    }

    const time = new Date(this.state.videoRef.current.getCurrentTime() * 1000)
      .toISOString()
      .substr(11, 8);

    const tag = this.state.selectedTag;

    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: message,
          userName: this.state.userName || "Guest User",
          time: time,
          tag: tag,
          timestamp: time,
          timestampInSeconds: Notes.getSeconds(time),
        },
      ],
    });

    if (!this.state.static) {
      this.generateDynamicMessages();
    }

    e?.preventDefault();
    document.getElementById("note").value = "";

    const nonce = (
      await axios.get(`${apiUrl}/web3j/nonce`).catch((e) => processError(e))
    ).data;

    const txCount = "0x" + nonce.toString(16);
    const txObject = {
      nonce: txCount,
      gasLimit: web3.utils.toHex(6700000),
      gasPrice: web3.utils.toHex(
        Math.floor((await web3.eth.getGasPrice()) * 1.5)
      ),
      to: noteTogetherContract._address,
      data: noteTogetherContract.methods
        .addNote(
          this.state.videoId,
          time,
          tag,
          message,
          window.ethereum.selectedAddress
        )
        .encodeABI(),
    };

    const tx = new Tx(txObject, { chain: "ropsten" });
    tx.sign(Buffer.from(serverAcountPrivateKey, "hex"));

    const serializedTx = tx.serialize();
    const raw = "0x" + serializedTx.toString("hex");

    // Save note to contract
    web3.eth.sendSignedTransaction(raw).catch((e) => null);

    // Save note analytic
    const note_analytic = {
      video: this.state.videoId,
      timestamp: time,
      tag: tag,
      created_at: Date(),
    };

    axios
      .post(`${apiUrl}/analytics/saveNoteLog`, note_analytic)
      .catch((e) => processError(e));
  }

  scrollToBottom = () => {
    this.messagesEnd?.scrollIntoView({ behavior: "smooth" });
  };

  // https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
  static getSeconds(timestamp) {
    var a = timestamp.split(":");
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  }

  render() {
    return (
      <>
        {!this.state.loading && (
          <div className="flex-container-column">
            <div style={{ display: "flex" }}>
              <h3>Note Log</h3>
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
                  style={{ float: "left", clear: "both" }}
                  ref={(el) => {
                    this.messagesEnd = el;
                  }}
                />
              </CCardBody>
            </CCard>
            <form
              className="flex-container-row"
              style={{ width: "100%" }}
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
                  checked={this.state.selectedTag === "Question"}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: "Question" })
                  }
                  readOnly={true}
                />{" "}
                Question
              </label>
              <label>
                <input
                  type="radio"
                  name="tag-type"
                  checked={this.state.selectedTag === "Note"}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: "Note" })
                  }
                  readOnly={true}
                />{" "}
                Note
              </label>
              <label>
                <input
                  type="radio"
                  name="tag-type"
                  checked={this.state.selectedTag === "Answer"}
                  onClick={() =>
                    this.setState({ ...this.state, selectedTag: "Answer" })
                  }
                  readOnly={true}
                />{" "}
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
                />{" "}
                Dynamic
              </label>
              <label>
                <input
                  type="radio"
                  value="Static"
                  name="log-type"
                  checked={this.state.static}
                  onChange={() => this.setState({ static: !this.state.static })}
                />{" "}
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
    );
  }
}

export default Notes;
