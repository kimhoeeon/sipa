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
    <div class="sub_top sub_top_member">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>회원사</span>
                    <span>
                        <c:if test="${info.gbn eq 'G'}">
                            고문위원
                        </c:if>
                        <c:if test="${info.gbn eq 'J'}">
                            자문위원
                        </c:if>
                    </span>
                </div>
                <div class="sub_top_tit">
                    <c:if test="${info.gbn eq 'G'}">
                        고문위원
                    </c:if>
                    <c:if test="${info.gbn eq 'J'}">
                        자문위원
                    </c:if>
                </div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">
                    <c:if test="${info.gbn eq 'G'}">
                        고문위원
                    </c:if>
                    <c:if test="${info.gbn eq 'J'}">
                        자문위원
                    </c:if>
                </div>
                <ul class="tabOptSel">
                    <li><a href="/member/ascdirectors.do">협회이사</a></li>
                    <c:if test="${info.gbn eq 'G'}">
                        <li class="active"><a href="/member/adviser.do">고문위원</a></li>
                        <li><a href="/member/consultation.do">자문위원</a></li>
                    </c:if>
                    <c:if test="${info.gbn eq 'J'}">
                        <li><a href="/member/adviser.do">고문위원</a></li>
                        <li class="active"><a href="/member/consultation.do">자문위원</a></li>
                    </c:if>
                    <li><a href="/member/regular.do">정회원</a></li>
                    <li><a href="/member/ascmembers.do">준회원</a></li>
                    <li><a href="/member/partnership.do">협력기관</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- member_detail -->
    <div class="member_detail padding_tb">
        <div class="inner">

            <!-- member_detail_top -->
            <div class="member_dt_top">
                <div class="box">
                    <div class="name_box">${info.position} ${info.name}</div>
                    <div class="info_box">
                        <div class="img">
                            <div class="thumb34 thumbBox">
                                <c:if test="${representImageFileInfo.fullFilePath ne null and representImageFileInfo.fullFilePath ne ''}">
                                    <c:set var="representImageSrc" value="${fn:replace(representImageFileInfo.fullFilePath, './tomcat/webapps', '../../..')}" />
                                    <img src="${representImageSrc}" class="thumbImg thumbLogo">
                                </c:if>
                                <c:if test="${representImageFileInfo.fullFilePath eq null or representImageFileInfo.fullFilePath eq ''}">
                                    <img src="<%request.getContextPath();%>/static/img/img_adviser03.jpg" class="thumbImg thumbLogo">
                                </c:if>
                            </div>
                        </div>
                        <ul class="info">
                            <li>
                                <div class="gubun">협회직위</div>
                                <div class="cont">${info.position}</div>
                            </li>
                            <li>
                                <div class="gubun">성명</div>
                                <div class="cont">${info.name}</div>
                            </li>
                            <li>
                                <div class="gubun">소속기관</div>
                                <div class="cont">${info.organization}</div>
                            </li>
                            <li>
                                <div class="gubun">직위</div>
                                <div class="cont">${info.depart}</div>
                            </li>
                            <li>
                                <div class="gubun">홈페이지</div>
                                <div class="cont">
                                    <c:if test="${info.homepage ne null and info.homepage ne ''}">
                                        <a href="${info.homepage}" target="_blank">${info.homepage}</a>
                                    </c:if>
                                    <c:if test="${info.homepage eq null or info.homepage eq ''}">
                                        -
                                    </c:if>
                                </div>
                            </li>
                            <li>
                                <div class="gubun">연락처</div>
                                <div class="cont">
                                    <c:if test="${info.tel ne null and info.tel ne ''}">
                                        ${info.tel}
                                    </c:if>
                                    <c:if test="${info.tel eq null or info.tel eq ''}">
                                        -
                                    </c:if>
                                </div>
                            </li>
                            <li>
                                <div class="gubun">약력사항</div>
                                <div class="cont">
                                    <% pageContext.setAttribute("CRLF", "\r\n"); %>
                                    <% pageContext.setAttribute("LF", "\n"); %>
                                    <c:if test="${info.briefDescription ne null and info.briefDescription ne ''}">
                                        ${fn:replace(fn:replace(fn:escapeXml(info.briefDescription), CRLF, '<br/>'), LF, '<br/>')}
                                    </c:if>
                                    <c:if test="${info.briefDescription eq null or info.briefDescription eq ''}">
                                        -
                                    </c:if>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- //member_detail_top -->

            <!-- member_detail_btn -->
            <div class="member_dt_btn">
                <div class="box">
                    <div class="btn_box">
                        <c:if test="${info.gbn eq 'G'}">
                            <a href="/member/adviser.do" class="btnSt01">목록</a>
                        </c:if>
                        <c:if test="${info.gbn eq 'J'}">
                            <a href="/member/consultation.do" class="btnSt01">목록</a>
                        </c:if>
                    </div>
                </div>
            </div>
            <!-- //member_detail_btn -->

        </div>
    </div>
    <!-- //member_detail -->


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