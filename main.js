$(document).ready(() => {
  randomBG();

  function randomBG() {
    let ran = Math.floor(Math.random() * 3);
    let bg = [`url(./img/bg0.jpg)`, `url(./img/bg1.jpg)`, `url(./img/bg2.jpg)`];
    $("#all").css("background-image", bg[ran]);
  }
});
