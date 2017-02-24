import React from 'react'
import DzComponent from '../../upload-portfolio/DzComponent'
import {UPLOAD_FILE_URL} from '../../../constants/APIcalls-dev'
import styles from './CounterPartyUpload.css'


export default class UploadWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWidgetValidForSubmission: false,
      isSendToBackend: false
    }

    this.onGenerate = this.onGenerate.bind(this)
    this.handleFileAdded = this.handleFileAdded.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.clearSend = this.clearSend.bind(this)
  }

  handleFileAdded(hasFiles) {
    this.setState({
      isWidgetValidForSubmission: hasFiles
    })
  }

  onGenerate() {
    this.setState({
      isSendToBackend: true
    })
  }

  clearSend(){
    this.setState({
      isSendToBackend: false
    })
  }

  handleRemove(isEmpty) {
    this.setState({
      isWidgetValidForSubmission: !isEmpty
    })
  }

  templateForDz(){
    return <div className={"dz-preview dz-file-preview " + styles.alignFileIconLeft}>
      <div className="dz-details">
        <div className={"dz-filename " + styles.fileName}>
          <a href="#" data-dz-remove>
            <img src="./images/upload-portfolio/cross_cancel.png" alt="Click me to remove the file."/>
          </a>

          <span data-dz-name="true" className={styles.fileNameText}></span>
        </div>
      </div>
      <div className="dz-success-mark"><span>✔</span></div>
      <div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
    </div>
  }

  render() {
    // TODO: URL to be provided by backend. Using URL from current at the moment
    return (
      <div className={styles.componentStyle}>
        <DzComponent propHandlerFileAdded={this.handleFileAdded}
                     propHandlerRemove={this.handleRemove}
                     propIsSendToBackend={this.state.isSendToBackend}
                     propClearSendToBackend={this.clearSend}
                     propTemplate={this.templateForDz()}
                     propClassName={'filepickerRecon'}
                     propNoOfFiles={1}
                     propPostUrl={UPLOAD_FILE_URL}/>

        <div className={this.state.isWidgetValidForSubmission
          ? styles.buttonContainer : styles.hide}>
          <button onClick={this.onGenerate}>OK</button>
        </div>
      </div>
    )
  }
}