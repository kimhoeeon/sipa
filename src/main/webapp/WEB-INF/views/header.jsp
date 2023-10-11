<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: slhge
  Date: 2023-06-12
  Time: 오전 11:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start':
                new Date().getTime(), event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NFTN7B47');</script>
    <!-- End Google Tag Manager -->

    <!-- swiper 외부 라이브러리 -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

    <%-- sweetalert CDN --%>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="<%request.getContextPath();%>/static/css/reset.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/font.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/style.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/responsive.css" rel="stylesheet">

</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NFTN7B47" ;
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
<!-- End Google Tag Manager (noscript) -->

<div id="header">

    <!-- header menu -->
    <div class="inner">
        <div class="hd_top">
            <div class="hd_top_left">
                <a href="https://www.ufi.org/" target="_blank">
                    <img src="<%request.getContextPath();%>/static/img/top_logo_01.png">
                </a>
                <a href="https://ifbso.com/" target="_blank">
                    <img src="<%request.getContextPath();%>/static/img/top_logo_02.png">
                </a>
                <a href="/board/newsletter.do" class="hd_top_sns">
                    <img src="<%request.getContextPath();%>/static/img/top_sns_n.png">
                </a>
                <a href="https://www.instagram.com/kibskintex/" target="_blank" class="hd_top_sns">
                    <img src="<%request.getContextPath();%>/static/img/top_sns_i.png">
                </a>
                <a href="https://www.facebook.com/boatshowgg/" target="_blank" class="hd_top_sns">
                    <img src="<%request.getContextPath();%>/static/img/top_sns_f.png">
                </a>
                <a href="https://www.youtube.com/c/KIBSKINTEX" target="_blank" class="hd_top_sns">
                    <img src="<%request.getContextPath();%>/static/img/top_sns_y.png">
                </a>
            </div>
            <h1 class="hd_logo">
                <a href="/">
                    <img src="<%request.getContextPath();%>/static/img/logo.png">
                </a>
            </h1>
            <div class="hd_top_right">
                <c:if test="${empty status}">
                    <a href="/login.do" class="login">LOGIN</a>
                </c:if>
                <c:if test="${not empty status}">
                    <a href="/logout.do" class="logout">LOGOUT</a>
                    <a href="javascript:void(0);" onclick="f_page_move('/mypage/index.do',{ id: '${sessionScope.id}' , transferYear:new Date().getFullYear() + 1 })" class="mypage">MYPAGE</a>
                </c:if>
                <a href="/eng/index.do" class="language">ENG</a>
                <a href="#a" class="m_menu">
                    <span>메뉴</span>
                </a>
            </div>
        </div>

        <div class="hd_nav">
            <div class="nav">
                <ul class="dept1">
                    <li>
                        <a href="/guide/notice.do"><span>KIBS 안내</span></a>
                        <ul class="dept2">
                            <li><a href="/guide/notice.do"><span>공지사항</span></a></li>
                            <li><a href="/guide/summary.do"><span>행사소개</span></a></li>
                            <li><a href="/guide/ready.do<%--/guide/program.do--%>"><span>2024 주요프로그램</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/exhibitor/guide.do"><span>참가업체</span></a>
                        <ul class="dept2">
                            <li><a href="/exhibitor/guide.do"><span>참가안내</span></a></li>
                            <li><a href="/apply/step01.do"><span>참가신청</span></a></li>
                            <li><a href="/exhibitor/login.do"><span>참가신청확인</span></a></li>
                            <li><a href="/exhibitor/faq.do"><span>FAQ</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/visitor/guide_off.do"><span>참관객</span></a>
                        <ul class="dept2">
                            <li><a href="/visitor/guide_off.do"><span>참관안내</span></a></li>
                            <li><a href="javascript:alert('지금은 사전등록 기간이 아닙니다.');<%--TODO : 참가신청 기간에 오픈 /visitor/apply.do--%>"><span>사전등록</span></a></li>
                            <li><a href="javascript:alert('지금은 사전등록 기간이 아닙니다.');<%--TODO : 참가신청 기간에 오픈 /visitor/login.do--%>"><span>참관신청확인</span></a></li>
                            <li><a href="/visitor/faq.do"><span>FAQ</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/board/gallery.do"><span>자료실</span></a>
                        <ul class="dept2">
                            <li><a href="/board/gallery.do"><span>갤러리</span></a></li>
                            <li><a href="/board/press.do"><span>기사 및 컬럼</span></a></li>
                            <li><a href="/board/history23.do"><span>지난 전시회</span></a></li>
                            <li><a href="/board/newsletter.do"><span>뉴스레터</span></a></li>
                            <li><a href="/board/bi.do"><span>KIBS BI</span></a></li>
                            <li><a href="/board/cerify.do"><span>인증 및 수상현황</span></a></li>
                            <li><a href="/board/award.do"><span>올해의 제품상</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/online/kibstv.do"><span>온라인 전시관</span></a>
                        <ul class="dept2">
                            <li><a href="/online/kibstv.do"><span>KIBS Tube</span></a></li>
                            <li><a href="/online/company.do"><span>참가기업 미리보기</span></a></li>
                            <li><a href="/online/product.do"><span>제품 검색하기</span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- header menu -->

    <!-- site map & mobile -->
    <div class="hd_site_map">
        <div class="site_map_box">
            <div class="site_map_top">
                <div class="site_map_top_btn">
                    <a href="/login.do" class="login">LOGIN</a>
                    <a href="/eng/index.do" class="language">ENG</a>
                </div>
                <div class="site_map_top_sns">
                    <a href="/board/newsletter.do" class="hd_top_sns">
                        <img src="<%request.getContextPath();%>/static/img/top_sns_n.png">
                    </a>
                    <a href="https://www.instagram.com/kibskintex/" target="_blank" class="hd_top_sns">
                        <img src="<%request.getContextPath();%>/static/img/top_sns_i.png">
                    </a>
                    <a href="https://www.facebook.com/boatshowgg/" target="_blank" class="hd_top_sns">
                        <img src="<%request.getContextPath();%>/static/img/top_sns_f.png">
                    </a>
                    <a href="https://www.youtube.com/c/KIBSKINTEX" target="_blank" class="hd_top_sns">
                        <img src="<%request.getContextPath();%>/static/img/top_sns_y.png">
                    </a>
                </div>
            </div>
            <div class="site_map_nav">
                <ul class="dept1">
                    <li>
                        <a href="/guide/notice.do"><span>KIBS 안내</span></a>
                        <ul class="dept2">
                            <li><a href="/guide/notice.do"><span>공지사항</span></a></li>
                            <li><a href="/guide/summary.do"><span>행사소개</span></a></li>
                            <li><a href="/guide/ready.do<%--/guide/program.do--%>"><span>2024 주요프로그램</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/exhibitor/guide.do"><span>참가업체</span></a>
                        <ul class="dept2">
                            <li><a href="/exhibitor/guide.do"><span>참가안내</span></a></li>
                            <li><a href="/apply/step01.do"><span>참가신청</span></a></li>
                            <li><a href="/exhibitor/login.do"><span>참가신청확인</span></a></li>
                            <li><a href="/exhibitor/faq.do"><span>FAQ</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/visitor/guide_off.do"><span>참관객</span></a>
                        <ul class="dept2">
                            <li>
                                <a href="/visitor/guide_off.do"><span>참관안내</span></a>
                                <ul class="dept3">
                                    <li><a href=""><span>온라인</span></a></li>
                                    <li><a href="/visitor/guide_off.do"><span>오프라인</span></a></li>
                                </ul>
                            </li>
                            <li><a href="javascript:alert('지금은 사전등록 기간이 아닙니다.');<%--TODO : 참가신청 기간에 오픈 /visitor/apply.do--%>"><span>사전등록</span></a></li>
                            <li><a href="javascript:alert('지금은 사전등록 기간이 아닙니다.');<%--TODO : 참가신청 기간에 오픈 /visitor/login.do--%>"><span>참관신청확인</span></a></li>
                            <li><a href="/visitor/faq.do"><span>FAQ</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/board/gallery.do"><span>자료실</span></a>
                        <ul class="dept2">
                            <li><a href="/board/gallery.do"><span>갤러리</span></a></li>
                            <li>
                                <a href="/board/press.do"><span>기사 및 컬럼</span></a>
                                <ul class="dept3">
                                    <li><a href="/board/press.do"><span>보도자료</span></a></li>
                                    <li><a href="/board/column.do"><span>컬럼</span></a></li>
                                </ul>
                            </li>
                            <li><a href="/board/history23.do"><span>지난 전시회</span></a></li>
                            <li><a href="/board/newsletter.do"><span>뉴스레터</span></a></li>
                            <li><a href="/board/bi.do"><span>KIBS BI</span></a></li>
                            <li><a href="/board/cerify.do"><span>인증 및 수상현황</span></a></li>
                            <li><a href="/board/award.do"><span>올해의 제품상</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/online/kibstv.do"><span>온라인 전시관</span></a>
                        <ul class="dept2">
                            <li><a href="/online/kibstv.do"><span>KIBS Tube</span></a></li>
                            <li><a href="/online/company.do"><span>참가기업 미리보기</span></a></li>
                            <li><a href="/online/product.do"><span>제품 검색하기</span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //site map & mobile -->

</div>
<!-- swiper 외부 라이브러리 -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
<script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.all.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery-1.9.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.cookie.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.ui.touch-punch.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/jquery.number.min.js"></script>
<script src="<%request.getContextPath();%>/static/js/script.js"></script>
<script src="<%request.getContextPath();%>/static/js/swiper.js"></script>
<script src="<%request.getContextPath();%>/static/js/main.js"></script>

</body>
</html>
