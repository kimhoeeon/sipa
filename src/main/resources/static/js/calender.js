let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

window.onload = function () {
    buildCalendar();

    // 날짜 선택 select박스(국)
    setDateBox();

    // 날짜 선택 select박스(영)
    setDateBoxE();
};

function buildCalendar() {
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

    let tbody_Calendar = document.querySelector(".calendar > tbody");
    if (!tbody_Calendar) {
        console.error("Error: tbody_Calendar not found.");
        return;
    }

    document.getElementById("calYear").innerText = nowMonth.getFullYear();
    document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);

    // 이전 출력결과가 남아있는 경우 초기화
    while (tbody_Calendar.firstChild) {
        tbody_Calendar.removeChild(tbody_Calendar.firstChild);
    }

    let currentRow = null;
    let currentDayOfWeek = firstDate.getDay(); // 이번달 1일의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

    for (let i = 0; i < currentDayOfWeek; i++) {
        // 첫 번째 주(행)의 남은 공간을 채우기 위해 빈 셀 추가
        let emptyCell = document.createElement("td");
        if (!currentRow) {
            currentRow = document.createElement("tr");
            tbody_Calendar.appendChild(currentRow);
        }
        currentRow.appendChild(emptyCell);
    }

    // event 조회
    let eventArr = selectEventList();

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
        if (currentDayOfWeek === 0) {
            // 일요일(요일 0)이라면 새로운 주(행) 생성
            currentRow = document.createElement("tr");
            tbody_Calendar.appendChild(currentRow);
        }

        // 날짜 셀 추가
        let nowColumn = document.createElement("td");

        let newDIV = document.createElement("div");
        let dateP = document.createElement("p");
        dateP.innerHTML = leftPad(nowDay.getDate());
        newDIV.appendChild(dateP);

        let ul = document.createElement("ul");

        // 여기서 해당 날짜에 대한 일정 정보를 가져와서 ul에 li로 추가
        let schedule = getScheduleForDate(eventArr, nowDay); // 일정 정보를 가져오는 함수 (예시를 위해 가정합니다.)

        newDIV.appendChild(ul);
        nowColumn.appendChild(newDIV);
        currentRow.appendChild(nowColumn);

        currentDayOfWeek = (currentDayOfWeek + 1) % 7; // 다음 요일로 이동

        if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
        }

        if (schedule.length > 0) {
            newDIV.classList.add('has_schedule'); // 일정이 있는 경우에 클래스 추가
            schedule.forEach((item) => {
                let li = document.createElement("li");
                li.innerHTML = item;
                ul.appendChild(li);
            });
        }

        // 새로운 코드: 클릭 이벤트를 더 명시적으로 추가
        newDIV.onclick = function (event) {
            event.stopPropagation(); // 상위 이벤트 전파 방지
            choiceDate(newDIV);
        };

        // 다시 추가: 날짜 셀에 클릭 이벤트를 추가
        nowColumn.onclick = function () {
            newDIV.click();
        };

        /*newDIV.appendChild(ul);
        nowColumn.appendChild(newDIV);
        currentRow.appendChild(nowColumn);

        currentDayOfWeek = (currentDayOfWeek + 1) % 7; // 다음 요일로 이동

        if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }*/
    }

    function choiceDate(selectedDateElement) {
        // 이전에 선택한 날짜에서 "choiceday" 클래스를 제거합니다.
        let previouslySelectedDate = document.querySelector('.choiceday');
        if (previouslySelectedDate) {
            previouslySelectedDate.classList.remove('choiceday');
        }

        // 클릭한 날짜에 "choiceday" 클래스를 추가합니다.
        selectedDateElement.classList.add('choiceday');

        // 선택한 날짜에 대한 추가 처리를 수행합니다.
        let selectedDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), parseInt(selectedDateElement.querySelector("p").innerHTML));
        //console.log("Selected Date:", selectedDate);

        // 여기에 선택한 날짜에 대한 추가적인 처리를 작성할 수 있습니다.
    }
}

// 이전달 버튼 클릭
function prevCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate()); // 현재 달을 1 감소
    buildCalendar(); // 달력 다시 생성
}

