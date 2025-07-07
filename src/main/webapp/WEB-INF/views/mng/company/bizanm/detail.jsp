<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri ="http://java.sun.com/jsp/jstl/functions" prefix = "fn" %>
<!DOCTYPE html>
<!--
Author: Keenthemes
Product Name: Metronic
Product Version: 8.1.8
Purchase: https://1.envato.market/EA4JP
Website: http://www.keenthemes.com
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Dribbble: www.dribbble.com/keenthemes
Like: www.facebook.com/keenthemes
License: For each use you must have a valid license purchased only from above link in order to legally use the theme for your project.
-->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<!--begin::Head-->
<head>
    <base href="/mng/"/>
    <title>SIPA 스마트산업진흥협회 관리자</title>
    <meta charset="utf-8"/>
    <meta name="description" content="SIPA 스마트산업진흥협회 홈페이지"/>
    <meta name="keywords" content="SIPA"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta property="og:locale" content="ko_KR"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="SIPA"/>
    <meta property="og:url" content="https://sipa.or.kr/main.do"/>
    <meta property="og:site_name" content="2024 SIPA | 스마트산업진흥협회"/>
    <link rel="canonical" href="https://sipa.or.kr/main.do"/>

    <!-- 캐시를 바로 만료시킴. -->
    <meta http-equiv="Expires" content="-1" />

    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.0) -->
    <meta http-equiv="Pragma" content="no-cache" />

    <!-- 페이지 로드시마다 페이지를 캐싱하지 않음. (HTTP 1.1) -->
    <meta http-equiv="Cache-Control" content="no-cache" />

    <%-- favicon --%>
    <link rel="shortcut icon" href="<%request.getContextPath();%>/static/img/favicon.ico" type="image/x-icon" sizes="16X16" />
    <link rel="icon" href="<%request.getContextPath();%>/static/img/favicon.ico" type="image/x-icon" sizes="16X16" />

    <!--begin::Fonts(mandatory for all pages)-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"/>
    <!--end::Fonts-->
    <!--begin::Vendor Stylesheets(used for this page only)-->

    <link href="<%request.getContextPath();%>/static/assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css"/>
    <!--end::Vendor Stylesheets-->
    <!--begin::Global Stylesheets Bundle(mandatory for all pages)-->
    <link href="<%request.getContextPath();%>/static/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css"/>
    <link href="<%request.getContextPath();%>/static/assets/css/style.bundle.css" rel="stylesheet" type="text/css"/>
    <!--end::Global Stylesheets Bundle-->

    <!--begin::custom Mng css-->
    <link href="<%request.getContextPath();%>/static/css/mngStyle.css" rel="stylesheet" type="text/css"/>
    <!--end::custom Mng css-->
</head>
<!--end::Head-->
<!--begin::Body-->
<body id="kt_app_body" data-kt-app-layout="dark-sidebar" data-kt-app-header-fixed="true"
      data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true"
      data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true"
      data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" class="app-default">
