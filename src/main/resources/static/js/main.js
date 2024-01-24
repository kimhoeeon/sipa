function home(){
    window.location.href = '/';
}

function ajaxConnect(url, method, jsonStr){
    let result;
    $.ajax({
        url: url,
        method: method,
        async: false,
        data: JSON.stringify(jsonStr),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8' //server charset 확인 필요
    })
        .done(function (data) {
            result = data;
        })
        .fail(function (xhr, status, errorThrown) {
            /*$('body').html("오류가 발생했습니다.")
                .append("<br>오류명: " + errorThrown)
                .append("<br>상태: " + status);*/

            alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + errorThrown + "\n상태 : " + status);
            result = "fail";
        })
    return result;
}

function ajaxConnectSimple(url, method, jsonStr){
    let result = '';
    $.ajax({
        url: url,
        method: method,
        async: false,
        data: JSON.stringify(jsonStr),
        contentType: 'application/json; charset=utf-8' //server charset 확인 필요
    })
    .done(function (data) {
        result = data;
    })
    .fail(function (xhr, status, errorThrown) {
        /*$('body').html("오류가 발생했습니다.")
            .append("<br>오류명: " + errorThrown)
            .append("<br>상태: " + status);*/

        alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + errorThrown + "\n상태 : " + status);
    })
    return result;
}

function showMessage(selector, icon, title, msg, confirmButtonColor) {
    if (typeof icon == "undefined" || title == null) icon = 'info';
    if (typeof title == "undefined" || title == null) title = '';
    if (typeof confirmButtonColor == "undefined" || confirmButtonColor == null || confirmButtonColor === '') confirmButtonColor = '#00a8ff';

    Swal.fire({
        icon: icon,
        title: title,
        html: msg,
        confirmButtonColor: confirmButtonColor
    })
        .then(() => {
            if( selector && selector !== '' ){
                setTimeout(function() { $(selector).focus(); }, 200);
            }
        });
}

function execDaumPostcode(address, addressDetail) {
    let width = 500; //팝업의 너비
    let height = 600; //팝업의 높이
    new daum.Postcode({
        width: width, //생성자에 크기 값을 명시적으로 지정해야 합니다.
        height: height,
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                // document.getElementById("sample6_extraAddress").value = extraAddr;

            } else {
                // document.getElementById("sample6_extraAddress").value = '';
            }

            if(nvl(address,"") !== "" && nvl(addressDetail,"") !== ""){
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById(address).value = '(' + data.zonecode + ') ' + addr;

                // 우편번호 클릭시 초기화
                document.getElementById(addressDetail).value = '';

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById(addressDetail).focus();
            }else{
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('address').value = '(' + data.zonecode + ') ' + addr;

                // 우편번호 클릭시 초기화
                document.getElementById('address_detail').value = '';

                // 커서를 상세주소 필드로 이동한다.
                document.getElementById('address_detail').focus();
            }
        }
    }).open({
        left: (window.screen.width / 2) - (width / 2),
        top: (window.screen.height / 2) - (height / 2),
        popupTitle: '우편번호 검색 팝업', //팝업창 타이틀 설정 (영문,한글,숫자 모두 가능)
        popupKey: 'popup1' //팝업창 Key값 설정 (영문+숫자 추천)
    });
}

