$(document).ready(function () {
  var sound = new Audio("sounds/theme.mp3");
  sound.play();
  sound.loop = true;

  if (!sound.paused) {
    $("#play-pause").attr("class", "fas fa-volume-mute");
  }

  function boom() {
    if (!sound.paused) {
      $("#play-pause").attr("class", "fas fa-volume-up");
      sound.pause();
    } else {
      $("#play-pause").attr("class", "fas fa-volume-mute");
      sound.play();
      sound.loop = true;
    }
  }

  $("#play-pause").on("click", boom);
});
