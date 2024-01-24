/***
 * mng/company/bidanm
 * 정보센터>기업지원>입찰공고
 * */

$(function(){

    let applyStartDatePick = '';
    let applyEndDatePick = '';

    /* 신청시작일자 */
    let applyStartDatePicker = document.getElementById('applyStartDate');
    if(applyStartDatePicker) {
        if(!$('#applyAlways').is(':checked')) {
            applyStartDatePick = applyStartDatePicker.flatpickr({
                enableTime: false,
                dateFormat: "Y.m.d"
            });
        }
    }

    /* 신청종료일자 */
    let applyEndDatePicker = document.getElementById('applyEndDate');
    if(applyEndDatePicker) {
        if(!$('#applyAlways').is(':checked')){
            applyEndDatePick = applyEndDatePicker.flatpickr({
                enableTime: false,
                dateFormat: "Y.m.d"
            });
        }
    }

    /* 상시 신청 여부 */
    $('#applyAlways').on('change', function (){
        let flag = $('#applyAlways').is(':checked');
        if(flag){
            applyStartDatePick.destroy();
            applyEndDatePick.destroy();

            $('#applyStartDate').val('-').attr('readonly',true);
            $('#applyEndDate').val('-').attr('readonly',true);

        }else{

            if($('#preApplyStartDate').val() !== '-' && $('#preApplyEndDate').val() !== '-'){
                $('#applyStartDate').val($('#preApplyStartDate').val());
                $('#applyEndDate').val($('#preApplyEndDate').val());
            }else{
                $('#applyStartDate').val('');
                $('#applyEndDate').val('');
            }

            applyStartDatePick = applyStartDatePicker.flatpickr({
                enableTime: false,
                dateFormat: "Y.m.d"
            });

            applyEndDatePick = applyEndDatePicker.flatpickr({
                enableTime: false,
                dateFormat: "Y.m.d"
            });

        }
    });

});

function f_company_bidanm_search(){

    /* 로딩페이지 */
    loadingBarShow();

    /* DataTable Data Clear */
    let dataTbl = $('#mng_company_bidanm_table').DataTable();
    dataTbl.clear();
    dataTbl.draw(false);

    /* TM 및 잠재DB 목록 데이터 조회 */
    let jsonObj;
    let condition = $('#search_box option:selected').val();
    let searchText = $('#search_text').val();
    if(nullToEmpty(searchText) === ""){
        jsonObj = {
            condition: condition
        };
    }else{
        jsonObj = {
            condition: condition ,
            searchText: searchText
        }
    }

    let resData = ajaxConnect('/mng/company/bidanm/selectList.do', 'post', jsonObj);

    dataTbl.rows.add(resData).draw();

    /* 조회 카운트 입력 */
    document.getElementById('search_cnt').innerText = resData.length;

    /* DataTable Column tooltip Set */
    let jb = $('#mng_company_bidanm_table tbody td');
    let cnt = 0;
    jb.each(function(index, item){
        let itemText = $(item).text();
        let itemText_trim = itemText.replaceAll(' ','');
        if(itemText_trim !== '' && !itemText.match('Actions')){
            $(item).attr('data-bs-toggle', 'tooltip');
            $(item).attr('data-bs-trigger', 'hover');
            $(item).attr('data-bs-custom-class', 'tooltip-inverse');
            $(item).attr('data-bs-placement', 'top');
            $(item).attr('title',itemText);
        }
        cnt++;
    })
    jb.tooltip();
}

function f_company_bidanm_search_condition_init(){
    $('#search_box').val('').select2({minimumResultsForSearch: Infinity});
    $('#search_text').val('');

    /* 재조회 */
    f_company_bidanm_search();
}

