/***
 * mng/pop/popup.js
 * 정보센터>팝업관리
 * */

$(function(){

    let validDate = document.querySelector('#validDate');
    if (validDate) {
        $("#validDate").daterangepicker({
                timePicker: true,
                timePicker24Hour: true,
                showDropdowns: true,
                minYear: 1901,
                maxYear: parseInt(moment().format("YYYY"), 12),
                locale: {
                    format: 'YYYY/MM/DD hh:mm:ss'
                }
            }
        );
    }

});

function f_center_popup_align_sel_set(sel){
    let sel_val = $(sel).val();
    if(sel_val === 'CENTER'){
        $('#topPixel').val(0);
        $('#topPixel').attr('disabled', true);
        $('#leftPixel').val(0);
        $('#leftPixel').attr('disabled', true);
    }else{
        if(nvl($('#topPixel').attr('disabled'),'') !== ''){
            $('#topPixel').attr('disabled', false);
        }
        if(nvl($('#leftPixel').attr('disabled'),'') !== ''){
            $('#leftPixel').attr('disabled', false);
        }
    }
}

function f_pop_popup_search(){

    /* 로딩페이지 */
    loadingBarShow();

    /* DataTable Data Clear */
    let dataTbl = $('#mng_pop_popup_table').DataTable();
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
            condition: condition,
            searchText: searchText
        }
    }

    let resData = ajaxConnect('/mng/pop/popup/selectList.do', 'post', jsonObj);

    dataTbl.rows.add(resData).draw();

    /* 조회 카운트 입력 */
    document.getElementById('search_cnt').innerText = resData.length;

    /* DataTable Column tooltip Set */
    let jb = $('#mng_pop_popup_table tbody td');
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

function f_search_condition_sel_change(){

    /* 로딩페이지 */
    loadingBarShow();

    /* DataTable Data Clear */
    let dataTbl = $('#mng_pop_popup_table').DataTable();
    dataTbl.clear();
    dataTbl.draw(false);

    let useYnVal = $('#condition_use_yn').is(':checked');
    let useYn = '';
    if(useYnVal === true){
        useYn = 'Y';
    }

    let condition = $('#search_box option:selected').val();
    let searchText = $('#search_text').val();

    let jsonObj = {
        useYn: useYn,
        condition: condition,
        searchText: searchText
    }

    //console.log(jsonObj);

    /* 목록 데이터 조회 */
    let resData = ajaxConnect('/mng/pop/popup/selectList.do', 'post', jsonObj);
    dataTbl.rows.add(resData).draw();

    /* 조회 카운트 입력 */
    document.getElementById('search_cnt').innerText = resData.length;

    /* DataTable Column tooltip Set */
    let jb = $('#mng_pop_popup_table tbody td');
    let cnt = 0;
    jb.each(function(index, item){
        let itemText = $(item).text();
        let itemText_trim = itemText.replaceAll(' ','');
        if(itemText_trim !== ''){
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

function f_pop_popup_search_condition_init(){
    $('#search_box').val('').select2({minimumResultsForSearch: Infinity});
    $('#search_text').val('');

    $('#condition_use_yn').prop('checked',false);

    /* 재조회 */
    f_pop_popup_search();
}

function f_pop_popup_remove(seq){
    //console.log('삭제버튼');
    if(nullToEmpty(seq) !== ""){
        let jsonObj = {
            seq: seq
        }
        Swal.fire({
            title: '선택한 팝업을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '삭제하기',
            cancelButtonColor: '#A1A5B7',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

                let resData = ajaxConnect('/mng/pop/popup/delete.do', 'post', jsonObj);

                if (resData.resultCode === "0") {
                    showMessage('', 'info', '팝업 삭제', '팝업이 삭제되었습니다.', '');
                    f_pop_popup_search(); // 삭제 성공 후 재조회 수행
                } else {
                    showMessage('', 'error', '에러 발생', '팝업 삭제를 실패하였습니다. 관리자에게 문의해주세요. ' + resData.resultMessage, '');
                }
            }
        });
    }
}

function f_pop_popup_modify_init_set(seq){
    window.location.href = '/mng/pop/popup/detail.do?seq=' + seq;
}

function f_pop_popup_save(seq){
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
            let validCheck = f_pop_popup_valid();

            if(validCheck){

                /* form data setting */
                let data = f_pop_popup_form_data_setting(seq);

                let url = '/mng/pop/popup/modifySave.do'; /* Modify */
                if(nvl(seq, '') === '') { /* Insert */
                    url = '/mng/pop/popup/insertSave.do'
                }

                $.ajax({
                    url: url,
                    method: 'POST',
                    async: false,
                    data: data,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        if (data.resultCode === "0") {

                            Swal.fire({
                                title: '팝업 상세 정보',
                                text: "팝업 상세 정보가 저장되었습니다.",
                                icon: 'info',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: '확인'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if(nvl(seq, '') === '') {
                                        /* insert */
                                        window.location.href = '/mng/pop/popup.do';
                                    }else{
                                        /* update */
                                        f_pop_popup_modify_init_set(seq); // 재조회
                                    }
                                }
                            });
                        } else {
                            showMessage('', 'error', '팝업 상세 정보', data.resultMessage, '');
                        }
                    },
                    error: function (xhr, status) {
                        alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + xhr + "\n상태 : " + status);
                    }
                })//ajax

            }//validCheck

        }//result.isConfirmed
    })

}

function f_pop_popup_valid(){
    let title = $('#title').val();
    let writer = $('#writer').val();
    let content = $('#quill_content').val();

    if(nvl(title,'') === ''){ showMessage('', 'error', '[팝업 상세 정보]', '제목을 입력해 주세요.', ''); return false; }
    if(nvl(writer,'') === ''){ showMessage('', 'error', '[팝업 상세 정보]', '작성자를 입력해 주세요.', ''); return false; }
    if(nvl(content,'') === ''){ showMessage('', 'error', '[팝업 상세 정보]', '내용을 입력해 주세요.', ''); return false; }

    return true;
}

function f_pop_popup_form_data_setting(seq){

    // 제목
    let title = $('#title').val();

    // 등록자
    let writer = $('#writer').val();

    // 사용여부
    let useYn = $('input[type=radio][name=useYn]:checked').val();

    // 게시일시 - 만료일시
    let validDate = $('#validDate').val();

    // 게시일시
    let publishedDate = validDate.split(' - ')[0];

    // 만료일시
    let expirationDate = validDate.split(' - ')[1];

    // 너비
    let widthPixel = $('#widthPixel').val();
    if(nvl(widthPixel,'') === ''){
        widthPixel = '500';
    }

    // 정렬
    let align = $('#align').val();

    // 탑
    let topPixel = $('#topPixel').val();
    if(nvl(topPixel,'') === ''){
        topPixel = '0';
    }

    // 레프트
    let leftPixel = $('#leftPixel').val();
    if(nvl(leftPixel,'') === ''){
        leftPixel = '0';
    }

    // 내용
    let content = $('#quill_content').val();

    let jsonObj = {
        seq: seq,
        title: title,
        writer: writer,
        useYn: useYn,
        publishedDate: publishedDate,
        expirationDate: expirationDate,
        widthPixel: widthPixel,
        align: align,
        topPixel: topPixel,
        leftPixel: leftPixel,
        content: content
    }

    return JSON.stringify(jsonObj);
}