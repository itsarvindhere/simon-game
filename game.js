var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


//A Flag that is False in the beginning and we only run the nextSequence()
// If the flag is false which shows game hasn't already started
//Inside the event handler for keypress, we then change started = true so
// that the nextSequence() is not run again with keypress

var started = false;


//We define a variable level = 0 and this inidicates the level of game.
//As we call nextSequence(), level keeps increasing and h1 is also updated.
var level = 0;


//Even handler when we click a button
$(".btn").click(function() {
  //A variale that stores the id of the button element that is clicked
  var userChosenColor = $(this).attr("id");

  //add this id to the userClickedPattern array
  userClickedPattern.push(userChosenColor);

  //Play the sound using PlaySound function that takes a color as parameter
  playSound(userChosenColor);

  //Animate the button press
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})




// A function to animate the button press
function animatePress(currentColor) {

  //Add the pressed class to the button
  $("#"+currentColor).addClass("pressed");

  //After 100ms, remove that class
    setTimeout(function(){
       $("#"+currentColor).removeClass("pressed");
     }, 100);

  }

//Play the sound on button press
function playSound (name) {

  //Create a variable for storing the file name
  //For Eg, if parameter passed is "green", then file name is
  //"green.mp3"
  var audioFileName = name+".mp3";
  var audio = new Audio("sounds/" + audioFileName);
  audio.play();
}

//A function that is run in the beginning on keypress
function nextSequence() {

  userClickedPattern = [];
  //Increase the level
  level++;
   //Update H1 to show the new Level
  $("#level-title").text("Level "+level);
  //A random number from 0 to 3.
  var randomNumber = Math.floor(Math.random() * 4);

  //Use that random number to access the buttonColors array and then
  //get the color at the index = random number.
  var randomChosenColor = buttonColors[randomNumber];

  //Add that color to the gamePattern array
  gamePattern.push(randomChosenColor);

  //flashing the current randomly choosed color
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playing the audio
  playSound(randomChosenColor);



}

function checkAnswer(currentLevel) {

  //Check if the most recent answer is the same as the most recent
  //item in gamePattern array
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //If the above is true, then check if the length of both arrays
      // is the same. That means it is a right pattern. In that case,
      // call the nextSequence after 1000ms
      if(gamePattern.length === userClickedPattern.length) {
        setTimeout(function () {
            nextSequence();
          }, 1000);
      }
    }

    else {
      //IF WRONG, THEN PLAY THE WRONG SOUND
      playSound("wrong");

      //Add the game-over class to the whole body that will show a red
      //background for 200ms
      $("body").addClass("game-over");
      setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        //Update the H1
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// A FUNCTION TO RESTART THE GAME

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//run the function on the keypress
  $(document).keypress(function () {

    //If the started variable if fals, it means game has not started yet
    //In that case, simply start the game by first showing Level 0 and then
    //
    if(!started) {
      $("#level-title").text("Level "+level);
      nextSequence();
      started = true;
    }

  });
