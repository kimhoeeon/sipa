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
    <meta name="format-detection" content="telephone=no" />
    <title>스마트산업진흥협회</title>
    <meta name="title" content="스마트산업진흥협회">
    <meta name="description" content="4차산업, 스마트산업, 산업단지건설, 신재생에너지, 통합시스템, 컨설팅자문, 스마트그리드 등 사업안내.">
    <meta name="keywords" content="4차산업, 스마트산업, 산업단지건설, 신재생에너지, 통합시스템, 컨설팅자문, 스마트그리드 등 사업안내.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="스마트산업진흥협회">
    <meta property="og:description" content="4차산업, 스마트산업, 산업단지건설, 신재생에너지, 통합시스템, 컨설팅자문, 스마트그리드 등 사업안내.">
    <meta property="og:url" content="https://sipa.or.kr/main.do" >
    <meta name="naver-site-verification" content="d1598bdda3bf9c08314b7c0af9ef66a5ff1dff9d" />

    <!-- swiper 외부 라이브러리 -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <%-- sweetalert CDN --%>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="<%request.getContextPath();%>/static/css/reset.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/font.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/style.css?ver=<%=System.currentTimeMillis()%>" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/responsive.css" rel="stylesheet">
</head>

<body>

<c:import url="../header.jsp" charEncoding="UTF-8"/>

<div id="container">

    <!-- sub_top -->
    <div class="sub_top sub_top_comm">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>Community</span>
                    <span>Event schedule</span>
                </div>
                <div class="sub_top_tit">Event schedule</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Event schedule</div>
                <ul class="tabOptSel">
                    <li><a href="/eng/community/notice.do">Notice</a></li>
                    <li><a href="/eng/community/news.do">SIPA-NEWS</a></li>
                    <li class="active"><a href="/eng/community/event.do">Event schedule</a></li>
                    <li><a href="/eng/community/contact.do">Contact us</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- calendarr_box -->
    <script src="<%request.getContextPath();%>/static/js/calender.js"></script>
    <div class="calendar_box padding_t">
        <div class="inner">
            <div class="calBox">
                <div class="calYm">
                    <span onClick="prevCalendar();" style="cursor:pointer;">
                        <img src="<%request.getContextPath();%>/static/img/calendar_prev.png">
                    </span>
                    <span id="calYear"></span>.
                    <span id="calMonth"></span>
                    <span onClick="nextCalendar();" style="cursor:pointer;">
                        <img src="<%request.getContextPath();%>/static/img/calendar_next.png">
                    </span>
                </div>
                <div class="calTable">
                    <table class="calendar">
                        <thead>
                        <tr>
                            <td>Sun</td>
                            <td>Mon</td>
                            <td>Tus</td>
                            <td>Wed</td>
                            <td>Thu</td>
                            <td>Fri</td>
                            <td>Sat</td>
                        </tr>
                        </thead>

                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- //calendarr_box -->

    <!-- calendar_list -->
    <div class="calendar_list padding_b">
        <div class="inner">
            <form class="search_date" onsubmit="return false;">
                <select class="form-control input-sm" id="yearE" name="yearE">
                </select>
                <select class="form-control input-sm" id="monthE" name="monthE">
                </select>
                <button type="button" onclick="eventList(1)" id="searchButton">Search</button>
            </form>

            <div class="cal_list_box board_list_box">
                <ul class="thead">
                    <li>
                        <div class="number">No</div>
                        <div class="tit">Title</div>
                        <div class="location">Location</div>
                        <div class="start">Start date</div>
                        <div class="end">End date</div>
                    </li>
                </ul>
                <ul class="tbody">
                    <%--<li>
                        <div class="number">1</div>
                        <div class="tit">제목</div>
                        <div class="location">구로롯데호텔</div>
                        <div class="start">6월 7일</div>
                        <div class="end">6월 9일</div>
                    </li>--%>
                </ul>
            </div>

            <div class="paging">
                <span class="first" id="first_page"><a><img src="<%request.getContextPath();%>/static/img/btn_first.gif" style="cursor: pointer"></a></span>
                <span class="prev" id="prev_page"><a><img src="<%request.getContextPath();%>/static/img/btn_prev.gif" style="cursor: pointer"></a></span>
                <ol>
                    <%--<li>
                      <a class="this">1</a>
                    </li>
                    <li>
                      <a class="other">2</a>
                    </li>--%>
                </ol>
                <span class="next" id="next_page"><a><img src="<%request.getContextPath();%>/static/img/btn_next.gif" style="cursor: pointer"></a></span>
                <span class="last" id="last_page"><a><img src="<%request.getContextPath();%>/static/img/btn_last.gif" style="cursor: pointer"></a></span>
            </div>
        </div>
    </div>
    <!-- //calendar_list -->


</div>

<c:import url="../footer.jsp" charEncoding="UTF-8"/>

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

<script src="<%request.getContextPath();%>/static/js/front/event.js?ver=<%=System.currentTimeMillis()%>"></script>

</body>
</html>