import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import "./card.css";

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
      // if the name of the song is too long, make is shorter
      if(song.length > 15)
        song = song.substring(0,13) + "...";

      // debugging logs remove when this is completed
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

// TODO remove this sample audio output, instead source to actual audio player
// THIS IS FOR TESTING PURPOSES ONLY
function PlayThisLink(link){
  var audio = document.createElement("audio");
  audio.src = link;
  audio.play();
  //document.getElementById("music").appendChild(audio);
}

function CreateCard(link, artist, genre, song){
  var card = document.createElement("div");
  card.id = "card";

  card.onclick = function(){
    console.log("im about to play " + link);
    PlayThisLink(link);
  };

  var _artist = document.createElement("div");
  var artist_text = document.createElement("H2");
  artist_text.id = "artistID";
  artist_text.innerHTML = artist;
  _artist.appendChild(artist_text);
  card.appendChild(_artist);

  var _song = document.createElement("div");
  var song_text = document.createElement("H1");
  song_text.id = "songID"; 
  song_text.innerHTML = song;
  _song.appendChild(song_text);
  card.appendChild(_song);

  var _genre = document.createElement("div");
  var genre_text = document.createElement("H2");
  genre_text.id = "genreID"; 
  genre_text.innerHTML = genre;
  _genre.appendChild(genre_text);
  card.appendChild(_genre);

  // will only do this if the Home page is loaded
  // otherwise it will throw an error 
  try{
    document.getElementById("music").appendChild(card);
  }
  catch(err){
    console.log("cannot do this here");
    console.log(err);
  }
  
}

const GetMusic = withFirebase(GetMusicBase);

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(Discover);
