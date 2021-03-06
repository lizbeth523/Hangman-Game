// Array of possible words for the hangman game
var dictionary = ["ABYSINNIAN", "AMERICAN SHORTHAIR", "BIRMAN", "CALICO", "CORNISH REX", "EGYPTIAN MAU", "HIMALAYAN", "JAPANESE BOBTAIL", "JAVANESE", "KURILIAN BOBTAIL", "MAINE COON", "MANX", "MUNCHKIN", 
  "NORWEGIAN FOREST CAT", "OCICAT", "PERSIAN", "RAGDOLL", "RUSSIAN BLUE", "SCOTTISH FOLD", "SELKIRK REX", "SIAMESE", "SNOWSHOE CAT", "SPHYNX", "TABBY", "TONKINESE", "TURKISH ANGORA", "TURKISH VAN"];

// Chooses a word at random from the dictionary array
var word = dictionary[Math.floor(Math.random() * dictionary.length)];

var hangmanImages = ["assets/images/hangman0.jpg", "assets/images/hangman1.jpg", "assets/images/hangman2.jpg", "assets/images/hangman3.jpg", "assets/images/hangman4.jpg", "assets/images/hangman5.jpg",
  "assets/images/hangman6.jpg", "assets/images/hangman7.jpg", "assets/images/hangman8.jpg", "assets/images/hangman9.jpg"];

// The letter guessed by the user
var userGuess;

// Array of all uppercase letters
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Array of letters already guessed
var lettersUsed = [];

// Numer of incorrect guesses made by the user
var incorrectGuesses = 0;

// Number of allowed guesses before game over
var allowedGuesses = 9;

// Whether the word contains the user guess letter
var containsGuess = false;

// Number of wins
var wins = 0;

// Number of losses
var losses = 0;

// Create the tiles where letters will be placed as they are guessed
var tiles = getTiles();

// Song that will be played when user wins
var winningSong = "assets/sounds/MeowMixSong.mp3";

// Audio object created in playSound function
var audio;

// This function is run whenever the user presses a key.
document.onkeyup = function(event) 
{
  // Set the inner HTML contents of the #tile-display div to the contents of the tiles array
  document.querySelector("#tile-display").innerHTML = tiles.join(" ");

  // Determines which key was pressed and converts to upper case
  var userGuess = event.key.toUpperCase();

  // Alerts the key the user pressed (userGuess).
  // alert("User guess: " + userGuess);
  // Alerts the Computer's guess.
  // alert("Computer guess: " + word); 

  // Check that user input is a letter that hasn't already been guessed
  if (letters.indexOf(userGuess) >= 0 && lettersUsed.indexOf(userGuess) < 0)
  {
    // Add the user's guess to the list of used letters
    lettersUsed.push(userGuess);

    // Sort the list of letters used to maintain the list in alphabetical order
    lettersUsed.sort();

    // Set the inner HTML contents of the #letters-used div to the contents of the lettersUsed array
    document.querySelector("#letters-used").innerHTML = lettersUsed.join(" ");

    // Check whether the word contains the letter that the user guessed
    if (word.indexOf(userGuess) < 0)
    {
      incorrectGuesses++;

      // Update hangman image to reflect one more incorrect guess
      document.getElementById("hangman-display").src = hangmanImages[incorrectGuesses];

      // Update number of guesses remaining
      document.querySelector("#guesses-left").innerHTML = allowedGuesses - incorrectGuesses;

      // Game over if user has made the allowed number of incorrect guesses
      if (incorrectGuesses >= allowedGuesses)
      {
        losses++;
        document.getElementById("loser-pic").style.visibility = "visible";
        document.querySelector("#losses").innerHTML = losses;
      }
    } // end if word.indexOf(userGuess) > 0
    else
    { // Loop through 'word' to check if userGuess matches any of the characters
      for (var i = 0; i < word.length; i++)
      {
        // Replace '_' with the letter guessed by user
        if (word.charAt(i) === userGuess)
        {
          tiles[i] = userGuess;
        }
      }
      document.querySelector("#tile-display").innerHTML = tiles.join(" ");
      // If the user has guessed all letters correctly, show picture telling them they won, increment # of wins, and play song
      if (tiles.indexOf('_') < 0)
      {
        wins++;
        document.getElementById("winner-pic").style.visibility = "visible";
        document.querySelector("#wins").innerHTML = wins;
        playSound(winningSong);
      }
    } // end else
  } // end if letter.indexOf(userGuess) > 0
};

 // Plays sound file
 function playSound(snd) 
 {
   audio = new Audio(snd)
   audio.play();
}  

// Creates tiles for the word to be guessed
function getTiles()
{
  tiles = [];
  for (var i = 0; i < word.length; i++)
  { 
    // Create a space for any spaces between words
    if (word.charAt(i) === ' ')
    {
      tiles[i] = "&nbsp;";
      console.log("tiles: " + tiles);
    }
    // Create a tile for each letter
    else
    {
      tiles[i] = '_';
    }
  }
  return tiles;
}

// Reset for new game
function reset()
{
  audio.pause();
  lettersUsed = [];
  incorrectGuesses = 0;
  word = dictionary[Math.floor(Math.random() * dictionary.length)];
  tiles = getTiles();  
  document.querySelector("#tile-display").innerHTML = tiles.join(" ");
  document.querySelector("#letters-used").innerHTML = lettersUsed;  
  document.querySelector("#guesses-left").innerHTML = allowedGuesses;
  document.getElementById("winner-pic").style.visibility = "hidden";
  document.getElementById("loser-pic").style.visibility = "hidden";
  document.getElementById("hangman-display").src = hangmanImages[0];
}