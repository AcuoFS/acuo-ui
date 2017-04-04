import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DropzoneComponent from 'react-dropzone-component'
import {FILE_XLSX, FILE_CSV} from '../../constants/UploadFileTypes'

/**
 * React component from:
 * https://github.com/felixrieseberg/React-Dropzone-Component
 * http://www.dropzonejs.com/
 */
export default class DzComponent extends React.Component {
  constructor(props) {
    super(props)
    const {propNoOfFiles, propTemplate, propPostUrl} = props

    this.djsConfig = {
      autoProcessQueue: false
      , maxFiles: propNoOfFiles
      , parallelUploads: propNoOfFiles
      , acceptedFiles: FILE_XLSX + "," + FILE_CSV
      // Overriding the default HTML tags by DZ
      , previewTemplate: ReactDOMServer.renderToStaticMarkup(propTemplate)
      // Using css selector to define clickable element
      , clickable: ".triggerFileSelection"
    }

    this.componentConfig = {
      // iconFiletypes: ['.xlsx'],
      // showFiletypeIcon: false,
      // Change this param to the server's URL
      postUrl: propPostUrl
    }

    this.dropzone = null
  }

  handleFileAdded(file) {
    console.log("handling file add " + file)

    this.props.propHandlerFileAdded(this.dropzone.files.length > 0)
  }

  success(file, response) {

    this.props.updateUploadStatus(response.statuses)
    this.props.onUpdateTxnID(response.txnID)
    // Wait for animation to complete before removing file from the widget
    setTimeout((() => {
      this.dropzone.removeFile(file)
    }).bind(this), 1500)
  }

  onGenerate() {
    console.log(this.componentConfig.postUrl)
    this.dropzone.processQueue()
  }

  componentWillReceiveProps(nextProps) {
    const {propIsSendToBackend, propClearSendToBackend} = nextProps
    if (propIsSendToBackend) {
      // Send and clear the flag to send
      this.dropzone.processQueue()
      propClearSendToBackend()
    }
  }

  handleError(file) {
    if (!file.accepted) {
      // Remove the accepted file
      this.dropzone.removeFile(file)
    }
  }

  handleRemove() {
    this.props.propHandlerRemove(this.dropzone.files.length == 0)
  }

  render() {
    const {propClassName, propDisplayForBrowse} = this.props

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
      <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}
                         className={propClassName}>
        <div className="dz-message">
            <span>
              {
                propDisplayForBrowse
                  ? propDisplayForBrowse
                  : 'Drag and drop portfolio files, or '
              }

              <a href="#" className="triggerFileSelection"
                 onClick={(e) => e.preventDefault()}>browse</a>.
            </span>
        </div>
      </DropzoneComponent>
    )
  }
}