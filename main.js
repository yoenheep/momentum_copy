$(document).ready(function () {
  nowTime();
  randomBG();
  getUserName();

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

    // todayText 시간별 나눔
    if (hour >= 6 && hour < 12) {
      $("#todayText").text("Good morning, ");
    } else if (hour >= 12 && hour < 18) {
      $("#todayText").text("Good afternoon, ");
    } else if (hour >= 18 && hour < 21) {
      $("#todayText").text("Good evening, ");
    } else {
      $("#todayText").text("Good night, ");
    }
  }
  setInterval(() => {
    nowTime();
  }, 1000);

  // username 가져오기
  function getUserName() {
    let userName = localStorage.getItem("username") || "";
    if (userName != "") {
      $("#inputName").remove();
      $("#userName").text(userName);
      blockUserName();
    }
  }
  //username 더블클릭시
  $("#userName").on("dblclick", function () {
    let userName = $(this).text();
    let inputName = $(`<input type ="text" id ="inputName"/>`);
    $(this).text("");
    inputName.val(userName);
    $(this).append(inputName);
  });
  // username 저장
  $(document).on("keyup", "#inputName", function (key) {
    if (key.keyCode == 13) {
      let newUserName = $(this).val();
      $(this).remove();
      $("#userName").text(newUserName);
      blockUserName();
      localStorage.setItem("username", newUserName);
    }
  });
  // username이 2줄일 경우
  function blockUserName() {
    let nameDiv = $("#todayText").next("div");
    if ($("#userName").height() > $("#todayText").height()) {
      // 두 줄 이상인 경우
      nameDiv.css({
        display: "block",
      });
    } else {
      nameDiv.css({
        display: "inline",
      });
    }
  }

  // centerBottom hover시
  $("#centerBottom").on({
    mouseenter: function () {
      $("#CBman").slideDown(500);
    },
    mouseleave: function () {
      $("#CBman").slideUp(500);
    },
  });

  // leftBottom 체크시
  $("#leftBottom").on({
    click: function () {
      $("#rightTop").fadeOut(300);
      $("#center").fadeOut(300);
      $("#centerBottom").fadeOut(300);
      $("#rightBottom").fadeOut(300);
    },
    mouseleave: function () {
      $("#rightTop").fadeIn(300);
      $("#center").fadeIn(300);
      $("#centerBottom").fadeIn(300);
      $("#rightBottom").fadeIn(300);
    },
  });

  // 날씨 API
  function getWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8bae7c1d7875e2c7ecf2c801c7799338&units=metric`;

      const response = await fetch(url);
      const data = await response.json();
      let skyIcon = data.weather[0].main;
      let temp = Math.floor(data.main.temp);
      let imageurl = `./img/${skyIcon}.png`;
      $("#todayImg").attr("src", imageurl);
      $("#temp").text(temp + "º");
      console.log(data);
    });
  }
  getWeather();
});
