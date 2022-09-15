var timer;
var studyOn = JSON.parse(localStorage.getItem("study-on"));
var date = new Date();
var day = String(date.getDate()).padStart(2, '0');
var cnt;
var sub;

window.onload = function () {
  document.getElementById('stop-btn').style.display = "block";
  document.getElementById('rest-btn').style.display = "block";
  document.getElementById('end-btn').style.display = "none";

  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  var idx = urlParams.get('idx');
  var idxSub = studyOn.progressList.find(e => e.idx == idx);
  sub = studyOn.today.find(e => e.name == idxSub.name);

  // 좌우 버튼 이동 활성화
  idxChange(idx);

  // 뒤로가기
  document.getElementById('back').onclick = function () {
    saveTimer();
    history.back();
  }


  // 휴식 이동
  document.getElementById('rest-btn').onclick = function () {
    saveTimer();

    location.href = "./rest.html?idx=" + idx;
  }

  // 중단 -> 홈으로
  document.getElementById('stop-btn').onclick = function () {

    delete studyOn.progressList;

    saveTimer();

    location.href = "main.html";
  }

  // 종료 -> 홈으로
  document.getElementById('end-btn').onclick = function () {
    location.href = "main.html";
  }

  // display
  document.getElementById('sub-name').innerText = sub.name;
  document.getElementById('main').innerHTML = printTime(sub.goal);

  // 타이머 설정
  startTimer(sub);
}

function startTimer(sub) {
  cnt = sub.study;
  timer = setInterval(function () {
    document.getElementById("sub").innerHTML = printTime(cnt++);

    // 원 크기 키우기
    var c1 = document.getElementById('circle_progress');
    var c1Size = (cnt / sub.goal) * 158;
    c1.style.strokeDasharray = c1Size + " 158";

    // 성공적으로 마쳤을 시, 
    if (cnt > sub.goal) {
      // 버튼 숨기기
      document.getElementById('stop-btn').style.display = "none";
      document.getElementById('rest-btn').style.display = "none";
      document.getElementById('end-btn').style.display = "flex";

      // notification 보내기
      notify();

      saveTimer();
    }
  }, 1000);
}

function printTime(totalSec) {
  var min = parseInt(totalSec / 60);
  var hour = parseInt(min / 60);
  var sec = (totalSec % 60);
  min = min % 60;

  return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

function notify() {
  if (Notification.permission !== 'granted')
    Notification.requestPermission();
  else {
    var notification = new Notification('StudyOn', {
      icon: '../../images/icon_day.png',
      body: '목표 시간까지 공부 성공!',
    });

    // 알림 클릭 시, 사이드바로 이동
    notification.onclick = function () {
      whale.sidebarAction.show();
    };
  }
}

function idxChange(index) {
  var size = studyOn.progressList.length;
  var leftBtn = document.getElementById('left-btn');
  var rightBtn = document.getElementById('right-btn');

  if (index == 1) {
    leftBtn.style.display = "none";
  }
  if (index == size || size == 1) {
    rightBtn.style.display = "none";
  }

  // 이동 시 today에 기록되도록
  leftBtn.onclick = function () {
    saveTimer();
    location.href = "./study.html?idx=" + --index;
  }

  rightBtn.onclick = function () {
    saveTimer();
    location.href = "./study.html?idx=" + ++index;
  }
}

function saveTimer(){
  clearInterval(timer);
  studyOn.today.map(x => {
    if (x.name == sub.name) {
      x.study = cnt - 1;
    }
  })

  localStorage.setItem("study-on", JSON.stringify(studyOn));
}