function makeJsonFormat(data, lang){

    let paramJson = JSON.parse(JSON.stringify(data));

    let receiverObj = {
        email: 'sipa@sipa.or.kr', //받는이 메일주소 ( SIPA 담당자 ) //
        name: 'SIPA 문의담당자' //이름 ( SIPA 문의담당자 )
        /*phone: replaceText(paramJson.phone) //연락처*/
    }

    let receiverArr = [];
    receiverArr.push(receiverObj);

    let carriageReturn = '&nbsp; &nbsp; &nbsp; &nbsp; ';
    let body = '[SIPA 스마트산업진흥협회] 문의하기';
    body += '<br><br><br>';
    body += '------------------------------------------------------';
    if(lang === 'KO'){
        body += '<br><br>';
        body += '[ 문의 기본 정보 ]';
        body += '<br><br>';
        body += '회사명 :' + carriageReturn + paramJson.companyName;
        body += '<br>';
        body += '지역 :' + carriageReturn + paramJson.sido + ' ' + paramJson.gugun;
        body += '<br>';
        body += '업종 :' + carriageReturn + paramJson.bizType;
        body += '<br>';
        body += '담당자명 :' + carriageReturn + paramJson.chargePersonName;
        body += '<br>';
        body += '직위 :' + carriageReturn + paramJson.position;
        body += '<br>';
        body += '연락처 :' + carriageReturn + paramJson.phone;
        body += '<br>';
        body += '이메일 주소 :' + carriageReturn + paramJson.email;
        body += '<br><br>';
        body += '------------------------------------------------------';
        body += '<br><br>';
        body += '[ 문의내용 ]';
        body += '<br><br>';
        body += replaceBr(paramJson.content);
        body += '<br><br>';
        body += '------------------------------------------------------';
        body += '<br><br>';
        body += '방문경로 :' + carriageReturn + (nvl(paramJson.visitRoute,'') !== '' ? paramJson.visitRoute : '미선택');
        body += '<br>';
        body += '개인정보수집이용 동의 :' + carriageReturn + (nvl(paramJson.privateYn,'') !== '' ? paramJson.privateYn : '미동의');
        body += '<br><br><br>';
    }else{
        body += '<br><br>';
        body += '[ Basic Information ]';
        body += '<br><br>';
        body += 'Company Name :' + carriageReturn + paramJson.companyName;
        body += '<br>';
        body += 'Country :' + carriageReturn + paramJson.Country;
        body += '<br>';
        body += 'Industry :' + carriageReturn + paramJson.bizType;
        body += '<br>';
        body += 'Contact Name :' + carriageReturn + paramJson.chargePersonName;
        body += '<br>';
        body += 'Position :' + carriageReturn + paramJson.position;
        body += '<br>';
        body += 'Contact :' + carriageReturn + paramJson.phone;
        body += '<br>';
        body += 'Email Address :' + carriageReturn + paramJson.email;
        body += '<br><br>';
        body += '------------------------------------------------------';
        body += '<br><br>';
        body += '[ Content of inquiry ]';
        body += '<br><br>';
        body += replaceBr(paramJson.content);
        body += '<br><br>';
        body += '------------------------------------------------------';
        body += '<br><br>';
        body += 'Item :' + carriageReturn + (nvl(paramJson.visitRoute,'') !== '' ? paramJson.visitRoute : 'No Select');
        body += '<br>';
        body += 'Consent to Collection and Use of Personal Information :' + carriageReturn + (nvl(paramJson.privateYn,'') !== '' ? paramJson.privateYn : 'Disagree');
        body += '<br><br><br>';
    }

    body += '위 정보로 홈페이지에서 문의 요청이 왔습니다. 해당 정보 확인 후 처리 바랍니다.';

    return {
        subject: '[SIPA 스마트산업진흥협회] 문의하기 요청', //제목
        body: body, //본문
        receiver: receiverArr
    };
}

function replaceText(value){
    if(nvl(value,'') !== ''){
        value = value.toString().replaceAll('\r','');
        value = value.toString().replaceAll('\n','');
        value = value.trim();
    }
    return value;
}

function replaceBr(value){
    if(nvl(value,'') !== ''){
        value = value.toString().replaceAll('\r\n','<br>');
        value = value.trim();
    }
    return value;
}

