/***
 * mng/member/ascdirectors
 * 정보센터>회원사관리>협회이사
 * */

$(function(){

});

function f_member_ascdirectors_search(){

    /* 로딩페이지 */
    loadingBarShow();

    /* DataTable Data Clear */
    let dataTbl = $('#mng_member_ascdirectors_table').DataTable();
    dataTbl.clear();
    dataTbl.draw(false);

    /* TM 및 잠재DB 목록 데이터 조회 */
    let jsonObj;
    let condition = $('#search_box option:selected').val();
    let searchText = $('#search_text').val();
    if(nullToEmpty(searchText) === ""){
        jsonObj = {
            "condition": condition
        };
    }else{
        jsonObj = {
            "condition": condition ,
            "searchText": searchText
        }
    }

    let resData = ajaxConnect('/mng/member/ascdirectors/selectList.do', 'post', jsonObj);

    dataTbl.rows.add(resData).draw();

    /* 조회 카운트 입력 */
    document.getElementById('search_cnt').innerText = resData.length;

    /* DataTable Column tooltip Set */
    let jb = $('#mng_member_ascdirectors_table tbody td');
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

function f_member_ascdirectors_search_condition_init(){
    $('#search_box').val('').select2({minimumResultsForSearch: Infinity});
    $('#search_text').val('');

    /* 재조회 */
    f_member_ascdirectors_search();
}

function f_member_ascdirectors_detail_modal_set(seq){
    /* TM 및 잠재DB 목록 상세 조회 */
    let jsonObj = {
        seq: seq
    };

    let resData = ajaxConnect('/mng/member/ascdirectors/selectSingle.do', 'post', jsonObj);

    //console.log(resData);

    if(resData.lang === 'KO'){
        document.querySelector('#md_lang').value = '국문';
    }else{
        document.querySelector('#md_lang').value = '영문';
    }

    document.querySelector('#md_company_name').value = resData.companyName;
    document.querySelector('#md_company_ceo').value = resData.companyCeo;
    document.querySelector('#md_company_position').value = resData.companyPosition;
    document.querySelector('#md_company_homepage').value = resData.companyHomepage;
    document.querySelector('#md_company_tel').value = resData.companyTel;
    document.querySelector('#md_company_address').value = resData.companyAddress;
    document.querySelector('#md_company_business_type').value = resData.companyBusinessType;
    document.querySelector('#md_company_business_item').value = resData.companyBusinessItem;


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

            if(fileData[i].note === 'logo'){
                file_list_el.append('로고 이미지 파일');
            }else if(fileData[i].note === 'intro'){
                file_list_el.append('회사소개 이미지 파일');
            }else if(fileData[i].note === 'field'){
                file_list_el.append('사업분야 이미지 파일');
            }

            file_list_el.append(input_el);
        }
    }
}

function f_member_ascdirectors_remove(seq){
    //console.log('삭제버튼');
    if(nullToEmpty(seq) !== ""){
        let jsonObj = {
            seq: seq
        }
        Swal.fire({
            title: '선택한 협회이사 정보를 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: '삭제하기',
            cancelButtonColor: '#A1A5B7',
            cancelButtonText: '취소'
        }).then((result) => {
            if (result.isConfirmed) {

                let resData = ajaxConnect('/mng/member/ascdirectors/delete.do', 'post', jsonObj);

                if (resData.resultCode === "0") {
                    showMessage('', 'info', '협회이사 삭제', '협회이사 정보가 삭제되었습니다.', '');
                    f_member_ascdirectors_search(); // 삭제 성공 후 재조회 수행
                } else {
                    showMessage('', 'error', '에러 발생', '협회이사 정보 삭제를 실패하였습니다. 관리자에게 문의해주세요. ' + resData.resultMessage, '');
                }
            }
        });
    }
}

function f_member_ascdirectors_modify_init_set(seq){
    window.location.href = '/mng/member/ascdirectors/detail.do?seq=' + seq;
}

