document.write('<script src="../js/html2canvas.min.js"></script>');

var studyOn = JSON.parse(localStorage.getItem("study-on"));

window.onload = function () {
  download();
  // 뒤로가기
  document.getElementById('back').onclick = function () {
    history.back();
  }

  // display
  document.getElementById('today').innerText = studyOn.date.year + "." + studyOn.date.month + "." + studyOn.date.day + "(" + getTodayLabel() + ")";

  var totalStudy = 0, totalRest = 0, totalGoal = 0;
  studyOn.today.map(x => {
    totalStudy += x.study;
    totalRest += x.rest;
    totalGoal += x.goal;
  })

  document.getElementById('text2').innerHTML = printTime(totalStudy);

  // 원 비율 변경하기
  // 공부비율
  var c1 = document.getElementById('c1');
  var c1Size = (totalStudy / (totalStudy + totalRest)) * 158;
  c1.style.strokeDasharray = c1Size + " 158";

  // 쉬는 시간 비율
  var c2 = document.getElementById('c2');
  var c2Size = c1Size + (totalRest / (totalStudy + totalRest)) * 158;
  c2.style.strokeDasharray = c2Size + " 158";

  // 프로그레스바 설정
  var progressBar = document.getElementById('progressBar');
  console.log(totalStudy / totalGoal);
  progressBar.style.width = (totalStudy / totalGoal) * 100 + "%";
  progressBar.max = totalGoal;

  // 프로그레스바 아이콘 설정
  var per = document.getElementById('percent');
  per.innerHTML = parseInt(totalStudy / totalGoal * 100) + "%";

  makeList();
}

// 요일 구하기
function getTodayLabel() {
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var tmp = new Date().getDay();
  var todayLabel = week[tmp];
  return todayLabel;
}

// 과목 리스트 만들기
function makeList() {
  var cnt = 0;
  var listArea = document.getElementById('list-wrapper');
  studyOn.today.map(x => {
    // subWrapper 생성
    var subWrapper = document.createElement('div');
    subWrapper.style.top = 140 * cnt + "px";

    subWrapper.setAttribute('class', 'sub-wrapper');

    // subWrapper에 들어갈 요소 구현

    var subName = document.createElement('div');
    subName.setAttribute('class', 'sub-name');
    subName.innerHTML = x.name;
    var line = document.createElement('div');
    line.setAttribute('class', 'line');
    var timeText1 = document.createElement('div');
    timeText1.setAttribute('class', 'time-text1');
    timeText1.innerHTML = "공부시간";
    var timeText2 = document.createElement('div');
    timeText2.setAttribute('class', 'time-text2');
    timeText2.innerHTML = "쉬는시간";
    var studyTime = document.createElement('div');
    studyTime.setAttribute('class', 'study-time');
    studyTime.innerHTML = printTime(x.study);
    var restTime = document.createElement('div');
    restTime.setAttribute('class', 'away-time');
    restTime.innerHTML = printTime(x.rest);

    var icon = document.createElement('div');
    // 공부 목표 달성 성공
    if (x.study >= x.goal) {
      icon.setAttribute('class', 'success-img');
    }
    else {
      icon.setAttribute('class', 'fail-img');
    }

    // subWrapper 조립
    subWrapper.appendChild(subName);
    subWrapper.appendChild(line);
    subWrapper.appendChild(icon);
    subWrapper.appendChild(timeText1);
    subWrapper.appendChild(studyTime);
    subWrapper.appendChild(timeText2);
    subWrapper.appendChild(restTime);
    cnt++;

    listArea.append(subWrapper);
  })

}

function printTime(totalSec) {
  var min = parseInt(totalSec / 60);
  var hour = parseInt(min / 60);
  var sec = (totalSec % 60);
  min = min % 60;

  return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

// 요일 계산기
function getTodayLabel() {
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var tmp = new Date().getDay();
  var todayLabel = week[tmp];
  return todayLabel;
}

function download() {
  var downBtn = document.getElementById('download-btn');
  downBtn.onclick = function () {
    html2canvas(document.body).then(canvas => {
      saveAs(canvas.toDataURL('image/jpg'), studyOn.date.year + "_" + 
      studyOn.date.month + "_" + studyOn.date.day + "_studyon.jpg"); //다운로드 되는 이미지 파일 이름 지정
    });
  };
}

function saveAs(uri, filename) {
  // 캡처된 파일을 이미지 파일로 내보냄
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}