$(document).ready(function () {
  nowTime();
  randomBG();

  function randomBG() {
    let ran = Math.floor(Math.random() * 3);
    let bg = [`url(./img/bg0.jpg)`, `url(./img/bg1.jpg)`, `url(./img/bg2.jpg)`];
    $("#all").css("background-image", bg[ran]);
  }

  // 시간 가져오기
  function nowTime() {
    let now = new Date();
    let hour = now.getHours();
    let minute = ("0" + now.getMinutes()).slice(-2);
    $("#currentTime").text(`${hour}:${minute}`);
  }
  setInterval(() => {
    nowTime();
  }, 1000);

  // centerBottom hover시
  $("#centerBottom").on({
    mouseenter: function () {
      console.log("인");
      $("#CBman").slideDown(500);
    },
    mouseleave: function () {
      console.log("아웃");
      $("#CBman").slideUp(500);
    },
  });
});
