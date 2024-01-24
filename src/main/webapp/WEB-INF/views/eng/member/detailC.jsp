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
                    <span>Member</span>
                    <span>Associate Member</span>
                </div>
                <div class="sub_top_tit">Associate Member</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Associate Member</div>
                <ul class="tabOptSel">
                    <li><a href="/eng/member/ascdirectors.do">Board of Directors</a></li>
                    <li><a href="/eng/member/adviser.do">Adviser</a></li>
                    <li><a href="/eng/member/consultation.do">Consultant</a></li>
                    <li><a href="/eng/member/regular.do">Regular Member</a></li>
                    <li class="active"><a href="/eng/member/ascmembers.do">Associate Member</a></li>
                    <li><a href="/eng/member/partnership.do">Cooperative Organization</a></li>
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
                    <div class="name_box">${info.companyName}</div>
                    <div class="info_box">
                        <div class="img">
                            <div class="thumb169 thumbBox">
                                <c:choose>
                                    <c:when test = "${logoFileInfo ne null and logoFileInfo ne ''}">
                                        <c:set var="logoImgSrc" value="${fn:replace(logoFileInfo.fullFilePath, './tomcat/webapps', '../../..')}" />
                                        <img src="${logoImgSrc}" class="thumbImg" alt="logo_Image">
                                    </c:when>
                                    <c:otherwise>
                                        <img src="<%request.getContextPath();%>/static/img/img_nologo.jpg" alt="no_logo_Image">
                                    </c:otherwise>
                                </c:choose>
                            </div>
                        </div>
                        <ul class="info">
                            <li>
                                <div class="gubun">Representative</div>
                                <div class="cont">${info.companyCeo}</div>
                            </li>
                            <li>
                                <div class="gubun">Homepage</div>
                                <div class="cont">
                                    <a href="${info.companyHomepage}" target="_blank">${info.companyHomepage}</a>
                                </div>
                            </li>
                            <li>
                                <div class="gubun">Phone number</div>
                                <div class="cont">${info.companyTel}</div>
                            </li>
                            <li>
                                <div class="gubun">Address</div>
                                <div class="cont">${info.companyAddress}</div>
                            </li>
                            <li>
                                <div class="gubun">Business</div>
                                <div class="cont">${info.companyBusinessType}</div>
                            </li>
                            <li>
                                <div class="gubun">Production</div>
                                <div class="cont">${info.companyBusinessItem}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- //member_detail_top -->

            <!-- member_detail_box -->
            <div class="member_dt_box">
                <div class="box">
                    <div class="title_box"><span>Company</span></div>
                    <div class="cont_box">
                        <c:choose>
                            <c:when test = "${introFileInfo ne null and introFileInfo ne ''}">
                                <c:set var="introImgSrc" value="${fn:replace(introFileInfo.fullFilePath, './tomcat/webapps', '../../..')}" />
                                <img src="${introImgSrc}" alt="intro_image">
                            </c:when>
                            <c:otherwise>
                                <img src="<%request.getContextPath();%>/static/img/no_image.png" alt="no_intro_image">
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
            <!-- //member_detail_box -->

            <!-- member_detail_box -->
            <div class="member_dt_box">
                <div class="box">
                    <div class="title_box"><span>Business field</span></div>
                    <div class="cont_box">
                        <c:choose>
                            <c:when test = "${fieldFileInfo ne null and fieldFileInfo ne ''}">
                                <c:set var="fieldImgSrc" value="${fn:replace(fieldFileInfo.fullFilePath, './tomcat/webapps', '../../..')}" />
                                <img src="${fieldImgSrc}" alt="field_image">
                            </c:when>
                            <c:otherwise>
                                <img src="<%request.getContextPath();%>/static/img/no_image.png" alt="no_image">
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </div>
            <!-- //member_detail_box -->

            <!-- member_detail_btn -->
            <div class="member_dt_btn">
                <div class="box">
                    <div class="btn_box"><a href="/eng/member/ascdirectors.do" class="btnSt01">List</a></div>
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