function f_member_ascdirectors_save(seq){
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
            let validCheck = f_member_ascdirectors_valid();

            if(validCheck){

                /* form data setting */
                let data = f_member_ascdirectors_form_data_setting();

                console.log(data);

                /* Modify */
                if(nvl(seq, '') !== ''){
                    $.ajax({
                        url: '/mng/member/ascdirectors/update.do',
                        method: 'POST',
                        async: false,
                        data: data,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data.resultCode === "0") {

                                /* file function */
                                let tableSeq = data.customValue; //tableSeq return 값
                                f_company_file_upload_call(tableSeq, 'member/ascdirectors/' + tableSeq);

                                Swal.fire({
                                    title: '협회이사 정보 변경',
                                    text: "협회이사 정보가 변경되었습니다.",
                                    icon: 'info',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: '확인'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        f_member_ascdirectors_modify_init_set(seq); // 재조회
                                    }
                                });
                            } else {
                                showMessage('', 'error', '에러 발생', '협회이사 정보 변경을 실패하였습니다. 관리자에게 문의해주세요. ' + data.resultMessage, '');
                            }
                        },
                        error: function (xhr, status) {
                            alert('오류가 발생했습니다. 관리자에게 문의해주세요.\n오류명 : ' + xhr + "\n상태 : " + status);
                        }
                    })//ajax
                }else { /* Insert */
                    $.ajax({
                        url: '/mng/member/ascdirectors/insert.do',
                        method: 'POST',
                        async: false,
                        data: data,
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {

                            /* file function */
                            let tableSeq = data.customValue; //tableSeq return 값
                            f_company_file_upload_call(tableSeq, 'member/ascdirectors/' + tableSeq);

                            if (data.resultCode === "0") {
                                Swal.fire({
                                    title: '협회이사 정보 등록',
                                    text: "협회이사 정보가 등록되었습니다.",
                                    icon: 'info',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: '확인'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        window.location.href = '/mng/member/ascdirectors.do'; // 목록으로 이동
                                    }
                                });
                            } else {
                                showMessage('', 'error', '에러 발생', '협회이사 정보 등록을 실패하였습니다. 관리자에게 문의해주세요. ' + data.resultMessage, '');
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

function f_member_ascdirectors_form_data_setting(){

    let form = JSON.parse(JSON.stringify($('#dataForm').serializeObject()));

    // 주요 사업
    let companyBusinessTypeList = $('input[type=checkbox][name=companyBusinessType]:checked');
    let companyBusinessType = '';
    for(let i=0; i<companyBusinessTypeList.length; i++){
        companyBusinessType += companyBusinessTypeList.eq(i).val();
        if((i+1) !== companyBusinessTypeList.length){
            companyBusinessType += ',';
        }
    }
    form.companyBusinessType = companyBusinessType;
    
    return JSON.stringify(form);
}

function f_member_ascdirectors_valid(){
    let companyName = document.querySelector('#companyName').value;
    let companyCeo = document.querySelector('#companyCeo').value;

    if(nvl(companyName,'') === ''){ showMessage('#companyName', 'error', '[상세 정보]', '회사명을 입력해 주세요.', ''); return false; }
    if(nvl(companyCeo,'') === ''){ showMessage('#companyCeo', 'error', '[상세 정보]', '대표자명을 입력해 주세요.', ''); return false; }

    return true;
}

function f_company_file_upload_call(id, path) {

    /* 로고 */
    let logoFile = document.getElementById('logoFile').value;
    if (nvl(logoFile, '') !== '') {
        f_company_file_upload(id, 'logoFile', path);
    }

    /* 회사소개 */
    let introFile = document.getElementById('introFile').value;
    if (nvl(introFile, '') !== '') {
        f_company_file_upload(id, 'introFile', path);
    }

    /* 사업분야 */
    let fieldFile = document.getElementById('fieldFile').value;
    if (nvl(fieldFile, '') !== '') {
        f_company_file_upload(id, 'fieldFile', path);
    }

}