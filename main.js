$(document).ready(function () {
  const miniTodos = JSON.parse(localStorage.getItem("miniTodos")) || [];
  // todos 출력
  miniTodos.forEach((i) => {
    addTodo(i.check, i.content);
  });

  nowTime();
  randomObject();
  getUserName();
  getDay();
  getWeather();

  // 랜덤 명언, 배경
  function randomObject() {
    let ran = Math.floor(Math.random() * 3);
    let object = [
      {
        bg: "./img/bg0.jpg",
        saying: "Night is the other half of life, and the better half.",
        who: "Johann Wolfgang von Goethe",
      },
      {
        bg: "./img/bg1.jpg",
        saying: "The darkest hour has only sixty minutes.",
        who: "Morris Mandel",
      },
      {
        bg: "./img/bg2.jpg",
        saying: "It is not the length of life, but the depth of life.",
        who: "Ralph Waldo Emerson",
      },
    ];

    $("#all").css("background-image", `url(${object[ran].bg})`);
    $("#saying").text(object[ran].saying);
    $("#CBman span").text(object[ran].who);
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
    }
    blockUserName();
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
    if ($("#userName").height() > $("#todayText").height() + 3) {
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

  // rightBottom 체크시
  $("#rightBottom").on("click", function () {
    if ($("#popUp").is(":visible")) {
      // 팝업이 보이는 상태면 fadeOut 후 visible 클래스 제거
      $("#popUp").fadeOut(200, function () {
        $(this).removeClass("visible");
      });
    } else {
      // 팝업이 숨겨진 상태면 visible 클래스 먼저 추가하고 fadeIn
      $("#popUp").addClass("visible").hide().fadeIn(200);
    }
  });
  // 클릭이벤트 조절
  $("#popUp").on("click", function (e) {
    e.stopPropagation();
  });

  // todo
  function getDay() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let day = ("0" + now.getDate()).slice(-2);

    $("#todoDay").text(`${year}/${month}/${day}`);
  }

  // todo 추가
  $(document).on("keyup", "#todoInput", function (key) {
    if (key.keyCode == 13) {
      let newTodo = $(this).val().trim();
      todoArray(newTodo);
    }
  });

  // Li 생성
  function addTodo(check, todo) {
    const newLi = $("<li>").addClass("todo");
    const checkBox = $("<input>")
      .attr({
        type: "checkbox",
        class: "todoCheck",
      })
      .prop("checked", check);
    const span = $("<span>").addClass("todoSpan").text(todo);
    const delBtn = $("<div>").addClass("todoDelete").text("✖");

    newLi.append(checkBox, span, delBtn);
    $("#todoList").append(newLi);
    $("#todoInput").val("");
    todoChcked();
  }

  // 투두객체 생성
  function todoArray(content) {
    if (content === "") {
      return;
    }

    let object = {
      check: false,
      content: content,
    };

    // 로컬 스토리지 및 배열에 추가
    miniTodos.push(object);
    localStorage.setItem("miniTodos", JSON.stringify(miniTodos));
    addTodo(false, content);
    console.log(miniTodos);
  }

  $("#todoList, #mainTodo").on(
    {
      mouseenter: function (e) {
        e.stopPropagation();
        $(this).find(".todoDelete").fadeIn(300);
      },
      mouseleave: function (e) {
        e.stopPropagation();
        $(this).find(".todoDelete").fadeOut(300);
      },
    },
    ".todo"
  );

  //투두삭제
  $("#todoList").on("click", ".todoDelete", function () {
    let index = $(this).closest("li").index();
    miniTodos.splice(index, 1);
    $(this).closest("li").remove();
    localStorage.setItem("miniTodos", JSON.stringify(miniTodos));
  });

  // 체크버튼 눌렀을 때 (이벤트 위임 사용)
  $("#todoList").on("click", ".todoCheck", function () {
    let index = $(this).closest("li").index();
    miniTodos[index].check = $(this).is(":checked");
    localStorage.setItem("miniTodos", JSON.stringify(miniTodos));
    todoChcked();
  });

  //체크 함수
  function todoChcked() {
    $("#todoList .todoCheck").each(function () {
      if ($(this).is(":checked")) {
        $(this).siblings(".todoSpan").addClass("checked");
      } else {
        $(this).siblings(".todoSpan").removeClass("checked");
      }
    });

    $("#todayTodo .todoCheck").on("change", function () {
      if ($(this).is(":checked")) {
        $(this).siblings(".todoSpan").addClass("checked");
      } else {
        $(this).siblings(".todoSpan").removeClass("checked");
      }
    });
  }

  $("#mainTodo").on("keyup", "#todayGoal", function (key) {
    if (key.keyCode == 13) {
      let todayTodo = $("#todayGoal").val().trim();
      if (todayTodo == "") {
        return;
      }

      todayLocal(todayTodo);
    }
  });

  function todayLocal(todo) {
    let day = new Date();
    let object = { check: false, content: todo, when: day.getDate };
    localStorage.setItem("todayTodo", object);
    addToday(false, todo);
  }

  function addToday(check, todo) {
    const checkBox = $("<input>")
      .attr({
        type: "checkbox",
        class: "todoCheck",
      })
      .prop("checked", check);
    const span = $("<span>").addClass("todoSpan").text(todo);
    const delBtn = $("<div>").addClass("todoDelete").text("✖");

    $("#todayTodo .todo").append(checkBox, span, delBtn);
    $("#todayGoal").remove();
    $("#today").text("Today");
    todoChcked();
  }

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
});
