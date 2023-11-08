"use strict";

// Class definition kt_exhibitor_table
let KTAppExhibitorMng = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[1, 'desc']],
            'columnDefs': [
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 0,
                    'render': function (data, type, row) { return renderCheckBoxCell(data, type, row); }
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderBadgeCell(data, type, row); }
                },
                {
                    'targets': 4,
                    'render': function (data, type, row) { return renderBoothTypeCell(data, type, row); }
                },
                {
                    'targets': 7,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'render': function (data, type, row) { return renderPrcTotalCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'render': function (data, type, row) { return renderDepositCell(data, type, row); }
                },
                {
                    'targets': 10,
                    'render': function (data, type, row) { return renderBalanceCell(data, type, row); }
                },
                {
                    'targets': 11,
                    'render': function (data, type, row) { return renderPrcYnCell(data, type, row); }
                },
                {
                    'targets': 14,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [2,5,6] }
            ],
            columns: [
                { data: '' },
                { data: 'rownum' }, //순번
                { data: 'seq'}, //SEQ
                { data: 'approvalStatus' }, //승인여부
                { data: 'boothType' }, //부스
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'companyName' }, //회사명
                { data: 'prcTotal' }, //총액
                { data: 'deposit' }, //선금
                { data: 'balance' }, //잔액
                { data: 'prcYn' }, //입금여부
                { data: 'taxYn' }, //세금계산서 발행여부
                { data: 'finalRegiDttm' }, //수정일
                { data: 'actions' }
            ]
        });
    }

    function renderCheckBoxCell(data, type, row){
        let renderHTML = '<div class="exhibitor_check form-check form-check-sm form-check-custom form-check-solid">' +
            '<input class="form-check-input" type="checkbox" value="'+ row.seq +'" data-value="' + row.companyNameKo  + ' / ' + row.companyNameEn + '"/>' +
            '</div>';
        return renderHTML;
    }

    function renderBoothTypeCell(data, type, row){
        let renderHTML = row.boothType;
        if(nvl(renderHTML,'') !== ''){
            renderHTML = renderHTML.toString().replaceAll(',','<br>');
        }else{
            renderHTML = '-';
        }
        return renderHTML;
    }

    function renderPrcYnCell(data, type, row){
        let renderHTML = '';
        let prcYn = row.prcYn;
        switch (prcYn){
            case '0':
                renderHTML = '미납';
                break;
            case '1':
                renderHTML = '참가비 납부';
                break;
            case '2':
                renderHTML = '50% 납부';
                break;
            case '3':
                renderHTML = '전액 납부';
                break;
            case '4':
                renderHTML = '완납(부대시설비)';
                break;
            default:
                break;
        }
        return renderHTML;
    }

    function renderBalanceCell(data, type, row){
        let renderHTML = Number(row.balance);
        return renderHTML.toLocaleString();
    }

    function renderDepositCell(data, type, row){
        let renderHTML = Number(row.deposit);
        return renderHTML.toLocaleString();
    }

    function renderPrcTotalCell(data, type, row){
        let renderHTML = Number(row.prcTotal);
        return renderHTML.toLocaleString();
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail_modal_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">수정이력</a>';
        renderHTML += '</div>';*/
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_select_login(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">이 업체로 로그인</a>';
        renderHTML += '</div>';*/
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_payment_info(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">결제정보</a>';
        renderHTML += '</div>';*/
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_remove(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    function renderBadgeCell(data, type, row){
        let approvalStatus = row.approvalStatus;
        let renderHTML = '';
        switch (approvalStatus){
            case '작성중':
            case '승인요청':
            case '참가승인':
                renderHTML += '<div class="badge badge-light-primary fw-bold">';
                break;
            default:
                renderHTML += '<div class="badge badge-light-danger fw-bold">';
                break;
        }
        renderHTML += approvalStatus;
        renderHTML += '</div>';
        return renderHTML;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = '<span class="fw-bold">';
        renderHTML += '<a href="/mng/exhibitor/participant/company/detail.do?seq=' + row.seq + '"';
        renderHTML += 'class="text-gray-800 text-hover-primary fs-5 fw-bold text-decoration-none">';
        renderHTML += companyNameKo + '<br>' + companyNameEn;
        renderHTML += '</a>';
        renderHTML += '</span>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 1, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_exhibitor_search();
        }
    };
}();

let KTAppVisitorMng = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) { return renderVisitorGbnCell(data, type, row); }
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderJoinYnCell(data, type, row); }
                },
                {
                    'targets': 5,
                    'render': function (data, type, row) { return renderEmailCell(data, type, row); }
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,6] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'id'}, //id
                { data: 'visitorGbn' }, //구분
                { data: 'joinYn' }, //참석여부
                { data: 'name' }, //이름
                { data: 'email' }, //이메일
                { data: 'domain' }, //도메인
                { data: 'phone' }, //휴대전화
                { data: 'tel' }, //전화번호
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderJoinYnCell(data, type, row){
        let joinYn = row.joinYn;
        let renderHTML = '참석신청';
        if(joinYn === "CHECK"){
            renderHTML = '참석확인';
        }else if(joinYn === "CANCEL"){
            renderHTML = '참석취소';
        }else if(joinYn === "REMOVE"){
            renderHTML = '삭제';
        }
        return renderHTML;
    }

    function renderVisitorGbnCell(data, type, row){
        let visitorGbn = row.visitorGbn;
        let renderHTML = '개인';
        if(visitorGbn === "GROUP"){
            renderHTML = '단체';
        }
        return renderHTML;
    }

    function renderEmailCell(data, type, row){
        let email = row.email;
        let domain = row.domain;
        let renderHTML = email + '@' + domain;
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">수정하기</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_remove(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_participant_visitor_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_participant_visitor_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 조회 */
            f_participant_visitor_search();
        }
    };
}();

let KTAppMemberMng = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 12 }, // Disable ordering on column 11 (기능)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_member_mng_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppExhibitorTransferCompany = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 5,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,3,4] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //SEQ
                { data: 'transferYear' }, //연도
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'companyName' }, //회사명
                { data: 'initRegiDttm' }, //등록일
                { data: 'finalRegiDttm' }, //등록일
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_transfer_company_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = '<span class="fw-bold">';
        renderHTML += '<a href="/mng/exhibitor/transfer/company/detail.do?seq=' + row.seq + '"';
        renderHTML += 'class="text-gray-800 text-hover-primary fs-5 fw-bold">';
        renderHTML += companyNameKo + '<br>' + companyNameEn;
        renderHTML += '</a>';
        renderHTML += '</span>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_transfer_company_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_transfer_company_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_transfer_company_search();
        }
    };
}();

