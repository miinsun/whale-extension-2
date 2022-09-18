var studyOn = JSON.parse(localStorage.getItem("study-on"));
var targetName;
window.onload = function () {
  link();
  makeList();
  deleteRoutine();
  startRoutine();
}

function link() {
  // 뒤로가기
  document.getElementById('back').onclick = function () {
    history.back();
  }

  // '추가' 버튼 클릭 시, 루틴 추가 창으로 이동
  document.getElementById('plus-btn').onclick = function () {
    location.href = "routine-add.html";
  }
}

function makeList() {
  var plusBtn = document.getElementById('plus-btn');
  plusBtn.style.top = 150 + (70 * studyOn.routines.length + 1) + 'px';

  var cnt = 0;
  var listArea = document.getElementById('list-wrapper');
  studyOn.routines.map(x => {
    // subWrapper 생성
    var subWrapper = document.createElement('div');
    subWrapper.style.top = 75 * cnt + "px";
    subWrapper.setAttribute('class', 'sub-wrapper');

    // subWrapper에 들어갈 요소 구현
    var subImg = document.createElement('div');
    subImg.setAttribute('class', 'sub-img');
    subImg.setAttribute('id', 'cancle-btn' + (cnt + 1));
    var subName = document.createElement('div');
    subName.setAttribute('class', 'sub-name');
    subName.innerHTML = x.name;

    // subWrapper 조립
    subWrapper.appendChild(subImg);
    subWrapper.appendChild(subName);

    // 온 클릭 이벤트 처리
    var startBtn = document.getElementById('start-btn');
    subWrapper.onclick = function (event) {
      startBtn.style.background = '#8987FF';
      startBtn.style.pointerEvents = 'auto'
      var list = document.querySelectorAll(".sub-wrapper");
      target = event.currentTarget;

      for (var i = 0; i < list.length; i++) {
        list[i].classList.remove("selected");
      }

      target.classList.add("selected");
      targetName = target.childNodes[1].innerHTML;


    }
    listArea.append(subWrapper);


    cnt++;
  })
}


function deleteRoutine() {
  // 삭제버튼 활성화 하기
  for (var i = 1; i <= studyOn.routines.length; i++) {
    document.getElementById('cancle-btn' + i).onclick = function (e) {
      var targetId = e.target.id.slice(-1);
      studyOn.routines.splice(targetId - 1, 1)
      localStorage.setItem("study-on", JSON.stringify(studyOn));
      location.reload();
    }
  }

}

// 같은 이름의 루틴을 찾아 실행
function startRoutine() {
  document.getElementById('start-btn').onclick = function () {
    console.log(targetName);

    var list;
    studyOn.routines.map(x => {
      if (x.name == targetName) {
        studyOn.progressList = x.list;
        list = x.list;
      }
    })

    for (var subject of list) {
      studyOn.today.push(
        {
          study: 0,
          rest: 0,
          goal: subject.goal,
          name: subject.name
        }
      )
    }

    console.log(studyOn);
    localStorage.setItem("study-on", JSON.stringify(studyOn));

    alert('목표 설정 완료! 열공합시다');
    location.href = "./study.html?idx=" + 1;
  }
}