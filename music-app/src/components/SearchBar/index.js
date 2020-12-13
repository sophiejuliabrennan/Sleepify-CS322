import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './SearchBar.css';
const SearchBar = () => (
    <div>
      <SearchBarForm />
    </div>
  );

  function PlayThisLink(link){
    var audio = document.getElementById("globalAudioPlayer");
    console.log(audio);
    audio.src = link;
    audio.play();
  }

  function CreateSmallLink(link, artist, genre, song){
    var card = document.createElement("a");
    card.className = "dropdown-content";
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
      document.getElementById("drop-down").appendChild(card);
    }
    catch(err){
      console.log("cannot do this here");
      console.log(err);
    }
    
  }

  class SearchBarFormBase extends Component{
    /*constructor(props){
      super(props);
    }*/
  
    fuzzy = (e) => {
      console.log(">>>>>>" + e.target.value + " " + e.target.value.length);
      document.getElementById("drop-down").innerHTML="";
      if(e.target.value.length!==0){
        var databaseReference = this.props.firebase.db;
        var childReference = databaseReference.ref("audioReferences");
        var search = (e.target.value).toUpperCase();
        childReference.orderByKey().on("child_added", function(snapshot){
          var data = snapshot.val().metadata.customMetadata;
          if((data.song_name).toUpperCase().includes(search) |
            (data.genre).toUpperCase().includes(search) |
            (data.artist).toUpperCase().includes(search)){
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
            // debugging logs remove when this is completed
            console.log("Link: " + link);
            console.log("Artist: " + artist);
            console.log("Genre: " + genre);
            console.log("Song: " + song);
            CreateSmallLink(link, artist, genre, song);
          }
        });
      }
      e.preventDefault();
    }
    
    render(){
      return(
        <div>
          <input className={"searchBar, dropbtn"} type="text" placeholder="Search Music" name="search" onChange={this.fuzzy}/>
          <div id="searchContainer">
          <div id={"drop-down"} className={"dropdown-content"}>
          </div>   
          </div>
        </div>
      );
    }
  }
  const SearchBarForm = withFirebase(SearchBarFormBase);
   
  export default SearchBar;
  export { SearchBarForm };