import React from 'react'
import DzComponent from './DzComponent'
import {UPLOAD_FILE_URL} from '../../constants/APIcalls'
import styles from './UploadWidget.css'


export default class UploadWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWidgetValidForSubmission: false,
      isSendToBackend: false,
      status: []
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

  updateUploadStatus(status) {
    this.setState({
      status: status
    })
  }

  onGenerate() {
    this.setState({
      isSendToBackend: true
    })

    this.props.showMarginCall()
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
        <img data-dz-thumbnail="true" src="./images/upload-portfolio/file_icon.png"/>
        <div className={"dz-filename " + styles.fileName}>

          <span data-dz-name="true" className={styles.fileNameText}></span>

          <a href="#" data-dz-remove>
            <img src="./images/upload-portfolio/cross_cancel.png" alt="Click me to remove the file."/>
          </a>
        </div>
      </div>
      <div className="dz-success-mark"><span>✔</span></div>
      <div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
    </div>
  }

  render() {

    return (
      /*<form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3000/">
       <input type="file" id="myFile"/>
       <input type="submit" value="Submit"/>
       </form>*/
      <div className={styles.componentStyle}>
        <div className={styles.widgetHeader}>Upload Portfolio</div>

        <DzComponent propHandlerFileAdded={this.handleFileAdded}
                     propHandlerRemove={this.handleRemove}
                     propIsSendToBackend={this.state.isSendToBackend}
                     propClearSendToBackend={this.clearSend}
                     propTemplate={this.templateForDz()}
                     propNoOfFiles={5}
                     propPostUrl={UPLOAD_FILE_URL}
                     updateUploadStatus={this.updateUploadStatus}/>


        <div className={styles.buttonContainer}>
          <div className={styles.uploadStatus}>
            {this.state.status.map(x => <p>{x.remarks}</p>)}
          </div>

          <button className={styles.textBold + ' ' + (this.state.isWidgetValidForSubmission ?
            styles.enabled : '')} type="button" onClick={this.onGenerate}
                  disabled={!(this.state.isWidgetValidForSubmission)}>
            Upload
          </button>
        </div>
      </div>
    )
  }
}