let KTAppExhibitorTransferVisitor = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 6 }, // Disable ordering on column 6 (기능)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_transfer_visitor_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppExhibitorApplicationBooth = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 4,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderBoothTypeCell(data, type, row); }
                },
                {
                    'targets': 5,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderBoothCntCell(data, type, row); }
                },
                {
                    'targets': 6,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderBoothPrcCell(data, type, row); }
                },
                {
                    'targets': 7,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderDiscountTypeCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderDiscountPrcCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderBoothPrcSumCell(data, type, row); }
                },
                {
                    'targets': 12,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,3,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //seq
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'boothType' }, //부스타입
                { data: 'boothCnt' }, //부스수량
                { data: 'boothPrc' }, //부스가격
                { data: 'discountType' }, //할인타입
                { data: 'discountPrc' }, //할인가격
                { data: 'boothPrcSum' }, //부스신청 총액
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' },
                { data: 'registrationCnt' }, //등록비 수량
                { data: 'registrationFee' }, //등록비 금액
                { data: 'standAloneBoothCnt' }, //독립부스 수량
                { data: 'standAloneBoothFee' }, //독립부스 금액
                { data: 'assemblyBoothCnt' }, //조립부스 수량
                { data: 'assemblyBoothFee' }, //조립부스 금액
                { data: 'onlineBoothCnt' }, //온라인부스 수량
                { data: 'onlineBoothFee' }, //온라인부스 금액
                { data: 'discountEarly1' }, //1차 조기신청
                { data: 'discountEarly2' }, //2차 조기신청
                { data: 'discountRe1' }, //재참가할인1
                { data: 'discountRe2' }, //재참가할인2
                { data: 'discountRe3' }, //재참가할인3
                { data: 'discountScale1' }, //규모할인1
                { data: 'discountScale2' }, //규모할인2
                { data: 'discountScale3' }, //규모할인3
                { data: 'discountFirst' } //첫 참가할인
            ]
        });
    }

    function renderBoothPrcSumCell(data, type, row){
        let renderHTML = Number(row.boothPrcSum);
        return renderHTML.toLocaleString();
    }

    function renderDiscountPrcCell(data, type, row){
        return ((parseInt(row.registrationFee) + parseInt(row.standAloneBoothFee) + parseInt(row.assemblyBoothFee) + parseInt(row.onlineBoothFee))
            - parseInt(row.boothPrcSum)).toLocaleString();
    }

    function renderDiscountTypeCell(data, type, row){
        let renderHTML = '';
        if(row.discountType != null && row.discountType !== ""){
            let discountType_arr = row.discountType.split(',');
            for(let i=0; i<discountType_arr.length; i++){
                renderHTML += discountType_arr[i];
                renderHTML += '<br>';
            }
            if(renderHTML.substring(renderHTML.length-4) === '<br>'){
                renderHTML = renderHTML.substring(0,renderHTML.length-4);
            }
        }else{
            renderHTML += '-';
        }
        return renderHTML;
    }

    function renderBoothPrcCell(data, type, row){
        return (parseInt(row.registrationFee) + parseInt(row.standAloneBoothFee) + parseInt(row.assemblyBoothFee) + parseInt(row.onlineBoothFee)).toLocaleString();
    }

    function renderBoothCntCell(data, type, row){
        return (parseInt(row.registrationCnt) + parseInt(row.standAloneBoothCnt) + parseInt(row.assemblyBoothCnt) + parseInt(row.onlineBoothCnt)).toString();
    }

    function renderBoothTypeCell(data, type, row){
        let renderHTML = '';
        if(row.boothType != null) {
            let boothType_arr = row.boothType.split(',');
            for (let i = 0; i < boothType_arr.length; i++) {
                let booth = boothType_arr[i];
                if (booth === '등록비') {
                    renderHTML += booth + ' (' + row.registrationCnt + ')';
                    renderHTML += '<br>';
                } else if (booth === '독립부스') {
                    renderHTML += booth + ' (' + row.standAloneBoothCnt + ')';
                    renderHTML += '<br>';
                } else if (booth === '조립부스') {
                    renderHTML += booth + ' (' + row.assemblyBoothCnt + ')';
                    renderHTML += '<br>';
                } else if (booth === '온라인부스') {
                    renderHTML += booth + ' (' + row.onlineBoothCnt + ')';
                }
            }
        }
        return renderHTML;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = '<span class="fw-bold">';
        renderHTML += '<a href="/mng/exhibitor/application/booth/detail.do?seq=' + row.seq + '"';
        renderHTML += 'class="text-gray-800 text-hover-primary fs-5 fw-bold">';
        renderHTML += companyNameKo + '<br>' + companyNameEn;
        renderHTML += '</a>';
        renderHTML += '</span>';
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_booth_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_booth_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_booth_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_booth_search();
        }
    };
}();

let KTAppExhibitorApplicationSign = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,3] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //seq
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'companySignNameKo' }, //상호간판명(국문)
                { data: 'companySignNameEn' }, //상호간판명(영문)
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = companyNameKo + '<br>' + companyNameEn;
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_sign_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_sign_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_sign_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_sign_search();
        }
    };
}();

let KTAppExhibitorApplicationUtility = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 18,
                    'render': function (data, type, row) { return renderUtilityGbnCell(data, type, row); }
                },
                {
                    'targets': 19,
                    'render': function (data, type, row) { return renderUtilityPrcSumCell(data, type, row); }
                },
                {
                    'targets': 22,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //seq
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'utilityJuganCnt' },
                { data: 'utilityJuganFee' },
                { data: 'utilityDayCnt' },
                { data: 'utilityDayFee' },
                { data: 'utilityCompressedAirCnt' },
                { data: 'utilityCompressedAirFee' },
                { data: 'utilityWaterBasicCnt' },
                { data: 'utilityWaterBasicFee' },
                { data: 'utilityInternetCnt' },
                { data: 'utilityInternetFee' },
                { data: 'utilityPytexNewCnt' },
                { data: 'utilityPytexNewFee' },
                { data: 'utilityPytexReCnt' },
                { data: 'utilityPytexReFee' },
                { data: 'utilityGbn' }, //구분
                { data: 'utilityPrcSum' }, //총액
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = companyNameKo + '<br>' + companyNameEn;
        return renderHTML;
    }

    function renderUtilityPrcSumCell(data, type, row){
        let renderHTML = Number(row.utilityPrcSum);
        return renderHTML.toLocaleString();
    }

    function renderUtilityGbnCell(data, type, row){
        let utilityType = '';

        let utilityJuganCnt = row.utilityJuganCnt;
        let utilityDayCnt = row.utilityDayCnt;
        let utilityCompressedAirCnt = row.utilityCompressedAirCnt;
        let utilityWaterBasicCnt = row.utilityWaterBasicCnt;
        let utilityInternetCnt = row.utilityInternetCnt;
        let utilityPytexNewCnt = row.utilityPytexNewCnt;
        let utilityPytexReCnt = row.utilityPytexReCnt;

        if(utilityJuganCnt > 0){ utilityType += ('주간 단상 220V' + ' (' + row.utilityJuganCnt + ')' + '<br>'); }
        if(utilityDayCnt > 0){ utilityType += ('24시간용 220V' + ' (' + row.utilityDayCnt + ')' + '<br>'); }
        if(utilityCompressedAirCnt > 0){ utilityType += ('압축공기 기본형' + ' (' + row.utilityCompressedAirCnt + ')' + '<br>'); }
        if(utilityWaterBasicCnt > 0){ utilityType += ('급배수 기본형' + ' (' + row.utilityWaterBasicCnt + ')' + '<br>'); }
        if(utilityInternetCnt > 0){ utilityType += ('인터넷' + ' (' + row.utilityInternetCnt + ')' + '<br>'); }
        if(utilityPytexNewCnt > 0){ utilityType += ('파이텍스(신품)' + ' (' + row.utilityPytexNewCnt + ')' + '<br>'); }
        if(utilityPytexReCnt > 0){ utilityType += ('파이텍스(재사용품)' + ' (' + row.utilityPytexReCnt + ')' + '<br>'); }

        if(utilityType.substring(utilityType.length-4) === '<br>'){
            utilityType = utilityType.substring(0,utilityType.length-4);
        }

        if(nvl(utilityType,"") === ""){
            utilityType = '-';
        }

        return utilityType;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_utility_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_utility_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_utility_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_utility_search();
        }
    };
}();

