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

<c:import url="../header.jsp" charEncoding="UTF-8"/>

<div id="container">

    <!-- sub_top -->
    <div class="sub_top sub_top_member">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>회원사</span>
                    <span>자문위원</span>
                </div>
                <div class="sub_top_tit">자문위원</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">자문위원</div>
                <ul class="tabOptSel">
                    <li><a href="/member/ascdirectors.do">협회이사</a></li>
                    <li><a href="/member/adviser.do">고문위원</a></li>
                    <li class="active"><a href="/member/consultation.do">자문위원</a></li>
                    <li><a href="/member/regular.do">정회원</a></li>
                    <li><a href="/member/ascmembers.do">준회원</a></li>
                    <li><a href="/member/partnership.do">협력기관</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- member_list -->
    <div class="member_s padding_tb">
        <div class="inner">
            <span class="total" style="display: none;"></span>
            <ul class="member_list guide5">
                <%--<li>
                    <a href="/member/detailB.do">
                        <div class="img thumb34 thumbBox"><img src="<%request.getContextPath();%>/static/img/img_consultation.jpg" class="thumbImg"></div>
                        <div class="txt">
                            <div class="name">자문위원 이름</div>
                            <div class="info">
                                <p><span class="cont">자문위원 직책</span></p>
                            </div>
                        </div>
                    </a>
                </li>--%>
            </ul>

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
    <!-- //member_list -->


</div>

<c:import url="../footer.jsp" charEncoding="UTF-8"/>

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

<script src="<%request.getContextPath();%>/static/js/front/consultation.js?ver=<%=System.currentTimeMillis()%>"></script>
</body>
</html>