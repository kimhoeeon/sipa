<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri ="http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="format-detection" content="telephone=no" />
    <title>스마트산업진흥협회</title>

    <!-- 캐시를 바로 만료시킴. -->
    <meta http-equiv="Expires" content="-1" />

    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.0) -->
    <meta http-equiv="Pragma" content="no-cache" />

    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.1) -->
    <meta http-equiv="Cache-Control" content="no-cache" />

    <!-- swiper 외부 라이브러리 -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <%-- sweetalert CDN --%>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="<%request.getContextPath();%>/static/css/reset.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/font.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/style.css?ver=<%=System.currentTimeMillis()%>" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/responsive.css" rel="stylesheet">

    <style>
        .mainLayerPopup { display:none; position:fixed; width:auto; min-height:100px; top:74px; left:0px; padding:0px;  border:3px solid #242527; background:#fff; overflow:hidden; z-index:9999; }
        .mainLayerPopup .popupBox { text-align: center; padding:35px 0 0; min-height:150px; height:100%}
        .mainLayerPopup .popupBox img { display: block; margin: 0 0;}
        .mainLayerPopup .popupClose {text-align:right; background:#111; padding:10px;}
        .mainLayerPopup .popupClose input {vertical-align:middle;}
        .mainLayerPopup .popupClose label {color:#fff; font-size:14px; vertical-align:middle;  margin-left:3px;}
        .mainLayerPopup .popupClose a{color:#fff; width:15px; display:inline-block; vertical-align:middle; margin-left:10px; }
        .mainLayerPopup .popupClose input[type="checkbox"] {border:1px solid #ccc; background:#fff; width: 20px; height: 20px; margin-right:5px; margin-bottom:5px; vertical-align: middle; border-radius: 0;}
    </style>
</head>

<body>

<c:import url="header.jsp" charEncoding="UTF-8"/>

<div id="container">
    <div class="main_container">
        <div class="inner">

            <!-- "main_slide -->
            <div class="main_slide">
                <div class="swiper_box">
                    <div class="swiper swiper_main_slide">
                        <ul class="swiper-wrapper">
                            <c:forEach var="mainBanner" items="${bannerList}" begin="0" end="${bannerList.size()}" step="1" varStatus="status">
                                <c:set var="bannerFilePathSrc" value="${fn:replace(mainBanner.fullFilePath, './tomcat/webapps', '../../..')}" />
                                <li class="swiper-slide">
                                    <a href="">
                                        <div class="thumb11 thumbBox">
                                            <img src="${bannerFilePathSrc}" class="thumbImg" alt="메인 슬라이드_${status.index+1}">
                                        </div>
                                    </a>
                                </li>
                            </c:forEach>
                            <%--<li class="swiper-slide">
                                <a href="">
                                    <div class="thumb11 thumbBox"><img src="<%request.getContextPath();%>/static/img/main_slide01.jpg" class="thumbImg"></div>
                                </a>
                            </li>--%>
                        </ul>
                    </div>
                    <div class="swiper-pagination main_pagination"></div>
                </div>
            </div>
            <!-- //main_slide -->

            <!-- main_board -->
            <div class="main_board">

                <!-- main_box -->
                <div class="board_box">
                    <div class="main_tit">
                        <div class="txt">SIPA NEWS</div>
                        <a href="" class="more"><span>더보기</span></a>
                    </div>
                    <ul class="board_list">
                        <li>
                            <a href="">
                                <div class="title">[파이오링크]파이오링크, 역대 최대 3분기 매출 달성, 전년比 17% 증가</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="title">[파루] 파루, 농업과 태양광 병행 AI 영농형 트랙커 출시</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="title">[카네비컴]카네비컴, ‘카네비모빌리티’로 사명 변경</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- //main_box -->

                <!-- main_box -->
                <div class="board_box">
                    <div class="main_tit">
                        <div class="txt">공지사항</div>
                        <a href="" class="more"><span>더보기</span></a>
                    </div>
                    <ul class="board_list">
                        <li>
                            <a href="">
                                <div class="title">[파이오링크]파이오링크, 역대 최대 3분기 매출 달성, 전년比 17% 증가</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="title">[파루] 파루, 농업과 태양광 병행 AI 영농형 트랙커 출시</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="title">[카네비컴]카네비컴, ‘카네비모빌리티’로 사명 변경</div>
                                <div class="date">2023-07-23</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- //main_box -->

            </div>
            <!-- //main_board -->

            <div class="main_company">
                <div class="main_tit">
                    <div class="txt">회원사 소개</div>
                    <a href="" class="more"><span>더보기</span></a>
                </div>
                <div class="swiper_box">
                    <div class="swiper swiper_main_company">
                        <ul class="swiper-wrapper">
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors01.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">YPP(주)</div>
                                    <div class="name">백종만 대표</div>
                                    <div class="major">전기전자분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors02.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)시스원</div>
                                    <div class="name">이갑수 대표</div>
                                    <div class="major">정보통신분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors03.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)에니텍시스</div>
                                    <div class="name">홍사혁 대표</div>
                                    <div class="major">그린IT분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors04.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)지비엠아이엔씨</div>
                                    <div class="name">방기석 대표</div>
                                    <div class="major">환경시스템분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors05.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)데스코</div>
                                    <div class="name">이상혁 대표</div>
                                    <div class="major">장비시스템분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors06.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)유캐스트</div>
                                    <div class="name">김재형 대표</div>
                                    <div class="major">정보통신분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors07.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)KT</div>
                                    <div class="name">황창규 대표</div>
                                    <div class="major">통합시스템분과</div>
                                </div>
                            </li>
                            <li class="swiper-slide">
                                <div class="thumb169 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_ascdirectors08.jpg" class="thumbImg"></div>
                                <div class="txt_box">
                                    <div class="company">(주)씨티코어</div>
                                    <div class="name">김완식 대표</div>
                                    <div class="major">소프트웨어분과</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<c:import url="footer.jsp" charEncoding="UTF-8"/>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.all.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery-1.9.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.cookie.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.ui.touch-punch.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.number.min.js"></script>