function f_company_bidanm_detail_modal_set(seq){
    /* TM 및 잠재DB 목록 상세 조회 */
    let jsonObj = {
        seq: seq
    };

    let resData = ajaxConnect('/mng/company/bidanm/selectSingle.do', 'post', jsonObj);

    /* 상세보기 Modal form Set */
    //console.log(resData);

    $('#md_support_biz_name').val(resData.supportBizName);
    if(nvl(resData.applyStartDate,'') !== '' && nvl(resData.applyEndDate,'') !== ''){
        if(resData.applyStartDate === '-' && resData.applyEndDate === '-'){
            $('#md_apply_always').attr('checked',true);
            $('#md_apply_date').val('-');
        }else{
            $('#md_apply_always').attr('checked',false);
            $('#md_apply_date').val(resData.applyStartDate + ' ~ ' + resData.applyEndDate);
        }
    }
    $('#md_business_organization').val(resData.businessOrganization);
    $('#md_ministry_competent').val(resData.ministryCompetent);
    $('#md_contact_tel').val(resData.contactTel);
    $('#md_business_overview').html(resData.businessOverview);
    $('#md_apply_way').html(resData.applyWay);
    $('#md_apply_detail_link').val(resData.applyDetailLink);
    $('#md_content').html(resData.content);

    /* TM 및 잠재DB 목록 상세 조회 */
    let jsonObj2 = {
        userId: seq
    };

    let file_list_el = document.getElementById('file_list');
    while (file_list_el.hasChildNodes()) {
        file_list_el.removeChild(file_list_el.firstChild);
    }

    let fileData = ajaxConnect('/file/upload/selectList.do', 'post', jsonObj2);
    if(nullToEmpty(fileData) !== ''){
        for(let i=0; i<fileData.length; i++){
            let file_list_el = document.getElementById('file_list');

            let input_el = document.createElement('input');
            input_el.type = 'text';
            input_el.classList.add('form-control');
            input_el.classList.add('form-control-lg');
            input_el.classList.add('form-control-solid-bg');
            input_el.classList.add('mb-2');
            input_el.value = fileData[i].fileName;
            input_el.readOnly = true;

            let label_el = document.createElement('label');
            label_el.classList.add('form-label');
            label_el.innerText = '첨부파일';

            file_list_el.append(label_el);
            file_list_el.append(input_el);
        }
    }
}

function f_company_bidanm_remove(seq){
    //console.log('삭제버튼');
    if(nullToEmpty(seq) !== ""){
        let jsonObj = {
            seq: seq
        }
        Swal.fire({
            title: '선택한 입찰공고를 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '삭제하기',
            cancelButtonColor: '#A1A5B7',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

                let resData = ajaxConnect('/mng/company/bidanm/delete.do', 'post', jsonObj);

                if (resData.resultCode === "0") {
                    showMessage('', 'info', '입찰공고 삭제', '입찰공고가 삭제되었습니다.', '');
                    f_company_bidanm_search(); // 삭제 성공 후 재조회 수행
                } else {
                    showMessage('', 'error', '에러 발생', '입찰공고 삭제를 실패하였습니다. 관리자에게 문의해주세요. ' + resData.resultMessage, '');
                }
            }
        });
    }
}

function f_company_bidanm_modify_init_set(seq){
    window.location.href = '/mng/company/bidanm/detail.do?seq=' + seq;
}

