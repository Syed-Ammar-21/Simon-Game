alert("Welcome to the game!");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).on("keydown", function()
 {
  if (!started) {  // Check if the game has started
    started = true;  // Mark the game as started
    $("h1").text("Level " + level);  // Change title to "Level 0" initially
    nextSequence();  // Start the game by calling nextSequence
  }
});



$(".btn").click(function ()
  {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour); // Add clicked colour to user's pattern

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
 });



function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {  // Check if the most recent user answer matches the game pattern
    if (userClickedPattern.length === gamePattern.length) { // Check if the user has completed the entire sequence
      setTimeout(function() {
        nextSequence();  // Start the next sequence after a delay
        userClickedPattern = [];  // Reset the userClickedPattern for the next level
      }, 1000); // Delay of 1000 milliseconds
    }
  } else {
 var wrongSound = new Audio("sounds/wrong.mp3");  // You can add a game over message or reset the game here if you'd like
  wrongSound.play();
$("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart"); // Change the h1 title to "Game Over, Press Any Key to Restart"
 
  setTimeout(function () {
      $("body").removeClass("game-over");   // Remove the "game-over" class after 200 milliseconds
    }, 200);

    startOver();  // Call startOver() function to reset the game
  }
}

function nextSequence() 
{
  userClickedPattern = []; 
    level++;  // Increment the level
    $("h1").text("Level " + level);  // Update the title with the new level
    var randomNumber = Math.floor(Math.random() * 4); // 0 to 3
    var randomChosenColour = buttonColours[randomNumber]; // Pick a random colour
    gamePattern.push(randomChosenColour); // Add color to the game pattern
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);        // Flash the selected button
    playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
 function startOver()
 {
  level = 0;            // Reset the level to 0
  gamePattern = [];      // Clear the game pattern (reset sequence)
  userClickedPattern = []; // Clear the user's clicked pattern (reset user input)
  started = false;       // Set started to false, indicating the game hasn't started yet
  $("h1").text("Press Any Key to Start");  // Reset the title to show the start message
}