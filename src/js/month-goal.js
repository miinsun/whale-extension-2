var studyOn = JSON.parse(localStorage.getItem("study-on"));

window.onload = function () {
  var today = new Date();
  var currentMonth = today.getMonth();
  var currentYear = today.getFullYear();
  var monthHeader = document.getElementById("monthHeader");
  var datePicked = document.getElementById("date-picked");
  var months = "";
  var days = ["월", "화", "수", "목", "금", "토", "일"];
  var monthsArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  var day = String(today.getDate()).padStart(2, '0');

  // 오늘 공부량 계산하기
  studyOn.calendar.map(x => {
    if (x.day == day) {
      studyOn.today.map(y => {
        x.study += y.study;
        x.rest += y.rest;
      })
    }
  })

  // 뒤로가기
  document.getElementById('back').onclick = function () {
    history.back();
  }

  months = monthsArr;

  var tableHeaderMonth = document.getElementById("thead-month");
  var dataHead = "<tr>";

  for (dhead in days) {
    dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
  }

  dataHead += "</tr>";
  tableHeaderMonth.innerHTML = dataHead;
  showCalendar(currentMonth, currentYear);

  var picked = document.getElementById("picked-wrapper");
  picked.style.display = "none";

  function showCalendar(month, year) {
    var firstDay = new Date(year, month).getDay();
    var monthString = monthsArr[month];

    table = document.getElementById("calendar-body");
    table.innerHTML = "";
    monthHeader.innerHTML = year + ". " + monthString;

    var date = 1;

    for (var i = 0; i < 6; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          cell = document.createElement("td");
          cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > daysInMonth(month, year)) {
          break;
        } else {
          cell = document.createElement("td");
          cell.setAttribute("data-date", date);
          cell.setAttribute("data-month", month + 1);
          cell.setAttribute("data-year", year);
          cell.setAttribute("data-day", j);
          cell.setAttribute("data-month-name", months[month]);
          cell.className = "date-picker";
          if (date > 10) {
            cell.innerHTML = "<span>" + date + "</span>";

          }
          else {
            cell.innerHTML = "<span>&nbsp;" + date + "&nbsp;</span>";

          }
          cell.onclick = function (event) {
            picked.style.display = "none";
            var dates = document.querySelectorAll(".date-picker");
            var currentTarget = event.currentTarget;
            var date = currentTarget.dataset.date.padStart(2, '0');
            var month = currentTarget.dataset.month - 1;
            var day = parseInt(currentTarget.dataset.day);

            for (var i = 0; i < dates.length; i++) {
              dates[i].classList.remove("selected");
            }
            currentTarget.classList.add("selected");

            // date 클릭 시, 출력
            datePicked.innerHTML = monthsArr[month] + "." + date + " " + "(" + getTodayLabel(day) + ")";
            var pickedDay = studyOn.calendar.find(x => x.day == date);
            // 공부 시작이 없을 시
            if (pickedDay == null) {

            }
            else {
              picked.style.display = "block";

              document.getElementById('study-time').innerHTML = printTime(pickedDay.study);
              document.getElementById('rest-time').innerHTML = printTime(pickedDay.rest);
            }

          }

          if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {

            cell.className = "date-picker selected";
          }

          row.appendChild(cell);
          date++;
        }
      }

      table.appendChild(row);
    }
  }

  function daysInMonth(month, year) {
    return 32 - new Date(year, month, 32).getDate();
  }

}

// 요일 계산기
function getTodayLabel(day) {
  var week = new Array('월', '화', '수', '목', '금', '토', '일');
  var todayLabel = week[day];
  return todayLabel;
}

function printTime(totalSec) {
  var min = parseInt(totalSec / 60);
  var hour = parseInt(min / 60);
  var sec = (totalSec % 60);
  min = min % 60;

  return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}