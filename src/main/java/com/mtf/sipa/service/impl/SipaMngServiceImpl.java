package com.mtf.sipa.service.impl;

import com.google.gson.JsonObject;
import com.mtf.sipa.constants.CommConstants;
import com.mtf.sipa.dto.*;
import com.mtf.sipa.mapper.SipaMngMapper;
import com.mtf.sipa.service.SipaMngService;
import com.mtf.sipa.util.StringUtil;
import lombok.Setter;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * [ 템플릿 설명 ]
 * - 해당 파일은 서비스의 비즈니스 로직을 구현하는 곳입니다.
 * - 해당 *ServiceImpl 에서는 @Service 어노테이션을 필수적으로 사용합니다.
 */
@Service
public class SipaMngServiceImpl implements SipaMngService {

    @Setter(onMethod_ = {@Autowired})
    private SipaMngMapper sipaMngMapper;

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public AdminDTO login(AdminDTO adminDTO, HttpSession session) {
        System.out.println("SipaMngServiceImpl > loginCheck : ======");
        AdminDTO admin = sipaMngMapper.login(adminDTO);
        if(admin != null){
            session.setAttribute("status", "logon");
            session.setAttribute("id", admin.getId());
        }
        return admin;
    }

    @Override
    public void logoutCheck(HttpSession session) {
        System.out.println("SipaMngServiceImpl > logoutCheck : ======");
        session.invalidate(); // 세션 초기화
    }