let KTAppExhibitorApplicationPass = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 5,
                    'render': function (data, type, row) { return renderPassNameCell(data, type, row); }
                },
                {
                    'targets': 6,
                    'render': function (data, type, row) { return renderPassNameEnCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'render': function (data, type, row) { return renderPassPositionKoCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'render': function (data, type, row) { return renderPassPositionEnCell(data, type, row); }
                },
                {
                    'targets': 10,
                    'render': function (data, type, row) { return renderPassNoteCell(data, type, row); }
                },
                {
                    'targets': 11,
                    'render': function (data, type, row) { return renderInitRegiDttmCell(data, type, row); }
                },
                {
                    'targets': 12,
                    'render': function (data, type, row) { return renderFinalRegiDttmCell(data, type, row); }
                },
                {
                    'targets': 13,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,2,4,7] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq' }, //업체seq
                { data: 'id' }, //id
                { data: 'companyNameko' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'passName' }, //성명(국문)
                { data: 'passFirstName' }, //이름(영문)
                { data: 'passLastName' }, //성(영문)
                { data: 'passPositionKo' }, //직책(국문)
                { data: 'passPositionEn' }, //직책(영문)
                { data: 'passNote' }, //비고
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderFinalRegiDttmCell(data, type, row){
        let finalRegiDttm = row.finalRegiDttm;
        if(nvl(finalRegiDttm,"") === ""){
            finalRegiDttm = '-';
        }
        return finalRegiDttm;
    }

    function renderInitRegiDttmCell(data, type, row){
        let initRegiDttm = row.initRegiDttm;
        if(nvl(initRegiDttm,"") === ""){
            initRegiDttm = '-';
        }
        return initRegiDttm;
    }

    function renderPassNoteCell(data, type, row){
        let passNote = row.passNote;
        if(nvl(passNote,"") === ""){
            passNote = '-';
        }
        return passNote;
    }

    function renderPassPositionEnCell(data, type, row){
        let passPositionEn = row.passPositionEn;
        if(nvl(passPositionEn,"") === ""){
            passPositionEn = '-';
        }
        return passPositionEn;
    }

    function renderPassPositionKoCell(data, type, row){
        let passPositionKo = row.passPositionKo;
        if(nvl(passPositionKo,"") === ""){
            passPositionKo = '-';
        }
        return passPositionKo;
    }

    function renderPassNameCell(data, type, row){
        let passName = row.passName;
        if(nvl(passName,"") === ""){
            passName = '-';
        }
        return passName;
    }

    function renderPassNameEnCell(data, type, row){
        let passFirstName = row.passFirstName;
        let passLastName = row.passLastName;
        let renderHTML = '';
        if(nvl(passFirstName,"") === "" || nvl(passLastName,"") === ""){
            renderHTML = '-';
        }else{
            renderHTML = passFirstName + ' ' + passLastName;
        }

        return renderHTML;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = companyNameKo + '<br>' + companyNameEn;
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_pass_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_pass_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_pass_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_pass_search();
        }
    };
}();

let KTAppExhibitorApplicationBuyer = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 5,
                    'render': function (data, type, row) { return renderCountryCell(data, type, row); }
                },
                {
                    'targets': 7,
                    'render': function (data, type, row) { return renderBuyerCompanyCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'render': function (data, type, row) { return renderBuyerNameCell(data, type, row); }
                },
                {
                    'targets': 11,
                    'render': function (data, type, row) { return renderEmailCell(data, type, row); }
                },
                {
                    'targets': 12,
                    'render': function (data, type, row) { return renderConnectionCell(data, type, row); }
                },
                {
                    'targets': 15,
                    'render': function (data, type, row) { return renderInitRegiDttmCell(data, type, row); }
                },
                {
                    'targets': 16,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,2,4,6,8,10,13,14] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq' }, //업체seq
                { data: 'id' }, //id
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'buyerCompanyCountry' }, //국가
                { data: 'buyerCompanyLocation' }, //소재지
                { data: 'buyerCompanyName' }, //바이어업체명
                { data: 'buyerCompanyHomepage' }, //바이어홈페이지
                { data: 'buyerCompanyDepart' }, //바이어부서
                { data: 'buyerCompanyPosition' }, //바이어직책
                { data: 'buyerCompanyEmail' }, //바이어이메일
                { data: 'buyerCompanyTel' }, //바이어전화번호
                { data: 'buyerCompanyPhone' }, //바이어휴대전화
                { data: 'buyerCompanyFax' }, //바이어Fax
                { data: 'initRegiDttm' }, //등록일시
                { data: 'actions' }
            ]
        });
    }

    function renderInitRegiDttmCell(data, type, row){
        let initRegiDttm = row.initRegiDttm;
        if(nvl(initRegiDttm,"") === ""){ initRegiDttm = '-'; }
        return initRegiDttm;
    }

    function renderEmailCell(data, type, row){
        let buyerCompanyEmail = row.buyerCompanyEmail;
        if(nvl(buyerCompanyEmail,"") === ""){ buyerCompanyEmail = '-'; }
        return buyerCompanyEmail;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        return companyNameKo + '<br>' + companyNameEn;
    }

    function renderCountryCell(data, type, row){
        let buyerCompanyCountry = row.buyerCompanyCountry;
        if(nvl(buyerCompanyCountry,"") === ""){ buyerCompanyCountry = '-'; }
        let buyerCompanyLocation = row.buyerCompanyLocation;
        if(nvl(buyerCompanyLocation,"") === ""){ buyerCompanyLocation = '-'; }
        return buyerCompanyCountry + ' / ' + buyerCompanyLocation;
    }

    function renderBuyerCompanyCell(data, type, row){
        let buyerCompanyName = row.buyerCompanyName;
        if(nvl(buyerCompanyName,"") === ""){ buyerCompanyName = '-'; }
        let buyerCompanyHomepage = row.buyerCompanyHomepage;
        if(nvl(buyerCompanyHomepage,"") === ""){ buyerCompanyHomepage = '-'; }
        return buyerCompanyName + '<br>' + '( ' + buyerCompanyHomepage + ' )';
    }

    function renderBuyerNameCell(data, type, row){
        let buyerCompanyDepart = row.buyerCompanyDepart;
        if(nvl(buyerCompanyDepart,"") === ""){ buyerCompanyDepart = '-'; }
        let buyerCompanyPosition = row.buyerCompanyPosition;
        if(nvl(buyerCompanyPosition,"") === ""){ buyerCompanyPosition = '-'; }
        return buyerCompanyDepart + ' / ' + buyerCompanyPosition;
    }

    function renderConnectionCell(data, type, row){
        let buyerCompanyTel = row.buyerCompanyTel;
        if(nvl(buyerCompanyTel,"") === ""){ buyerCompanyTel = '-'; }
        let buyerCompanyPhone = row.buyerCompanyPhone;
        if(nvl(buyerCompanyPhone,"") === ""){ buyerCompanyPhone = '-'; }
        let buyerCompanyFax = row.buyerCompanyFax;
        if(nvl(buyerCompanyFax,"") === ""){ buyerCompanyFax = '-'; }
        let renderHTML = '전화번호: ' + buyerCompanyTel + '<br>';
        renderHTML += '휴대전화: ' + buyerCompanyPhone + '<br>';
        renderHTML += 'FAX: ' + buyerCompanyFax;
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_buyer_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_buyer_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_buyer_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_buyer_search();
        }
    };
}();

