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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <%-- sweetalert CDN --%>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="<%request.getContextPath();%>/static/css/reset.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/font.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/style.css?ver=<%=System.currentTimeMillis()%>" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/responsive.css" rel="stylesheet">
</head>

<body>

<c:import url="../../header.jsp" charEncoding="UTF-8"/>

<div id="container">

    <!-- sub_top -->
    <div class="sub_top sub_top_sp">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>기업지원</span>
                    <span>사업공고</span>
                </div>
                <div class="sub_top_tit">사업공고</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">사업공고</div>
                <ul class="tabOptSel">
                    <li class="active"><a href="/eng/support/bizanm.do">사업공고</a></li>
                    <li><a href="/eng/support/bidanm.do">입찰공고</a></li>
                    <li><a href="/eng/support/issue.do">Issue&Trend</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- support_view -->
    <div class="board_view padding_tb">
        <div class="inner">

            <div class="board_view_box">
                <div class="board_view_top">
                    <div class="cate">기술</div>
                    <div class="tit">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                    <div class="date">2023.08.03</div>
                </div>
                <div class="board_view_info">
                    <div class="board_view_info_box">
                        <p class="gubun">소관부처</p>
                        <p class="txt">-</p>
                    </div>
                    <div class="board_view_info_box">
                        <p class="gubun">사업수행기관</p>
                        <p class="txt">산업통상자원부</p>
                    </div>
                    <div class="board_view_info_box">
                        <p class="gubun">신청기간</p>
                        <p class="txt">2023.08.04 - 2023.09.11</p>
                    </div>
                    <div class="board_view_info_box">
                        <p class="gubun">사업개요</p>
                        <p class="txt">-</p>
                    </div>
                    <div class="board_view_info_box">
                        <p class="gubun">신청방법</p>
                        <p class="txt">-</p>
                    </div>
                    <div class="board_view_info_box">
                        <p class="gubun">문의처</p>
                        <p class="txt">02-0000-0000</p>
                    </div>
                </div>
                <div class="board_view_cont">
                    <img src="<%request.getContextPath();%>/static/img/img_sample.jpg">
                </div>
                <div class="board_view_info">
                    <div class="board_view_info_box">
                        <p class="gubun">첨부파일</p>
                        <p class="txt">
                            <a href="" class="file">파일명.pdf</a>
                            <a href="" class="file">파일명.pdf</a>
                        </p>
                    </div>
                    <div class="btn_box">
                        <a href="javascript:f_anm_detail('${info.applyDetailLink}')" class="btn_detail btnSt01">공고 자세히보기</a>
                    </div>
                </div>
                <div class="board_view_btn">
                    <a href="/eng/support/bizanm.do">목록</a>
                </div>
            </div>

        </div>
    </div>
    <!-- //support_list -->


</div>

<c:import url="../../footer.jsp" charEncoding="UTF-8"/>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.all.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery-1.9.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.cookie.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.ui.touch-punch.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.number.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/script.js?ver=<%=System.currentTimeMillis()%>"></script>
<script src="<%request.getContextPath();%>/static/js/swiper.js"></script>
<script src="<%request.getContextPath();%>/static/js/main.js?ver=<%=System.currentTimeMillis()%>"></script>

</body>
</html>