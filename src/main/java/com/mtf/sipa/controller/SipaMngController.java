package com.mtf.sipa.controller;

import com.mtf.sipa.constants.CommConstants;
import com.mtf.sipa.dto.MailRequestDTO;
import com.mtf.sipa.dto.ResponseDTO;
import com.mtf.sipa.service.CommService;
import com.mtf.sipa.service.SipaMngService;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.*;

/**
 * The type Sipa page controller.
 */
@Controller
public class SipaMngController {

    // 필드 주입이 아닌 생성자 주입형태로 사용합니다. '생성자 주입 형태'로 사용합니다.
    private final SipaMngService sipaMngService;

    private final CommService commService;

    /**
     * Instantiates a new Sipa controller.
     *
     * @param kms         the kms
     * @param cs
     */
    public SipaMngController(SipaMngService kms, CommService cs){
        this.sipaMngService = kms;
        this.commService = cs;
    }

    // Customer Folder

    /**
     * mng login model and view.
     *
     * @return the model and view
     */
    @RequestMapping(value = "/mng/index.do")
    public ModelAndView mng_index() {
        System.out.println("SipaMngController > mng_index");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/mng/index");
        return mv;
    }

    @RequestMapping(value = "/mng/main.do")
    public ModelAndView mng_main() {
        System.out.println("SipaMngController > mng_main");
        ModelAndView mv = new ModelAndView();

        // 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
        LocalDate now = LocalDate.now();

        // 연도, 월(문자열, 숫자), 일, 일(year 기준), 요일(문자열, 숫자)
        String fullYear = String.valueOf(now.getYear() + 1);
        /* 커밋 테스트 231011-2 */
        mv.setViewName("/mng/main");
        return mv;
    }

    /*********************** file upload ***********************/

