// Array of possible words for the hangman game
var dictionary = ["TABBY", "CALICO", "SIAMESE", "PERSIAN", "HIMALAYAN", "MAINE COON", "NORWEGIAN FOREST CAT", "SCOTTISH FOLD"];

// Chooses a word at random from the dictionary array
var word = dictionary[Math.floor(Math.random() * dictionary.length)];

var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Numer of incorrect guesses made by the user
var incorrectGuesses = 0;

// Number of allowed guesses before game over
var allowedGuesses = 6;

// Whether the word contains the user guess letter
var containsGuess = false;

// Create the tiles where letters will be placed as they are guessed
var tiles = [];
for (var i = 0; i < word.length; i++)
{ 
  if (word[i] === ' ')
  {
    tiles[i] = ' ';
  }
  else
  {
    tiles[i] = '_';
  }
}

// Change the tiles array to a string to display
tiles = tiles.toString();

// This function is run whenever the user presses a key.
document.onkeyup = function(event) 
{
  // Set the inner HTML contents of the #tile-display div to the contents of the tiles array
  document.querySelector("#tile-display").innerHTML = tiles;

  // Determines which key was pressed.
  var userGuess = event.key.toUpperCase();

  // Alerts the key the user pressed (userGuess).
  alert("User guess: " + userGuess);
  // Alerts the Computer's guess.
  alert("Computer guess: " + word); 

  // Check whether the word contains the letter that the user guessed
  if (word.indexOf(userGuess) < 0)
  {
    incorrectGuesses++;
    alert("Number of incorrect guesses: " + incorrectGuesses);
    if (incorrectGuesses >= allowedGuesses)
    {
      alert("Game over!");
    }
  }
  else
  {
    alert(word + " contains " + userGuess + " at index " + word.indexOf(userGuess));
  }
  

  
  // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
  // var html =
  //   "<p>You chose: " + userGuess + "</p>" +
  //   "<p>The computer chose: " + computerGuess + "</p>" +
  //   "<p>wins: " + wins + "</p>" +
  //   "<p>losses: " + losses + "</p>" +
  //   "<p>ties: " + ties + "</p>";
    
  // Set the inner HTML contents of the #game div to our html string
  // document.querySelector("#game").innerHTML = html;
};