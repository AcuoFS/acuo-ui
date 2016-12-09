import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DropzoneComponent from 'react-dropzone-component'
import styles from './UploadWidget.css'


export default class UploadWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWidgetValidForSubmission: false
    }

    this.djsConfig = {
      addRemoveLinks: true
      , autoProcessQueue: false
      , maxFiles: 5
      , parallelUploads: 5
      // Accept only XLSX files
      , acceptedFiles: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // Overriding the default HTML tags by DZ
      , previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className={"dz-preview dz-file-preview " + styles.alignFileIconLeft}>
          <div className="dz-details">
            <div className="dz-filename"><span data-dz-name="true"></span></div>
            <img data-dz-thumbnail="true" src="./images/upload-portfolio/file_icon.png"/>
            <img src="./images/upload-portfolio/cross_cancel.png" alt="Click me to remove the file." data-dz-remove/>
          </div>
          <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
          <div className="dz-success-mark"><span>✔</span></div>
          <div className="dz-error-mark"><span>✘</span></div>
          <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
        </div>
      )
      // Using css selector to define clickable element
      , clickable: ".triggerFileSelection"
    }

    this.componentConfig = {
      iconFiletypes: ['.xlsx'],
      showFiletypeIcon: false,
      postUrl: 'http://127.0.0.1:3000/uploadHandler'
    }

    this.dropzone = null
    this.generateBtn = null
    this.onGenerate = this.onGenerate.bind(this)
  }

  handleFileAdded(file) {
    console.log("handling file add " + file)

    const isGoodForSubmission =  this.dropzone.files.length > 0

    this.setState({
      isWidgetValidForSubmission: isGoodForSubmission
    })
    this.generateBtn.disabled = !isGoodForSubmission

    // console.log("accepted: "+file.accepted)
    console.log("accepted files: " + this.dropzone.getAcceptedFiles().length)
    console.log("rejected files: " + this.dropzone.getRejectedFiles().length)
    console.log("queued files: " + this.dropzone.getQueuedFiles().length)
    console.log("uploading files: " + this.dropzone.getUploadingFiles().length)
    console.log("all files: " + this.dropzone.files.length)
  }

  success(file) {
    console.log('uploaded', file)
    // Wait for animation to complete before removing file from the widget
    setTimeout((() => {
      this.dropzone.removeFile(file)
    }).bind(this), 1500)
  }

  onGenerate() {
    console.log(this.componentConfig.postUrl)
    this.dropzone.processQueue()
  }

  handleError(file) {
    if (!file.accepted) {
      console.log("file not accepted")

      this.setState({
        isWidgetValidForSubmission: false
      })
      this.generateBtn.disabled = true
    }
  }

  render() {
    const config = this.componentConfig
    const djsConfig = this.djsConfig

    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.handleFileAdded.bind(this),
      success: this.success.bind(this),
      error: this.handleError.bind(this)
    }

    return (
      /*<form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3000/">
       <input type="file" id="myFile"/>
       <input type="submit" value="Submit"/>
       </form>*/
      <div className={styles.componentStyle}>
        <div className={styles.widgetHeader}>Upload Portfolio</div>
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}>
          <div className="dz-message">
            <span>
              Drag and drop portfolio files, or <a href="#" className="triggerFileSelection">browse</a>.
            </span>
          </div>
        </DropzoneComponent>
        <div
          className={this.state.isWidgetValidForSubmission ?
            styles.buttonContainerEnabled : styles.buttonContainerDisabled}>
          <button type="button" onClick={this.onGenerate} ref={dom => this.generateBtn = dom}>
            Generate Margin Call Data
          </button>
        </div>
      </div>
    )
  }
}