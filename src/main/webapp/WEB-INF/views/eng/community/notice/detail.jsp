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

<c:import url="../../header.jsp" charEncoding="UTF-8"/>

<div id="container">

    <!-- sub_top -->
    <div class="sub_top sub_top_comm">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>Community</span>
                    <span>Notice</span>
                </div>
                <div class="sub_top_tit">Notice</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Notice</div>
                <ul class="tabOptSel">
                    <li class="active"><a href="/eng/community/notice.do">Notice</a></li>
                    <li ><a href="/eng/community/news.do">SIPA-NEWS</a></li>
                    <li><a href="/eng/community/event.do">Event schedule</a></li>
                    <li><a href="/eng/community/contact.do">Contact us</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- board_view -->
    <div class="board_view padding_tb">
        <div class="inner">

            <div class="board_view_box">
                <div class="board_view_top">
                    <div class="tit">${info.title}</div>
                    <div class="date">${fn:replace(fn:split(info.writeDate,' ')[0], '-', '.')}</div>
                </div>
                <div class="board_view_cont border_top_gray">
                    <c:choose>
                        <c:when test="${info.content ne null and info.content ne ''}">
                            ${info.content}
                        </c:when>
                        <c:otherwise>
                            -
                        </c:otherwise>
                    </c:choose>
                </div>
                <div class="board_view_info">
                    <div class="board_view_info_box">
                        <p class="gubun">Attachment</p>
                        <p class="txt">
                            <c:if test="${not empty fileList}">
                                <c:forEach var="fileInfo" items="${fileList}" begin="0" end="${fileList.size()}" step="1" varStatus="status">
                                    <a href="/file/download.do?path=board/${fileInfo.folderPath}&fileName=${fileInfo.fullFileName}" class="file">${fileInfo.fileName}</a>
                                </c:forEach>
                            </c:if>
                            <c:if test="${empty fileList}">
                                첨부파일 없음
                            </c:if>
                        </p>
                    </div>
                </div>
                <div class="board_view_btn">
                    <a href="/eng/community/notice.do">List</a>
                </div>
            </div>

        </div>
    </div>
    <!-- //board_view -->


</div>

<c:import url="../../footer.jsp" charEncoding="UTF-8"/>

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