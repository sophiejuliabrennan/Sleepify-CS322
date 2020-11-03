import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const Upload = () => (
  <div>
    <h1>Upload</h1>
    <Uploader />
  </div>
);

class UploaderBase extends Component{
  constructor(props){
    super(props);
    this.state = {
      file: null,
      metadata : {
        song_name: "",
        genre: "",
        length: 0
      }
    };
  }

  onClickHandler = () => {

    // console.log(this.state.file);
    // console.log(this.props.firebase.storage);
    // console.log(this.props.firebase.storageRef);
    // console.log(this.state.file);

    // Stop the user from uploading non audio files
    if(!this.state.file.type.match('audio/.*')){
      console.log("Unsupported File Type");
      document.getElementById("info").innerHTML = "You can only upload audio files";
      return;
    }

    console.log("This file = " + this.state.file.name);
    var uploadTask = this.props.firebase.storageRef.child('audio/' + this.state.file.name).put(this.state.file, this.state.metadata);
    console.log(uploadTask);

    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      document.getElementById("progress").value = progress;
    }, function(error) {
      console.log(error);
      document.getElementById("info").innerHTML = "You must be logged in to upload";
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        document.getElementById("info").innerHTML=downloadURL;
      });
    });
  }

  onChangeHandler = event => {
    console.log("File loaded");
    this.setState({
      file: event.target.files[0],
      loaded: 0,
      metadata : {
        song_name: document.getElementById("song").value,
        genre: document.getElementById("genre").value,
        length: event.target.files[0].size
      }
    })
  }

  render(){
    return(
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler}/>
        <br/>
        <input type="type" id="song" placeholder="Song Title"/>
        <br/>
        <input type="type" id="genre" placeholder="Genre"/>
        <br/>
        <button type="button" onClick={this.onClickHandler}>Upload</button>
        <br/>
        <progress id="progress" value="0" max="100"></progress>
        <h1 id="info"></h1>
      </div>
    );
  }
}

const Uploader = withFirebase(UploaderBase);
 
export default Upload;