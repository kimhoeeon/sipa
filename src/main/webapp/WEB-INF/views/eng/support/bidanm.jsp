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
    <div class="sub_top sub_top_sp">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>기업지원</span>
                    <span>입찰공고</span>
                </div>
                <div class="sub_top_tit">입찰공고</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">입찰공고</div>
                <ul class="tabOptSel">
                    <li><a href="/eng/support/bizanm.do">사업공고</a></li>
                    <li class="active"><a href="/eng/support/bidanm.do">입찰공고</a></li>
                    <li><a href="/eng/support/issue.do">Issue&Trend</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- support_list -->
    <div class="support_list padding_tb">
        <div class="inner">
            <form class="search_box">
                <select>
                    <option>입찰공고명</option>
                    <option>수행기관</option>
                    <option>내용</option>
                </select>
                <div class="input">
                    <input type="text" placeholder="검색어를 입력해주세요.">
                    <button type="submit"><img src="<%request.getContextPath();%>/static/img/icon_search.png"></button>
                </div>
            </form>

            <div class="sp_list_box board_list_box">
                <ul class="thead">
                    <li>
                        <div class="number">번호</div>
                        <div class="tit">입찰공고명</div>
                        <div class="period">신청기간</div>
                        <div class="agency">사업수행기관</div>
                        <div class="date">등록일</div>
                    </li>
                </ul>
                <ul class="tbody">
                    <li>
                        <div class="number">15</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span>- 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">14</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">13</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">12</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">11</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">10</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">09</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">08</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">07</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">06</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">05</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">04</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">03</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">02</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                    <li>
                        <div class="number">01</div>
                        <div class="tit" onclick="location.href='bidanm_view.html'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span> - 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
                    </li>
                </ul>
            </div>

            <div class="paging">
                <a href="" class="prev"><img src="<%request.getContextPath();%>/static/img/btn_prev.gif"></a>
                <ol>
                    <li><a href="" class="this">1</a></li>
                    <li><a href="" class="other">2</a></li>
                    <li><a href="" class="other">3</a></li>
                </ol>
                <a href="" class="next"><img src="<%request.getContextPath();%>/static/img/btn_next.gif"></a>
            </div>
        </div>
    </div>
    <!-- //support_list -->


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

</body>
</html>