// 다음달 버튼 클릭
function nextCalendar() {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate()); // 현재 달을 1 증가
    buildCalendar(); // 달력 다시 생성
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
    if (value < 10) {
        return "0" + value;
    }
    return value;
}

function getScheduleForDate(eventArr, date) {
    // 이 함수에서는 현재 날짜(date)에 해당하는 일정 정보를 하드코딩하여 리턴합니다.
    // 실제로는 이 부분에서 서버로부터 해당 날짜에 대한 일정 정보를 가져와야 합니다.
    // 임의의 예시로 "일정 1"과 "일정 2"를 리턴하도록 하겠습니다.
    let year = date.getFullYear().toString(); // 년도 구하기

    let month = date.getMonth() + 1; // 월 구하기
    month = month < 10 ? '0' + month.toString() : month.toString(); // 10월 미만 0 추가

    let day = date.getDate(); // 날짜 구하기
    day = day < 10 ? '0' + day.toString() : day.toString(); // 10일 미만 0 추가

    let fullDate = year + '-' + month + '-' + day;

    let returnArr = [];
    let eventResult = JSON.parse(JSON.stringify(eventArr));
    for(let i=0; i<eventResult.length; i++){
        let eventObj = eventResult[i];
        let event_title = eventObj.title;
        let event_startDate = eventObj.startDate;
        let event_endDate = eventObj.endDate;

        if (event_startDate <= fullDate && event_endDate >= fullDate) {
            returnArr.push(event_title);
        }
    }

    return returnArr;
}

function selectEventList(){
    let link =  document.location.href;
    let lang = 'KO';
    if(link.includes('eng')){
        lang = 'EN';
    }

    let jsonObj = {
        lang: lang
    };

    let returnJsonArr = [];
    $.ajax({
        url: '/community/event/calendar/selectList.do',
        method: 'post',
        async: false,
        data: JSON.stringify(jsonObj),
        contentType: 'application/json; charset=utf-8' //server charset 확인 필요
    })
    .done(function (data, status){
        // console.log(status);
        let results = data;
        $.each(results , function(i){
            let title = results[i].title;
            let startDate = results[i].startDate;
            let endDate = results[i].endDate;

            returnJsonArr.push({title:title, startDate: startDate, endDate: endDate});
        });
    })
    .fail(function(xhr, status, errorThrown) {
        $('body').html("오류가 발생했습니다.")
            .append("<br>오류명: " + errorThrown)
            .append("<br>상태: " + status);
    });

    return returnJsonArr;
}


// 날짜 선택 select박스(국)
/*$(function(){
	setDateBox();
});*/

function setDateBox(){
	var dt = new Date();
	var year = dt.getFullYear();

	$("#year").append("<option value=''>년도</option>");
	for(var y = (year-2); y <= (year+5); y++){
		$("#year").append("<option value='"+ y +"'>"+ y + " 년" +"</option>");
	}
	
	$("#month").append("<option value=''>월</option>");
	for(var i = 1; i <= 12; i++){
		if(String(i).length == '1'){
			$("#month").append("<option value='"+"0" + i +"'>"+"0" + i + "월" +"</option>");
		}else{
			$("#month").append("<option value='"+ i +"'>"+ i + "월" +"</option>");
		}
	}
    
}

// 날짜 선택 select박스(영)
/*$(function(){
	setDateBoxE();
});*/

function setDateBoxE(){
	var dt = new Date();
	var year = dt.getFullYear();

	$("#yearE").append("<option value=''>Year</option>");
	for(var y = (year-2); y <= (year+5); y++){
		$("#yearE").append("<option value='"+ y +"'>"+ y + "</option>");
	}
	
	$("#monthE").append("<option value=''>Month</option>");
	for(var i = 1; i <= 12; i++){
		if(String(i).length == '1'){
			$("#monthE").append("<option value='"+"0" + i +"'>"+"0" + i + "</option>");
		}else{
			$("#monthE").append("<option value='"+ i +"'>"+ i + "</option>");
		}
	}
    
}