<!--begin::Theme mode setup on page load-->
<script>var defaultThemeMode = "light";
var themeMode;
if (document.documentElement) {
    if (document.documentElement.hasAttribute("data-bs-theme-mode")) {
        themeMode = document.documentElement.getAttribute("data-bs-theme-mode");
    } else {
        if (localStorage.getItem("data-bs-theme") !== null) {
            themeMode = localStorage.getItem("data-bs-theme");
        } else {
            themeMode = defaultThemeMode;
        }
    }
    if (themeMode === "system") {
        themeMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-bs-theme", themeMode);
}</script>
<!--end::Theme mode setup on page load-->

<!--begin::login check-->
<c:if test="${status ne 'logon'}">
    <script>
        alert("로그인해 주세요.");
        location.href = '/mng/index.do';
    </script>
</c:if>

<c:if test="${status eq 'logon'}">

    <!--begin::App-->
    <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
        <!--begin::Page-->
        <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
            <!--begin::Header-->
            <div id="kt_app_header" class="app-header">
                <!--begin::Header container-->
                <div class="app-container container-fluid d-flex align-items-stretch justify-content-between"
                     id="kt_app_header_container">
                    <!--begin::Sidebar mobile toggle-->
                    <div class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
                        <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                            <i class="ki-duotone ki-abstract-14 fs-2 fs-md-1">
                                <span class="path1"></span>
                                <span class="path2"></span>
                            </i>
                        </div>
                    </div>
                    <!--end::Sidebar mobile toggle-->
                    <!--begin::Mobile logo-->
                    <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                        <a href="/mng/main.do" class="d-lg-none">
                            <img alt="Logo" src="<%request.getContextPath();%>/static/assets/media/logos/default-small.svg" class="h-30px"/>
                        </a>
                    </div>
                    <!--end::Mobile logo-->
                    <!--begin::Header wrapper-->
                    <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                         id="kt_app_header_wrapper">
                        <!--begin::Menu wrapper-->
                        <div class="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true"
                             data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}"
                             data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end"
                             data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true"
                             data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                             data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                            <!--begin::Menu-->
                            <div class="menu menu-rounded menu-column menu-lg-row my-5 my-lg-0 align-items-stretch fw-semibold px-2 px-lg-0"
                                 id="kt_app_header_menu" data-kt-menu="true">
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                     data-kt-menu-placement="bottom-start" class="menu-item here">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-title">게시판 관리</span>
                                        <span class="menu-arrow d-lg-none"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0">
                                        <!--begin:Pages menu-->
                                        <div class="menu-active-bg px-4 px-lg-0">
                                            <!--begin:Tabs nav-->
                                            <div class="d-flex w-100 overflow-auto">
                                                <ul class="nav nav-stretch nav-line-tabs fw-bold fs-6 p-0 p-lg-10 flex-nowrap flex-grow-1">
                                                    <!--begin:Nav item-->
                                                    <li class="nav-item mx-lg-1">
                                                        <a class="nav-link py-3 py-lg-6 text-active-primary" href="#"
                                                           data-bs-toggle="tab"
                                                           data-bs-target="#kt_app_header_menu_pages_board">게시판 관리</a>
                                                    </li>
                                                    <!--end:Nav item-->
                                                    <!--begin:Nav item-->
                                                    <li class="nav-item mx-lg-1">
                                                        <a class="nav-link py-3 py-lg-6 text-active-primary" href="#"
                                                           data-bs-toggle="tab"
                                                           data-bs-target="#kt_app_header_menu_pages_popup">팝업 관리</a>
                                                    </li>
                                                    <!--end:Nav item-->
                                                    <!--begin:Nav item-->
                                                    <li class="nav-item mx-lg-1">
                                                        <a class="nav-link py-3 py-lg-6 text-active-primary active" href="#"
                                                           data-bs-toggle="tab"
                                                           data-bs-target="#kt_app_header_menu_pages_company">기업지원</a>
                                                    </li>
                                                    <!--end:Nav item-->
                                                </ul>
                                            </div>
                                            <!--end:Tabs nav-->
                                            <!--begin:Tab content-->
                                            <div class="tab-content py-4 py-lg-8 px-lg-7">
                                                <!--begin:Tab pane-->
                                                <div class="tab-pane w-lg-300px" id="kt_app_header_menu_pages_board">
                                                    <!--begin:Row-->
                                                    <div class="row">
                                                        <!--begin:Col-->
                                                        <div class="col-lg-12 mb-6 mb-lg-0">
                                                            <!--begin:Row-->
                                                            <div class="row">
                                                                <!--begin:Col-->
                                                                <div class="col-lg-12">
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/board/notice.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">공지사항</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/board/sipaNews.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">SIPA-NEWS</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/board/event.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">행사 게시판</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/board/faq.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">FAQ</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                </div>
                                                                <!--end:Col-->
                                                            </div>
                                                            <!--end:Row-->
                                                        </div>
                                                        <!--end:Col-->
                                                    </div>
                                                    <!--end:Row-->
                                                </div>
                                                <!--end:Tab pane-->
                                                <!--begin:Tab pane-->
                                                <div class="tab-pane w-lg-300px" id="kt_app_header_menu_pages_popup">
                                                    <!--begin:Row-->
                                                    <div class="row">
                                                        <!--begin:Col-->
                                                        <div class="col-lg-12 mb-6 mb-lg-0">
                                                            <!--begin:Row-->
                                                            <div class="row">
                                                                <!--begin:Col-->
                                                                <div class="col-lg-12">
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/pop/popup.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">팝업 등록</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/pop/banner.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">배너 등록</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                </div>
                                                                <!--end:Col-->
                                                            </div>
                                                            <!--end:Row-->
                                                        </div>
                                                        <!--end:Col-->
                                                    </div>
                                                    <!--end:Row-->
                                                </div>
                                                <!--end:Tab pane-->
                                                <!--begin:Tab pane-->
                                                <div class="tab-pane w-lg-300px active" id="kt_app_header_menu_pages_company">
                                                    <!--begin:Row-->
                                                    <div class="row">
                                                        <!--begin:Col-->
                                                        <div class="col-lg-12 mb-6 mb-lg-0">
                                                            <!--begin:Row-->
                                                            <div class="row">
                                                                <!--begin:Col-->
                                                                <div class="col-lg-12">
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/company/bizanm.do"
                                                                           class="menu-link active">
                                                                            <span class="menu-title">사업공고</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/company/bidanm.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">입찰공고</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/company/issue.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">Issue&Trend</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                </div>
                                                                <!--end:Col-->
                                                            </div>
                                                            <!--end:Row-->
                                                        </div>
                                                        <!--end:Col-->
                                                    </div>
                                                    <!--end:Row-->
                                                </div>
                                                <!--end:Tab pane-->
                                            </div>
                                            <!--end:Tab content-->
                                        </div>
                                        <!--end:Pages menu-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                                     data-kt-menu-placement="bottom-start" class="menu-item">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-title">회원사</span>
                                        <span class="menu-arrow d-lg-none"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown p-0">
                                        <!--begin:Pages menu-->
                                        <div class="menu-active-bg px-4 px-lg-0">
                                            <!--begin:Tabs nav-->
                                            <div class="d-flex w-100 overflow-auto">
                                                <ul class="nav nav-stretch nav-line-tabs fw-bold fs-6 p-0 p-lg-10 flex-nowrap flex-grow-1">
                                                    <!--begin:Nav item-->
                                                    <li class="nav-item mx-lg-1">
                                                        <a class="nav-link py-3 py-lg-6 active text-active-primary" href="#"
                                                           data-bs-toggle="tab"
                                                           data-bs-target="#kt_app_header_menu_pages_membership">회원사 관리</a>
                                                    </li>
                                                    <!--end:Nav item-->
                                                </ul>
                                            </div>
                                            <!--end:Tabs nav-->
                                            <!--begin:Tab content-->
                                            <div class="tab-content py-4 py-lg-8 px-lg-7">
                                                <!--begin:Tab pane-->
                                                <div class="tab-pane active w-lg-125px" id="kt_app_header_menu_pages_membership">
                                                    <!--begin:Row-->
                                                    <div class="row">
                                                        <!--begin:Col-->
                                                        <div class="col-lg-12 mb-6 mb-lg-0">
                                                            <!--begin:Row-->
                                                            <div class="row">
                                                                <!--begin:Col-->
                                                                <div class="col-lg-12">
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/member/ascdirectors.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">협회이사</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/member/adviser.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">고문위원</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/member/consultation.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">자문위원</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/member/company.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">회원사</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                    <!--begin:Menu item-->
                                                                    <div class="menu-item p-0 m-0">
                                                                        <!--begin:Menu link-->
                                                                        <a href="/mng/member/partnership.do"
                                                                           class="menu-link">
                                                                            <span class="menu-title">협력기관</span>
                                                                        </a>
                                                                        <!--end:Menu link-->
                                                                    </div>
                                                                    <!--end:Menu item-->
                                                                </div>
                                                                <!--end:Col-->
                                                            </div>
                                                            <!--end:Row-->
                                                        </div>
                                                        <!--end:Col-->
                                                    </div>
                                                    <!--end:Row-->
                                                </div>
                                                <!--end:Tab pane-->
                                            </div>
                                            <!--end:Tab content-->
                                        </div>
                                        <!--end:Pages menu-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                            </div>
                            <!--end::Menu-->
                        </div>
                        <!--end::Menu wrapper-->
                        <!--begin::Navbar-->
                        <div class="app-navbar flex-shrink-0">
                            <!--begin::Search-->
                            <div class="app-navbar-item align-items-stretch ms-1 ms-md-3">
                                <!--begin::Search-->
                                <div id="kt_header_search" class="header-search d-flex align-items-stretch"
                                     data-kt-search-keypress="true" data-kt-search-min-length="2"
                                     data-kt-search-enter="enter" data-kt-search-layout="menu" data-kt-menu-trigger="auto"
                                     data-kt-menu-overflow="false" data-kt-menu-permanent="true"
                                     data-kt-menu-placement="bottom-end">
                                    <!--begin::Search toggle-->
                                    <div class="d-flex align-items-center" data-kt-search-element="toggle"
                                         id="kt_header_search_toggle">
                                        <div class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px">
                                            <i class="ki-duotone ki-magnifier fs-2 fs-lg-1">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                            </i>
                                        </div>
                                    </div>
                                    <!--end::Search toggle-->
                                    <!--begin::Menu-->
                                    <div data-kt-search-element="content"
                                         class="menu menu-sub menu-sub-dropdown p-7 w-325px w-md-375px">
                                        <!--begin::Wrapper-->
                                        <div data-kt-search-element="wrapper">
                                            <!--begin::Form-->
                                            <form data-kt-search-element="form" class="w-100 position-relative mb-3" autocomplete="off">
                                                <!--begin::Icon-->
                                                <i class="ki-duotone ki-magnifier fs-2 text-gray-500 position-absolute top-50 translate-middle-y ms-0">
                                                    <span class="path1"></span>
                                                    <span class="path2"></span>
                                                </i>
                                                <!--end::Icon-->
                                                <!--begin::Input-->
                                                <input type="text"
                                                       class="search-input form-control form-control-flush ps-10"
                                                       name="search" value="" placeholder="Search..."
                                                       data-kt-search-element="input"/>
                                                <!--end::Input-->
                                                <!--begin::Spinner-->
                                                <span class="search-spinner position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-1"
                                                      data-kt-search-element="spinner">
                                                    <span class="spinner-border h-15px w-15px align-middle text-gray-400"></span>
                                                </span>
                                                <!--end::Spinner-->
                                                <!--begin::Reset-->
                                                <span class="search-reset btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none"
                                                      data-kt-search-element="clear">
                                                    <i class="ki-duotone ki-cross fs-2 fs-lg-1 me-0">
                                                        <span class="path1"></span>
                                                        <span class="path2"></span>
                                                    </i>
                                                </span>
                                                <!--end::Reset-->
                                            </form>
                                            <!--end::Form-->
                                        </div>
                                        <!--end::Wrapper-->
                                    </div>
                                    <!--end::Menu-->
                                </div>
                                <!--end::Search-->
                            </div>
                            <!--end::Search-->
                            <!--begin::User menu-->
                            <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
                                <!--begin::Menu wrapper-->
                                <div class="cursor-pointer symbol symbol-30px symbol-md-40px"
                                     data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent"
                                     data-kt-menu-placement="bottom-end">
                                    <i class="ki-solid ki-user-square fs-2qx"></i>
                                </div>
                                <!--begin::User account menu-->
                                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                                     data-kt-menu="true">
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-3">
                                        <div class="menu-content d-flex align-items-center px-3">
                                            <!--begin::Avatar-->
                                            <div class="symbol symbol-50px me-5">
                                                <i class="ki-solid ki-user-square fs-3x"></i>
                                            </div>
                                            <!--end::Avatar-->
                                            <!--begin::Username-->
                                            <div class="d-flex flex-column">
                                                <div class="fw-bold d-flex align-items-center fs-5">${sessionScope.id}
                                                    <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">admin</span>
                                                </div>
                                                <a href="#" class="fw-semibold text-muted text-hover-primary fs-7">SIPA 관리자</a>
                                            </div>
                                            <!--end::Username-->
                                        </div>
                                    </div>
                                    <!--end::Menu item-->
                                    <!--begin::Menu separator-->
                                    <div class="separator my-2"></div>
                                    <!--end::Menu separator-->
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-5">
                                        <a href="javascript:logout();"
                                           class="menu-link px-5">Sign Out</a>
                                    </div>
                                    <!--end::Menu item-->
                                </div>
                                <!--end::User account menu-->
                                <!--end::Menu wrapper-->
                            </div>
                            <!--end::User menu-->
                            <!--begin::Header menu toggle-->
                            <div class="app-navbar-item d-lg-none ms-2 me-n2" title="Show header menu">
                                <div class="btn btn-flex btn-icon btn-active-color-primary w-30px h-30px"
                                     id="kt_app_header_menu_toggle">
                                    <i class="ki-duotone ki-element-4 fs-1">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                    </i>
                                </div>
                            </div>
                            <!--end::Header menu toggle-->
                        </div>
                        <!--end::Navbar-->
                    </div>
                    <!--end::Header wrapper-->
                </div>
                <!--end::Header container-->
            </div>
            <!--end::Header-->
            <!--begin::Wrapper-->
            <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
                <!--begin::Sidebar-->
                <div id="kt_app_sidebar" class="app-sidebar flex-column" data-kt-drawer="true"
                     data-kt-drawer-name="app-sidebar" data-kt-drawer-activate="{default: true, lg: false}"
                     data-kt-drawer-overlay="true" data-kt-drawer-width="225px" data-kt-drawer-direction="start"
                     data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
                    <!--begin::Logo-->
                    <div class="app-sidebar-logo pe-4 justify-content-center h-90px" id="kt_app_sidebar_logo">
                        <!--begin::Logo image-->
                        <a href="/mng/main.do">
                            <img alt="Logo" src="<%request.getContextPath();%>/static/img/logo_natural.png<%--/static/assets/media/logos/default-dark.svg--%>"
                                 class="h-45px app-sidebar-logo-default"/>
                            <img alt="Logo" src="<%request.getContextPath();%>/static/img/logo_natural.png<%--assets/media/logos/default-small.svg--%>"
                                 class="h-45px app-sidebar-logo-minimize"/>
                        </a>
                        <!--end::Logo image-->
                        <!--begin::Sidebar toggle-->
                        <div id="kt_app_sidebar_toggle"
                             class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                             data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body"
                             data-kt-toggle-name="app-sidebar-minimize">
                            <i class="ki-duotone ki-double-left fs-2 rotate-180">
                                <span class="path1"></span>
                                <span class="path2"></span>
                            </i>
                        </div>
                        <!--end::Sidebar toggle-->
                    </div>
                    <!--end::Logo-->
                    <!--begin::sidebar menu-->
                    <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
                        <!--begin::Menu wrapper-->
                        <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
                             data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto"
                             data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                             data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"
                             data-kt-scroll-save-state="true">
                            <!--begin::Menu-->
                            <div class="menu menu-column menu-rounded menu-sub-indention px-3" id="#kt_app_sidebar_menu"
                                 data-kt-menu="true" data-kt-menu-expand="false">
                                <!--begin:Menu item-->
                                <div class="menu-item pt-5">
                                    <!--begin:Menu content-->
                                    <div class="menu-content">
                                        <span class="menu-heading fw-bold text-uppercase fs-7">정보센터</span>
                                    </div>
                                    <!--end:Menu content-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-icon">
                                            <i class="ki-duotone ki-address-book fs-2">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                                <span class="path3"></span>
                                            </i>
                                        </span>
                                        <span class="menu-title">게시판 관리</span>
                                        <span class="menu-arrow"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-accordion">
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/board/notice.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">공지사항</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/board/sipaNews.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">SIPA-NEWS</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/board/event.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">행사 게시판</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/board/faq.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">FAQ</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-icon">
                                            <i class="ki-duotone ki-abstract-26 fs-2">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                                <span class="path3"></span>
                                                <span class="path4"></span>
                                                <span class="path5"></span>
                                            </i>
                                        </span>
                                        <span class="menu-title">팝업 관리</span>
                                        <span class="menu-arrow"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-accordion">
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/pop/popup.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">팝업 등록</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/pop/banner.do">
                                            <span class="menu-bullet">
                                                <span class="bullet bullet-dot"></span>
                                            </span>
                                                <span class="menu-title">배너 등록</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="click" class="menu-item menu-accordion hover show">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-icon">
                                            <i class="ki-duotone ki-file fs-2">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                                <span class="path3"></span>
                                                <span class="path4"></span>
                                                <span class="path5"></span>
                                            </i>
                                        </span>
                                        <span class="menu-title">기업지원</span>
                                        <span class="menu-arrow"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-accordion">
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link active" href="/mng/company/bizanm.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">사업공고</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/company/bidanm.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">입찰공고</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/company/issue.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">Issue&Trend</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div class="menu-item pt-5">
                                    <!--begin:Menu content-->
                                    <div class="menu-content">
                                        <span class="menu-heading fw-bold text-uppercase fs-7">회원사</span>
                                    </div>
                                    <!--end:Menu content-->
                                </div>
                                <!--end:Menu item-->
                                <!--begin:Menu item-->
                                <div data-kt-menu-trigger="click" class="menu-item menu-accordion">
                                    <!--begin:Menu link-->
                                    <span class="menu-link">
                                        <span class="menu-icon">
                                            <i class="ki-duotone ki-crown-2 fs-2">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                            </i>
                                        </span>
                                        <span class="menu-title">회원사 관리</span>
                                        <span class="menu-arrow"></span>
                                    </span>
                                    <!--end:Menu link-->
                                    <!--begin:Menu sub-->
                                    <div class="menu-sub menu-sub-accordion">
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/member/ascdirectors.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">협회이사</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/member/adviser.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">고문위원</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/member/consultation.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">자문위원</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/member/company.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">회원사</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                        <!--begin:Menu item-->
                                        <div class="menu-item">
                                            <!--begin:Menu link-->
                                            <a class="menu-link" href="/mng/member/partnership.do">
                                                <span class="menu-bullet">
                                                    <span class="bullet bullet-dot"></span>
                                                </span>
                                                <span class="menu-title">협력기관</span>
                                            </a>
                                            <!--end:Menu link-->
                                        </div>
                                        <!--end:Menu item-->
                                    </div>
                                    <!--end:Menu sub-->
                                </div>
                                <!--end:Menu item-->
                            </div>
                            <!--end::Menu-->
                        </div>
                        <!--end::Menu wrapper-->
                    </div>
                    <!--end::sidebar menu-->
                    <!--begin::Footer-->
                    <div class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6" id="kt_app_sidebar_footer">
                        <a href="https://sipa.or.kr/main.do"
                           class="btn btn-flex flex-center btn-primary overflow-hidden text-nowrap px-0 h-40px w-100"
                           data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-dismiss-="click"
                           title="홈페이지 바로가기" target="_blank">
                            <span class="btn-label">홈페이지</span>
                        </a>
                    </div>
                    <!--end::Footer-->
                </div>
                <!--end::Sidebar-->
                <!--begin::Main-->
                <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <!--begin::Content wrapper-->
                    <div class="d-flex flex-column flex-column-fluid">
                        <!--begin::Toolbar-->
                        <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
                            <!--begin::Toolbar container-->
                            <div id="kt_app_toolbar_container" class="app-container container-full d-flex flex-stack">
                                <!--begin::Page title-->
                                <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                    <!--begin::Title-->
                                    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                        사업공고</h1>
                                    <!--end::Title-->
                                    <!--begin::Breadcrumb-->
                                    <ul class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-muted">
                                            <a href="/mng/main.do" class="text-muted text-hover-primary">Home</a>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item">
                                            <span class="bullet bg-gray-400 w-5px h-2px"></span>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-muted">정보센터</li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item">
                                            <span class="bullet bg-gray-400 w-5px h-2px"></span>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-muted">기업지원</li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item">
                                            <span class="bullet bg-gray-400 w-5px h-2px"></span>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-muted">사업공고</li>
                                        <!--end::Item-->
                                    </ul>
                                    <!--end::Breadcrumb-->
                                </div>
                                <!--end::Page title-->
                                <!--begin::Actions-->
                                <div class="d-flex align-items-center gap-2 gap-lg-3">
                                    <!--begin::Filter menu-->
                                    <!--end::Filter menu-->
                                    <!--begin::Secondary button-->
                                    <!--end::Secondary button-->
                                    <!--begin::Primary button-->
                                    <!--end::Primary button-->
                                </div>
                                <!--end::Actions-->
                            </div>
                            <!--end::Toolbar container-->
                        </div>
                        <!--end::Toolbar-->
                        <!--begin::Content-->
                        <div id="kt_app_content" class="app-content flex-column-fluid">
                            <!--begin::Content container-->
                            <div id="kt_app_content_container" class="app-container container-full">
                                <!--begin::Basic info-->
                                <div class="card mb-5 mb-xl-10">
                                    <!--begin::form-->
                                    <form id="dataForm" method="post" onsubmit="return false;">
                                        <%--공지사항 ID 값--%>
                                        <input type="hidden" id="userSeq" name="seq" value="${info.seq}">
                                        <!--begin::Card header-->
                                        <div class="card-header border-0">
                                            <!--begin::Card title-->
                                            <div class="card-title m-0">
                                                <h3 class="fw-bold m-0">상세 정보</h3>
                                            </div>
                                            <!--end::Card title-->
                                        </div>
                                        <!--end::Card header-->
                                        <!--begin::Card body-->
                                        <div class="card-body border-top p-9">

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6 required">지원분야</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <!--begin::Select2-->
                                                    <select id="supportField" name="supportField" class="form-select form-select-solid" data-control="select2" aria-label="- 지원분야 -" data-placeholder="- 지원분야 -" data-allow-clear="true" data-hide-search="true">
                                                        <option></option>
                                                        <option value="" disabled>- 지원분야 -</option>
                                                        <option value="금융" <c:if test="${info.supportField eq '금융'}">selected</c:if> >금융</option>
                                                        <option value="기술" <c:if test="${info.supportField eq '기술'}">selected</c:if> >기술</option>
                                                        <option value="인력" <c:if test="${info.supportField eq '인력'}">selected</c:if> >인력</option>
                                                        <option value="수출" <c:if test="${info.supportField eq '수출'}">selected</c:if> >수출</option>
                                                        <option value="내수" <c:if test="${info.supportField eq '내수'}">selected</c:if> >내수</option>
                                                        <option value="경영" <c:if test="${info.supportField eq '경영'}">selected</c:if> >경영</option>
                                                        <option value="기타" <c:if test="${info.supportField eq '기타'}">selected</c:if> >기타</option>
                                                    </select>
                                                    <!--end::Select2-->
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6 required">지원사업명</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input type="text" id="supportBizName" name="supportBizName" class="form-control form-control-lg form-control-solid-bg" placeholder="지원사업명" value="${info.supportBizName}"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">상시 신청 여부 설정</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8 d-flex flex-wrap">
                                                    <div class="form-check form-check-custom form-check-lg mb-3 mr15">
                                                        <input class="form-check-input form-control-solid-bg"
                                                               type="checkbox" id="applyAlways" name="applyAlways"
                                                               <c:if test="${info.applyStartDate eq '-' and info.applyEndDate eq '-'}">checked</c:if>/>
                                                        <label class="form-check-label text-black" for="applyAlways">
                                                            상시 신청
                                                        </label>
                                                    </div>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <input type="hidden" id="preApplyStartDate" value="${info.applyStartDate}">
                                            <input type="hidden" id="preApplyEndDate" value="${info.applyEndDate}">

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6 required">신청시작일자</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input class="form-control form-control-solid" id="applyStartDate" name="applyStartDate" placeholder="신청시작일자"
                                                           <c:choose>
                                                               <c:when test="${info.applyStartDate eq '-' and info.applyEndDate eq '-'}">
                                                                   value="-"
                                                               </c:when>
                                                               <c:otherwise>
                                                                   value="${info.applyStartDate}"
                                                               </c:otherwise>
                                                           </c:choose>
                                                           readonly="readonly"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6 required">신청종료일자</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input class="form-control form-control-solid" id="applyEndDate" name="applyEndDate" placeholder="신청종료일자"
                                                            <c:choose>
                                                                <c:when test="${info.applyStartDate eq '-' and info.applyEndDate eq '-'}">
                                                                    value="-"
                                                                </c:when>
                                                                <c:otherwise>
                                                                    value="${info.applyEndDate}"
                                                                </c:otherwise>
                                                            </c:choose>
                                                           readonly="readonly"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6 required">사업수행기관</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input type="text" id="businessOrganization" name="businessOrganization" class="form-control form-control-lg form-control-solid-bg" placeholder="사업수행기관" value="${info.businessOrganization}"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">소관부처</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input type="text" id="ministryCompetent" name="ministryCompetent" class="form-control form-control-lg form-control-solid-bg" placeholder="소관부처" value="${info.ministryCompetent}"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">문의처</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input type="text" id="contactTel" name="contactTel" class="form-control form-control-lg form-control-solid-bg onlyTel" placeholder="문의처" value="${info.contactTel}"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <%
                                                pageContext.setAttribute("crcn", "\r\n");
                                                pageContext.setAttribute("br", "<br/>");
                                            %>

                                            <!--begin::Input group-->
                                            <div class="row mb-6 h-300px">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">사업개요</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <textarea id="businessOverview" name="businessOverview" class="form-control form-control-lg form-control-solid-bg mb-2 h-300px" placeholder="사업개요">${fn:replace(info.businessOverview,br,crcn)}</textarea>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6 h-300px">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">신청방법</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <textarea id="applyWay" name="applyWay" class="form-control form-control-lg form-control-solid-bg mb-2 h-300px" placeholder="신청방법">${fn:replace(info.applyWay,br,crcn)}</textarea>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6 h-375px">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">내용</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <div id="quill_editor_content" class="h-325px">${info.content}</div>
                                                    <input type="hidden" id="quill_content" name="content" value="<c:out value="${info.content}" escapeXml="true"/>">
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">공고 자세히 보기 링크</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <input type="text" id="applyDetailLink" name="applyDetailLink" class="form-control form-control-lg form-control-solid-bg" placeholder="https://" value="${info.applyDetailLink}"/>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->

                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">첨부파일</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <!--begin::Excel import-->
                                                    <a href="" class="btn btn-primary btn-active-light-primary ms-auto" data-bs-toggle="modal" data-bs-target="#kt_modal_file_upload">
                                                        <i class="ki-duotone ki-exit-up fs-2">
                                                            <span class="path1"></span>
                                                            <span class="path2"></span>
                                                        </i>첨부파일 업로드</a>
                                                    <!--end::Excel import-->
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->
                                            <!--begin::Input group-->
                                            <div class="row mb-6">
                                                <!--begin::Label-->
                                                <label class="col-lg-4 col-form-label fw-semibold fs-6">첨부파일 목록</label>
                                                <!--end::Label-->
                                                <!--begin::Col-->
                                                <div class="col-lg-8">
                                                    <ul id="uploadFileList">
                                                        <c:forEach var="file" items="${fileList}">
                                                            <li class="mb-4">
                                                                <c:set var="fileSrc" value="${fn:replace(file.fullFilePath, './tomcat/webapps','../../..')}" />
                                                                <c:if test="${not fn:contains(fileSrc, '.ai') and not fn:contains(fileSrc, '.pdf')}">
                                                                    <img src="${fileSrc}" class="w-350px mr10" style="border: 1px solid #009ef7"/>
                                                                </c:if>
                                                                <a href="/file/download.do?path=company/${file.folderPath}&fileName=${file.fullFileName}">${file.fileName}</a>
                                                                <input type="hidden" name="uploadFile" id="${file.id}" value="${file.fullFilePath}">
                                                                <button type="button" class="ml10" onclick="f_file_remove(this, '${file.id}')">
                                                                    <i class="ki-duotone ki-abstract-11">
                                                                        <i class="path1"></i>
                                                                        <i class="path2"></i>
                                                                    </i>
                                                                </button>
                                                            </li>
                                                        </c:forEach>
                                                    </ul>
                                                </div>
                                                <!--end::Col-->
                                            </div>
                                            <!--end::Input group-->
                                        </div>
                                        <!--end::Card body-->
                                    </form>
                                    <!--end::form-->
                                </div>
                                <!--end::Basic info-->
                                <!--begin::Basic info-->
                                <div class="card mb-5 mb-xl-10">
                                    <!--begin::Actions-->
                                    <div class="card-footer d-flex justify-content-between py-6 px-9">
                                        <div>
                                            <a href="/mng/company/bizanm.do" class="btn btn-info btn-active-light-info" id="kt_list_btn">목록</a>
                                        </div>
                                        <div>
                                            <button type="button" onclick="f_company_bizanm_modify_init_set('${info.seq}')" class="btn btn-danger btn-active-light-danger me-2">변경내용취소</button>
                                            <button type="button" onclick="f_company_bizanm_save('${info.seq}')" class="btn btn-primary btn-active-light-primary" id="kt_save_submit">변경내용저장</button>
                                        </div>
                                    </div>
                                    <!--end::Actions-->
                                </div>
                                <!--end::Basic info-->
                            </div>
                            <!--end::Content container-->
                        </div>
                        <!--end::Content-->
                    </div>
                    <!--end::Content wrapper-->

                    <!--begin::Footer-->
                    <div id="kt_app_footer" class="app-footer">
                        <!--begin::Footer container-->
                        <div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                            <!--begin::Copyright-->
                            <div class="text-dark order-2 order-md-1"></div>
                            <!--end::Copyright-->
                            <!--begin::Menu-->
                            <ul class="menu menu-gray-600 menu-hover-primary fw-semibold order-1"></ul>
                            <!--end::Menu-->
                        </div>
                        <!--end::Footer container-->
                    </div>
                    <!--end::Footer-->
                </div>
                <!--end:::Main-->
            </div>
            <!--end::Wrapper-->
        </div>
        <!--end::Page-->
    </div>
    <!--end::App-->

    <!--begin::Modal - 수정이력-->
    <div class="modal fade" id="kt_modal_file_upload" tabindex="-1" aria-hidden="true">
        <!--begin::Modal dialog-->
        <div class="modal-dialog modal-dialog-centered mw-1000px">
            <!--begin::Modal content-->
            <div class="modal-content">
                <!--begin::Modal header-->
                <div class="modal-header" style="background-color: #1e1e2d;">
                    <!--begin::Modal title-->
                    <h2 style="color: #FFFFFF;">첨부파일 업로드</h2>
                    <!--end::Modal title-->
                    <!--begin::Close-->
                    <div class="btn btn-sm btn-icon btn-active-color-primary" onclick="modalClose('attachFile')" data-bs-dismiss="modal">
                        <i class="ki-duotone ki-cross fs-1">
                            <span class="path1"></span>
                            <span class="path2"></span>
                        </i>
                    </div>
                    <!--end::Close-->
                </div>
                <!--end::Modal header-->
                <!--begin::Modal body-->
                <div class="modal-body py-lg-10 px-lg-10">
                    <!--begin::form-->
                    <form id="modal_file_upload_form" method="post" onsubmit="return false;">
                        <!--begin::Input group-->
                        <div class="row mb-6">
                            <!--begin::Label-->
                            <label class="col-lg-4 col-form-label required fw-semibold fs-6">File</label>
                            <!--end::Label-->
                            <!--begin::Col-->
                            <div class="col-lg-8">
                                <!--begin::Row-->
                                <div class="row">
                                    <!--begin::Col-->
                                    <div class="col-lg-8 d-inline-block">
                                        <input type="text" name="attachFile" class="form-control form-control-lg form-control-solid-bg upload_name" placeholder="파일명.확장자" disabled/>
                                    </div>
                                    <!--end::Col-->
                                    <!--begin::Col-->
                                    <div class="col-lg-3 d-inline-block ms-3">
                                        <input type="file" id="attachFileInput" name="file" class="d-none upload_hidden">
                                        <label class="btn btn-primary" for="attachFileInput">파일선택</label>
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <!--end::Row-->
                            </div>
                            <!--end::Col-->
                        </div>
                        <!--end::Input group-->
                    </form>
                    <!--end::form-->
                    <!--begin::Menu separator-->
                    <div class="separator my-6"></div>
                    <!--end::Menu separator-->
                    <!--begin::Col-->
                    <div class="col-lg-12 d-flex justify-content-center">
                        <!--begin::Col-->
                        <div>
                            <!--begin::Cancel-->
                            <a onclick="modalClose('attachFile')" class="btn btn-danger" data-bs-dismiss="modal">취소</a>
                            <!--end::Cancel-->
                        </div>
                        <!--end::Col-->
                        <!--begin::Col-->
                        <div class="ms-10">
                            <!--begin::File upload-->
                            <a onclick="f_attach_file_upload('${info.seq}','modal_file_upload_form','company/bizanm')" class="btn btn-primary">업로드</a>
                            <!--end::File upload-->
                        </div>
                        <!--end::Col-->
                    </div>
                    <!--end::Col-->
                </div>
                <!--end::Modal body-->
            </div>
            <!--end::Modal content-->
        </div>
        <!--end::Modal dialog-->
    </div>
    <!--end::Modal - 수정이력-->

    <!--begin::Scrolltop-->
    <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
        <i class="ki-duotone ki-arrow-up">
            <span class="path1"></span>
            <span class="path2"></span>
        </i>
    </div>
    <!--end::Scrolltop-->

    <!--begin::Javascript-->

    <script>var hostUrl = "<%request.getContextPath();%>/static/assets/";</script>
    <!--begin::Global Javascript Bundle(mandatory for all pages)-->
    <script src="<%request.getContextPath();%>/static/assets/plugins/global/plugins.bundle.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/scripts.bundle.js"></script>
    <!--end::Global Javascript Bundle-->
    <!--begin::Vendors Javascript(used for this page only)-->
    <script src="<%request.getContextPath();%>/static/assets/plugins/custom/datatables/datatables.bundle.js"></script>
    <!--end::Vendors Javascript-->
    <!--begin::Custom Javascript(used for this page only)-->
    <script src="<%request.getContextPath();%>/static/assets/js/custom/apps/ecommerce/catalog/tables.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/apps/ecommerce/catalog/quill-editor.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/widgets.bundle.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/widgets.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/apps/chat/chat.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/utilities/modals/upgrade-plan.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/utilities/modals/create-app.js"></script>
    <script src="<%request.getContextPath();%>/static/assets/js/custom/utilities/modals/users-search.js"></script>
    <!--end::Custom Javascript-->

    <!--begin::Custom Javascript(used for common page)-->
    <script src="<%request.getContextPath();%>/static/js/mngMain.js?ver=<%=System.currentTimeMillis()%>"></script>
    <script src="<%request.getContextPath();%>/static/js/mng/bizanm.js?ver=<%=System.currentTimeMillis()%>"></script>
    <!--end::Custom Javascript-->

    <!--end::Javascript-->

    <!--end::login check-->
</c:if>
</body>
<!--end::Body-->
</html>