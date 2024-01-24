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
                    <li class="active"><a href="/support/bizanm.do">사업공고</a></li>
                    <li><a href="/support/bidanm.do">입찰공고</a></li>
                    <li><a href="/support/issue.do">Issue&Trend</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- support_list -->
    <div class="support_list padding_tb">
        <div class="inner">
            <form class="search_box" onsubmit="return false;">
                <select id="search_box">
                    <option value="NAME" selected>지원사업명</option>
                    <option value="ORG">사업수행기관</option>
                    <option value="CONTENT">내용</option>
                </select>
                <div class="input">
                    <input type="text" id="search_text" placeholder="검색어를 입력해주세요.">
                    <button type="button" onclick="bizanmList(1, '분야', '1')"><img src="<%request.getContextPath();%>/static/img/icon_search.png"></button>
                </div>
            </form>

            <ul class="sp_cate_icon">
                <li class="on">
                    <a class="cate" data-value="분야" onclick="f_bizanm_cate_search(this, '분야', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn01.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn01_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            분야<span class="count" id="fieldAllCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="금융" onclick="f_bizanm_cate_search(this, '금융', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn02.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn02_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            금융<span class="count" id="financeCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="기술" onclick="f_bizanm_cate_search(this, '기술', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn03.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn03_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            기술<span class="count" id="skillCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="인력" onclick="f_bizanm_cate_search(this, '인력', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn04.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn04_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            인력<span class="count" id="manPowerCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="수출" onclick="f_bizanm_cate_search(this, '수출', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn05.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn05_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            수출<span class="count" id="exportCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="내수" onclick="f_bizanm_cate_search(this, '내수', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn06.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn06_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            내수<span class="count" id="domesticCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="경영" onclick="f_bizanm_cate_search(this, '경영', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn07.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn07_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            경영<span class="count" id="mngCnt"></span>
                        </div>
                    </a>
                </li>
                <li>
                    <a class="cate" data-value="기타" onclick="f_bizanm_cate_search(this, '기타', '0')" style="cursor: pointer">
                        <div class="icon">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn08.png">
                            <img src="<%request.getContextPath();%>/static/img/icon_bizamn08_on.png" class="imgOn">
                        </div>
                        <div class="txt">
                            기타<span class="count" id="etcCnt"></span>
                        </div>
                    </a>
                </li>
            </ul>

            <div class="sp_list_box board_list_box">
                <span class="total" style="display: none;"></span>
                <ul class="thead">
                    <li>
                        <div class="number">번호</div>
                        <div class="cate">지원분야</div>
                        <div class="tit">지원사업명</div>
                        <div class="period">신청기간</div>
                        <div class="agency">사업수행기관</div>
                        <div class="date">등록일</div>
                    </li>
                </ul>
                <ul class="tbody">
                    <%--<li>
                        <div class="number">15</div>
                        <div class="cate">기술</div>
                        <div class="tit" onclick="location.href='/support/bizanm/detail.do'">2023 산업통상자원부-에너지 공기업 기술나눔 연장 공고</div>
                        <div class="period"><span>2023.08.04</span><span>- 2023.09.11</span></div>
                        <div class="agency">산업통상자원부</div>
                        <div class="date">2023.08.03</div>
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

<script src="<%request.getContextPath();%>/static/js/front/bizanm.js?ver=<%=System.currentTimeMillis()%>"></script>

</body>
</html>