// 현재 날짜 선택
var date = new Date();
var year = date.getFullYear();
var month = String(date.getMonth() + 1).padStart(2, '0');
var day = String(date.getDate()).padStart(2, '0');
var studyOn = JSON.parse(localStorage.getItem("study-on"));

// 타임스탬프 생성
var timestamp = year + "." + month + "." + day + " (" + getTodayLabel() + ")";

window.onload = function () {
  // noti권한 받기
  getNotificationPermission();
  var studyOn = JSON.parse(localStorage.getItem("study-on"));

  // 새로 만들거나 달이 바뀌면 전체 초기화
  if (studyOn == null || studyOn.date.month != month || studyOn.date.year != year) {
    var studyOn = month_init();
  }
  // 하루에 한번씩 date 초기화
  else if (studyOn.date.day != day) {
    studyOn = day_init();
  }

  localStorage.setItem("study-on", JSON.stringify(studyOn));
  link();
}

// 버튼 링크 설정
function link() {
  // 목표 설정하기
  document.getElementById('set-goal-btn-wrapper').onclick = function () {
    location.href = "set-goal.html";
  }

  // 루틴 페이지 이동
  document.getElementById('routine-btn-wrapper').onclick = function () {
    location.href = "routine-list.html";
  }

  // 오늘의 공부량 확인
  document.getElementById('today-goal-wrapper').onclick = function () {
    location.href = "today-goal.html";
  }

  // 월간 공부량 확인
  document.getElementById('month-goal-wrapper').onclick = function () {
    location.href = "month-goal.html";
  }
}

function month_init() {
  var tmp = {
    "date": {
      "year": year,
      "month": month,
      "day": day
    },
    "today": [],
    "calendar": [],
    "routines": [],
  }

  tmp.calendar.push(
    {
      "day": day,
      "study": 0,
      "rest": 0
    }
  )

  return tmp;
}

function day_init() {
  var tmp = {
    "date": {
      "year": year,
      "month": month,
      "day": day
    },
    "today": [],
    "calendar": studyOn.calendar,
    "routines": studyOn.routines
  }

  tmp.calendar.push(
    {
      "day": day,
      "study": 0,
      "rest": 0
    }
  )
  return tmp;
}

// 요일 계산기
function getTodayLabel() {
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var tmp = new Date().getDay();
  var todayLabel = week[tmp];
  return todayLabel;
}

//알림 권한 요청
function getNotificationPermission() {
  if (!("Notification" in window)) {
    alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
  }
  // 데스크탑 알림 권한 요청    
  Notification.requestPermission(function (result) {
    // 권한 거절        
    if (result == 'denied') {
      alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
      return false;
    }
  });
}