    //***************************************************************************
    // board
    //***************************************************************************

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<NoticeDTO> processSelectNoticeList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectNoticeList");
        return sipaMngMapper.selectNoticeList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public NoticeDTO processSelectNoticeSingle(NoticeDTO noticeDTO) {
        System.out.println("SipaMngServiceImpl > processSelectNoticeSingle");
        return sipaMngMapper.selectNoticeSingle(noticeDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteNotice(NoticeDTO noticeDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteNotice");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(noticeDTO.getSeq() != null){
                result = sipaMngMapper.deleteNotice(noticeDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + noticeDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(noticeDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteNotice ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateNotice(NoticeDTO noticeDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateNotice");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(noticeDTO.getSeq())){
                if(StringUtil.isEmpty(noticeDTO.getNoticeGbn()) || "off".equals(noticeDTO.getNoticeGbn())){
                    noticeDTO.setNoticeGbn("0");
                }else{
                    noticeDTO.setNoticeGbn("1");
                }

                String content = noticeDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
                noticeDTO.setContent(content);
                result = sipaMngMapper.updateNotice(noticeDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + noticeDTO.getSeq();
                }
                //System.out.println(result);

                responseDTO.setCustomValue(noticeDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateNotice ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertNotice(NoticeDTO noticeDTO) {
        System.out.println("SipaMngServiceImpl > processInsertNotice");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            if(StringUtil.isEmpty(noticeDTO.getNoticeGbn()) || "off".equals(noticeDTO.getNoticeGbn())){
                noticeDTO.setNoticeGbn("0");
            }else{
                noticeDTO.setNoticeGbn("1");
            }

            String noticeSeq = sipaMngMapper.getNoticeSeq();
            noticeDTO.setSeq(noticeSeq);

            String content = noticeDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
            noticeDTO.setContent(content);
            result = sipaMngMapper.insertNotice(noticeDTO);

            responseDTO.setCustomValue(noticeSeq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertNotice ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<SipaNewsDTO> processSelectSipaNewsList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectSipaNewsList");
        return sipaMngMapper.selectSipaNewsList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public SipaNewsDTO processSelectSipaNewsSingle(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaMngServiceImpl > processSelectSipaNewsSingle");
        return sipaMngMapper.selectSipaNewsSingle(sipaNewsDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteSipaNews(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteSipaNews");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(sipaNewsDTO.getSeq() != null){
                result = sipaMngMapper.deleteSipaNews(sipaNewsDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + sipaNewsDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(sipaNewsDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteSipaNews ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateSipaNews(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateSipaNews");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(sipaNewsDTO.getSeq())){
                if(StringUtil.isEmpty(sipaNewsDTO.getNoticeGbn()) || "off".equals(sipaNewsDTO.getNoticeGbn())){
                    sipaNewsDTO.setNoticeGbn("0");
                }else{
                    sipaNewsDTO.setNoticeGbn("1");
                }

                String content = sipaNewsDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
                sipaNewsDTO.setContent(content);
                result = sipaMngMapper.updateSipaNews(sipaNewsDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + sipaNewsDTO.getSeq();
                }
                //System.out.println(result);

                responseDTO.setCustomValue(sipaNewsDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateSipaNews ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertSipaNews(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaMngServiceImpl > processInsertSipaNews");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            if(StringUtil.isEmpty(sipaNewsDTO.getNoticeGbn()) || "off".equals(sipaNewsDTO.getNoticeGbn())){
                sipaNewsDTO.setNoticeGbn("0");
            }else{
                sipaNewsDTO.setNoticeGbn("1");
            }

            String seq = sipaMngMapper.getSipaNewsSeq();
            sipaNewsDTO.setSeq(seq);

            String content = sipaNewsDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
            sipaNewsDTO.setContent(content);
            result = sipaMngMapper.insertSipaNews(sipaNewsDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertSipaNews ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<EventDTO> processSelectEventList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectEventList");
        return sipaMngMapper.selectEventList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public EventDTO processSelectEventSingle(EventDTO eventDTO) {
        System.out.println("SipaMngServiceImpl > processSelectEventSingle");
        return sipaMngMapper.selectEventSingle(eventDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteEvent(EventDTO eventDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteEvent");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(eventDTO.getSeq() != null){
                result = sipaMngMapper.deleteEvent(eventDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + eventDTO.getSeq();
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteEvent ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateEvent(EventDTO eventDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateEvent");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(eventDTO.getSeq())){
                result = sipaMngMapper.updateEvent(eventDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + eventDTO.getSeq();
                }
                //System.out.println(result);

                responseDTO.setCustomValue(eventDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateEvent ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertEvent(EventDTO eventDTO) {
        System.out.println("SipaMngServiceImpl > processInsertEvent");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getEventSeq();
            eventDTO.setSeq(seq);
            result = sipaMngMapper.insertEvent(eventDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertEvent ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<FaqDTO> processSelectFaqList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectFaqList");
        return sipaMngMapper.selectFaqList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public FaqDTO processSelectFaqSingle(FaqDTO faqDTO) {
        System.out.println("SipaMngServiceImpl > processSelectFaqSingle");
        return sipaMngMapper.selectFaqSingle(faqDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteFaq(FaqDTO faqDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteFaq");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(faqDTO.getSeq() != null){
                result = sipaMngMapper.deleteFaq(faqDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + faqDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(faqDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteFaq ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateFaq(FaqDTO faqDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateFaq");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(faqDTO.getSeq())){

                String content = faqDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
                faqDTO.setContent(content);
                result = sipaMngMapper.updateFaq(faqDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + faqDTO.getSeq();
                }
                //System.out.println(result);

                responseDTO.setCustomValue(faqDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateFaq ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertFaq(FaqDTO faqDTO) {
        System.out.println("SipaMngServiceImpl > processInsertFaq");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getFaqSeq();
            faqDTO.setSeq(seq);

            String content = faqDTO.getContent().replaceAll("&lt;","<").replaceAll("&gt;",">").trim();
            faqDTO.setContent(content);
            result = sipaMngMapper.insertFaq(faqDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertFaq ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<AscdirectorsDTO> processSelectAscdirectorsList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectAscdirectorsList");
        return sipaMngMapper.selectAscdirectorsList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public AscdirectorsDTO processSelectAscdirectorsSingle(AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaMngServiceImpl > processSelectAscdirectorsSingle");
        return sipaMngMapper.selectAscdirectorsSingle(ascdirectorsDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteAscdirectors(AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteAscdirectors");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(ascdirectorsDTO.getSeq() != null){
                result = sipaMngMapper.deleteAscdirectors(ascdirectorsDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + ascdirectorsDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(ascdirectorsDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteAscdirectors ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateAscdirectors(AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateAscdirectors");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(ascdirectorsDTO.getSeq())){

                result = sipaMngMapper.updateAscdirectors(ascdirectorsDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + ascdirectorsDTO.getSeq();
                }
                //System.out.println(result);
                responseDTO.setCustomValue(ascdirectorsDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateAscdirectors ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertAscdirectors(AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaMngServiceImpl > processInsertAscdirectors");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getAscdirectorsSeq();
            ascdirectorsDTO.setSeq(seq);

            result = sipaMngMapper.insertAscdirectors(ascdirectorsDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertAscdirectors ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<AdviserDTO> processSelectAdviserList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectAdviserList");
        return sipaMngMapper.selectAdviserList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public AdviserDTO processSelectAdviserSingle(AdviserDTO adviserDTO) {
        System.out.println("SipaMngServiceImpl > processSelectAdviserSingle");
        return sipaMngMapper.selectAdviserSingle(adviserDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteAdviser(AdviserDTO adviserDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteAdviser");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(adviserDTO.getSeq() != null){
                result = sipaMngMapper.deleteAdviser(adviserDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + adviserDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(adviserDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteAdviser ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateAdviser(AdviserDTO adviserDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateAdviser");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(adviserDTO.getSeq())){

                result = sipaMngMapper.updateAdviser(adviserDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + adviserDTO.getSeq();
                }
                //System.out.println(result);
                responseDTO.setCustomValue(adviserDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateAdviser ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertAdviser(AdviserDTO adviserDTO) {
        System.out.println("SipaMngServiceImpl > processInsertAdviser");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getAdviserSeq();
            adviserDTO.setSeq(seq);

            result = sipaMngMapper.insertAdviser(adviserDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertAdviser ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<ConsultationDTO> processSelectConsultationList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectConsultationList");
        return sipaMngMapper.selectConsultationList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ConsultationDTO processSelectConsultationSingle(ConsultationDTO consultationDTO) {
        System.out.println("SipaMngServiceImpl > processSelectConsultationSingle");
        return sipaMngMapper.selectConsultationSingle(consultationDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteConsultation(ConsultationDTO consultationDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteConsultation");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(consultationDTO.getSeq() != null){
                result = sipaMngMapper.deleteConsultation(consultationDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + consultationDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(consultationDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteConsultation ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateConsultation(ConsultationDTO consultationDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateConsultation");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(consultationDTO.getSeq())){

                result = sipaMngMapper.updateConsultation(consultationDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + consultationDTO.getSeq();
                }
                //System.out.println(result);
                responseDTO.setCustomValue(consultationDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateConsultation ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertConsultation(ConsultationDTO consultationDTO) {
        System.out.println("SipaMngServiceImpl > processInsertConsultation");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getConsultationSeq();
            consultationDTO.setSeq(seq);

            result = sipaMngMapper.insertConsultation(consultationDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertConsultation ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<CompanyDTO> processSelectCompanyList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectCompanyList");
        return sipaMngMapper.selectCompanyList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public CompanyDTO processSelectCompanySingle(CompanyDTO companyDTO) {
        System.out.println("SipaMngServiceImpl > processSelectCompanySingle");
        return sipaMngMapper.selectCompanySingle(companyDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeleteCompany(CompanyDTO companyDTO) {
        System.out.println("SipaMngServiceImpl > processDeleteCompany");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(companyDTO.getSeq() != null){
                result = sipaMngMapper.deleteCompany(companyDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + companyDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(companyDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeleteCompany ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateCompany(CompanyDTO companyDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateCompany");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(companyDTO.getSeq())){

                result = sipaMngMapper.updateCompany(companyDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + companyDTO.getSeq();
                }
                //System.out.println(result);
                responseDTO.setCustomValue(companyDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateCompany ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertCompany(CompanyDTO companyDTO) {
        System.out.println("SipaMngServiceImpl > processInsertCompany");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getCompanySeq();
            companyDTO.setSeq(seq);

            result = sipaMngMapper.insertCompany(companyDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertCompany ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<PartnershipDTO> processSelectPartnershipList(SearchDTO searchDTO) {
        System.out.println("SipaMngServiceImpl > processSelectPartnershipList");
        return sipaMngMapper.selectPartnershipList(searchDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public PartnershipDTO processSelectPartnershipSingle(PartnershipDTO partnershipDTO) {
        System.out.println("SipaMngServiceImpl > processSelectPartnershipSingle");
        return sipaMngMapper.selectPartnershipSingle(partnershipDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processDeletePartnership(PartnershipDTO partnershipDTO) {
        System.out.println("SipaMngServiceImpl > processDeletePartnership");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(partnershipDTO.getSeq() != null){
                result = sipaMngMapper.deletePartnership(partnershipDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Delete Fail] Seq : " + partnershipDTO.getSeq();
                }else{
                    // file list useYn = N update
                    FileDTO fileDTO = new FileDTO();
                    fileDTO.setUserId(partnershipDTO.getSeq());
                    List<FileDTO> fileList = sipaMngMapper.selectFileUserIdList(fileDTO);
                    for(FileDTO file : fileList){
                        sipaMngMapper.updateFileUseN(file);
                    }
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processDeletePartnership ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdatePartnership(PartnershipDTO partnershipDTO) {
        System.out.println("SipaMngServiceImpl > processUpdatePartnership");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(partnershipDTO.getSeq())){

                result = sipaMngMapper.updatePartnership(partnershipDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Seq : " + partnershipDTO.getSeq();
                }
                //System.out.println(result);
                responseDTO.setCustomValue(partnershipDTO.getSeq());
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Seq Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdatePartnership ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processInsertPartnership(PartnershipDTO partnershipDTO) {
        System.out.println("SipaMngServiceImpl > processInsertPartnership");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String seq = sipaMngMapper.getPartnershipSeq();
            partnershipDTO.setSeq(seq);

            result = sipaMngMapper.insertPartnership(partnershipDTO);

            responseDTO.setCustomValue(seq);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertPartnership ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    //***************************************************************************
    // file
    //***************************************************************************

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public FileResponseDTO processInsertFileInfo(FileDTO fileDTO) {
        System.out.println("SipaMngServiceImpl > processInsertFileInfo");
        FileResponseDTO responseDTO = new FileResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {

            String fileId = sipaMngMapper.getFileId();
            fileDTO.setId(fileId);
            result = sipaMngMapper.insertFileInfo(fileDTO);
            if(result == 0){
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Data Insert Fail]";
            }
            responseDTO.setFileId(fileId);
            //System.out.println(result);
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processInsertFileInfo ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<FileDTO> processSelectFileUserIdList(FileDTO fileDTO) {
        System.out.println("SipaMngServiceImpl > processSelectFileUserIdList");
        return sipaMngMapper.selectFileUserIdList(fileDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public FileResponseDTO processUpdateFileUseN(FileDTO fileDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateFileUseN");
        FileResponseDTO responseDTO = new FileResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(fileDTO.getId())){

                result = sipaMngMapper.updateFileUseN(fileDTO);

                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Id : " + fileDTO.getId();
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Id Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateFileUseN ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public ResponseDTO processUpdateFileUserId(FileDTO fileDTO) {
        System.out.println("SipaMngServiceImpl > processUpdateFileUserId");
        ResponseDTO responseDTO = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        Integer result = 0;
        try {
            if(!StringUtil.isEmpty(fileDTO.getId())){

                result = sipaMngMapper.updateFileUserId(fileDTO);
                if(result == 0){
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = "[Data Update Fail] Id : " + fileDTO.getId();
                }
                //System.out.println(result);
            }else{
                resultCode = CommConstants.RESULT_CODE_FAIL;
                resultMessage = "[Id Not Found Error]";
            }
        }catch (Exception e){
            resultCode = CommConstants.RESULT_CODE_FAIL;
            resultMessage = "[processUpdateFileUserId ERROR] " + CommConstants.RESULT_MSG_FAIL + " , " + e.getMessage();
            e.printStackTrace();
        }

        responseDTO.setResultCode(resultCode);
        responseDTO.setResultMessage(resultMessage);
        return responseDTO;
    }

    /*******************************************
     * Excel File Upload Service Impl
     * *****************************************/

    public List<?> uploadExcelFile(MultipartFile excelFile){
        List<?> list = new ArrayList<>();
        try {
            OPCPackage opcPackage = OPCPackage.open(excelFile.getInputStream());
            XSSFWorkbook workbook = new XSSFWorkbook(opcPackage);

            // 첫번째 시트 불러오기
            XSSFSheet sheet = workbook.getSheetAt(0);

            for(int i=1; i<sheet.getLastRowNum() + 1; i++) {
//                CreateUserVo createUserVo = new CreateUserVo();
                XSSFRow row = sheet.getRow(i);

                // 행이 존재하기 않으면 패스
                if(null == row) {
                    continue;
                }

                for(int j=0; j<row.getLastCellNum() + 1; j++){

                    // 행의 1번째 열(아이디)
                    XSSFCell cell = row.getCell(j);

                    //System.out.println(cell.getStringCellValue());
                }

                /*if(null != cell)
                    createUserVo.setUser_id(cell.getStringCellValue());
                // 행의 2번째 열(이름)
                cell = row.getCell(1);
                if(null != cell)
                    createUserVo.setUser_name(cell.getStringCellValue());

                list.add(createUserVo);*/

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }



    /*******************************************
     * Mail Send Service Impl
     * *****************************************/

    public ResponseDTO processMailSend(MailRequestDTO mailRequestDTO) {
        System.out.println("SipaMngServiceImpl > processMailSend");
        ResponseDTO responseDto = new ResponseDTO();
        // URL
        String url = "https://directsend.co.kr/index.php/api_v2/mail_change_word";

        try{
            URL obj = new URL(url);
            HttpURLConnection con = (HttpURLConnection) obj.openConnection();
            con.setRequestProperty("Cache-Control", "no-cache");
            con.setRequestProperty("Content-Type", "application/json;charset=utf-8");
            con.setRequestProperty("Accept", "application/json");

            /*
             * subject  : 받을 mail 제목, 치환 문자열 사용 가능.
             *   치환 문자열 : [$NAME] - 이름 (한글 10글자/영문 30byte 처리), [$EMAIL] - 이메일, [$MOBILE] - 휴대폰,
             *     [$NOTE1] - 비고1 (한글/영문 128자 처리), [$NOTE2] - 비고2 (한글/영문 128자 처리), [$NOTE3] - 비고3 (한글/영문 128자 처리), [$NOTE4] - 비고4 (한글/영문 128자 처리), [$NOTE5] - 비고5 (한글/영문 128자 처리)
             *   템플릿 사용시 템플릿에 입력된 메일 제목이 우선적으로 적용됩니다. 빌더로 템플릿을 저장할 경우 메일 제목은 저장되지 않으므로 subject값을 입력해주시기 바랍니다.
             * body  : 받을 mail 본문, 치환 문자열 사용 가능.
             *   치환 문자열 : [$NAME] - 이름 (한글 10글자/영문 30byte 처리), [$EMAIL] - 이메일, [$MOBILE] - 휴대폰,
             *     [$NOTE1] - 비고1 (한글/영문 128자 처리), [$NOTE2] - 비고2 (한글/영문 128자 처리), [$NOTE3] - 비고3 (한글/영문 128자 처리), [$NOTE4] - 비고4 (한글/영문 128자 처리), [$NOTE5] - 비고5 (한글/영문 128자 처리)
             * template : 사이트에 등록한 발송 할 템플릿 번호
             * sender : 발송자 메일주소
             * sender_name : 발송자 이름 (35자 제한)
             * username : directsend 발급 ID
             * receiver : 발송 할 고객 수신자 정보
             *   json array. ex)
             *      [
             *          {"name": "강길동", "email":"test1@directsend.co.kr", "mobile":"", "note1":"", "note2":"", "note3":"", "note4":"", "note5":""}
             *          , {"name": "홍길동", "email":"test2@directsend.co.kr", "mobile":"수신자번호", "note1":"다이렉트 센드 2", "note2":"다이렉트센드 2", "note3":"다이렉트센드 3", "note4":"다이렉트센드 4", "note5":"다이렉트센드 5"}
             *      ]
             * address_books : 사이트에 등록한 발송 할 주소록 번호 , 로 구분함 (ex. 0,1,2)
             * duplicate_yn : 수신자 정보가 중복될 경우 중복발송을 할지에 대한 여부
             * key : directsend 발급 api key
             *
             * 각 내용이 유효하지않을 경우에는 발송이 되지 않습니다.
             * 비고 내용이 최대 길이(한글/영문 128자 처리)를 넘는 경우 최대 길이 만큼 잘려서 치환 됩니다.
             * 상업성 광고 메일이나 업체 홍보 메일을 발송하는 경우, 제목에 (광고) 문구를 표기해야 합니다.
             * 영리광고 발송 시, 명시적인 사전 동의를 받은 이에게만 광고 메일 발송이 가능합니다.
             * 수신동의 여부에 대한 분쟁이 발생하는 경우 이에 대한 입증책임은 광고성 정보 전송자에게 있습니다.
             * 수신자가 수신거부 또는 수신동의 철회 의사를 쉽게 표시할 수 있는 안내문을 명시해야 합니다.
             * 스팸 메일 발송 용도로 악용하실 경우 이용에 제한이 있을 수 있으니 이용 시 주의 부탁 드립니다.
             * 불법 스팸 메일 발송 시 예고없이 서비스 이용이 정지될 수 있으며 이용정지 시 해당 아이디의 주소록과 잔액은 소멸되며, 환불되지 않으니 서비스 이용에 주의를 부탁드립니다.
             *
             * API 연동 발송시 다량의 주소를 한번에 입력하여도 수신자에게는 1:1로 보내는 것으로 표기되며, 동일한 내용의 메일을 한건씩 발송하는 것보다 다량으로 한번에 보내는 것이 발송 효율이 더 높습니다.
             * 동일한 내용의 메일을 일부 글자만 변경하여 다수에게 발송하시는 경우 수신자 정보를 Json Array [{...}, {...}]로 구분하시어 한번에 발송하시는 것을 권장 드립니다.
             */

            // 여기서부터 수정해주시기 바랍니다.

            String subject = mailRequestDTO.getSubject();   //필수입력(템플릿 사용시 23 line 설명 참조)
            String body = mailRequestDTO.getBody().replaceAll("\"","'");		//필수입력, 템플릿 사용시 빈값을 입력 하시기 바랍니다. 예시) String body = "";
            //String sender = "business@meetingfan.com";        //필수입력(미팅팬 발송테스트용)
            String sender = "kibs@kibs.com";        //필수입력(보트쇼 회사메일)
            String sender_name = "경기국제보트쇼";
            String username = "meetingfan";              //필수입력
            String key = "L7QNsEQIyrAzNHO";           //필수입력

            //수신자 정보 추가 - 필수 입력(주소록 미사용시), 치환문자 미사용시 치환문자 데이터를 입력하지 않고 사용할수 있습니다.
            //치환문자 미사용시 {\"email\":\"aaaa@naver.com\"} 이메일만 입력 해주시기 바랍니다.
            JSONArray jsonArray = new JSONArray();
            for(int i=0; i<mailRequestDTO.getReceiver().size(); i++){
                JsonObject jsonObject = new JsonObject();
                MailRequestDTO.Receiver receiverInfo = mailRequestDTO.getReceiver().get(i);
//                jsonObject.addProperty("name", receiverInfo.getName());
                jsonObject.addProperty("email", receiverInfo.getEmail());
//                jsonObject.addProperty("phone", receiverInfo.getPhone());
                jsonArray.add(jsonObject);
            }
            String receiver = "{\"email\":\"" + mailRequestDTO.getReceiver().get(0).getEmail() + "\"}";
            //receiver = "[" + jsonObject.toString() + "]";
            receiver = jsonArray.toJSONString();

            //템플릿을 사용하길 원하실 경우 아래 주석을 해제하신후, 사이트에 등록한 템플릿 번호를 입력해주시기 바랍니다.
            //String template = ""; //발송 할 템플릿 번호
            //주소록을 사용하길 원하실 경우 아래 주석을 해제하신 후, 사이트에 등록한 주소록 번호를 입력해주시기 바랍니다.
            //String address_books = "0,1,2";      //발송 할 주소록 번호 , 로 구분함 (ex. 0, 1, 2)

            //수신자 정보가 중복이고 내용이 다를 경우 아래 주석을 해제하시고 발송해주시기 바랍니다.
            //String duplicate_yn = "1";

            //실제 발송성공실패 여부를 받기 원하실 경우 아래 주석을 해제하신 후, 사이트에 등록한 URL 번호를 입력해주시기 바랍니다.
            //int return_url = 0;

            //open, click 등의 결과를 받기 원하실 경우 아래 주석을 해제하신 후, 사이트에 등록한 URL 번호를 입력해주시기 바랍니다.
            //등록된 도메인이 http://domain 와 같을 경우, http://domain?type=[click | open | reject]&mail_id=[MailID]&email=[Email]&sendtime=[SendTime]&mail_reserve_id=[MailReserveID] 과 같은 형식으로 request를 보내드립니다.
            //int option_return_url = 0;

            //int open = 1;	// open 결과를 받으려면 아래 주석을 해제 해주시기 바랍니다.
            //int click = 1;	// click 결과를 받으려면 아래 주석을 해제 해주시기 바랍니다.
            //int check_period = 3;	// 트래킹 기간을 지정하며 3 / 7 / 10 / 15 일을 기준으로 지정하여 발송해 주시기 바랍니다. (단, 지정을 하지 않을 경우 결과를 받을 수 없습니다.)

            // 예약발송 정보 추가
            //String mail_type = "NORMAL"; // NORMAL - 즉시발송 / ONETIME - 1회예약 / WEEKLY - 매주정기예약 / MONTHLY - 매월정기예약
            //String start_reserve_time = "2019-03-08 12:11:00";// 발송하고자 하는 시간
            //String end_reserve_time = "2019-03-08 12:11:00";// 발송이 끝나는 시간 1회 예약일 경우 start_reserve_time = end_reserve_time
            // WEEKLY | MONTHLY 일 경우에 시작 시간부터 끝나는 시간까지 발송되는 횟수 Ex) type = WEEKLY, start_reserve_time = '2017-05-17 13:00:00', end_reserve_time = '2017-05-24 13:00:00' 이면 remained_count = 2 로 되어야 합니다.
            //int remained_count = 1;
            // 예약 수정/취소 API는 소스 하단을 참고 해주시기 바랍니다.

            //필수안내문구 추가
            //String agreement_text = "본메일은 [$NOW_DATE] 기준, 회원님의 수신동의 여부를 확인한 결과 회원님께서 수신동의를 하셨기에 발송되었습니다.";
            //String deny_text = "메일 수신을 원치 않으시면 [$DENY_LINK]를 클릭하세요. \\nIf you don't want this type of information or e-mail, please click the [$EN_DENY_LINK]";
            //String sender_info_text = "사업자 등록번호:-- 소재지:ㅇㅇ시(도) ㅇㅇ구(군) ㅇㅇ동 ㅇㅇㅇ번지 TEL:-- \\nEmail: <a href='mailto:test@directsend.co.kr'>test@directsend.co.kr</a>";
            //int logo_state = 1; // logo 사용시 1 / 사용안할 시 0
            //String logo_path = "http://logoimage.com/image.png';  //사용하실 로고 이미지를 입력하시기 바랍니다.";
            //String logo_sort = "CENTER";  //로고 정렬 LEFT - 왼쪽 정렬 / CENTER - 가운데 정렬 / RIGHT - 오른쪽 정렬
            //String footer_sort = "CENTER";  //메일내용, 풋터(수신옵션) 정렬 LEFT - 왼쪽 정렬 / CENTER - 가운데 정렬 / RIGHT - 오른쪽 정렬

            // 첨부파일의 URL을 보내면 DirectSend에서 파일을 download 받아 발송처리를 진행합니다. 첨부파일은 전체 10MB 이하로 발송을 해야 하며, 파일의 구분자는 '|(shift+\)'로 사용하며 5개까지만 첨부가 가능합니다.
            //String file_url = "http://localhost:8080/static/img/mail/00c75c02-f7e6-404a-89fc-967175c43da9_23_main_bg.png|https://directsend.co.kr/test1.png";
            // 첨부파일의 이름을 지정할 수 있도록 합니다.
            // 첨부파일의 이름은 순차적(https://directsend.co.kr/test.png - image.png, https://directsend.co.kr/test1.png - image2.png) 와 같이 적용이 되며, file_name을 지정하지 않은 경우 마지막의 파일의 이름으로 메일에 보여집니다.
            //String file_name = "image.png|image2.png";

            StringBuilder fileUrlSb = new StringBuilder();
            String file_url = null;
            String file_name = null;
            String imageBaseUrl = "http://www.meetingfan.store/static/img/mail/";
            if(mailRequestDTO.getFileUrl() != null){
                if(mailRequestDTO.getFileUrl().size() > 0){
                    for(int i=0; i<mailRequestDTO.getFileUrl().size(); i++){
                        fileUrlSb.append(imageBaseUrl);
                        fileUrlSb.append(mailRequestDTO.getFileUrl().get(i).getName());
                        if((i+1) != mailRequestDTO.getFileUrl().size()){
                            fileUrlSb.append("|");
                        }
                    }
                }
                file_url = fileUrlSb.toString();

                StringBuilder fileNameSb = new StringBuilder();
                if(mailRequestDTO.getFileUrl().size() > 0){
                    for(int i=0; i<mailRequestDTO.getFileUrl().size(); i++){
                        fileNameSb.append(mailRequestDTO.getFileUrl().get(i).getName().substring(mailRequestDTO.getFileUrl().get(i).getName().indexOf('_') + 1));
                        if((i+1) != mailRequestDTO.getFileUrl().size()){
                            fileNameSb.append("|");
                        }
                    }
                }
                file_name = fileNameSb.toString();
            }

            /* 여기까지 수정해주시기 바랍니다. */

            String urlParameters = "\"subject\":\"" + subject + "\" "
                    + ", \"body\":\"" + body + "\" "
                    + ", \"sender\":\"" + sender + "\" "
                    + ", \"sender_name\":\"" + sender_name + "\" "
                    + ", \"username\":\"" + username + "\" "
                    + ", \"receiver\":" + receiver;

                    if(mailRequestDTO.getTemplate() != null && !"".equals(mailRequestDTO.getTemplate())){
                        urlParameters += ", \"template\":\"" + mailRequestDTO.getTemplate() + "\" ";		//템플릿 사용할 경우 주석 해제  //발송 할 템플릿 번호
                    }
                    //+ ", \"address_books\":\"" + address_books + "\" "	//주소록 사용할 경우 주석 해제
                    //+ ", \"duplicate_yn\":\"" + duplicate_yn + "\" "      //중복 발송을 허용할 경우 주석 해제

                    // 예약 관련 파라미터 주석 해제
                    //+ ", \"mail_type\":\"" + mail_type + "\" "
                    //+ ", \"start_reserve_time\":\"" + start_reserve_time + "\" "
                    //+ ", \"end_reserve_time\":\"" + end_reserve_time + "\" "
                    //+ ", \"remained_count\":\"" + remained_count + "\" "

                    // 필수 안내문구 관련 파라미터 주석 해제
                    //+ ", \"agreement_text\":\"" + agreement_text + "\" "
                    //+ ", \"deny_text\":\"" + deny_text + "\" "
                    //+ ", \"sender_info_text\":\"" + sender_info_text + "\" "
                    //+ ", \"logo_path\":\"" + logo_path + "\" "
                    //+ ", \"logo_state\":\"" + logo_state + "\" "
                    //+ ", \"logo_sort\":\"" + logo_sort + "\" "

                    // 메일내용, 풋터(수신옵션) 정렬 사용할 경우 주석 해제
                    //+ ", \"footer_sort\":\"" + footer_sort + "\" "

                    // 메일 발송결과를 받고 싶은 URL     return_url이 있는 경우 주석해제 바랍니다.
                    //+ ", \"return_url_yn\": " + true        //return_url 사용시 필수 입력
                    //+ ", \"return_url\":\"" + return_url + "\" "		    //return_url 사용시 필수 입력

                    // 발송 결과 측정 항목을 사용할 경우 주석 해제
                    //+ ", \"open\":\"" + open + "\" "
                    //+ ", \"click\":\"" + click + "\" "
                    //+ ", \"check_period\":\"" + check_period + "\" "
                    //+ ", \"option_return_url\":\"" + option_return_url + "\" "

                    // 첨부 파일이 있는 경우 주석 해제
                    if(file_url != null && !"".equals(file_url)) {
                        urlParameters += ", \"file_url\":\"" + file_url + "\" "
                                + ", \"file_name\":\"" + file_name + "\" ";
                    }

            urlParameters +=  ", \"key\":\"" + key + "\" ";
            urlParameters = "{"+ urlParameters  +"}";		//JSON 데이터
            System.out.println("urlParameters : " + urlParameters);

            System.setProperty("jsse.enableSNIExtension", "false");
            con.setDoOutput(true);
            OutputStreamWriter wr = new OutputStreamWriter (con.getOutputStream(), StandardCharsets.UTF_8);
            wr.write(urlParameters);
            wr.flush();
            wr.close();

            int responseCode = con.getResponseCode();
            System.out.println(responseCode); // 200

            /*
             * responseCode 가 200 이 아니면 내부에서 문제가 발생한 케이스입니다.
             * directsend 관리자에게 문의해주시기 바랍니다.
             */

            java.io.BufferedReader in = new java.io.BufferedReader(
                    new java.io.InputStreamReader(con.getInputStream(), StandardCharsets.UTF_8));
            String inputLine;
            StringBuilder response = new StringBuilder();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }

            in.close();

            System.out.println("mail send response : " + response.toString()); // {"status":"0"}
            JSONParser parser = new JSONParser();
            JSONObject responseObj = (JSONObject) parser.parse(response.toString());
            String mailResponseCode = "";
            if(responseObj.get("status") != null){
                mailResponseCode = String.valueOf(responseObj.get("status"));

                if("0".equals(mailResponseCode)){
                    responseDto.setResultCode(CommConstants.RESULT_CODE_SUCCESS);
                    responseDto.setResultMessage(CommConstants.RESULT_MSG_SUCCESS);
                }else{
                    responseDto.setResultCode(CommConstants.RESULT_CODE_FAIL);
                    responseDto.setResultMessage("[" + mailResponseCode + "]" + responseObj.get("msg"));
                }
            }else{
                responseDto.setResultCode(CommConstants.RESULT_CODE_FAIL);
                responseDto.setResultMessage(CommConstants.RESULT_MSG_FAIL);
            }


            /*
             * response의 실패
             * {"status":101, "msg":"UTF-8 인코딩이 아닙니다."}
             * 실패 코드번호, 내용
             */

            /*
             * response 성공
             * {"status":0}
             * 성공 코드번호 (성공코드는 다이렉트센드 DB서버에 정상수신됨을 뜻하며 발송성공(실패)의 결과는 발송완료 이후 확인 가능합니다.)
             *
             * 잘못된 이메일 주소가 포함된 경우
             * {"status":0, "msg":"유효하지 않는 이메일을 제외하고 발송 완료 하였습니다.", "msg_detail":"error email : test2@test2, test3@test"}
             * 성공 코드번호 (성공코드는 다이렉트센드 DB서버에 정상수신됨을 뜻하며 발송성공(실패)의 결과는 발송완료 이후 확인 가능합니다.), 내용, 잘못된 데이터
             *
             */

            /*
                status code
                0   : 정상발송 (성공코드는 다이렉트센드 DB서버에 정상수신됨을 뜻하며 발송성공(실패)의 결과는 발송완료 이후 확인 가능합니다.)
                100 : POST validation 실패
                101 : 회원정보가 일치하지 않음
                102 : Subject, Body 정보가 없습니다.
                103 : Sender 이메일이 유효하지 않습니다.
                104 : receiver 이메일이 유효하지 않습니다.
                105 : 본문에 포함되면 안되는 확장자가 있습니다.
                106 : body validation 실패
                107 : 받는사람이 없습니다.
                108 : 예약정보가 유효하지 않습니다.
                109 : return_url이 없습니다.
                110 : 첨부파일이 없습니다.
                111 : 첨부파일의 개수가 5개를 초과합니다.
                112 : 파일의 총Size가 10 MB를 넘어갑니다.
                113 : 첨부파일이 다운로드 되지 않았습니다.
                114 : utf-8 인코딩 에러 발생
                115 : 템플릿 validation 실패
                200 : 동일 예약시간으로는 200회 이상 API 호출을 할 수 없습니다.
                201 : 분당 300회 이상 API 호출을 할 수 없습니다.
                202 : 발송자명이 최대길이를 초과 하였습니다.
                205 : 잔액부족
                999 : Internal Error.
             */

        }catch (IOException | ParseException me){
            me.printStackTrace();
        }

        return responseDto;
    }

    public ResponseDTO memberExcelUp(MultipartFile excelFile) {
        ResponseDTO rrVO = new ResponseDTO();
        try {
            OPCPackage opcPackage = OPCPackage.open(excelFile.getInputStream()); // 파일 읽어옴
            XSSFWorkbook workbook =  new XSSFWorkbook(opcPackage);

            XSSFSheet sheet = workbook.getSheetAt(0);

            // 입력된 행의 수만큼 반복
            for(int i=1;i<=sheet.getLastRowNum();i++) {
                XSSFRow row = sheet.getRow(i); // i번째 행 가져옴
                XSSFCell cell = null;

                if(row == null) continue;

                // 0번째 열
                cell = row.getCell(0);
                // Cell 값이 null 일 수도 있으므로 체크
                if(cell != null)
                {
                    cell.setCellType(CellType.STRING); // 숫자만 입력받는 경우를 대비해 STRING 처리
                    //System.out.println(cell.getStringCellValue().replace(" ", "")); // 공백처리
                }

            }

        }catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return rrVO;
    }

}
