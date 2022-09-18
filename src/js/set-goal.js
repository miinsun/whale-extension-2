var studyOn = JSON.parse(localStorage.getItem("study-on"));

window.onload = function () {
    // 뒤로가기
    document.getElementById('back').onclick = function () {
        history.back();
    }

    var plusBtn = document.getElementById('plus-btn');
    var startBtn = document.getElementById('start-btn');

    var listArea = document.getElementById('list-wrapper');
    var cnt = 0;
    // '추가' 버튼 클릭 시, 리스트 추가, progress list 만들기
    plusBtn.onclick = function () {
        cnt++;

        // 4개가 최대
        if (cnt == 3) {
            plusBtn.style.display = 'none';
            var limitText = document.createElement('div');
            limitText.innerHTML = '최대 갯수 도달';
            limitText.setAttribute('id', 'limit-text');
            listArea.append(limitText);
        }

        plusBtn.style.top = (160 * cnt) + 300 + 'px';
        // subWrapper 생성
        var subWrapper = document.createElement('div');
        subWrapper.style.top = 160 * cnt + "px";

        subWrapper.setAttribute('class', 'set-goal-wrapper');

        // subWrapper에 들어갈 요소 구현
        var subInput = document.createElement('input');
        subInput.setAttribute('id', 'sub' + (cnt + 1));
        subInput.setAttribute('placeholder', '공부 이름을 입력해주세요');
        subInput.setAttribute('class', 'input-subject');
        var subText2 = document.createElement('div');
        subText2.setAttribute('class', 'text2');
        subText2.innerHTML = '공부 시간';
        var h = document.createElement('input');
        h.setAttribute('type', 'number');
        h.setAttribute('min', '0');
        h.setAttribute('max', '12');
        h.setAttribute('value', '0');
        h.setAttribute('id', 'h' + (cnt + 1));
        h.setAttribute('class', 'hour');
        var subText3 = document.createElement('div');
        subText3.setAttribute('class', 'text3');
        subText3.innerHTML = ':';
        var m = document.createElement('input');
        m.setAttribute('type', 'number');
        m.setAttribute('min', '0');
        m.setAttribute('max', '12');
        m.setAttribute('value', '0');
        m.setAttribute('id', 'm' + (cnt + 1));
        m.setAttribute('class', 'min');
        var subText4 = document.createElement('div');
        subText4.setAttribute('class', 'text4');
        subText4.innerHTML = ':';
        var s = document.createElement('input');
        s.setAttribute('type', 'number');
        s.setAttribute('min', '0');
        s.setAttribute('max', '60');
        s.setAttribute('value', '0');
        s.setAttribute('id', 's' + (cnt + 1));
        s.setAttribute('class', 'sec');

        // 만든 요소 조립
        subWrapper.appendChild(subInput);
        subWrapper.appendChild(subText2);
        subWrapper.appendChild(h);
        subWrapper.appendChild(subText3);
        subWrapper.appendChild(m);
        subWrapper.appendChild(subText4);
        subWrapper.appendChild(s);

        // 리스트에 추가
        listArea.append(subWrapper);
    }

    // '시작하기'버튼 클릭 시, 목표 추가, 생성 알림
    startBtn.onclick = function () {
        list = [];
        var isOk = true;

        for (var i = 1; i <= cnt + 1; i++) {
            var subjectName = document.getElementById('sub' + i);
            var inputHour = document.getElementById('h' + i);
            var inputMin = document.getElementById('m' + i);
            var inputSec = document.getElementById('s' + i);

            // 예외 처리
            if ((inputHour.value == "0" && inputMin.value == "0" && inputSec.value == "0") || subjectName.value == "") {
                alert('다시 입력해주세요.');
                isOk = false;
                break;
            }
            else {
                list.push(
                    {
                        idx: i,
                        goal: parseInt(inputHour.value) * 3600 + parseInt(inputMin.value) * 60 + parseInt(inputSec.value),
                        name: subjectName.value
                    }
                );
            }
        }

        if (isOk == true) {
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

            studyOn.progressList = list;
            localStorage.setItem("study-on", JSON.stringify(studyOn));
            location.href = "./study.html?idx=" + 1;
        }
    }
}