    @RequestMapping(value = "/file/upload.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity file_upload(HttpServletRequest uploadFile) {
        System.out.println("SipaMngController > file_upload");
        String gbn = uploadFile.getParameter("gbn");

        JSONObject response = new JSONObject();

        int size = 1024 * 1024 * 100; // 100M
        String file = "";
        String oriFile = "";

        JSONObject obj = new JSONObject();

        try {
            String path = "";
            if("mail".equals(gbn)){
                path = ResourceUtils.getFile("./tomcat/webapps/ROOT/WEB-INF/classes/static/img/" + gbn + "/").toPath().toString();
            }else{
                /* prod */
                path = ResourceUtils.getFile("./tomcat/webapps/upload/" + gbn + "/").toPath().toString();
            }

            /* 날짜로 폴더 setting
            SimpleDateFormat sdt = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            String formatDate = sdt.format(date);

            String datePath = formatDate.replace("-", File.separator);*/

            /* dir 없다면 create */
            /*File uploadPath = new File(path + "/" + datePath);*/
            File uploadPath = new File(path);

            if (!uploadPath.exists()) {
                try {
                    Files.createDirectories(uploadPath.toPath());
                } catch (IOException e) {
                    System.out.println("[mkdir error] : " + e.getMessage());
                }
            }

            /* 파일명 중복 방지 - UUID setting */
            String uuid = UUID.randomUUID().toString();

            /* 폴더에 파일 업로드 */
            MultipartRequest multi = new MultipartRequest(uploadFile, uploadPath.getPath()+"/", size,
                    "UTF-8", new DefaultFileRenamePolicy());
            Enumeration files = multi.getFileNames();
            String str = (String)files.nextElement();

            file = multi.getFilesystemName(str);
            oriFile = multi.getOriginalFileName(str);
            // 파일명에서 공백 제거
            oriFile = oriFile.replaceAll("(\r\n|\r|\n|\n\r|\\p{Z}|\\t)", "").replaceAll("%20", "").replaceAll("\\s+", "");
            // 파일명에서 특수문자 제거
            oriFile = oriFile.replaceAll("[:\\\\/*?|<>\\[\\]]", "_");

            // 업로드된 파일 객체 생성
            File oldFile = new File(uploadPath.getPath() + "/" + file);

            // 실제 저장될 파일 객체 생성
            File newFile = new File(uploadPath.getPath() + File.separator + uuid + "_" + oriFile);

            // 파일명 rename
            if(!oldFile.renameTo(newFile)){
                int read = 0;
                byte[] buf = new byte[1024];
                FileInputStream fin = null;
                FileOutputStream fout = null;
                //rename이 되지 않을경우 강제로 파일을 복사하고 기존파일은 삭제
                buf = new byte[1024];
                fin = new FileInputStream(oldFile);
                fout = new FileOutputStream(newFile);
                read = 0;
                while((read=fin.read(buf,0,buf.length))!=-1){
                    fout.write(buf, 0, read);
                }

                fin.close();
                fout.close();
                oldFile.delete();
            }

            response.put("uploadPath",uploadPath.getPath());
            response.put("uuid",uuid);
            response.put("fileName", oriFile);

            System.out.println("[full file path] : " + uploadPath + File.separator + uuid + "_" + oriFile);
            /*System.out.println("[uploadPath.getPath()2] : " + uploadPath.getPath());
            System.out.println("[uuid] : " + uuid);
            System.out.println("[fileName] : " + oriFile);
            System.out.println("[file] : " + file);*/

        } catch (Exception e) {
            System.out.println("[upload file save error] : " + e.getMessage());
        }

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @ResponseBody
    @GetMapping(value = "/board/uploadFileGet")
    public ResponseEntity<byte[]> board_uploadFileGet(@RequestParam("fileName") String fileName) {
        System.out.println("SipaMngController > board_uploadFileGet");
        //System.out.println("fileName : " + fileName);

        //String replaceFileName = fileName.replace("/",File.separator);

        File file = new File(fileName);

        ResponseEntity<byte[]> result = null;

        try {

            HttpHeaders header = new HttpHeaders();

        /*
        Files.probeContentType() 해당 파일의 Content 타입을 인식(image, text/plain ...)
        없으면 null 반환

        file.toPath() -> file 객체를 Path객체로 변환

        */
            //System.out.println("Files.content-type : " + Files.probeContentType(file.toPath()));
            header.add("Content-type", Files.probeContentType(file.toPath()));

            result = new ResponseEntity<>(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    /*********************** file download ***********************/

    @RequestMapping(value = "/file/download.do", method = RequestMethod.GET)
    public void board_downloadFile(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("SipaMngController > board_downloadFile");
        String path = request.getParameter("path");
        path = path.replaceAll("\\\\", "/");

        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");

        String file_repo = "";
        if("mail".equals(path)){
            file_repo = ResourceUtils.getFile("./tomcat/webapps/ROOT/WEB-INF/classes/static/img/" + path + "/").toPath().toString();
        }else {
            // 파일 업로드된 경로
            file_repo = ResourceUtils.getFile("./tomcat/webapps/upload/" + path + "/").toPath().toString();
        }
        // 서버에 실제 저장된 파일명
        //String filename = "20140819151221.zip" ;
        String fileName = request.getParameter("fileName");

        OutputStream out = response.getOutputStream();
        String downFile = file_repo + "/" + fileName;
        File f = new File(downFile);
        response.setHeader("Cache-Control", "no-cache");
        // 한글 파일명 처리
        fileName = new String(fileName.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1);
        response.addHeader("Content-disposition","attachment; fileName=" + fileName);

        FileInputStream in = new FileInputStream(f);
        byte[] buffer = new byte[1024*8];
        while(true){
            int count = in.read(buffer);
            if(count == -1){
                break;
            }
            out.write(buffer,0,count);
        }
        in.close();
        out.close();
    }

    @RequestMapping(value = "/mng/directory/download.do", method = RequestMethod.GET)
    public void directory_download(HttpServletRequest req, HttpServletResponse res) {
        System.out.println("SipaMngController > directory_download");
        String fileName = req.getParameter("fileName");
        String transferYear = req.getParameter("transferYear");

        // Workbook 생성
        try(XSSFWorkbook workbook = new XSSFWorkbook()){ // Excel 2007 이상

            /* 엑셀 그리기 */
            final String[] colNames_ex = {
                    "No",
                    "승인여부", "입금여부",
                    "회사명(국문)", "회사명(영문)",
                    "주소", "상세주소",
                    "대표자명", "전화",
                    "홈페이지", "FAX", "사업자등록번호",
                    "블로그", "페이스북", "인스타그램", "기타",
                    "회사소개(국문)", "회사소개(영문)",
                    "KIBS 참가목적(국문)", "KIBS 참가목적(영문)",
                    "성명", "직위", "부서", "전화번호", "휴대전화", "이메일",
                    "전시품목명", "브랜드명", "실물보트수"
            };

            // 헤더 사이즈
            final int[] colWidths_ex = {
                    3000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000,
                    5000, 5000, 5000, 5000, 5000, 5000,
                    5000, 5000, 5000
            };

            // *** Style--------------------------------------------------
            //Font
            Font fontHeader = workbook.createFont();
            fontHeader.setFontName("맑은 고딕");	//글씨체
            fontHeader.setFontHeight((short)(9 * 20));	//사이즈
            fontHeader.setBold(true);	//볼드(굵게)
            Font font9 = workbook.createFont();
            font9.setFontName("맑은 고딕");	//글씨체
            font9.setFontHeight((short)(9 * 20));	//사이즈
            // 엑셀 헤더 셋팅 (참가업체정보)
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            headerStyle.setBorderRight(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setFillForegroundColor(IndexedColors.PALE_BLUE.index);
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setFont(fontHeader);
            // 엑셀 바디 셋팅 (참가업체정보)
            CellStyle bodyStyle = workbook.createCellStyle();
            bodyStyle.setAlignment(HorizontalAlignment.CENTER);
            bodyStyle.setVerticalAlignment(VerticalAlignment.CENTER);
            bodyStyle.setBorderRight(BorderStyle.THIN);
            bodyStyle.setBorderLeft(BorderStyle.THIN);
            bodyStyle.setBorderTop(BorderStyle.THIN);
            bodyStyle.setBorderBottom(BorderStyle.THIN);
            bodyStyle.setFont(font9);
            // 엑셀 헤더 셋팅 (담당자정보)
            CellStyle headerStyle_ch = workbook.createCellStyle();
            headerStyle_ch.setAlignment(HorizontalAlignment.CENTER);
            headerStyle_ch.setVerticalAlignment(VerticalAlignment.CENTER);
            headerStyle_ch.setBorderRight(BorderStyle.THIN);
            headerStyle_ch.setBorderLeft(BorderStyle.THIN);
            headerStyle_ch.setBorderTop(BorderStyle.THIN);
            headerStyle_ch.setBorderBottom(BorderStyle.THIN);
            headerStyle_ch.setFillForegroundColor(IndexedColors.LIGHT_GREEN.index);
            headerStyle_ch.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle_ch.setFont(fontHeader);
            // 엑셀 바디 셋팅 (담당자정보)
            CellStyle bodyStyle_ch = workbook.createCellStyle();
            bodyStyle_ch.setAlignment(HorizontalAlignment.CENTER);
            bodyStyle_ch.setVerticalAlignment(VerticalAlignment.CENTER);
            bodyStyle_ch.setBorderRight(BorderStyle.THIN);
            bodyStyle_ch.setBorderLeft(BorderStyle.THIN);
            bodyStyle_ch.setBorderTop(BorderStyle.THIN);
            bodyStyle_ch.setBorderBottom(BorderStyle.THIN);
            bodyStyle_ch.setFont(font9);
            bodyStyle_ch.setWrapText(true); //개행
            // 엑셀 헤더 셋팅 (전시정보)
            CellStyle headerStyle_di = workbook.createCellStyle();
            headerStyle_di.setAlignment(HorizontalAlignment.CENTER);
            headerStyle_di.setVerticalAlignment(VerticalAlignment.CENTER);
            headerStyle_di.setBorderRight(BorderStyle.THIN);
            headerStyle_di.setBorderLeft(BorderStyle.THIN);
            headerStyle_di.setBorderTop(BorderStyle.THIN);
            headerStyle_di.setBorderBottom(BorderStyle.THIN);
            headerStyle_di.setFillForegroundColor(IndexedColors.LEMON_CHIFFON.index);
            headerStyle_di.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle_di.setFont(fontHeader);
            // 엑셀 바디 셋팅 (전시정보)
            CellStyle bodyStyle_di = workbook.createCellStyle();
            bodyStyle_di.setAlignment(HorizontalAlignment.CENTER);
            bodyStyle_di.setVerticalAlignment(VerticalAlignment.CENTER);
            bodyStyle_di.setBorderRight(BorderStyle.THIN);
            bodyStyle_di.setBorderLeft(BorderStyle.THIN);
            bodyStyle_di.setBorderTop(BorderStyle.THIN);
            bodyStyle_di.setBorderBottom(BorderStyle.THIN);
            bodyStyle_di.setFont(font9);
            bodyStyle_di.setWrapText(true); //개행

            // 데이터 조회
            /*DirectoryDTO directoryDTO = new DirectoryDTO();
            directoryDTO.setTransferYear(transferYear);
            List<DirectoryDTO> directoryList = kibsMngService.processSelectDirectoryList(directoryDTO);*/

            //rows
            int rowCnt = 0;
            int cellCnt = 0;
            int listCount = 0;/*directoryList.size();*/

            // *** Sheet-------------------------------------------------
            // Sheet 생성
            XSSFSheet sheet = workbook.createSheet("Directory");

            XSSFCell cell = null;
            XSSFRow row = sheet.createRow(rowCnt++);

            // 헤더 정보 구성
            // 참가업체정보
            sheet.addMergedRegion(new CellRangeAddress(0,0,0,19));
            XSSFCell mergeCell = row.createCell(0);
            mergeCell.setCellStyle(headerStyle);
            mergeCell.setCellValue("참가업체정보");

            // 담당자정보
            sheet.addMergedRegion(new CellRangeAddress(0,0,20,25));
            XSSFCell mergeCell2 = row.createCell(20);
            mergeCell2.setCellStyle(headerStyle_ch);
            mergeCell2.setCellValue("담당자정보");

            // 전시정보
            sheet.addMergedRegion(new CellRangeAddress(0,0,26,28));
            XSSFCell mergeCell3 = row.createCell(26);
            mergeCell3.setCellStyle(headerStyle_di);
            mergeCell3.setCellValue("전시정보");

            row = sheet.createRow(rowCnt++);
            for (int i = 0; i < colNames_ex.length; i++) {
                cell = row.createCell(i);
                if(i < 20) {
                    cell.setCellStyle(headerStyle);
                }else if(i<26){
                    cell.setCellStyle(headerStyle_ch);
                }else{
                    cell.setCellStyle(headerStyle_di);
                }
                cell.setCellValue(colNames_ex[i]);
                sheet.setColumnWidth(i, colWidths_ex[i]);	//column width 지정
            }

            //데이터 부분 생성
            /*for(DirectoryDTO info : directoryList) {
                cellCnt = 0;
                row = sheet.createRow(rowCnt++);

                int nCount = 0;
                String[] remark = info.getChargePersonName().split("\\^,");

                //줄 높이 계산
                for (String s : remark) {
                    if (s.length() > 0) {
                        nCount++;
                    }
                }

                //줄 높이 설정
                if (nCount > 1){
                    row.setHeightInPoints((nCount * sheet.getDefaultRowHeightInPoints()));
                }

                // 넘버링
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(listCount--);
                // 승인여부
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getApprovalStatus());
                // 입금여부
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getPrcYn());
                // 회사명(국문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyNameKo());
                // 회사명(영문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyNameEn());
                // 주소
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyAddress());
                // 상세주소
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyAddressDetail());
                // 대표자
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyCeo());
                // 전화
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyTel());
                // 홈페이지
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyHomepage());
                // FAX
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyFax());
                // 사업자등록번호
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyLicenseNum());
                // 블로그
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getSnsBlog());
                // 페이스북
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getSnsFacebook());
                // 인스타그램
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getSnsInstagram());
                // 기타
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getSnsEtc());
                // 회사소개(국문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyIntroKo());
                // 회사소개(영문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyIntroEn());
                // KIBS 참가목적(국문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyPurposeKo());
                // KIBS 참가목적(영문)
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle);
                cell.setCellValue(info.getCompanyPurposeEn());
                // 담당자명
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonName().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 담당자직위
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonPosition().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 담당자부서
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonDepart().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 담당자전화번호
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonTel().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 담당자휴대전화
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonPhone().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 담당자이메일
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_ch);
                cell.setCellValue(info.getChargePersonEmail().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 전시품목
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_di);
                cell.setCellValue(info.getDisplayItem().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 브랜드명
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_di);
                cell.setCellValue(info.getDisplayBrand().replaceAll("\\^,","\n").replaceAll("\\^",""));
                // 전시품목보트수
                cell = row.createCell(cellCnt++);
                cell.setCellStyle(bodyStyle_di);
                cell.setCellValue(info.getDisplayBoatCnt().replaceAll("\\^,","\n").replaceAll("\\^",""));
            }*/

            //너비를 자동으로 다시 설정
            for (int i = 0; i < colNames_ex.length; i++) {
                sheet.autoSizeColumn(i);
                sheet.setColumnWidth(i, (sheet.getColumnWidth(i)) + 1024);
            }

            // excel 파일 저장
            res.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            // 엑셀 파일명 설정
            res.setHeader("Content-Disposition", "attachment;filename=" + fileName);

            workbook.write(res.getOutputStream());

        } catch (IOException e) {
            System.out.println(e.getMessage());
        }

    }

    /*********************** excel upload ***********************/

    @RequestMapping(value = "/mng/excelUpload.do" , method = RequestMethod.POST , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity mng_excelUpload(MultipartHttpServletRequest request) {
        System.out.println("SipaMngController > mng_excelUpload");
        ResponseDTO responseDto = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;

        try {
//            JSONObject jsonObject = new JSONObject();

            MultipartFile file = null;
            Iterator<String> iterator = request.getFileNames();
            if(iterator.hasNext()) {
                file = request.getFile(iterator.next());
            }

            System.out.println(Objects.requireNonNull(file).getOriginalFilename());
            System.out.println(file.getName());

            List<?> list = sipaMngService.uploadExcelFile(file);
            if(list !=null) {
//                jsonObject.put("rs", "0000");
            }else {
//                jsonObject.put("rs", "9999");
            }

        } catch (Exception e) {
            System.out.println("[EXCEL UPLOAD ERROR] : " + e.getMessage());
        }

        responseDto.setResultCode(resultCode);
        responseDto.setResultMessage(resultMessage);
        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    /*********************** mail send ***********************/

    @RequestMapping(value = "/mail/send.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity mail_send(@RequestBody MailRequestDTO mailRequestDTO) {
        System.out.println("SipaMngController > mail_send");
        System.out.println(mailRequestDTO.toString());

        ResponseDTO responseDTO = sipaMngService.processMailSend(mailRequestDTO);

        return new ResponseEntity(responseDTO, HttpStatus.OK);
    }

}