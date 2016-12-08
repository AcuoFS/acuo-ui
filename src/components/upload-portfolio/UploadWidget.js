import React from 'react'
import DropzoneComponent from 'react-dropzone-component';

export default class UploadWidget extends React.Component {
  constructor(props) {
    super(props)

    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      autoProcessQueue: false,
      maxFiles: 5,
      parallelUploads: 5
    }

    this.componentConfig = {
      iconFiletypes: ['.xlsx'],
      showFiletypeIcon: true,
      postUrl: 'http://127.0.0.1:3000/uploadHandler'
    }

    this.dropzone = null
    this.onButtonClicked = this.onButtonClicked.bind(this)
  }

  handleFileAdded(file) {
    console.log(file)
  }

  onButtonClicked() {
    console.log(this.componentConfig.postUrl)
    this.dropzone.processQueue()
  }

  render() {
    const config = this.componentConfig
    const djsConfig = this.djsConfig

    const eventHandlers = {
      init: dz => this.dropzone = dz,
      addedfile: this.handleFileAdded.bind(this)
    }

    return (
    /*<form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3000/">
      <input type="file" id="myFile"/>
      <input type="submit" value="Submit"/>
    </form>*/
      <div>
        <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig}/>
        <button type="button" onClick={this.onButtonClicked}>Click Me!</button>
      </div>
    )
  }
}