let KTAppExhibitorApplicationGift = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 5,
                    'render': function (data, type, row) { return renderGiftGbnCell(data, type, row); }
                },
                {
                    'targets': 6,
                    'render': function (data, type, row) { return renderGiftCntCell(data, type, row); }
                },
                {
                    'targets': 7,
                    'render': function (data, type, row) { return renderGiftClassifyCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'render': function (data, type, row) { return renderGiftNameCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'render': function (data, type, row) { return renderPriceCell(data, type, row); }
                },
                {
                    'targets': 11,
                    'render': function (data, type, row) { return renderInitRegiDttmCell(data, type, row); }
                },
                {
                    'targets': 12,
                    'render': function (data, type, row) { return renderFinalRegiDttmCell(data, type, row); }
                },
                {
                    'targets': 13,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,2,4,10] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //업체seq
                { data: 'id'}, //seq
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'giftGbn' }, //구분
                { data: 'giftCnt' }, //수량
                { data: 'giftClassify' }, //분류
                { data: 'giftName' }, //;경품명
                { data: 'giftPrice' }, //소비자가
                { data: 'giftSponsorPrice' }, //협찬가
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderFinalRegiDttmCell(data, type, row){
        let finalRegiDttm = row.finalRegiDttm;
        if(nvl(finalRegiDttm,"") === ""){ finalRegiDttm = '-'; }
        return finalRegiDttm;
    }

    function renderInitRegiDttmCell(data, type, row){
        let initRegiDttm = row.initRegiDttm;
        if(nvl(initRegiDttm,"") === ""){ initRegiDttm = '-'; }
        return initRegiDttm;
    }

    function renderGiftNameCell(data, type, row){
        let giftName = row.giftName;
        if(nvl(giftName,"") === ""){ giftName = '-'; }
        return giftName;
    }

    function renderGiftClassifyCell(data, type, row){
        let giftClassify = row.giftClassify;
        if(nvl(giftClassify,"") === ""){ giftClassify = '-'; }
        return giftClassify;
    }

    function renderGiftCntCell(data, type, row){
        let giftCnt = row.giftCnt;
        if(nvl(giftCnt,"") === ""){ giftCnt = '-'; }
        return giftCnt;
    }

    function renderGiftGbnCell(data, type, row){
        let giftGbn = row.giftGbn;
        if(nvl(giftGbn,"") === ""){ giftGbn = '-'; }
        return giftGbn;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        return companyNameKo + '<br>' + companyNameEn;
    }

    function renderPriceCell(data, type, row){
        let giftPrice = row.giftPrice;
        if(nvl(giftPrice,"") === ""){ giftPrice = '-'; }else{giftPrice = Number(giftPrice);}
        let giftSponsorPrice = row.giftSponsorPrice;
        if(nvl(giftSponsorPrice,"") === ""){ giftSponsorPrice = '-'; }else{giftSponsorPrice = Number(giftSponsorPrice);}
        return giftPrice.toLocaleString() + ' / ' + giftSponsorPrice.toLocaleString();
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_gift_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_gift_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_gift_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_application_gift_search();
        }
    };
}();

let KTAppExhibitorApplicationBanner = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 8,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,2,4] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //seq
                { data: 'exhibitorSeq'}, //업체seq
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'content' }, //내용
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        let renderHTML = companyNameKo + '<br>' + companyNameEn;
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">상세/수정</a>';
        renderHTML += '</div>';
        /*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*/
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_banner_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_banner_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 조회 */
            f_application_banner_search();
        }
    };
}();

let KTAppExhibitorApplicationOnline = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': true,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) { return renderViewYnCell(data, type, row); }
                },
                {
                    'targets': 4,
                    'render': function (data, type, row) { return renderCompanyNameCell(data, type, row); }
                },
                {
                    'targets': 6,
                    'render': function (data, type, row) { return renderFieldPartCell(data, type, row); }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1,5] }
            ],
            columns: [
                { data: 'rownum' }, //순번
                { data: 'seq'}, //seq
                { data: 'companyOnlineViewYn'}, //온라인노출여부
                { data: 'transferYear'}, //참가년도
                { data: 'companyNameKo' }, //회사명(국문)
                { data: 'companyNameEn' }, //회사명(영문)
                { data: 'fieldPart' }, //참가분야
                { data: 'initRegiDttm' }, //등록일시
                { data: 'finalRegiDttm' }, //수정일시
                { data: 'actions' }
            ]
        });
    }

    function renderFieldPartCell(data, type, row){
        let fieldPart = row.fieldPart;
        let renderHTML = '';
        if(nvl(fieldPart,"") !== ""){
            renderHTML = fieldPart.toString().substring(0, fieldPart.toString().indexOf(' ('));
        }
        return renderHTML;
    }

    function renderViewYnCell(data, type, row){
        let companyOnlineViewYn = row.companyOnlineViewYn;
        let renderHTML = '';
        if(companyOnlineViewYn === 'Y'){
            renderHTML += '<div class="badge badge-light-primary fw-bold">';
            renderHTML += '노출';
            renderHTML += '</div>';
        }else{
            renderHTML += '<div class="badge badge-light-danger fw-bold">';
            renderHTML += '미노출';
            renderHTML += '</div>';
        }
        return renderHTML;
    }

    function renderCompanyNameCell(data, type, row){
        let companyNameKo = row.companyNameKo;
        let companyNameEn = row.companyNameEn;
        return companyNameKo + '<br>' + companyNameEn;
    }

    function renderActionsCell(data, type, row){
        //console.log(row.seq);
        let rowSeq = row.seq;
        /*let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_application_online_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3" style="color: #7e8299 !important;">상세/수정</a>';
        renderHTML += '</div>';
        /!*renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_exhibitor_detail(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3">참석확인</a>';
        renderHTML += '</div>';*!/
        renderHTML += '</div>';*/
        let renderHTML = '<a onclick="f_application_online_modify_init_set(' + '\'' + rowSeq + '\'' + ')" class="menu-link px-3 cursor-pointer text-decoration-none">';
        renderHTML += '<i class="ki-duotone ki-notepad-edit">';
        renderHTML += '<span class="path1"></span>';
        renderHTML += '<span class="path2"></span>';
        renderHTML += '</i>';
        renderHTML += ' 상세보기';
        renderHTML += '</a>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_exhibitor_application_online_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_exhibitor_application_online_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on( 'select', function ( e, dt, type, indexes ) {
                if ( type === 'row' ) {
                    let rowSeq = dataTbl.rows( indexes ).data().pluck( 'seq' )[0];
                    let onlineViewYnBtn = $('#online_view_yn_btn');
                    onlineViewYnBtn.attr('value', rowSeq);
                    let companyOnlineViewYn = dataTbl.rows( indexes ).data().pluck( 'companyOnlineViewYn' )[0];
                    onlineViewYnBtn.attr('data-view', companyOnlineViewYn);
                }
            } );

            dataTbl.on( 'deselect', function ( e, dt, type, indexes ) {
                if ( type === 'row' ) {
                    let onlineViewYnBtn = $('#online_view_yn_btn');
                    onlineViewYnBtn.removeAttr('value');
                    onlineViewYnBtn.removeAttr('data-view');
                }
            } );

            dataTbl.on('order.dt search.dt', function () {
                    let i = dataTbl.rows().count();
                    dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                        .every(function (cell) {
                            this.data(i--);
                        });
                })
                .draw();

            /* 조회 */
            f_application_online_search();
        }
    };
}();

let KTAppEventProductParticipant = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 13 }, // Disable ordering on column 13 (기능)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_event_product_participant_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppEventCompanyParticipant = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 9 }, // Disable ordering on column 9 (기능)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_event_company_participant_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppCenterBoardNewsletterKo = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': [2,3,4,5],
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'noticeGbn' },
                { data: 'gbn1' },
                { data: 'gbn2' },
                { data: 'gbn3' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_newsletter_ko_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_newsletter_ko_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_newsletter_ko_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_newsletter_ko_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_newsletter_ko_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_newsletter_ko_search();
        }
    };
}();

