import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DropzoneComponent from 'react-dropzone-component'
import {UPLOAD_FILE_URL} from '../../constants/APIcalls'
import {FILE_XLSX, FILE_CSV} from '../../constants/UploadFileTypes'
import styles from './UploadWidget.css'

/**
 * React component from:
 * https://github.com/felixrieseberg/React-Dropzone-Component
 * http://www.dropzonejs.com/
 */
export default class UploadWidget extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isWidgetValidForSubmission: false
    }

    this.djsConfig = {
      autoProcessQueue: false
      , maxFiles: 5
      , parallelUploads: 5
      , acceptedFiles: FILE_XLSX + "," + FILE_CSV
      // Overriding the default HTML tags by DZ
      , previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className={"dz-preview dz-file-preview " + styles.alignFileIconLeft}>
          <div className="dz-details">
            <img data-dz-thumbnail="true" src="./images/upload-portfolio/file_icon.png"/>
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
      )
      // Using css selector to define clickable element
      , clickable: ".triggerFileSelection"
    }

    this.componentConfig = {
      // iconFiletypes: ['.xlsx'],
      // showFiletypeIcon: false,
      // Change this param to the server's URL
      postUrl: UPLOAD_FILE_URL
    }

    this.dropzone = null
    this.onGenerate = this.onGenerate.bind(this)
  }

  handleFileAdded(file) {
    console.log("handling file add " + file)

    this.setState({
      isWidgetValidForSubmission: this.dropzone.files.length > 0
    })
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

    this.props.showMarginCall()
  }

  handleError(file) {
    if (!file.accepted) {
      // Remove the accepted file
      this.dropzone.removeFile(file)
    }
  }

  handleRemove() {
    this.setState({
      isWidgetValidForSubmission: !(this.dropzone.files.length == 0)
    })
  }

  render() {
    const config = this.componentConfig
    const djsConfig = this.djsConfig

    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.handleFileAdded.bind(this),
      success: this.success.bind(this),
      error: this.handleError.bind(this),
      removedfile: this.handleRemove.bind(this)
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
              Drag and drop portfolio files, or&nbsp;
              <a href="#" className="triggerFileSelection"
                 onClick={(e) => e.preventDefault()}>browse</a>.
            </span>
          </div>
        </DropzoneComponent>
        <div
          className={this.state.isWidgetValidForSubmission ?
            styles.buttonContainerEnabled : styles.buttonContainerDisabled}>
          <button className={styles.textBold} type="button" onClick={this.onGenerate}
                  disabled={!(this.state.isWidgetValidForSubmission)}>
            Generate Margin Call Data
          </button>
        </div>
      </div>
    )
  }
}