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
  var levelText = $("#level-text");

  /*
    ACTIONS
  */

  //HIGH SCORE IN LOCAL STORAGE
  var highScore = localStorage.getItem("highScore");

  if (highScore === null) {
    localStorage.setItem("highScore", "0");
  } else {
    updateHighScore();
  }

  //START GAME - KEYBOARD

  //prevent multiple firings by pressing/holding multiple keys
  var keydown = false;

  $(document).on("keydown", function () {
    if (!keydown) {
      if (!sequenceStarted) {
        keydown = true;
        startGame();
      }
    } else {
      return;
    }
  });

  //START GAME - TOUCH

  //prevent multiple firings by pressing/holding multiple keys
  var touch = false;

  $(document).on("touchend", ".any-key", function () {
    if (!touch) {
      if (!sequenceStarted) {
        touch = true;
        startGame();
      }
    } else {
      return;
    }
  });

  //ACTIONS ON BUTTON PRESS

  $(".btn").on("click", function () {
    if (!sequenceStarted) {
      return;
    } else {
      var userChosenColor = $(this).attr("id");

      //store user clicks (colors) in userClickedPattern array
      userClickedPattern.push(userChosenColor);

      //button sound
      playSound(userChosenColor);

      //pressed button animation function
      animateButtonPress(userChosenColor);

      //calls fn. checkAnswer, argument = index in array
      checkAnswer(userClickedPattern.length - 1);
    }
  });

  /*
    FUNCTIONS
  */

  //START GAME
  function startGame() {
    levelText.text("Get ready");

    var arka = new Howl({
      src: ["sounds/arkanoid.mp3"],
    });
    arka.play();
    instructions.text("Follow the pattern!");
    //wait for arka to play, then start newSequence
    setTimeout(nextSequence, 2000);
  }

  //START NEW SEQUENCE
  function nextSequence() {
    sequenceStarted = true;

    //increase level every time nextSequence() is called
    levelNo++;

    //reset array when starting new level
    userClickedPattern = [];

    //remove any key hint
    instructions.text("");

    //update level no. in title
    levelText.text("Level " + levelNo);

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
      instructions.text("Press Any Key to Restart");
      //for touch devices to be able to restart by tapping "any key"
      instructions.addClass("any-key");

      levelText.text("Game Over");

      //var wrongSound = new Audio("sounds/wrong.mp3");
      var wrongSound = new Howl({
        src: ["sounds/wrong.mp3"],
      });
      wrongSound.play();

      //update high score in local storage + high score text
      if (levelNo - 1 > localStorage.getItem("highScore") && levelNo !== 0) {
        localStorage.setItem("highScore", levelNo - 1);
        $("#high-score").addClass("new-record");

        setTimeout(function () {
          $("#high-score").removeClass("new-record");
        }, 200);
        updateHighScore();
      }

      //call the restart function
      restart();
    }
  }

  //PLAY BUTTON SOUND (BASED ON COLOR)
  function playSound(color) {
    var buttonSound = new Howl({
      src: ["sounds/" + color + ".mp3"],
    });
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
    keydown = false;
    touch = false;
  }

  //UPDATE HIGH SCORE TEXT
  function updateHighScore() {
    $("#high-score").text("High Score: " + localStorage.getItem("highScore"));
  }
});
