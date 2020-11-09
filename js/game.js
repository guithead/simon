$(document).ready(function () {
  /*
    VARIABLES
  */

  var buttonColors = ["red", "blue", "green", "yellow"];
  var gamePattern = [];
  var userClickedPattern = [];
  var sequenceStarted = false;
  var levelNo = 0;
  var instructions = $("#instructions");

  /*
    ACTIONS
  */

  //INTRO ACTIONS
  $(".wrapper").hide().fadeIn(1000);

  var arka = new Audio("sounds/arkanoid.mp3");
  arka.play();

  setTimeout(function () {
    instructions.text("Press Any Key to Start");
  }, 2000);

  //ACTIONS ON BUTTON PRESS
  $(".btn").on("click", function () {
    var userChosenColor = $(this).attr("id");

    //store user clicks (colors) in userClickedPattern array
    userClickedPattern.push(userChosenColor);

    //button sound
    playSound(userChosenColor);

    //pressed button animation function
    animateButtonPress(userChosenColor);

    //calls fn. checkAnswer, argument = index in array
    checkAnswer(userClickedPattern.length - 1);
  });

  //START THE GAME BY PRESSING ANY KEY
  $(document).on("keydown touchstart", function () {
    if (!sequenceStarted) {
      nextSequence();
    }
  });

  /*
    FUNCTIONS
  */

  //START NEW GAME/LEVEL
  function nextSequence() {
    sequenceStarted = true;

    //increase level every time nextSequence() is called
    levelNo++;

    //reset array when starting new level
    userClickedPattern = [];

    //update level no. in title
    $("#level-no").text("Level " + levelNo);

    //remove any key hint
    instructions.text("");

    //get random no. 0-3 (4 colors)
    var randomNumber = Math.floor(Math.random() * 4);

    //choose color from buttonColor array
    var randomChosenColor = buttonColors[randomNumber];

    //add chosen color to gamePattern array
    gamePattern.push(randomChosenColor);

    //button flash
    $("#" + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);

    //button sound
    playSound(randomChosenColor);
  }

  //CHECK IF ANSWER FITS THE RANDOM GAMEPATTERN, CURRENTLEVEL USED AS AN INDEX OF COLOR IN ARRAY
  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      //when also number of colors in array match (user clicked ALL colors correctly), start new sequence (new level)
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //update text
      instructions.text("Game Over, Press Any Key to Restart");

      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();

      //call the restart function
      restart();
    }
  }

  //PLAY BUTTON SOUND (BASED ON COLOR)
  function playSound(color) {
    var buttonSound = new Audio("sounds/" + color + ".mp3");
    buttonSound.play();
  }

  //PRESSED BUTTON ANIMATION
  function animateButtonPress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  //RESTART THE GAME
  function restart() {
    levelNo = 0;
    gamePattern = [];
    sequenceStarted = false;
  }
});