function f_community_contact_mail_send(lang){

    //회사명
    let companyName = $('#companyName').val();
    if (nvl(companyName, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '회사명을 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Company Name.');
        }
        return;
    }

    if (lang === 'KO') {
        //지역 시/도
        let sido = $('#sido').val();
        if (nvl(sido, '') === '' || nvl(sido, '') === '시/도 선택') {
            showMessage('', 'info', '[문의하기]', '지역(시/도)을 선택해 주세요.');
            return;
        }

        //지역 구/군
        let gugun = $('#gugun').val();
        if (nvl(gugun, '') === '' || nvl(gugun, '') === '구/군 선택') {
            showMessage('', 'info', '[문의하기]', '지역(구/군)을 선택해 주세요.');
            return;
        }
    } else {
        //Country
        let country = $('#country').val();
        if (nvl(country, '') === '') {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Country.');
            return;
        }
    }

    //업종
    let bizType = $('#bizType').val();
    if (nvl(bizType, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '업종을 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Industry.');
        }
        return;
    }

    //담당자명
    let chargePersonName = $('#chargePersonName').val();
    if (nvl(chargePersonName, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '담당자명을 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Contact Name.');
        }
        return;
    }

    //직위
    let position = $('#position').val();
    if (nvl(position, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '직위를 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Position.');
        }
        return;
    }

    //연락처
    let phone = $('#phone').val();
    if (nvl(phone, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '연락처를 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Contact.');
        }
        return;
    }
    if (!f_phone_number_check(phone)) {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '올바른 형식의 연락처를 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter a contact in the correct format.');
        }
        return;
    }

    //이메일
    let email = $('#email').val();
    if (nvl(email, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '이메일 주소를 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Email Address.');
        }
        return;
    }
    let regex = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
        if (lang === 'KO') {
            showMessage('', 'error', '[문의하기]', '올바른 이메일 주소를 입력해 주세요.', '');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter a valid email address.');
        }
        return false;
    }

    //문의내용
    let content = $('#content').val();
    if (nvl(content, '') === '') {
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '문의내용을 입력해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please enter the Content of inquiry.');
        }
        return;
    }

    //개인정보수집이용 동의
    let privateYn = $('input[type=checkbox][name=privateYn]').is(':checked');
    if(!privateYn){
        if (lang === 'KO') {
            showMessage('', 'info', '[문의하기]', '개인정보수집이용 동의에 체크해 주세요.');
        } else {
            showMessage('', 'info', '[Contact Us]', 'Please check the consent to collect and use personal information.');
        }
        return;
    }

    // form
    let form = JSON.parse(JSON.stringify($('#contactForm').serializeObject()));

    let title = '[문의하기]';
    let html = '입력하신 내용으로 문의하시겠습니까?';
    let confirmBtn = '문의하기';
    let cancelBtn = '취소';
    let res_html = '문의가 정상적으로 접수되었습니다.<br>내용 확인 후 회신 예정입니다.';
    let res_confirmBtn = '확인';
    let res_fail_msg = '문의 전송에 실패하였습니다.<br>문의 사항은 Tel. 02-867-3637 로 연락바랍니다.';
    if(lang === 'EN'){
        title = '[Contact Us]';
        html = 'Would you like to contact me with your input?';
        confirmBtn = 'Send';
        cancelBtn = 'Cancel';
        res_html = 'Your inquiry has been received normally.<br>We will reply after checking the contents.';
        res_confirmBtn = 'Ok';
        res_fail_msg = 'Sent inquiry failed.<br>For more information, please contact Tel. 02-867-3637.';
    }
    Swal.fire({
        title: title,
        html: html,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00a8ff',
        confirmButtonText: confirmBtn,
        cancelButtonColor: '#A1A5B7',
        cancelButtonText: cancelBtn
    }).then(async (result) => {
        if (result.isConfirmed) {

            let jsonObj = makeJsonFormat(form, lang);
            //console.log(JSON.stringify(jsonObj));
            let resData = ajaxConnect('/mail/send.do', 'post', jsonObj);
            //console.log(i , resData);
            if (resData.resultCode === "0") {
                //문의메일 전송 완료
                Swal.fire({
                    title: title,
                    html: res_html,
                    icon: 'info',
                    confirmButtonColor: '#00a8ff',
                    confirmButtonText: res_confirmBtn,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/community/contact.do';
                    }
                });
            } else {
                //문의메일 전송 실패
                showMessage('', 'error', title, res_fail_msg);
            }
        }
    });

}



function f_phone_number_check(phone_num){
    let flag = true;

    // 기존 번호에서 - 를 삭제합니다.
    let trans_num = phone_num.replace(/-/gi,'');

    // 입력값이 있을때만 실행합니다.
    if(nvl(trans_num,'') !== '') {
        // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
        if(trans_num.length === 11 || trans_num.length === 10) {
            // 유효성 체크
            const regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
            if(!regExp_ctn.test(trans_num)) {
                flag = false;
            }
        }else{
            flag = false;
        }
    }
    return flag;
}

/**
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * @param str			: 체크할 문자열
 * @param defaultStr	: string 비어있을경우 리턴할 기본 문자열
 */
function nvl(str, defaultStr){

    if (typeof str === "undefined" || typeof str === undefined || str === null || str === "" || str === "null" || str === undefined || (typeof str === "object" && !Object.keys(str).length)) {
        str = defaultStr;
    }

    return str ;
}

/*
@author https://github.com/macek/jquery-serialize-object
*/
$.fn.serializeObject = function () {
    "use strict";
    var result = {};
    var extend = function (i, element) {
        var node = result[element.name];
        if ("undefined" !== typeof node && node !== null) {
            if ($.isArray(node)) {
                node.push(element.value);
            } else {
                result[element.name] = [node, element.value];
            }
        } else {
            result[element.name] = element.value;
        }
    };

    $.each(this.serializeArray(), extend);
    return result;
};