let KTAppCenterBoardNewsletterEn = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': [2,3,4,5],
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'noticeGbn' },
                { data: 'gbn1' },
                { data: 'gbn2' },
                { data: 'gbn3' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_newsletter_en_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_newsletter_en_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_newsletter_en_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_newsletter_en_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_newsletter_en_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 조회 */
            f_board_newsletter_en_search();
        }
    };
}();

let KTAppCenterBoardPress = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': [2,3,4,5],
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'noticeGbn' },
                { data: 'gbn1' },
                { data: 'gbn2' },
                { data: 'gbn3' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_press_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_press_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_press_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_press_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_press_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_press_search();
        }
    };
}();

let KTAppCenterBoardFaq = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'E') {
                            return '참가업체'
                        } else {
                            return '참관객'
                        }
                    }
                },
                {
                    'targets': 3,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'noticeGbn' },
                { data: 'lang' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_faq_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_faq_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_faq_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_faq_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_faq_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_faq_search();
        }
    };
}();

let KTAppCenterBoardColumn = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': [2,3,4],
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 10,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'gbn1' },
                { data: 'gbn2' },
                { data: 'gbn3' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_column_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_column_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_column_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_column_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_column_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_column_search();
        }
    };
}();

let KTAppCenterBoardBrochure = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': [2,3,4,5],
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'noticeGbn' },
                { data: 'gbn1' },
                { data: 'gbn2' },
                { data: 'gbn3' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_brochure_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_brochure_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_brochure_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_brochure_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_brochure_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 조회 */
            f_board_brochure_search();
        }
    };
}();

let KTAppCenterBoardDataroom = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === '1') {
                            return '홈페이지'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'siteGbn' },
                { data: 'mngYear' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_dataroom_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_dataroom_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_dataroom_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_dataroom_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_dataroom_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_dataroom_search();
        }
    };
}();

let KTAppCenterBoardGallery = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === '1') {
                            return '홈페이지'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'siteGbn' },
                { data: 'mngYear' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_gallery_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_gallery_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_gallery_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_gallery_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_gallery_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 조회 */
            f_board_gallery_search();
        }
    };
}();

let KTAppCenterBoardKibstv = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 3,
                    'render': function (data) {
                        if (data === '1') {
                            return '홈페이지'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'lang' },
                { data: 'siteGbn' },
                { data: 'category' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_kibstv_detail_modal_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_kibstv_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_kibstv_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_board_kibstv_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_board_kibstv_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_kibstv_search();
        }
    };
}();

let KTAppCenterPopupAdd = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'lang'},
                { data: 'useYn'},
                { data: 'title' },
                { data: 'publishedDate' },
                { data: 'expirationDate' },
                { data: 'initRegiDttm' },
                { data: 'finalRegiDttm' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let rowId = row.id;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_center_popup_modify_init_set(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_center_popup_remove(' + '\'' + rowId + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_popup_add_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_popup_add_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_center_popup_search();
        }
    };
}();

let KTAppCenterDocumentDownload = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 1 }, // Disable ordering on column 1 (유형)
                { orderable: false, targets: 7 }, // Disable ordering on column 7 (내려받기)
                { orderable: false, targets: 8 }, // Disable ordering on column 8 (삭제)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_document_download_table');

            if (!table) {
                return;
            }

            initDatatable();
            handleDeleteRows();
        }
    };
}();

let KTAppCenterEdmList = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data, type, row) { return renderTitleCell(data, type, row); }
                },
                {
                    'targets': 3,
                    'render': function (data, type, row) { return renderSendContentCell(data, type, row); }
                },
                {
                    'targets': 4,
                    'render': function (data, type, row){ return renderSendCntCell(data, type, row); }
                },
                {
                    'targets': 6,
                    'render': function (data, type, row) { return renderBadgeCell(data, type, row); }
                },
                {
                    'targets': 7,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'title'},
                { data: 'sendContent' },
                { data: 'sendCnt' },
                { data: 'sendDttm' },
                { data: 'sendResult' },
                { data: 'actions'}
            ]
        });
    }

    function renderTitleCell(data, type, row){
        let title = row.title;
        if(nvl(title,'') !== ''){
            if(title.length > 30){
                title = title.substring(0, 30) + '...';
            }
        }else{
            title = '-';
        }
        return title;
    }

    function renderSendContentCell(data, type, row){

        let sendContent = row.sendContent;

        let renderHTML = '';
        if(nvl(sendContent,'') !== ''){
            renderHTML = '<a class="text-gray-800 text-hover-primary fs-5 fw-bold text-decoration-none"';
            renderHTML += 'onclick="f_edm_send_content_set(\'' + sendContent + '\')" data-bs-toggle="modal" data-bs-target="#kt_modal_send_content" style="cursor: pointer;">';
            let reg = /<[^>]*>?/g;
            sendContent = sendContent.replaceAll(reg, '');
            if(sendContent.length > 40){
                sendContent = sendContent.substring(0, 40) + '...';
            }
        }else{
            sendContent = '-';
            renderHTML = '<a class="text-gray-800 text-hover-primary fs-5 fw-bold text-decoration-none"';
            renderHTML += 'onclick="f_edm_send_content_set(\'' + sendContent + '\')" data-bs-toggle="modal" data-bs-target="#kt_modal_send_content" style="cursor: pointer;">';
        }
        renderHTML += sendContent;
        renderHTML += '</a>';

        return renderHTML;
    }

    function renderSendCntCell(data, type, row){
        return row.sendCnt + ' 건';
    }

    function renderBadgeCell(data, type, row){
        let sendResult = row.sendResult; //성공:12 / 실패:0
        let sendSuc = sendResult.split(' / ')[0];
        let sendFail = sendResult.split(' / ')[1];
        let renderHTML = '';
        renderHTML += '<div class="badge badge-light-primary fw-bold mr10">';
        renderHTML += sendSuc;
        renderHTML += '</div>';
        renderHTML += '<div class="badge badge-light-danger fw-bold">';
        renderHTML += sendFail;
        renderHTML += '</div>';
        return renderHTML;
    }

    function renderActionsCell(data, type, row){
        let id = row.id;
        let renderHTML = '';
        renderHTML += '<a onclick="f_edm_hst_remove(' + '\'' + id + '\'' + ')" class="cursor-pointer">';
        renderHTML += '<i class="ki-solid ki-cross-square fs-2hx text-danger"></i>';
        renderHTML += '</a>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_edm_list_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_edm_list_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_edm_hst_search();
        }
    };
}();

let KTAppCenterEdmUploadList = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            "scrollY": "250px",
            "scrollCollapse": true,
            'order': [[0, 'asc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'id'},
                { data: 'email'},
                { data: 'name' },
                { data: 'phone' }
            ]
        });
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_center_edm_upload_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#kt_center_edm_upload_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);
        }
    };
}();

