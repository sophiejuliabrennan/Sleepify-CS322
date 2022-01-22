function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var GAP = 2;
var dot = document.getElementById("canvas1");
function start() {
  // Create the Audio using an audio file URL
  var song = new Audio("../images/audio.mpeg");

  // Play the file
  song.play();

  // Call the function `visualize` any time the `song` changes frames
  audioChangeMethod(song, visualize);
}

/**
 * This function will be called every time the song changes
 * It is passed an array of audio data (a single frame in the song).
 * The low indices are low notes
 * and the high indices are high notes.
 * Visualize the array by making one bar for each index. The bar width
 * represents how loud the notes are at that frequency.
 */
function visualize(frame) {
  // Remove all the bars from the previous frame in the song
  removeAll();

  // Set the width of the bars
  var barWidth = (getWidth() - GAP) / frame.length - GAP;

  // Make a single bar for each number in the frame
  for (var i = 0; i < frame.length; i++) {
    var barHeight = frame[i];

    var bar = new Rectangle(barWidth, barHeight);
    var x = GAP + (barWidth + GAP) * i;
    var y = getHeight() - barHeight;
    var color = getColor(barHeight);
    bar.setPosition(x, y);
    bar.setColor(color);
    add(bar);
  }
}

/*
 * Create a new color expressed as three values RGB for red, green, blue.
 * Set the green value to be the max possible value
 * Set the red value to be the max value minus how high the bar is
 * Set the blue value to be the same as the bar height
 * The result is a yellow bar that gets more pink the higher it is!
 */
function getColor(barHeight) {
  var maxValue = 255;
  var red = maxValue - barHeight;
  var blue = barHeight;
  var green = maxValue;
  return new Color(red, blue, green);
}

var x = document.getElementById("campfireFreq");
x.style.visibility = "hidden";
function freq() {
  x.style.visibility = "visible";
  x.loop = true;
}
