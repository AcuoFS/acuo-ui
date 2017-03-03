import React from 'react'
import DzComponent from '../../upload-portfolio/DzComponent'
import {UPLOAD_FILE_URL} from '../../../constants/APIcalls'
import {SimpleCenteredPopup} from '../../common/SimpleCenteredPopup'
import styles from './ImportAgreements.css'


export default class ImportAgreements extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSendToBackend: false,
      isWidgetValidForSubmission: false
    }

    this.clearSend = this.clearSend.bind(this)
    this.handleFileAdded = this.handleFileAdded.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  clearSend() {
    this.setState({
      isSendToBackend: false
    })
  }

  handleFileAdded(hasFiles) {
    this.setState({
      isWidgetValidForSubmission: hasFiles
    })
  }

  handleRemove(isEmpty) {
    this.setState({
      isWidgetValidForSubmission: !isEmpty
    })
  }

  templateForDz() {
    return <div className={"dz-preview dz-file-preview " + styles.alignFileIconLeft}>
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
  }

  render() {
    const {propHandlerCloseImportPopup} = this.props

    // TODO Update correct post URL with propPostUrl
    return (
      <SimpleCenteredPopup handlerClosePopup={propHandlerCloseImportPopup}>
        <div className={styles.container}>
          <DzComponent propHandlerFileAdded={this.handleFileAdded}
                       propHandlerRemove={this.handleRemove}
                       propIsSendToBackend={this.state.isSendToBackend}
                       propClearSendToBackend={this.clearSend}
                       propTemplate={this.templateForDz()}
                       propNoOfFiles={1}
                       propPostUrl={UPLOAD_FILE_URL}
                       propDisplayForBrowse={'Drag and drop agreement files, or '}/>

          {
            this.state.isWidgetValidForSubmission &&
            <div className={styles.btnContainer}>
              <button className={styles.importBtnStyle}
                      onClick={()=> this.setState({isSendToBackend: true})}>Import</button>
            </div>
          }
        </div>
      </SimpleCenteredPopup>
    )
  }

}
