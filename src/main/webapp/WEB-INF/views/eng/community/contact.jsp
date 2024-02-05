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
    <div class="sub_top sub_top_comm">
        <div class="inner">
            <div class="sub_top_txt">
                <div class="sub_top_nav">
                    <span><img src="<%request.getContextPath();%>/static/img/icon_home.png"></span>
                    <span>Community</span>
                    <span>Contact us</span>
                </div>
                <div class="sub_top_tit">Contact us</div>
            </div>
            <div class="sub_top_tab">
                <div class="tabOptAct">Contact us</div>
                <ul class="tabOptSel">
                    <li><a href="/eng/community/notice.do">Notice</a></li>
                    <li><a href="/eng/community/news.do">SIPA-NEWS</a></li>
                    <li><a href="/eng/community/event.do">Event schedule</a></li>
                    <li class="active"><a href="/eng/community/contact.do">Contact us</a></li>
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
                    We look forward to your participation in the successful business of our partnership, regardless
                    of size.<br>
                    If you leave any questions and suggestions about the partnership, we will contact you after
                    reviewing it.
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
                        <div class="big">ADDRESS</div>
                        <div class="small">
                            (08378) 1103, 55, Digital-ro 34-gil,<br>
                            Guro-gu, Seoul, Republic of Korea
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="icon"><img src="<%request.getContextPath();%>/static/img/icon_contact_tel.png"></div>
                    <div class="txt">
                        <div class="big">TEL/FAX</div>
                        <div class="small">
                            TEL: 02-867-3637<br>
                            FAX: 02-867-3639
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
                        <div class="tit">01. Basic Information</div>
                        <div class="cmnt"><img src="<%request.getContextPath();%>/static/img/icon_contact_star.png">Required input</div>
                    </div>
                    <ul>
                        <li class="w50">
                            <div class="gubun req">Company Name</div>
                            <div class="input">
                                <input type="text" id="companyName" name="companyName" placeholder="Company Name">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">Country</div>
                            <div class="input">
                                <select id="country" name="country" style="width: 100%;"></select>
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">Industry</div>
                            <div class="input">
                                <input type="text" id="bizType" name="bizType" placeholder="Industry">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">Contact Name</div>
                            <div class="input">
                                <input type="text" id="chargePersonName" name="chargePersonName" placeholder="Contact Name">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">Position</div>
                            <div class="input">
                                <input type="text" id="position" name="position" placeholder="Position">
                            </div>
                        </li>
                        <li class="w50">
                            <div class="gubun req">Contact</div>
                            <div class="input">
                                <input type="tel" id="phone" name="phone" placeholder="Please enter numbers only." class="onlyTel">
                            </div>
                        </li>
                        <li class="w100">
                            <div class="gubun req">Email Address</div>
                            <div class="input">
                                <input type="email" id="email" name="email" placeholder="Email Address ex) xxxx@naver.com">
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="ct_input_box">
                <div class="ct_input_tit">
                    <div class="tit">02. Details of inquiry</div>
                </div>
                <ul>
                    <li class="w100">
                        <div class="gubun req">Content of inquiry</div>
                        <div class="input">
                            <textarea id="content" name="content" placeholder="Content of inquiry"></textarea>
                        </div>
                    </li>
                    <li class="w100">
                        <div class="gubun">Item</div>
                        <div class="input">
                            <label><input type="radio" name="visitRoute" value="Internet search">Internet search</label>
                            <label><input type="radio" name="visitRoute" value="Media">Media</label>
                            <label><input type="radio" name="visitRoute" value="Introduction of acquaintances">Introduction of acquaintances</label>
                            <label><input type="radio" name="visitRoute" value="Existing member companies">Existing member companies</label>
                            <label><input type="radio" name="visitRoute" value="Other">Other</label>
                        </div>
                    </li>
                    <li class="w100">
                        <!-- 약관 -->
                        <div class="privacy_box">
                            <div class="box">
                                <div class="box">
                                    The Smart Industry Promotion Association (hereinafter referred to as the "Company") values your personal information and complies with the Act on Promotion of Information and Communication Network Utilization and Information Protection.<br>
                                    The company will inform you of the purpose and method of the personal information provided by you through the privacy policy and what measures are being taken to protect your personal information.<br><br>

                                    <div class="privacy_tit">■ Personal Information Items to Collect</div>

                                    The company is collecting the following personal information for consultation and application for membership.<br><br>

                                    ο Collection items: Company name, region, type of business, name of person in charge, position, contact information, e-mail address<br>
                                    ο How to collect personal information: Home page form<br><br>

                                    <div class="privacy_tit">■ Purpose of collection and use of personal information</div>

                                    The company utilizes the collected personal information for the following purposes.<br><br>

                                    Statistics on identification, personal identification, age verification, communication of notices, use in marketing and advertising, frequency of access, or use of members' services according to the use of membership services<br><br>

                                    <div class="privacy_tit">■ Period of possession and use of personal information</div>

                                    After the purpose of collecting and using personal information has been achieved, the Company shall destroy such information without delay without exception.<br><br>

                                    <div class="privacy_tit">■ Procedures and methods for destroying personal information</div>

                                    In principle, the company destroys personal information without delay after the purpose of collecting and using it has been achieved. The procedure and method of destruction are as follows.<br><br>

                                    Procedure for destroying ο<br>
                                    The information you entered for membership registration, etc. is transferred to a separate DB after the purpose is achieved (a separate filing box for paper) and is stored for a certain period of time according to internal policies and other relevant laws and regulations (see retention and usage period).<br><br>

                                    Personal information transferred to a separate DB will not be used for any purpose other than being held unless it is by law.<br><br>

                                    Method of destroying ο<br>
                                    - Personal information stored in electronic file format is deleted using a technical method that cannot be reproduced.<br><br>

                                    <div class="privacy_tit">■ Provision of personal information</div>

                                    In principle, the company does not provide users' personal information to the outside world. However, exceptions are made in the following cases.<br>
                                    - If users have agreed in advance<br>
                                    - Where there is a request from an investigative agency in accordance with the provisions of laws and regulations or in accordance with the procedures and methods prescribed by laws and regulations for the purpose of investigation<br><br>

                                    <div class="privacy_tit">■ Matters concerning the installation and operation of an automatic personal information collection device and its refusal</div>

                                    The company operates cookies and more that store and find your information from time to time. A cookie is a tiny text file that the server that runs its website sends to your browser and is stored on your computer's hard disk. The company uses cookies for the following purposes.<br><br>

                                    ▶ Use of cookies, etc<br>
                                    - Provide target marketing and personalized services by analyzing access frequency and visit time, identifying user preferences and areas of interest, tracking self-travel, and identifying the degree of participation in various events and the number of visits<br><br>

                                    You have options for installing cookies. Therefore, you can allow all cookies by setting options on your web browser, go through checks whenever cookies are saved, or refuse to save all cookies.<br><br>

                                    ▶ How to deny cookie settings<br>
                                    For example, as a way to deny cookie settings, you can allow all cookies by selecting the options in your web browser, check every time you save cookies, or refuse to save all cookies.<br><br>

                                    Example of how to set up (for Internet Explorer)<br>
                                    : Tools at the top of your web browser > Internet Options > Privacy<br><br>

                                    However, if you refuse to install cookies, there may be difficulties in providing the service.<br><br>

                                    <div class="privacy_tit">■ Civil service regarding personal information</div>

                                    In order to protect the customer's personal information and to handle complaints related to personal information, the company has designated relevant departments and personal information management managers as follows.<br><br>

                                    Name of person in charge of personal information management: Kim Hye-kyung<br>
                                    Email: sipa@sipa.or.kr<br><br>

                                    You can report any personal information protection-related complaints to the person in charge of personal information management or the department in charge of using the company's services. The company will promptly and sufficiently respond to users' reports.<br><br>

                                    If you need to report or consult about other personal information infringement, please contact the following institution.<br>
                                    1. Personal Dispute Mediation Committee (www.1336.or.kr/1336)<br>
                                    2. Information Protection Mark Certification Committee (www.eprivacy.or.kr/02-580-0533 ~4)<br>
                                    3. Internet Crime Investigation Center of the Supreme Prosecutors' Office (http://icic.sppo.go.kr/02-3480-3600)<br>
                                    4. Cyber Terrorism Response Center of the National Police Agency (www.ctrc.go.kr/02-392-0330)
                                </div>
                            </div>
                        </div>
                        <!-- //약관 -->
                        <div class="input privacy">
                            <label><input type="checkbox" name="privateYn" value="Agree"><span class="txt_bold">Consent to
                                        Collection and Use of Personal Information</span></label>
                        </div>
                    </li>
                </ul>
            </div>

            </form>

            <div class="ct_input_btn">
                <a href="javascript:void(0);" onclick="f_community_contact_mail_send('EN');" class="btnSt01">Register</a>
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
<script src="<%request.getContextPath();%>/static/js/country.js"></script>
<script src="<%request.getContextPath();%>/static/js/swiper.js"></script>
<script src="<%request.getContextPath();%>/static/js/main.js?ver=<%=System.currentTimeMillis()%>"></script>

</body>
</html>