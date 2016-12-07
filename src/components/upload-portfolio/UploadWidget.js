import React from 'react'

export default class UploadWidget extends React.Component {
  render() {
    return (
      <form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3000/">
        <input type="file" id="myFile"/>
        <input type="submit" value="Submit"/>
      </form>
    )
  }
}