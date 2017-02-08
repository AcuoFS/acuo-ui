import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DropzoneComponent from 'react-dropzone-component'
import {UPLOAD_FILE_URL} from '../../constants/APIcalls'
import {FILE_XLSX, FILE_CSV} from '../../constants/UploadFileTypes'

/**
 * React component from:
 * https://github.com/felixrieseberg/React-Dropzone-Component
 * http://www.dropzonejs.com/
 */
export default class DzComponent extends React.Component {
  constructor(props) {
    super(props)

    this.djsConfig = {
      autoProcessQueue: false
      , maxFiles: props.propNoOfFiles
      , parallelUploads: props.propNoOfFiles
      , acceptedFiles: FILE_XLSX + "," + FILE_CSV
      // Overriding the default HTML tags by DZ
      , previewTemplate: ReactDOMServer.renderToStaticMarkup(props.propTemplate)
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
  }

  handleFileAdded(file) {
    console.log("handling file add " + file)

    this.props.propHandlerFileAdded(this.dropzone.files.length > 0)
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.propIsSendToBackend){
      // Send and clear the flag to send
      this.dropzone.processQueue()
      this.props.propClearSendToBackend()
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
                           className={this.props.propClassName}>
          <div className="dz-message">
            <span>
              Drag and drop portfolio files, or&nbsp;
              <a href="#" className="triggerFileSelection"
                 onClick={(e) => e.preventDefault()}>browse</a>.
            </span>
          </div>
        </DropzoneComponent>
    )
  }
}