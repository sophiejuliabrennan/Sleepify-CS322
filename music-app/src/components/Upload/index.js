import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

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
      artist: null,
      song_name: null,
      genre: null,
      length: 0
    };
  }

  onClickHandler = () => {

    var _artist;
    var _uid = this.props.firebase.auth.currentUser.uid;
    console.log("This users uid = "  + _uid);
    var db = this.props.firebase.db;
    var ref = db.ref("users");
    console.log(ref);
    ref.orderByChild("users").on("child_added", function(snapshot) {
      if(snapshot.key == _uid){
        _artist = snapshot.val().username;
        console.log(snapshot.key + " is " + snapshot.val().username);
      }
    });

    // Stop the user from uploading non audio files
    if(!this.state.file.type.match('audio/.*')){
      console.log("Unsupported File Type");
      document.getElementById("info").innerHTML = "You can only upload audio files";
      return;
    }

    console.log("This file = " + this.state.file.name);

    // limit upload files to about 50 mb
    if(this.state.file.size > 50000000){
      document.getElementById("info").innerHTML = "You file is too big! Please upload a smaller file";
      return;
    }

    console.log(this.state.artist + " artist");

    var _metadata = {
      customMetadata: {
        artist: _artist,
        song_name: this.state.song_name,
        genre: this.state.genre,
      }
    }

    console.log(_metadata);

    var fileRef = this.props.firebase.storageRef.child('audio/' + this.state.file.name);
    var dbRef = this.props.firebase.db.ref().child("audioReferences/");

    var uploadTask = fileRef.put(this.state.file);
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

        // send reference to relational db
        dbRef.push({
          link : downloadURL,
          metadata : _metadata
        });

      });

      // Set the metadata
      fileRef.updateMetadata(_metadata).then(function(metadata){
        console.log(metadata);
      }).catch(function(err){
        console.log(err);
      });

    });

  }

  handleSongChange(event){
    console.log(event.target.value);
    this.setState({...this.state, song_name: event.target.value});
    console.log(this.state);
  }

  handleGenreChange(event){
    console.log(event.target.value);
    this.setState({...this.state, genre: event.target.value});
    console.log(this.state);
  }


  onChangeHandler = event => {
    this.setState({
      file: event.target.files[0],
      metadata : {
        artist: "_artist",
        song_name: "_song_name",
        genre: "_genre",
        length: event.target.files[0].size
      }
    })
  }

  render(){
    return(
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler}/>
        <br/>
        <input type="type" id="song" placeholder="Song Title" onChange={e => this.handleSongChange(e)}/>
        <br/>
        <input type="type" id="genre" placeholder="Genre" onChange={e => this.handleGenreChange(e)}/>
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