let KTAppRequestManagementList = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 5 }, // Disable ordering on column 5 (진행상황)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_request_management_list_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppRequestManagementAdd = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 5 }, // Disable ordering on column 5 (진행상황)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_request_management_add_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppRequestManagementQuestion = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            "info": false,
            'order': [],
            'pageLength': 10,
            'columnDefs': [
                //{ render: DataTable.render.number(',', '.', 2), targets: 4},
                // { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                { orderable: false, targets: 3 }, // Disable ordering on column 3 (기능)
            ]
        });

        // Re-init functions on datatable re-draws
        datatable.on('draw', function () {
            handleDeleteRows();
        });
    }

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    let handleSearchDatatable = () => {
        const filterSearch = document.querySelector('[data-kt-ecommerce-product-filter="search"]');
        filterSearch.addEventListener('keyup', function (e) {
            datatable.search(e.target.value).draw();
        });
    }

    // Handle status filter dropdown
    let handleStatusFilter = () => {
        const filterStatus = document.querySelector('[data-kt-ecommerce-product-filter="status"]');
        $(filterStatus).on('change', e => {
            let value = e.target.value;
            if(value === 'all'){
                value = '';
            }
            datatable.column(6).search(value).draw();
        });
    }

    // Delete cateogry
    let handleDeleteRows = () => {
        // Select all delete buttons
        const deleteButtons = table.querySelectorAll('[data-kt-ecommerce-product-filter="delete_row"]');

        deleteButtons.forEach(d => {
            // Delete button on click
            d.addEventListener('click', function (e) {
                e.preventDefault();

                // Select parent row
                const parent = e.target.closest('tr');

                // Get category name
                const productName = parent.querySelector('[data-kt-ecommerce-product-filter="product_name"]').innerText;

                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
                Swal.fire({
                    text: "Are you sure you want to delete " + productName + "?",
                    icon: "warning",
                    showCancelButton: true,
                    buttonsStyling: false,
                    confirmButtonText: "Yes, delete!",
                    cancelButtonText: "No, cancel",
                    customClass: {
                        confirmButton: "btn fw-bold btn-danger",
                        cancelButton: "btn fw-bold btn-active-light-primary"
                    }
                }).then(function (result) {
                    if (result.value) {
                        Swal.fire({
                            text: "You have deleted " + productName + "!.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        }).then(function () {
                            // Remove current row
                            datatable.row($(parent)).remove().draw();
                        });
                    } else if (result.dismiss === 'cancel') {
                        Swal.fire({
                            text: productName + " was not deleted.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn fw-bold btn-primary",
                            }
                        });
                    }
                });
            })
        });
    }


    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_request_management_question_table');

            if (!table) {
                return;
            }

            initDatatable();
            /*handleSearchDatatable();
            handleStatusFilter();
            handleDeleteRows();*/
        }
    };
}();

