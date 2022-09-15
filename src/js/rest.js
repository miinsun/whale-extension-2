var timer;
const url = new URL(window.location.href);
var studyOn = JSON.parse(localStorage.getItem("study-on"));
var cnt;
var date = new Date();
var day = String(date.getDate()).padStart(2, '0');

window.onload = function () {
  const urlParams = url.searchParams;
  var idx = urlParams.get('idx');
  var idxSub = studyOn.progressList.find(e => e.idx == idx);
  var sub = studyOn.today.find(e => e.name == idxSub.name);

  // display
  document.getElementById('sub-name1').innerHTML = sub.name
  document.getElementById('main').innerHTML = "휴식중";


  // 휴식 종료
  document.getElementById('end-btn').onclick = function () {
    clearInterval(timer);
    // 쉬는 시간 저장
    studyOn.today.map(x => {
      if (x.name == sub.name) {
        x.rest = cnt - 1 ;
      }
    })

    localStorage.setItem("study-on", JSON.stringify(studyOn));

    location.href = "./study.html?idx=" + idx;
  }

  // 타이머 설정
  stopWatch(sub);
}

function stopWatch(sub) {
  cnt = sub.rest;

  timer = setInterval(function () {
    document.getElementById("sub").innerHTML = printTime(cnt++);

    // 원 크기 키우기
    var c1 = document.getElementById('circle_progress');
    var c1Size = (cnt / 3600) * 158;
    c1.style.strokeDasharray = c1Size + " 158";

    // 성공적으로 마쳤을 시, 쉬는 시간은 한시간으로 제한
    if (cnt > 3600) {
      clearInterval(timer);
      localStorage.setItem("study-on", JSON.stringify(studyOn));

      location.href = "./study.html?name=" + subjectName.value;
    }
  }, 1000);
}

function printTime(totalSec){
  var min = parseInt(totalSec / 60);
  var hour = parseInt(min / 60);
  var sec = (totalSec % 60);
  min = min % 60;

  return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}