var pageNum = 1; // 페이지 번호 생성 시점에 따른 변수 초기화
$(function(){
    //페이지 오픈 시 default ()
    bidanmList(pageNum);

});

const showPageCnt = 3; // 화면에 보일 페이지 번호 개수

/**
 * @param pageNum 출력 페이지 번호
 * */
function bidanmList(pageNum) {
    // 데이터 조회
    searchPosts(pageNum);

    // 페이지당 건수(10, 30, 50)가 변경되면 재조회
    /*$('#countPerPage').change(function() {
        searchPosts(1);
    });*/

    // 페이지 번호 클릭
    $(document).on('click', '.paging>ol>li>a', function() {
        if (!$(this).hasClass('this')) {
            $(this).parent().find('a.this').removeClass('this');
            $(this).addClass('this');

            searchPosts(Number($(this).text()));

            /*let offset = $('#page-anchor').offset();
            $('html').animate({scrollTop: (offset.top - 50)}, 300);*/
        }
    });

    // 페이징 Icon(<<, <, >, >>) 클릭
    $(document).on('click', '.paging>span', function() {
        const totalCnt = parseInt($('span.total').text());
        const countPerPage = 10;
        const totalPage = Math.ceil(totalCnt / countPerPage);

        const id = $(this).attr('id');

        if (id === 'first_page') { //<<
            searchPosts(1);
        } else if (id === 'prev_page') { //<
            let arrPages = [];
            $('.paging>ol>li>a').each(function() {
                arrPages.push(Number($(this).text()));
            });
            const prevPage = Math.min(...arrPages) - 1;
            searchPosts(prevPage);
        } else if (id === 'next_page') { //>
            let arrPages = [];
            $('.paging>ol>li>a').each(function() {
                arrPages.push(Number($(this).text()));
            });
            const nextPage = Math.max(...arrPages) + 1;
            searchPosts(nextPage);
        } else if (id === 'last_page') { //>>
            searchPosts(totalPage);
        }
    });

}

/**
 * 페이지별 데이터를 조회합니다.
 * @param {int} pageNum - Page Number
 */
function searchPosts(pageNum) {
    const countPerPage = 10; // 페이지당 노출 개수
    const start = (pageNum - 1) * countPerPage;
    let flag = true;

    let searchText = $('#search_text').val();
    let condition = $('#search_box option:selected').val();

    let jsonObj = {
        pageNum: start,
        rows: countPerPage,
        condition: condition,
        searchText: searchText
    };

    $.ajax({
        url: '/support/bidanm/selectList.do',
        method: 'post',
        data: JSON.stringify(jsonObj),
        contentType: 'application/json; charset=utf-8' //server charset 확인 필요
    })
    .done(function (data, status){
        // console.log(status);
        let results = data;
        let str = '';
        $.each(results , function(i){
            let rownum = results[i].rownum;
            let seq = results[i].seq;
            let supportField = results[i].supportField;
            let supportBizName = results[i].supportBizName;
            let applyStartDate = results[i].applyStartDate;
            let applyEndDate = results[i].applyEndDate;
            let businessOrganization = results[i].businessOrganization;
            let initRegiDttm = results[i].initRegiDttm;
            initRegiDttm = initRegiDttm.split(' ')[0].replaceAll('-','.');

            let applyWayFlag = false;
            if(applyStartDate === '-' && applyEndDate === '-'){
                applyWayFlag = true;
            }

            str += '<li>';
                str += '<div class="number">';
                    str += rownum;
                str += '</div>';
                str += '<div class="tit" onclick="location.href=\'/support/bidanm/detail.do?seq=' + seq + '\'">';
                    str += supportBizName;
                str += '</div>';
                str += '<div class="period">';
                if(applyWayFlag){
                    str += '<span>';
                        str += '상시';
                    str += '</span>';
                }else{
                    str += '<span>';
                        str += applyStartDate
                    str += '</span>';
                    str += '<span>';
                        str += '-' + applyEndDate;
                    str += '</span>';
                }
                str += '</div>';
                str += '<div class="agency">';
                    str += businessOrganization;
                str += '</div>';
                str += '<div class="date">';
                    str += initRegiDttm;
                str += '</div>';
            str += '</li>';

            if(results.length === (i+1)){ // each 문이 모두 실행되면 아래 페이징 정보 세팅 실행
                flag = false;
            }
        });

        $('.sp_list_box .tbody').empty();
        $('.sp_list_box .tbody').html(str);

        if(nvl(results,"") !== "") {
            // 맨 처음에만 total 값 세팅
            if (pageNum === 1) {
                $('span.total').text(results[0].totalRecords || 0);
            }
        }else{ // 데이터 없는 경우
            $('span.total').text(0);
            $('.paging ol').empty(); // 페이징 번호 없애기
            $('#first_page').hide();
            $('#prev_page').hide();
            $('#next_page').hide();
            $('#last_page').hide();

            let emptyStr = '';
            emptyStr += '<li>';
                emptyStr += '<div>';
                    emptyStr += '<p style="font-size: 18px; font-weight: bold;">';
                        emptyStr += '조회된 입찰공고가 없습니다.';
                    emptyStr += '</p>';
                emptyStr += '</div>';
            emptyStr += '</li>';

            $('.sp_list_box .tbody').empty();
            $('.sp_list_box .tbody').html(emptyStr);
        }
    })
    .fail(function(xhr, status, errorThrown) {
        $('body').html("오류가 발생했습니다.")
            .append("<br>오류명: " + errorThrown)
            .append("<br>상태: " + status);
    })
    .always(function() {
        if(!flag){ // flag = false 이면 아래 페이징 정보 세팅 실행
            // 페이징 정보 세팅
            setPaging(pageNum);
        }
    });
}

/**
 * 페이징 정보를 세팅합니다.
 * @param {int} pageNum - Page Number
 */
function setPaging(pageNum) {
    const totalCnt = parseInt($('span.total').text());
    const countPerPage = 10;

    const currentPage = pageNum;
    const totalPage = Math.ceil(totalCnt / countPerPage);

    showAllIcon();

    if (currentPage <= showPageCnt) {
        $('#first_page').hide();
        $('#prev_page').hide();
    }
    if (
        totalPage <= showPageCnt ||
        Math.ceil(currentPage / showPageCnt) * showPageCnt + 1 > totalPage
    ) {
        $('#next_page').hide();
        $('#last_page').hide();
    }

    let start = Math.floor((currentPage - 1) / showPageCnt) * showPageCnt + 1;
    let sPagesHtml = '';
    for (const end = start + showPageCnt; start < end && start <= totalPage; start++) {
        sPagesHtml += '<li><a class="' + (start === currentPage ? 'this' : 'other') + '" style="cursor: pointer">' + start + '</a></li>';
    }
    $('.paging ol').html(sPagesHtml);
}

/**
 * Icon(<<, <, >, >>) All Show
 */
function showAllIcon() {
    $('#first_page').show();
    $('#prev_page').show();
    $('#next_page').show();
    $('#last_page').show();
}