let KTAppParticipantCompanyList = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {

        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': true,
            'ordering': true,
            'order': [[0, 'asc']],
            columns: [
                { data: 'rownum' },
                { data: 'participantStatus' },
                { data: 'approvalStatus' },
                { data: 'cmpId' },
                { data: 'regiDttm' },
                { data: 'modifyDttm' },
                { data: 'compltDttm' }, //작성완료일
                { data: 'collectionType' }, // 수집 유형
                //{ data: 'collectionTypeInfo' }, // 수집 유형 상세
                { data: 'intentionStep' }, //의향 단계
                //{ data: 'intentionStepInfo' }, //의향 단계 상세
                { data: 'prePartYear' }, //기참가년도
                { data: 'businessStatusLarge1' }, //업태1 - 대분류
                { data: 'businessStatusMedium1' }, //업태1 - 중분류
                { data: 'businessStatusLarge2' }, //업태2 - 대분류
                { data: 'businessStatusMedium2' }, //업태2 - 중분류
                { data: 'businessStatusLarge3' }, //업태3 - 대분류
                { data: 'businessStatusMedium3' }, //업태3 - 중분류
                { data: 'businessType' }, //영위 사업
                { data: 'contactProgressYn' }, //컨택 진행 여부
                //{ data: 'contactProgressYnInfo' }, //컨택 진행 여부 상세
                { data: 'contactDttm' }, //컨택 일자
                { data: 'contactResult' }, //컨택 결과
                //{ data: 'contactResultInfo' }, //컨택 결과 상세
                { data: 'contactTargetName' }, //컨택 대상자 성명
                { data: 'contactTargetPhone' }, //컨택 대상자 연락처
                { data: 'contactResultDetail' }, //컨택 결과_세부 내용
                { data: 'depositStatus' }, //입금현황
                { data: 'taxStatus' }, //세금계산서현황
                { data: 'boothRequestSummary' }, //부스신청요약
                { data: 'discountRequestSummary' }, //할인신청요약
                { data: 'companyNameKo' }, //회사명(국)
                { data: 'companyNameEn' }, //회사명(영)
                { data: 'chargePersonNameKo' }, //담당자(국)
                { data: 'chargePersonNameEn' }, //담당자(영)
                { data: 'chargePersonTel' }, //담당자전화번호
                { data: 'chargePersonPhone' }, //담당자휴대전화
                { data: 'chargePersonFax' }, //담당자FAX
                { data: 'chargePersonEmail' }, //담당자이메일
                { data: 'taxChargePersonName' }, //세금계산서담당자
                { data: 'taxChargePersonEmail' }, //세금계산서담당자이메일
                { data: 'boothNumber' }, //부스번호
                { data: 'kintexAdmin' }, //킨텍스 관리자
                { data: 'memo' }, //메모
                { data: 'groupExhibition' }, //단체관
                { data: 'companyNameKo2' }, //회사명(국문)
                { data: 'companyNameEn2' }, //회사명(영문)
                { data: 'companyPostNumber' }, //우편번호
                { data: 'companyAddress' }, //주소
                { data: 'companyAddressDetail' }, //상세주소
                { data: 'companyAddressEn' }, //Address
                { data: 'companyCeo' }, //대표자
                { data: 'companyTel' }, //전화
                { data: 'companyHomepage' }, //홈페이지
                { data: 'companyFax' }, //Fax
                { data: 'companyLicense' }, //사업자등록증
                { data: 'companyLicenseNumber' }, //사업자등록번호
                { data: 'snsUrl' }, //SNS (주소기입)
                { data: 'snsBlog' }, //블로그
                { data: 'snsFacebook' }, //페이스북
                { data: 'snsInstagram' }, //인스타그램
                { data: 'snsTwiter' }, //트위터
                { data: 'snsLinkedin' }, //링크드인
                { data: 'snsEtc' }, //기타
                { data: 'name' }, //성명
                { data: 'position' }, //직위
                { data: 'depart' }, //부서
                { data: 'tel' }, //전화번호
                { data: 'phone' }, //휴대전화
                { data: 'email' }, //이메일
                { data: 'fieldPart1' }, //참가분야 요트·보트전 (Yacht & Boat World)
                { data: 'fieldPart2' }, //참가분야 무동력보트전 (Paddler’s World)
                { data: 'fieldPart3' }, //참가분야 워크보트전 (Workboat World)
                { data: 'fieldPart4' }, //참가분야 워터스포츠쇼 (Watersports Show)
                { data: 'fieldPart5' }, //참가분야 한국다이빙엑스포 (Korea Dive Expo)
                { data: 'fieldPart6' }, //참가분야 아웃도어·캠핑카쇼 (Outdoor·Caravan Show)
                { data: 'fieldPart7' }, //참가분야 아라마리나 해상 전시 (KIBS afloat)
                { data: 'fieldPart8' }, //참가분야 해양부품·안전·마리나산업전 (Marine Equipment, Safety & Marina Industry Show)
                { data: 'fieldPart9' }, //참가분야 친환경 특별전 (Eco Friendly Marine)
                { data: 'fieldPart10' }, //참가분야 한국해양관광전 (Marine Tourism)
                { data: 'fieldPartEn1' }, //참가분야 요트·보트전 (Yacht & Boat World)
                { data: 'fieldPartEn2' }, //참가분야 무동력보트전 (Paddler’s World)
                { data: 'fieldPartEn3' }, //참가분야 워크보트전 (Workboat World)
                { data: 'fieldPartEn4' }, //참가분야 워터스포츠쇼 (Watersports Show)
                { data: 'fieldPartEn5' }, //참가분야 한국다이빙엑스포 (Korea Dive Expo)
                { data: 'fieldPartEn6' }, //참가분야 아웃도어·캠핑카쇼 (Outdoor·Caravan Show)
                { data: 'fieldPartEn7' }, //참가분야 아라마리나 해상 전시 (KIBS afloat)
                { data: 'fieldPartEn8' }, //참가분야 해양부품·안전·마리나산업전 (Marine Equipment, Safety & Marina Industry Show)
                { data: 'fieldPartEn9' }, //참가분야 친환경 특별전 (Eco Friendly Marine)
                { data: 'fieldPartEn10' }, //참가분야 한국해양관광전 (Marine Tourism)
                { data: 'displayItem' }, //전시품목
                { data: 'displayBrand' }, //전시품목' },브랜드명
                { data: 'displayBoatCnt' }, //실물 보트수' },(단위:척)
                { data: 'exportMeetingY' }, //온라인 수출상담회 참가 참석
                { data: 'exportMeetingN' }, //온라인 수출상담회 참가 불참
                { data: 'companyIntroKo' }, //회사소개' },(국문)
                { data: 'companyIntroEn' }, //회사소개' },(영문)
                { data: 'kibsPurposeKo' }, //KIBS ' },참가목적' },(국문)
                { data: 'kibsPurposeEn' }, //KIBS ' },참가목적' },(영문)
                { data: 'displayItemIntroKo' }, //전시품소개' },(국문)
                { data: 'displayItemIntroEn' }, //전시품소개' },(영문)
                { data: 'newItemIntroKo' }, //신제품' },출품 사항' },소개(국문)
                { data: 'newItemIntroEn' }, //신제품' },출품 사항' },소개(영문)
                { data: 'boothVisitReason' }, //우리 기업 부스는 꼭 들려야 될 이유가 있다면?
                { data: 'eventPlan' }, //행사/이벤트' },진행계획
                { data: 'officeRequest' }, //사무국' },요청사항
                { data: 'logo' }, //로고
                { data: 'promotionImage1' }, //홍보 이미지1
                { data: 'promotionImage2' }, //홍보 이미지2
                { data: 'promotionImage3' }, //홍보 이미지3
                { data: 'registrationFeeEn' }, //신청부스 Registration Fee
                { data: 'registrationFeeKo' }, //신청부스 등록비
                { data: 'standAloneBoothFeeEn' }, //신청부스 Space only
                { data: 'standAloneBoothFeeKo' }, //신청부스 독립부스
                { data: 'assemblyBoothFeeEn' }, //신청부스 Shell scheme package
                { data: 'assemblyBoothFeeKo' }, //신청부스 조립부스
                { data: 'onlineBoothFeeKo' }, //신청부스 온라인부스
                { data: 'boothSameTime' }, //신청부스 2021년, 2022년 동시참가
                { data: 'boothOnlineType1' }, //신청부스 온라인 전시회 TYPE 1
                { data: 'boothOnlineType2' }, //신청부스 온라인 전시회 TYPE 2
                { data: 'boothOnlineType12' }, //신청부스 온라인 전시회 TYPE 1 + 2
                { data: 'boothSponsorProgram' }, //신청부스 온라인 전시회 스폰서 프로그램
                { data: 'boothTotalCnt' }, //신청부스 총 부스수
                { data: 'discountReason1' }, //할인신청 1차 조기신청
                { data: 'discountReason2' }, //할인신청 2차 조기신청
                { data: 'discountReason3' }, //할인신청 재참가할인 1 (2019~2022년 참가)
                { data: 'discountReason4' }, //할인신청 재참가할인 2 (2016~2018년 참가)
                { data: 'discountReason5' }, //할인신청 재참가할인 3 (2013~2015년 참가)
                { data: 'discountReason6' }, //할인신청 규모할인 1 (40부스 이상)
                { data: 'discountReason7' }, //할인신청 온라인, 오프라인 동시참가 할인
                { data: 'discountReason8' }, //할인신청 규모할인 2 (20부스 이상)
                { data: 'discountReason9' }, //할인신청 규모할인 3 (10부스 이상)
                { data: 'discountReason10' }, //할인신청 첫 참가 힐인
                { data: 'discountReason11' }, //할인신청 옵션3-4) 규모할인 - 10 ~ 19 부스
                { data: 'discountReason12' }, //할인신청 옵션3-1) 참가신청서 필수세트 등록
                { data: 'discountReason13' }, //할인신청 옵션3-2-1) 보트쇼 참가횟수 5회 이상
                { data: 'discountReason14' }, //할인신청 옵션3-2-2) 보트쇼 참가횟수 10회 이상
                { data: 'discountReason15' }, //할인신청 옵션3-3-1) 특별 우대품목 출품 - 신제품 출품
                { data: 'discountReason16' }, //할인신청 옵션3-3-2) 특별 우대품목 출품 - 보트 4척 이상 출품
                { data: 'discountReason17' }, //할인신청 옵션3-3-2) 특별 우대품목 출품 - 30 feet 이상 보트 출품
                { data: 'discountReason18' }, //할인신청 옵션3-4) 온라인 매체
                { data: 'discountReason19' }, //할인신청 옵션3-5) 현수막 홍보
                { data: 'discountReason20' }, //할인신청 옵션3-6) 수출 우대기업
                { data: 'discountReason21' }, //할인신청 옵션3-7) 해외바이어 유치
                { data: 'discountReason22' }, //할인신청 옵션4-1) 코로나19 특별할인
                { data: 'discountReason23' }, //할인신청 옵션4-3) 2020 참가확정업체 할인
                { data: 'discountReason24' }, //할인신청 옵션4-3-1) 국내 제조사 할인
                { data: 'discountReason25' }, //할인신청 옵션4-1) 부스규모 확대
                { data: 'discountReason26' }, //할인신청 옵션4-2) 청년일자리박람회 참가
                { data: 'discountReason27' }, //할인신청 첫 참가 할인
                { data: 'discountReason28' }, //할인신청 Early Bird Discount
                { data: 'discountReason29' }, //할인신청 First-time Exhibitor
                { data: 'prcSum' }, //참가비 소계
                { data: 'prcVat' }, //참가비 부가세
                { data: 'prcTotal' }, //참가비 총계
                { data: 'companySignNameKo' }, //상호간판 국문
                { data: 'companySignNameEn' }, //상호간판 영문
                { data: 'utilityRequestKo1' }, // 유틸리티 신청 주간 단상 220v
                { data: 'utilityRequestKo2' }, // 유틸리티 신청 24시간용 220v
                { data: 'utilityRequestKo3' }, // 유틸리티 신청 압축공기 기본형
                { data: 'utilityRequestKo4' }, // 유틸리티 신청 급배수 기본형
                { data: 'utilityRequestKo5' }, // 유틸리티 신청 전화(국내용)
                { data: 'utilityRequestKo6' }, // 유틸리티 신청 인터넷
                { data: 'utilityRequestKo7' }, // 유틸리티 신청 파이텍스 신
                { data: 'utilityRequestKo8' }, // 유틸리티 신청 파이텍스 재
                { data: 'utilityRequestEn1' }, // 유틸리티 신청 220V single-phase
                { data: 'utilityRequestEn2' }, // 유틸리티 신청 220V single-phase
                { data: 'utilityRequestEn3' }, // 유틸리티 신청 Compressed Air
                { data: 'utilityRequestEn4' }, // 유틸리티 신청 Water Supply
                { data: 'utilityRequestEn5' }, // 유틸리티 신청 Wired Telephone
                { data: 'utilityRequestEn6' }, // 유틸리티 신청 Internet Line
                { data: 'utilityRequestEn7' }, // 유틸리티 신청 Pytex (new)
                { data: 'utilityRequestEn8' }, // 유틸리티 신청 Pytex (recycled)
                { data: 'adminCostSum' }, //관리비 소계
                { data: 'adminCostVat' }, //관리비 부가세
                { data: 'adminCostTotal' }, //관리비 총계
                { data: 'pass' }, //출입증
                { data: 'buyer' }, //초청바이어
                { data: 'entryFeeSum' }, //총 참가비 소계
                { data: 'entryFeeVat' }, //총 참가비 부가세
                { data: 'entryFeeDiscountPrc1' }, //총 참가비 특별할인 금액1
                { data: 'entryFeeDiscountReason1' }, // 총 참가비 특별할인 사유1
                { data: 'entryFeeDiscountPrc2' }, // 총 참가비 특별할인 금액2
                { data: 'entryFeeDiscountReason2' }, // 총 참가비 특별할인 사유2
                { data: 'entryFeeDiscountPrc3' }, // 총 참가비 특별할인 금액3
                { data: 'entryFeeDiscountReason3' }, // 총 참가비 특별할인 사유3
                { data: 'entryFeeTotal' }, // 총 참가비 총계
                { data: 'depositFee' }, // 입금액 1차입금액
                { data: 'depositDttm' }, // 입금액 1차입금일
                { data: 'balancePrc' }, // 잔액
                { data: 'selectionPart' } // 선택항목
            ]
        });
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#kt_participant_company_table');

            if (!table) {
                return;
            }

            initDatatable();
            let dataTbl = $('#kt_participant_company_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            /* 테이블 default all 조회*/
            f_exhibitor_comp_search();

            $('#kt_participant_company_table tbody').on('click', 'tr', function () {
                let dataRow = dataTbl.row( this ).data();
                let classList = this.classList;
                if (classList.contains('selected')) {
                    /*수정버튼*/
                    document.getElementById('exhibitor_comp_modify_btn').classList.remove('btn-dark');
                    document.getElementById('exhibitor_comp_modify_btn').classList.remove('btn-active-light-dark');
                    document.getElementById('exhibitor_comp_modify_btn').classList.add('btn-secondary');
                    /*삭제버튼*/
                    document.getElementById('exhibitor_comp_remove_btn').classList.remove('btn-danger');
                    document.getElementById('exhibitor_comp_remove_btn').classList.remove('btn-active-light-danger');
                    document.getElementById('exhibitor_comp_remove_btn').classList.add('btn-secondary');
                }
                else {
                    /*수정버튼*/
                    document.getElementById('exhibitor_comp_modify_btn').classList.remove('btn-secondary');
                    document.getElementById('exhibitor_comp_modify_btn').classList.add('btn-dark');
                    document.getElementById('exhibitor_comp_modify_btn').classList.add('btn-active-light-dark');
                    /*삭제버튼*/
                    document.getElementById('exhibitor_comp_remove_btn').classList.remove('btn-secondary');
                    document.getElementById('exhibitor_comp_remove_btn').classList.add('btn-danger');
                    document.getElementById('exhibitor_comp_remove_btn').classList.add('btn-active-light-danger');
                }
            });
        }
    };
}();

