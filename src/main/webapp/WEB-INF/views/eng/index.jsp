<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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

    <%-- sweetalert CDN --%>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.7.5/dist/sweetalert2.min.css" rel="stylesheet">

    <link href="<%request.getContextPath();%>/static/css/reset.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/font.css" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/style.css?ver=<%=System.currentTimeMillis()%>" rel="stylesheet">
    <link href="<%request.getContextPath();%>/static/css/responsive.css" rel="stylesheet">
</head>

<body>
<%--<jsp:forward page="main.jsp"/>--%>

<script src="https://code.jquery.com/jquery-3.4.1.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        //실행내용
        window.location.href = '/eng/main.do';
    })
</script>

</body>
</html>