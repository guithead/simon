$(document).ready(function () {
  var sound = new Howl({
    src: ["sounds/theme.mp3"],
    loop: true,
  });
  //PLAY THEME SONG, CHANGE ICON
  function playTheme() {
    if (sound.playing()) {
      $("#play-pause").attr("class", "fas fa-volume-up");
      sound.pause();
    } else {
      $("#play-pause").attr("class", "fas fa-volume-mute");
      sound.play();
    }
  }

  $("#play-pause").on("click", playTheme);
});
