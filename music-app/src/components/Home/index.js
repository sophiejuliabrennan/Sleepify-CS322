import React, { Component } from 'react';
import firebase from "firebase";
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const Discover = () => (
  <div>
    <h1>Discover Music</h1>
    <GetMusic />
  </div>
);

class GetMusicBase extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  // get every song with a reference and metadata from the database
  onClickHandler = (e) => {
    console.log(this.props.firebase.db);
    var databaseReference = this.props.firebase.db;
    var childReference = databaseReference.ref("audioReferences");
    console.log(childReference);

    childReference.orderByKey().on("child_added", function(snapshot){
      console.log("Links : ");
      console.log(snapshot.val());
      // get the link
      var link = snapshot.val().link;
      // get the artist
      var artist = snapshot.val().metadata.customMetadata.artist;
      // get the genre
      var genre = snapshot.val().metadata.customMetadata.genre;
      // get the song name
      var song = snapshot.val().metadata.customMetadata.song_name;

      console.log("Link: " + link);
      console.log("Artist: " + artist);
      console.log("Genre: " + genre);
      console.log("Song: " + song);

      CreateCard(link, artist, genre, song);

    });
    e.preventDefault();
  }

  render(){
    return(
      <div>
          <button onClick={this.onClickHandler}>click</button>
          <ul id="music">
          </ul>
      </div>
    );
  }
}


function CreateCard(link, artist, genre, song){
  var card = document.createElement("div");

  // abstract this style into a CSS file
  card.style.border = "5px red";
  card.style.backgroundColor = "grey";
  card.style.textAlign = "left";
  card.style.display = "inline-block";
  card.style.padding = "1%";
  card.style.margin = "1%";

  card.onclick = function(){console.log("im about to play " + link)};

  var _artist = document.createElement("div");
  var artist_text = document.createElement("H2");
  artist_text.innerHTML = artist;
  _artist.appendChild(artist_text);
  card.appendChild(_artist);

  var _song = document.createElement("div");
  var song_text = document.createElement("H1");
  song_text.innerHTML = song;
  _song.style.textAlign = "center";
  _song.appendChild(song_text);
  card.appendChild(_song);

  var _genre = document.createElement("div");
  var genre_text = document.createElement("H2");
  genre_text.innerHTML = genre;
  _genre.appendChild(genre_text);
  _genre.style.textAlign = "right";
  card.appendChild(_genre);

  document.getElementById("music").appendChild(card);
}

function check(){
    var user = firebase.auth().currentUser;
    if (user) {
        console.log("Welcome " + user.email);
        document.getElementById("welcome").innerHTML = "Welcome " + user.email;
    } else {
        console.log("not signed in");
        document.getElementById("welcome").innerHTML = "You are not signed in.";
    }
}


// const Home = () => (
//   <div onLoad={check}>
//     <h1 id="welcome" onLoad={check}></h1>
//     <button onClick={check}>am i logged in?</button>
//     <br/>
//     <div>
//       <h1> Music Goes Here</h1>
//       {
        
//       }
//     </div>
//   </div>
// );

const GetMusic = withFirebase(GetMusicBase);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Discover);