function f_company_bidanm_save(seq){
    //console.log(id + '변경내용저장 클릭');
    Swal.fire({
        title: '입력된 정보를 저장하시겠습니까?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#00a8ff',
        confirmButtonText: '변경내용저장',
        cancelButtonColor: '#A1A5B7',
        cancelButtonText: '취소'
    }).then(async (result) => {
        if (result.isConfirmed) {

            /* form valid check */
            let validCheck = f_company_bidanm_valid();

            if(validCheck){
                /* File upload */

                let fileIdList = '';
                let uploadFileList = document.getElementById('uploadFileList').children;
                let uploadFileListLen = uploadFileList.length;
                for(let i=0; i<uploadFileListLen; i++){
                    let fileId = uploadFileList[i].querySelector('input[type=hidden]').id;
                    //console.log(fileId);
                    fileIdList += fileId;
                    if((i+1) !== uploadFileListLen){
                        fileIdList += ',';
                    }
                }

                if(fileIdList !== ''){
                    let dataForm = document.getElementById('dataForm');
                    let hidden_el = document.createElement('input');
                    hidden_el.type = 'hidden';
                    hidden_el.name = 'fileIdList';
                    hidden_el.value = fileIdList;
                    dataForm.append(hidden_el);
                }

                /* form data setting */
                let data = f_company_bidanm_form_data_setting();

                /* Modify */
                if(nvl(seq, '') !== ''){
                    $.ajax({
                        url: '/mng/company/bidanm/update.do',
                        method: 'POST',
                        async: false,
                        data: data,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data.resultCode === "0") {
                                Swal.fire({
                                    title: '입찰공고 정보 변경',
                                    text: "입찰공고 정보가 변경되었습니다.",
                                    icon: 'info',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: '확인'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        f_company_bidanm_modify_init_set(seq); // 재조회
                                    }
                                });
                            } else {
                                showMessage('', 'error', '에러 발생', '입찰공고 정보 변경을 실패하였습니다. 관리자에게 문의해주세요. ' + data.resultMessage, '');
                            }
                        },
                        error: function (xhr, status) {
                            alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + xhr + "\n상태 : " + status);
                        }
                    })//ajax
                }else { /* Insert */
                    $.ajax({
                        url: '/mng/company/bidanm/insert.do',
                        method: 'POST',
                        async: false,
                        data: data,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data.resultCode === "0") {
                                Swal.fire({
                                    title: '입찰공고 정보 등록',
                                    text: "입찰공고 정보가 등록되었습니다.",
                                    icon: 'info',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: '확인'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = '/mng/company/bidanm.do'; // 목록으로 이동
                                    }
                                });
                            } else {
                                showMessage('', 'error', '에러 발생', '입찰공고 정보 등록을 실패하였습니다. 관리자에게 문의해주세요. ' + data.resultMessage, '');
                            }
                        },
                        error: function (xhr, status) {
                            alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + xhr + "\n상태 : " + status);
                        }
                    })//ajax
                }// id check

            }//validCheck

        }//result.isConfirmed
    })

}

function f_company_bidanm_form_data_setting(){

    let form = JSON.parse(JSON.stringify($('#dataForm').serializeObject()));

    form.uploadFile = '';

    form.applyDetailLink = getRightURL(form.applyDetailLink);

    return JSON.stringify(form);
}

function f_company_bidanm_valid(){
    let supportBizName = document.querySelector('#supportBizName').value;
    let applyStartDate = document.querySelector('#applyStartDate').value;
    let applyEndDate = document.querySelector('#applyEndDate').value;
    let businessOrganization = document.querySelector('#businessOrganization').value;
    let content = document.querySelector('#quill_content').value;

    if(nvl(supportBizName,'') === ''){ showMessage('', 'error', '[등록 정보]', '지원사업명을 입력해 주세요.', ''); return false; }
    if(nvl(applyStartDate,'') === ''){ showMessage('', 'error', '[등록 정보]', '신청시작일자를 선택해 주세요.', ''); return false; }
    if(nvl(applyEndDate,'') === ''){ showMessage('', 'error', '[등록 정보]', '신청종료일자를 선택해 주세요.', ''); return false; }
    if(applyStartDate > applyEndDate){ showMessage('', 'error', '[등록 정보]', '신청종료일자를 신청시작일자보다 뒤로 선택해 주세요.', ''); return false; }
    if(nvl(businessOrganization,'') === ''){ showMessage('', 'error', '[등록 정보]', '사업수행기관을 입력해 주세요.', ''); return false; }
    if(nvl(content,'') === ''){ showMessage('', 'error', '[등록 정보]', '내용을 입력해 주세요.', ''); return false; }

    return true;
}

function getRightURL(n) {
    let tmpURL = n.replace(/\s/g, "")
    let tmp = tmpURL.toLowerCase();
    if( tmp.indexOf("http://") === 0 ||
        tmp.indexOf("https://") === 0 ||
        tmp.indexOf("ftp://") === 0 ||
        tmp.indexOf("mailto://") === 0 ||
        tmp.indexOf("mms://") === 0 ||
        tmp.indexOf("pnm://") === 0 ||
        tmp.indexOf("telnet://") === 0 ||
        tmp.indexOf("rlogin://") === 0 ||
        tmp.indexOf("news://") === 0 ||
        tmp.indexOf("file://") === 0)
        return tmpURL;
    else
        return "http://"+tmpURL;
}