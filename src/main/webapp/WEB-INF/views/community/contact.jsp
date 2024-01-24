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
    <div class="sub_top sub_top_comm">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>커뮤니티</span>
                    <span>Contact us</span>
                </div>
                <div class="sub_top_tit">Contact us</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Contact us</div>
                <ul class="tabOptSel">
                    <li><a href="/community/notice.do">공지사항</a></li>
                    <li><a href="/community/news.do">SIPA-NEWS</a></li>
                    <li><a href="/community/event.do">행사게시판</a></li>
                    <li class="active"><a href="/community/contact.do">Contact us</a></li>
                </ul>
            </div>
        </div>
    </div>
    <!-- //sub_top -->

    <!-- contact_top -->
    <div class="contact_top padding_tb">
        <div class="inner">
            <div class="ct_top_box">
                <div class="tit">Contact Us</div>
                <div class="txt">
                    규모에 관계없이 당사와의 파트너십을 통해 성공적인 비즈니스를 할 수 있는 귀사의 참여를 기다리고 있습니다.<br>
                    파트너십에 대한 문의 및 제안 내용을 남겨주시면 검토 후 연락 드리겠습니다.
                </div>
                <div class="email">sipa@sipa.or.kr</div>
            </div>
        </div>
    </div>
    <!-- //contact_top -->

    <!-- contact_info -->
    <div class="contact_top padding_b">
        <div class="inner">
            <div class="ct_info_box">
                <div class="box">
                    <div class="icon"><img src="<%request.getContextPath();%>/static/img/icon_contact_adress.png"></div>
                    <div class="txt">
                        <div class="big">주소</div>
                        <div class="small">
                            (08378) 서울특별시 구로구 디지털로 34길 55, 1103호<br>
                            (구로동, 코오롱싸이언스밸리2차)
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><img src="<%request.getContextPath();%>/static/img/icon_contact_tel.png"></div>
                    <div class="txt">
                        <div class="big">전화/팩스</div>
                        <div class="small">
                            전화: 02-867-3637<br>
                            팩스: 02-867-3639
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- //contact_info -->

    <!-- contact_input -->
    <div class="contact_input padding_b">
        <div class="inner">

            <form id="contactForm" onsubmit="return false;">

                <div class="ct_input_box">
                    <div class="ct_input_tit">
                        <div class="tit">01. 기본정보</div>
                        <div class="cmnt"><img src="<%request.getContextPath();%>/static/img/icon_contact_star.png">필수입력</div>
                    </div>
                    <ul>
                        <li class="w50">
                            <div class="gubun req">회사명</div>
                            <div class="input">
                                <input type="text" id="companyName" name="companyName" placeholder="회사명">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">지역</div>
                            <div class="input sido">
                                <select id="sido" name="sido"></select>
                                <select id="gugun" name="gugun"></select>
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">업종</div>
                            <div class="input">
                                <input type="text" id="bizType" name="bizType" placeholder="업종">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">담당자명</div>
                            <div class="input">
                                <input type="text" id="chargePersonName" name="chargePersonName" placeholder="담당자명">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">직위</div>
                            <div class="input">
                                <input type="text" id="position" name="position" placeholder="직위">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">연락처</div>
                            <div class="input">
                                <input type="tel" id="phone" name="phone" placeholder="하이픈(-) 자동입력" maxlength="13" class="onlyTel">
                            </div>
                        </li>
                        <li class="w100">
                            <div class="gubun req">이메일 주소</div>
                            <div class="input">
                                <input type="email" id="email" name="email" placeholder="이메일 주소 ex) xxxx@naver.com">
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="ct_input_box">
                <div class="ct_input_tit">
                    <div class="tit">02. 상세문의내용</div>
                </div>
                <ul>
                    <li class="w100">
                        <div class="gubun req">문의내용</div>
                        <div class="input">
                            <textarea id="content" name="content" placeholder="문의내용"></textarea>
                        </div>
                    </li>
                    <li class="w100">
                        <div class="gubun">방문경로</div>
                        <div class="input">
                            <label><input type="radio" name="visitRoute" value="인터넷 검색">인터넷 검색</label>
                            <label><input type="radio" name="visitRoute" value="언론매체">언론매체</label>
                            <label><input type="radio" name="visitRoute" value="지인소개">지인소개</label>
                            <label><input type="radio" name="visitRoute" value="기존 회원사">기존 회원사</label>
                            <label><input type="radio" name="visitRoute" value="기타">기타</label>
                        </div>
                    </li>
                    <li class="w100">
                        <!-- 약관 -->
                        <div class="privacy_box">
                            <div class="box">
                                '(사)스마트산업진흥협회'는 (이하 '회사'는) 고객님의 개인정보를 중요시하며, '정보통신망 이용촉진 및 정보보호'에 관한 법률을 준수하고 있습니다.<br>
                                회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.<br><br>


                                <div class="privacy_tit">■ 수집하는 개인정보 항목</div>
                                회사는 상담, 회원사 가입 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.<br><br>

                                ο 수집항목 : 회사명, 지역, 업종, 담당자명, 직위, 연락처, 이메일주소<br>
                                ο 개인정보 수집방법 : 홈페이지 양식<br><br>

                                <div class="privacy_tit">■ 개인정보의 수집 및 이용목적</div>
                                회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br><br>

                                회원제 서비스 이용에 따른 본인확인, 개인 식별 , 연령확인 , 고지사항 전달, 마케팅 및 광고에 활용, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계<br><br>

                                <div class="privacy_tit">■ 개인정보의 보유 및 이용기간</div>
                                회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다.<br><br>

                                <div class="privacy_tit">■ 개인정보의 파기절차 및 방법</div>
                                회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.<br><br>

                                ο 파기절차<br>
                                회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.<br><br>

                                별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.<br><br>

                                ο 파기방법<br>
                                - 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.<br><br>

                                <div class="privacy_tit">■ 개인정보 제공</div>
                                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.<br>
                                - 이용자들이 사전에 동의한 경우<br>
                                - 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우<br><br>


                                <div class="privacy_tit">■ 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항</div>
                                회사는 귀하의 정보를 수시로 저장하고 찾아내는 ‘쿠키(cookie)’ 등을 운용합니다.<br>
                                쿠키란 자사의 웹사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드디스크에 저장됩니다. 회사은(는) 다음과 같은 목적을 위해 쿠키를 사용합니다.<br><br>

                                ▶ 쿠키 등 사용 목적<br>
                                - 접속 빈도나 방문 시간 등을 분석, 이용자의 취향과 관심분야를 파악 및 자취 추적, 각종 이벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공<br><br>

                                귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.<br><br>

                                ▶ 쿠키 설정 거부 방법<br>
                                예: 쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹 브라우저의 옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.<br><br>

                                설정방법 예(인터넷 익스플로어의 경우)<br>
                                : 웹 브라우저 상단의 도구 > 인터넷 옵션 > 개인정보<br><br>

                                단, 귀하께서 쿠키 설치를 거부하였을 경우 서비스 제공에 어려움이 있을 수 있습니다.<br><br>

                                <div class="privacy_tit">■ 개인정보에 관한 민원서비스</div>
                                회사는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보관리책임자를 지정하고 있습니다.<br><br>

                                개인정보관리책임자 성명 : 김혜경<br>
                                이메일 : sipa@sipa.or.kr<br><br>

                                귀하께서는 회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자 혹은 담당부서로 신고하실 수 있습니다. 회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.<br><br>

                                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.<br>
                                1.개인분쟁조정위원회 (www.1336.or.kr/1336)<br>
                                2.정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)<br>
                                3.대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)<br>
                                4.경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
                            </div>
                        </div>
                        <!-- 약관 -->
                        <div class="input privacy">
                            <label><input type="checkbox" name="privateYn" value="동의"><span class="txt_bold">개인정보수집이용 동의</span></label>
                        </div>
                    </li>
                </ul>
            </div>

            </form>

            <div class="ct_input_btn">
                <a href="javascript:void(0);" onclick="f_community_contact_mail_send('KO');" class="btnSt01">문의하기</a>
            </div>

        </div>
    </div>
    <!-- //contact_input -->


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
<script src="<%request.getContextPath();%>/static/js/sido.js"></script>
<script src="<%request.getContextPath();%>/static/js/swiper.js"></script>
<script src="<%request.getContextPath();%>/static/js/main.js?ver=<%=System.currentTimeMillis()%>"></script>

</body>
</html>