<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/script.js?ver=<%=System.currentTimeMillis()%>"></script>
<script src="<%request.getContextPath();%>/static/js/swiper.js"></script>
<script src="<%request.getContextPath();%>/static/js/main.js?ver=<%=System.currentTimeMillis()%>"></script>

<%-- 뒷배경 적용 시 주석 해제 <div id="mainLayerPopup" style="display: block;"></div>--%>
<c:set var="imgLeftPosition" value="0"/>
<c:forEach var="popup" items="${popupList}" begin="0" end="${popupList.size()}" step="1" varStatus="status">
    <c:if test="${status.index eq 0}">
        <c:set var="imgLeftPosition" value="${popup.leftPixel}"/>
    </c:if>
    <c:if test="${status.index > 0}">
        <c:set var="imgLeftPosition" value="${imgLeftPosition + popup.leftPixel + popupList.get(status.index-1).widthPixel}"/>
    </c:if>
    <div class="mainLayerPopup" id="id_popup_${popup.seq}"
         style="position:fixed; top:${popup.topPixel}px; left:${imgLeftPosition}px; width:${popup.widthPixel}px; display: none;">
        <div class="popupBox" style="padding:0;">
                ${fn:replace(fn:replace(popup.content,'&lt;','<'),'&gt;','>')}
        </div>
        <div class="popupClose">
            <input type="checkbox" id="id_today_${popup.seq}" onclick="CloseMainPopup('${popup.seq}')">
            <label for="id_today_${popup.seq}"> 오늘 하루 그만보기 </label>
            <a href="javascript:CloseMainPopup('${popup.seq}');" style="margin-left:20px">
                <img src="<%request.getContextPath();%>/static/img/close_w.png">
            </a>
        </div>
    </div>
</c:forEach>

<script>

    let cookie_first_name = 'popup_';

    function ShowMainPopup(pop_id) {
        let id_popup_name	= "id_popup_" + pop_id;
        let cookie_name		= cookie_first_name + pop_id;

        if( getStorage(cookie_name)){
            return;
        }
        let popupEl = $('#'+id_popup_name);
        let popupSize = popupEl.css('width').replace('px','');
        let popupLeft = parseInt('${imgLeftPosition}');

        let windowWidth = window.innerWidth;
        if(windowWidth >= 900 && windowWidth <= 1024){
            popupEl.css('width', (popupSize * 0.9) + 'px');
            popupEl.css('left', (popupLeft * 0.9) + 'px');
        }else if(windowWidth >= 769 && windowWidth <= 899) {
            popupEl.css('width', (popupSize * 0.7) + 'px');
            popupEl.css('left', (popupLeft * 0.7) + 'px');
        }else if(windowWidth >= 481 && windowWidth <= 768) {
            popupEl.css('width', (popupSize * 0.6) + 'px');
            popupEl.css('left', (popupLeft * 0.1) + 'px');
        }else if(windowWidth <= 480){
            popupEl.css('width', (popupSize * 0.5) + 'px');
            popupEl.css('left', '10px');
        }

        popupEl.show();
    }

    function CloseMainPopup(pop_id) {
        let id_popup_name	= "id_popup_" + pop_id;
        let id_today_name	= 'id_today_' + pop_id;
        let cookie_name		= cookie_first_name + pop_id;

        if( $(":input:checkbox[id='" + id_today_name + "']:checked").length > 0 ){
            setStorage(cookie_name, 1);
        }

        $('#'+id_popup_name).hide();
    }

    function setStorage(name, exp){
        // 만료 시간 구하기(exp를 ms단위로 변경)
        let date = new Date();
        date = date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

        // 로컬 스토리지에 저장하기
        // (값을 따로 저장하지 않고 만료 시간을 저장)
        localStorage.setItem(name, String(date));
    }

    function getStorage(name){
        let now = new Date();
        now = now.setTime(now.getTime());
        // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
        // 시간이 남아 있으면 true, 아니면 false 리턴
        return parseInt(localStorage.getItem(name)) > now;
    }

    $(function(){
        <c:forEach var="popup" items="${popupList}" begin="0" end="${popupList.size()}" step="1">
        ShowMainPopup('${popup.seq}');
        </c:forEach>
    });
</script>

</body>
</html>