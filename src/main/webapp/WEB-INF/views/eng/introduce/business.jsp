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
    <div class="sub_top sub_top_intd">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>Introduction</span>
                    <span>Business</span>
                </div>
                <div class="sub_top_tit">Business</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Business</div>
                <ul class="tabOptSel">
                    <li><a href="/eng/introduce/greeting.do">Greeting</a></li>
                    <li><a href="/eng/introduce/history.do">History</a></li>
                    <li><a href="/eng/introduce/vision.do">Vision</a></li>
                    <li class="active"><a href="/eng/introduce/business.do">Business</a></li>
                    <li><a href="/eng/introduce/way.do">Location</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- sub_bd_tit -->
    <div class="padding_t">
        <div class="inner">
            <div class="sub_bd_tit">
                <div class="box">
                    <div class="big">
                        SIPA is carrying out the following projects for<br>
                        the growth of Korean companies.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- //sub_bd_tit -->

    <!-- biz_img -->
    <div class="biz_img">
        <div class="inner">
            <div class="img_box radius15">
                <img src="<%request.getContextPath();%>/static/img/img_business01_eng.jpg" class="pc_img">
                <img src="<%request.getContextPath();%>/static/img/img_business01_m_eng.jpg" class="m_img">
            </div>
        </div>
    </div>
    <!-- //biz_img -->

    <!-- biz_list -->
    <div class="biz_list padding_b">
        <div class="inner">
            <ul class="biz_list_box">
                <li>
                    <div class="number">01</div>
                    <div class="txt">It supports domestic and foreign businesses of companies in the field of SMART INDUSTRY.</div>
                </li>
                <li>
                    <div class="number">02</div>
                    <div class="txt">It supports domestic and foreign businesses of companies in the field of SMART CITY.</div>
                </li>
                <li>
                    <div class="number">03</div>
                    <div class="txt">It supports domestic and foreign businesses of companies in the field of SMART GRID.</div>
                </li>
                <li>
                    <div class="number">04</div>
                    <div class="txt">It supports domestic and foreign businesses of companies in the field of DIGITAL GREEN INDUSTRY.</div>
                </li>
                <li>
                    <div class="number">05</div>
                    <div class="txt">It supports domestic and foreign businesses of companies in high-tech fields such as artificial intelligence, IoT, and robots.</div>
                </li>
                <li>
                    <div class="number">06</div>
                    <div class="txt">It supports the entry of other manufacturing industries into overseas markets.</div>
                </li>
            </ul>
        </div>
    </div>
    <!-- biz_list -->


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

</body>
</html>