let KTAppBoardNotice = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 3,
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'seq'},
                { data: 'lang'},
                { data: 'noticeGbn' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let seq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_notice_detail_modal_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_notice_modify_init_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_notice_remove(' + '\'' + seq + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#mng_board_notice_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#mng_board_notice_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_notice_search();
        }
    };
}();

let KTAppBoardSipaNews = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 3,
                    'render': function (data) {
                        if (data === '1') {
                            return 'V'
                        } else {
                            return '-'
                        }
                    }
                },
                {
                    'targets': 9,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'seq'},
                { data: 'lang'},
                { data: 'noticeGbn' },
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'finalRegiDttm' },
                { data: 'viewCnt' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let seq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_sipa_news_detail_modal_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_sipa_news_modify_init_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_sipa_news_remove(' + '\'' + seq + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#mng_board_sipa_news_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#mng_board_sipa_news_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_sipa_news_search();
        }
    };
}();

let KTAppBoardEvent = function () {
    // Shared variables
    let table;
    let datatable;

    // Private functions
    let initDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        datatable = $(table).DataTable({
            'info': false,
            'paging' : false,
            'select': false,
            'ordering': true,
            'order': [[0, 'desc']],
            'columnDefs': [
                {
                    'targets': '_all',
                    'className': 'text-center'
                },
                {
                    'targets': 2,
                    'render': function (data) {
                        if (data === 'KO') {
                            return '국문'
                        } else {
                            return '영문'
                        }
                    }
                },
                {
                    'targets': 11,
                    'data': 'actions',
                    'render': function (data, type, row) { return renderActionsCell(data, type, row); }
                },
                { visible: false, targets: [1] }
            ],
            columns: [
                { data: 'rownum' },
                { data: 'seq'},
                { data: 'lang'},
                { data: 'title' },
                { data: 'writer' },
                { data: 'writeDate' },
                { data: 'location' },
                { data: 'startDate' },
                { data: 'endDate' },
                { data: 'initRegiDttm' },
                { data: 'finalRegiDttm' },
                { data: 'actions' }
            ]
        });
    }

    function renderActionsCell(data, type, row){
        //console.log(row.id);
        let seq = row.seq;
        let renderHTML = '<button type="button" onclick="KTMenu.createInstances()" class="btn btn-sm btn-light btn-flex btn-center btn-active-light-primary" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">';
        renderHTML += 'Actions';
        renderHTML += '<i class="ki-duotone ki-down fs-5 ms-1"></i></button>';
        renderHTML += '<div id="kt_menu" class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-150px py-4" data-kt-menu="true">';
        renderHTML += '<div id="kt_menu_item" class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_event_detail_modal_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_history">상세정보</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_event_modify_init_set(' + '\'' + seq + '\'' + ')" class="menu-link px-3">수정</a>';
        renderHTML += '</div>';
        renderHTML += '<div class="menu-item px-3">';
        renderHTML += '<a onclick="f_board_event_remove(' + '\'' + seq + '\'' + ')" class="menu-link px-3">삭제</a>';
        renderHTML += '</div>';
        renderHTML += '</div>';
        return renderHTML;
    }

    // Public methods
    return {
        init: function () {
            table = document.querySelector('#mng_board_event_table');

            if (!table) {
                return;
            }

            initDatatable();

            /* Data row clear */
            let dataTbl = $('#mng_board_event_table').DataTable();
            dataTbl.clear();
            dataTbl.draw(false);

            dataTbl.on('order.dt search.dt', function () {
                let i = dataTbl.rows().count();
                dataTbl.cells(null, 0, { search: 'applied', order: 'applied' })
                    .every(function (cell) {
                        this.data(i--);
                    });
            }).draw();

            /* 조회 */
            f_board_event_search();
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {

    // 정보센터>게시판관리
    // 공지사항
    KTAppBoardNotice.init(); // /mng/board/notice.do
    // SIPA-NEWS
    KTAppBoardSipaNews.init(); // /mng/board/sipaNews.do
    // 행사 게시판
    KTAppBoardEvent.init(); // /mng/board/event.do

});
