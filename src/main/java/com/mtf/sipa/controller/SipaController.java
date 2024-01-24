package com.mtf.sipa.controller;

import com.mtf.sipa.constants.CommConstants;
import com.mtf.sipa.dto.*;
import com.mtf.sipa.service.CommService;
import com.mtf.sipa.service.SipaService;
import org.json.simple.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.nio.file.Files;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class SipaController {

    // 필드 주입이 아닌 생성자 주입형태로 사용합니다. '생성자 주입 형태'로 사용합니다.
    private final SipaService sipaService;

    private final CommService commService;

    public SipaController(SipaService ks, CommService cs){
        this.sipaService = ks;
        this.commService = cs;
    }

    //***************************************************************************
    // Home
    //***************************************************************************

    @RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView home() {
        System.out.println("SipaController > home : ======");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/logout.do", method = RequestMethod.GET)
    public ModelAndView logout(HttpSession session, ModelAndView mv) {
        System.out.println("SipaController > logout");
        sipaService.logoutCheck(session);
        mv.setViewName("index");
        return mv;
    }

    @RequestMapping(value = "/main.do", method = RequestMethod.GET)
    public ModelAndView main() {
        System.out.println("SipaController > main");
        ModelAndView mv = new ModelAndView();

        /* 팝업파일정보 */
        PopupDTO popupDTO = new PopupDTO();
        popupDTO.setUseYn("Y");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String today = dateFormat.format(new Date());
        popupDTO.setToday(today);
        List<PopupDTO> popupList = sipaService.processSelectMainPopupList(popupDTO);
        mv.addObject("popupList", popupList);

        /* 배너 */
        BannerDTO bannerDTO = new BannerDTO();
        List<BannerDTO> bannerList = sipaService.processSelectMainBannerList(bannerDTO);
        List<FileDTO> bannerFileList = new ArrayList<>();
        if(bannerList != null){
            for(int i=0; i<bannerList.size(); i++){
                String fileIdList = bannerList.get(i).getFileIdList();
                if(fileIdList != null){
                    String[] fileIdSplit = bannerList.get(i).getFileIdList().split(",");
                    for(int j=0; j<fileIdSplit.length; j++){
                        FileDTO fileReq = new FileDTO();
                        fileReq.setId(fileIdSplit[j]);
                        FileDTO fileDTO = sipaService.processSelectFileIdSingle(fileReq);
                        bannerFileList.add(fileDTO);
                    }
                }
            }
        }
        mv.addObject("bannerList", bannerFileList);

        /* SIPA-NEWS */
        SipaNewsDTO sipaNewsDTO = new SipaNewsDTO();
        sipaNewsDTO.setLang("KO");
        List<SipaNewsDTO> sipaNewsList = sipaService.processSelectMainSipaNewsList(sipaNewsDTO);
        mv.addObject("sipaNewsList", sipaNewsList);

        /* 공지사항 */
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setLang("KO");
        List<NoticeDTO> noticeList = sipaService.processSelectMainNoticeList(noticeDTO);
        mv.addObject("noticeList", noticeList);

        /* 회원사 소개 슬라이드 */
        List<CompanyDTO> companyList = sipaService.processSelectMainCompanyList();
        mv.addObject("companyList", companyList);

        mv.setViewName("main");
        return mv;
    }

    //***************************************************************************
    // community Folder
    //***************************************************************************

    @RequestMapping(value = "/community/contact.do", method = RequestMethod.GET)
    public ModelAndView community_contact() {
        System.out.println("SipaController > community_contact");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/community/contact");
        return mv;
    }

    @RequestMapping(value = "/community/event.do", method = RequestMethod.GET)
    public ModelAndView community_event() {
        System.out.println("SipaController > community_event");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/community/event");
        return mv;
    }

    @RequestMapping(value = "/community/event/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<EventDTO>> community_event_selectList(@RequestBody EventDTO eventDTO) {
        System.out.println("SipaController > community_event_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<EventDTO> responseDTO = sipaService.processSelectEventListPaging(eventDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/community/event/calendar/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<EventDTO>> community_event_calendar_selectList(@RequestBody EventDTO eventDTO) {
        System.out.println("SipaController > community_event_calendar_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<EventDTO> responseDTO = sipaService.processSelectEventCalendarList(eventDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/community/gallery.do", method = RequestMethod.GET)
    public ModelAndView community_gallery() {
        System.out.println("SipaController > community_gallery");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/community/gallery");
        return mv;
    }

    @RequestMapping(value = "/community/notice.do", method = RequestMethod.GET)
    public ModelAndView community_notice() {
        System.out.println("SipaController > community_notice");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/community/notice");
        return mv;
    }

    @RequestMapping(value = "/community/notice/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<NoticeDTO>> community_notice_selectList(@RequestBody NoticeDTO noticeDTO) {
        System.out.println("SipaController > community_notice_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<NoticeDTO> responseDTO = sipaService.processSelectNoticeListPaging(noticeDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/community/notice/detail.do", method = RequestMethod.GET)
    public ModelAndView community_notice_detail(String seq) {
        System.out.println("SipaController > community_notice_detail");
        ModelAndView mv = new ModelAndView();

        NoticeDTO info = sipaService.processSelectNoticeSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }

        mv.setViewName("/community/notice/detail");
        return mv;
    }

    @RequestMapping(value = "/community/news.do", method = RequestMethod.GET)
    public ModelAndView community_news() {
        System.out.println("SipaController > community_news");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/community/news");
        return mv;
    }

    @RequestMapping(value = "/community/news/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<SipaNewsDTO>> community_news_selectList(@RequestBody SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaController > community_news_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<SipaNewsDTO> responseList = sipaService.processSelectNewsListPaging(sipaNewsDTO);

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    @RequestMapping(value = "/community/news/detail.do", method = RequestMethod.GET)
    public ModelAndView community_news_detail(String seq) {
        System.out.println("SipaController > community_news_detail");
        ModelAndView mv = new ModelAndView();

        SipaNewsDTO info = sipaService.processSelectNewsSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }

        mv.setViewName("/community/news/detail");
        return mv;
    }

    //***************************************************************************
    // introduce Folder
    //***************************************************************************

    @RequestMapping(value = "/introduce/business.do", method = RequestMethod.GET)
    public ModelAndView introduce_business() {
        System.out.println("SipaController > introduce_business");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/introduce/business");
        return mv;
    }

    @RequestMapping(value = "/introduce/vision.do", method = RequestMethod.GET)
    public ModelAndView introduce_vision() {
        System.out.println("SipaController > introduce_vision");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/introduce/vision");
        return mv;
    }

    @RequestMapping(value = "/introduce/history.do", method = RequestMethod.GET)
    public ModelAndView introduce_history() {
        System.out.println("SipaController > introduce_history");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/introduce/history");
        return mv;
    }

    @RequestMapping(value = "/introduce/way.do", method = RequestMethod.GET)
    public ModelAndView introduce_way() {
        System.out.println("SipaController > introduce_way");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/introduce/way");
        return mv;
    }

    @RequestMapping(value = "/introduce/greeting.do", method = RequestMethod.GET)
    public ModelAndView introduce_greeting() {
        System.out.println("SipaController > introduce_greeting");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/introduce/greeting");
        return mv;
    }

    //***************************************************************************
    // member Folder
    //***************************************************************************

    @RequestMapping(value = "/member/ascdirectors.do", method = RequestMethod.GET)
    public ModelAndView member_ascdirectors() {
        System.out.println("SipaController > member_ascdirectors");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/ascdirectors");
        return mv;
    }

    @RequestMapping(value = "/member/ascdirectors/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<AscdirectorsDTO>> member_ascdirectors_selectList(@RequestBody AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaController > member_ascdirectors_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<AscdirectorsDTO> responseDTO = sipaService.processSelectAscdirectorsListPaging(ascdirectorsDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/detailA.do", method = RequestMethod.GET)
    public ModelAndView member_detailA(String seq) {
        System.out.println("SipaController > member_detailA");
        ModelAndView mv = new ModelAndView();

        // 협회이사
        AscdirectorsDTO info = sipaService.processSelectAscdirectorsSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/member/detailA");
        return mv;
    }

    @RequestMapping(value = "/member/adviser.do", method = RequestMethod.GET)
    public ModelAndView member_adviser() {
        System.out.println("SipaController > member_adviser");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/adviser");
        return mv;
    }

    @RequestMapping(value = "/member/adviser/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<AdviserDTO>> member_adviser_selectList(@RequestBody AdviserDTO adviserDTO) {
        System.out.println("SipaController > member_adviser_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<AdviserDTO> responseDTO = sipaService.processSelectAdviserListPaging(adviserDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/detailB.do", method = RequestMethod.GET)
    public ModelAndView member_detailB(String seq) {
        System.out.println("SipaController > member_detailB");
        ModelAndView mv = new ModelAndView();

        // 고문위원
        AdviserDTO info = sipaService.processSelectAdviserSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("representImage".equals(fileInfo.getNote())){
                        mv.addObject("representImageFileInfo", fileInfo);
                    }
                }
            }
        }

        mv.setViewName("/member/detailB");
        return mv;
    }

    @RequestMapping(value = "/member/consultation.do", method = RequestMethod.GET)
    public ModelAndView member_consultation() {
        System.out.println("SipaController > member_consultation");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/consultation");
        return mv;
    }

    @RequestMapping(value = "/member/consultation/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<ConsultationDTO>> member_consultation_selectList(@RequestBody ConsultationDTO consultationDTO) {
        System.out.println("SipaController > member_consultation_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<ConsultationDTO> responseDTO = sipaService.processSelectConsultationListPaging(consultationDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/regular.do", method = RequestMethod.GET)
    public ModelAndView member_regular() {
        System.out.println("SipaController > member_regular");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/regular");
        return mv;
    }

    @RequestMapping(value = "/member/regular/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<CompanyDTO>> member_regular_selectList(@RequestBody CompanyDTO companyDTO) {
        System.out.println("SipaController > member_regular_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<CompanyDTO> responseDTO = sipaService.processSelectCompanyListPaging(companyDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/detailD.do", method = RequestMethod.GET)
    public ModelAndView member_detailD(String seq) {
        System.out.println("SipaController > member_detailD");
        ModelAndView mv = new ModelAndView();

        CompanyDTO info = sipaService.processSelectCompanySingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/member/detailD");
        return mv;
    }

    @RequestMapping(value = "/member/ascmembers.do", method = RequestMethod.GET)
    public ModelAndView member_ascmembers() {
        System.out.println("SipaController > member_ascmembers");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/ascmembers");
        return mv;
    }

    @RequestMapping(value = "/member/ascmembers/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<CompanyDTO>> member_ascmembers_selectList(@RequestBody CompanyDTO companyDTO) {
        System.out.println("SipaController > member_ascmembers_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<CompanyDTO> responseDTO = sipaService.processSelectCompanyListPaging(companyDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/detailC.do", method = RequestMethod.GET)
    public ModelAndView member_detailC(String seq) {
        System.out.println("SipaController > member_detailC");
        ModelAndView mv = new ModelAndView();

        CompanyDTO info = sipaService.processSelectCompanySingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/member/detailC");
        return mv;
    }

    @RequestMapping(value = "/member/partnership.do", method = RequestMethod.GET)
    public ModelAndView member_partnership() {
        System.out.println("SipaController > member_partnership");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/member/partnership");
        return mv;
    }

    @RequestMapping(value = "/member/partnership/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<PartnershipDTO>> member_partnership_selectList(@RequestBody PartnershipDTO partnershipDTO) {
        System.out.println("SipaController > member_partnership_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<PartnershipDTO> responseDTO = sipaService.processSelectPartnershipListPaging(partnershipDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/member/detailE.do", method = RequestMethod.GET)
    public ModelAndView member_detailE(String seq) {
        System.out.println("SipaController > member_detailE");
        ModelAndView mv = new ModelAndView();

        PartnershipDTO info = sipaService.processSelectPartnershipSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/member/detailE");
        return mv;
    }

    //***************************************************************************
    // service Folder
    //***************************************************************************

    @RequestMapping(value = "/service/benefits.do", method = RequestMethod.GET)
    public ModelAndView service_benefits() {
        System.out.println("SipaController > service_benefits");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/service/benefits");
        return mv;
    }

    @RequestMapping(value = "/service/faq.do", method = RequestMethod.GET)
    public ModelAndView service_faq() {
        System.out.println("SipaController > service_faq");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/service/faq");
        return mv;
    }

    @RequestMapping(value = "/service/faq/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<FaqDTO>> service_faq_selectList(@RequestBody FaqDTO faqDTO) {
        System.out.println("SipaController > service_faq_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<FaqDTO> responseDTO = sipaService.processSelectFaqListPaging(faqDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/service/guide.do", method = RequestMethod.GET)
    public ModelAndView service_guide() {
        System.out.println("SipaController > service_guide");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/service/guide");
        return mv;
    }

    //***************************************************************************
    // support Folder
    //***************************************************************************

    @RequestMapping(value = "/support/bidanm.do", method = RequestMethod.GET)
    public ModelAndView support_bidanm() {
        System.out.println("SipaController > support_bidanm");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/support/bidanm");
        return mv;
    }

    @RequestMapping(value = "/support/bidanm/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<BidanmDTO>> support_bidanm_selectList(@RequestBody BidanmDTO bidanmDTO) {
        System.out.println("SipaController > support_bidanm_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<BidanmDTO> responseDTO = sipaService.processSelectBidanmListPaging(bidanmDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/support/bidanm/detail.do", method = RequestMethod.GET)
    public ModelAndView support_bidanm_detail(String seq) {
        System.out.println("SipaController > support_bidanm_detail");
        ModelAndView mv = new ModelAndView();

        BidanmDTO info = sipaService.processSelectBidanmSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }

        mv.setViewName("/support/bidanm/detail");
        return mv;
    }

    @RequestMapping(value = "/support/bizanm.do", method = RequestMethod.GET)
    public ModelAndView support_bizanm() {
        System.out.println("SipaController > support_bizanm");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/support/bizanm");
        return mv;
    }

    @RequestMapping(value = "/support/bizanm/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<BizanmDTO>> support_bizanm_selectList(@RequestBody BizanmDTO bizanmDTO) {
        System.out.println("SipaController > support_bizanm_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<BizanmDTO> responseDTO = sipaService.processSelectBizanmListPaging(bizanmDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/support/bizanm/detail.do", method = RequestMethod.GET)
    public ModelAndView support_bizanm_detail(String seq) {
        System.out.println("SipaController > support_bizanm_detail");
        ModelAndView mv = new ModelAndView();

        BizanmDTO info = sipaService.processSelectBizanmSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }

        mv.setViewName("/support/bizanm/detail");
        return mv;
    }

    @RequestMapping(value = "/support/issue.do", method = RequestMethod.GET)
    public ModelAndView support_issue() {
        System.out.println("SipaController > support_issue");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/support/issue");
        return mv;
    }

    @RequestMapping(value = "/support/issue/selectList.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<IssueDTO>> support_issue_selectList(@RequestBody IssueDTO issueDTO) {
        System.out.println("SipaController > support_issue_selectList");
        //System.out.println(mainOnlineDTO.toString());

        List<IssueDTO> responseDTO = sipaService.processSelectIssueListPaging(issueDTO);

        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/support/issue/detail.do", method = RequestMethod.GET)
    public ModelAndView support_issue_detail(String seq) {
        System.out.println("SipaController > support_issue_detail");
        ModelAndView mv = new ModelAndView();

        IssueDTO info = sipaService.processSelectIssueSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }
        mv.setViewName("/support/issue/detail");
        return mv;
    }

    //***************************************************************************
    // eng Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/index.do", method = RequestMethod.GET)
    public ModelAndView eng_index() {
        System.out.println("SipaController > eng_index");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/index");
        return mv;
    }

    @RequestMapping(value = "/eng/main.do", method = RequestMethod.GET)
    public ModelAndView eng_main() {
        System.out.println("SipaController > eng_main");
        ModelAndView mv = new ModelAndView();

        /* 팝업파일정보 */
        PopupDTO popupDTO = new PopupDTO();
        popupDTO.setUseYn("Y");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String today = dateFormat.format(new Date());
        popupDTO.setToday(today);
        List<PopupDTO> popupList = sipaService.processSelectMainPopupList(popupDTO);
        mv.addObject("popupList", popupList);

        /* 배너 */
        BannerDTO bannerDTO = new BannerDTO();
        List<BannerDTO> bannerList = sipaService.processSelectMainBannerList(bannerDTO);
        List<FileDTO> bannerFileList = new ArrayList<>();
        if(bannerList != null){
            for(int i=0; i<bannerList.size(); i++){
                String fileIdList = bannerList.get(i).getFileIdList();
                if(fileIdList != null){
                    String[] fileIdSplit = bannerList.get(i).getFileIdList().split(",");
                    for(int j=0; j<fileIdSplit.length; j++){
                        FileDTO fileReq = new FileDTO();
                        fileReq.setId(fileIdSplit[j]);
                        FileDTO fileDTO = sipaService.processSelectFileIdSingle(fileReq);
                        bannerFileList.add(fileDTO);
                    }
                }
            }
        }
        mv.addObject("bannerList", bannerFileList);

        /* SIPA-NEWS */
        SipaNewsDTO sipaNewsDTO = new SipaNewsDTO();
        sipaNewsDTO.setLang("EN");
        List<SipaNewsDTO> sipaNewsList = sipaService.processSelectMainSipaNewsList(sipaNewsDTO);
        mv.addObject("sipaNewsList", sipaNewsList);

        /* 공지사항 */
        NoticeDTO noticeDTO = new NoticeDTO();
        noticeDTO.setLang("EN");
        List<NoticeDTO> noticeList = sipaService.processSelectMainNoticeList(noticeDTO);
        mv.addObject("noticeList", noticeList);

        /* 회원사 소개 슬라이드 */
        List<CompanyDTO> companyList = sipaService.processSelectMainCompanyList();
        mv.addObject("companyList", companyList);

        mv.setViewName("/eng/main");
        return mv;
    }

    //***************************************************************************
    // community Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/community/contact.do", method = RequestMethod.GET)
    public ModelAndView eng_community_contact() {
        System.out.println("SipaController > eng_community_contact");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/community/contact");
        return mv;
    }

    @RequestMapping(value = "/eng/community/event.do", method = RequestMethod.GET)
    public ModelAndView eng_community_event() {
        System.out.println("SipaController > eng_community_event");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/community/event");
        return mv;
    }

    @RequestMapping(value = "/eng/community/gallery.do", method = RequestMethod.GET)
    public ModelAndView eng_community_gallery() {
        System.out.println("SipaController > eng_community_gallery");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/community/gallery");
        return mv;
    }

    @RequestMapping(value = "/eng/community/notice.do", method = RequestMethod.GET)
    public ModelAndView eng_community_notice() {
        System.out.println("SipaController > eng_community_notice");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/community/notice");
        return mv;
    }

    @RequestMapping(value = "/eng/community/notice/detail.do", method = RequestMethod.GET)
    public ModelAndView eng_community_notice_detail(String seq) {
        System.out.println("SipaController > eng_community_notice_detail");
        ModelAndView mv = new ModelAndView();

        NoticeDTO info = sipaService.processSelectNoticeSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }
        mv.setViewName("/eng/community/notice/detail");
        return mv;
    }

    @RequestMapping(value = "/eng/community/news.do", method = RequestMethod.GET)
    public ModelAndView eng_community_news() {
        System.out.println("SipaController > eng_community_news");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/community/news");
        return mv;
    }

    @RequestMapping(value = "/eng/community/news/detail.do", method = RequestMethod.GET)
    public ModelAndView eng_community_news_detail(String seq) {
        System.out.println("SipaController > eng_community_news_detail");
        ModelAndView mv = new ModelAndView();

        SipaNewsDTO info = sipaService.processSelectNewsSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            mv.addObject("fileList", fileList);
        }

        mv.setViewName("/eng/community/news/detail");
        return mv;
    }

    //***************************************************************************
    // introduce Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/introduce/business.do", method = RequestMethod.GET)
    public ModelAndView eng_introduce_business() {
        System.out.println("SipaController > eng_introduce_business");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/introduce/business");
        return mv;
    }

    @RequestMapping(value = "/eng/introduce/vision.do", method = RequestMethod.GET)
    public ModelAndView eng_introduce_vision() {
        System.out.println("SipaController > eng_introduce_vision");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/introduce/vision");
        return mv;
    }

    @RequestMapping(value = "/eng/introduce/history.do", method = RequestMethod.GET)
    public ModelAndView eng_introduce_history() {
        System.out.println("SipaController > eng_introduce_history");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/introduce/history");
        return mv;
    }

    @RequestMapping(value = "/eng/introduce/way.do", method = RequestMethod.GET)
    public ModelAndView eng_introduce_way() {
        System.out.println("SipaController > eng_introduce_way");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/introduce/way");
        return mv;
    }

    @RequestMapping(value = "/eng/introduce/greeting.do", method = RequestMethod.GET)
    public ModelAndView eng_introduce_greeting() {
        System.out.println("SipaController > eng_introduce_greeting");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/introduce/greeting");
        return mv;
    }

    //***************************************************************************
    // member Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/member/ascdirectors.do", method = RequestMethod.GET)
    public ModelAndView eng_member_ascdirectors() {
        System.out.println("SipaController > eng_member_ascdirectors");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/ascdirectors");
        return mv;
    }

    @RequestMapping(value = "/eng/member/detailA.do", method = RequestMethod.GET)
    public ModelAndView eng_member_detailA(String seq) {
        System.out.println("SipaController > eng_member_detailA");
        ModelAndView mv = new ModelAndView();

        // 협회이사
        AscdirectorsDTO info = sipaService.processSelectAscdirectorsSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/eng/member/detailA");
        return mv;
    }

    @RequestMapping(value = "/eng/member/detailB.do", method = RequestMethod.GET)
    public ModelAndView eng_member_detailB(String seq) {
        System.out.println("SipaController > eng_member_detailB");
        ModelAndView mv = new ModelAndView();

        // 고/자문위원
        AdviserDTO info = sipaService.processSelectAdviserSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("representImage".equals(fileInfo.getNote())){
                        mv.addObject("representImageFileInfo", fileInfo);
                    }
                }
            }
        }

        mv.setViewName("/eng/member/detailB");
        return mv;
    }

    @RequestMapping(value = "/eng/member/detailC.do", method = RequestMethod.GET)
    public ModelAndView eng_member_detailC(String seq) {
        System.out.println("SipaController > member_detailC");
        ModelAndView mv = new ModelAndView();

        CompanyDTO info = sipaService.processSelectCompanySingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/eng/member/detailC");
        return mv;
    }

    @RequestMapping(value = "/eng/member/detailD.do", method = RequestMethod.GET)
    public ModelAndView eng_member_detailD(String seq) {
        System.out.println("SipaController > eng_member_detailD");
        ModelAndView mv = new ModelAndView();

        CompanyDTO info = sipaService.processSelectCompanySingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/eng/member/detailD");
        return mv;
    }

    @RequestMapping(value = "/eng/member/detailE.do", method = RequestMethod.GET)
    public ModelAndView eng_member_detailE(String seq) {
        System.out.println("SipaController > eng_member_detailE");
        ModelAndView mv = new ModelAndView();

        PartnershipDTO info = sipaService.processSelectPartnershipSingle(seq);
        mv.addObject("info", info);

        if(info != null){
            List<FileDTO> fileList = sipaService.processSelectFileList(info.getSeq());
            if(fileList != null && !fileList.isEmpty()){
                for(FileDTO fileInfo : fileList){
                    if("logo".equals(fileInfo.getNote())){
                        mv.addObject("logoFileInfo", fileInfo);
                    }else if("intro".equals(fileInfo.getNote())){
                        mv.addObject("introFileInfo", fileInfo);
                    }else if("field".equals(fileInfo.getNote())){
                        mv.addObject("fieldFileInfo", fileInfo);
                    }
                }
            }

            mv.addObject("fileList", fileList);

        }

        mv.setViewName("/eng/member/detailE");
        return mv;
    }

    @RequestMapping(value = "/eng/member/adviser.do", method = RequestMethod.GET)
    public ModelAndView eng_member_adviser() {
        System.out.println("SipaController > eng_member_adviser");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/adviser");
        return mv;
    }

    @RequestMapping(value = "/eng/member/consultation.do", method = RequestMethod.GET)
    public ModelAndView eng_member_consultation() {
        System.out.println("SipaController > eng_member_consultation");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/consultation");
        return mv;
    }

    @RequestMapping(value = "/eng/member/regular.do", method = RequestMethod.GET)
    public ModelAndView eng_member_regular() {
        System.out.println("SipaController > eng_member_regular");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/regular");
        return mv;
    }

    @RequestMapping(value = "/eng/member/ascmembers.do", method = RequestMethod.GET)
    public ModelAndView eng_member_ascmembers() {
        System.out.println("SipaController > eng_member_ascmembers");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/ascmembers");
        return mv;
    }

    @RequestMapping(value = "/eng/member/partnership.do", method = RequestMethod.GET)
    public ModelAndView eng_member_partnership() {
        System.out.println("SipaController > eng_member_partnership");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/member/partnership");
        return mv;
    }

    //***************************************************************************
    // service Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/service/benefits.do", method = RequestMethod.GET)
    public ModelAndView eng_service_benefits() {
        System.out.println("SipaController > eng_service_benefits");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/service/benefits");
        return mv;
    }

    @RequestMapping(value = "/eng/service/faq.do", method = RequestMethod.GET)
    public ModelAndView eng_service_faq() {
        System.out.println("SipaController > eng_service_faq");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/service/faq");
        return mv;
    }

    @RequestMapping(value = "/eng/service/guide.do", method = RequestMethod.GET)
    public ModelAndView eng_service_guide() {
        System.out.println("SipaController > eng_service_guide");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/service/guide");
        return mv;
    }

    //***************************************************************************
    // support Folder
    //***************************************************************************

    @RequestMapping(value = "/eng/support/bidanm.do", method = RequestMethod.GET)
    public ModelAndView eng_support_bidanm() {
        System.out.println("SipaController > eng_support_bidanm");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/bidanm");
        return mv;
    }

    @RequestMapping(value = "/eng/support/bidanm/detail.do", method = RequestMethod.GET)
    public ModelAndView eng_support_bidanm_detail() {
        System.out.println("SipaController > eng_support_bidanm_detail");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/bidanm/detail");
        return mv;
    }

    @RequestMapping(value = "/eng/support/bizanm.do", method = RequestMethod.GET)
    public ModelAndView eng_support_bizanm() {
        System.out.println("SipaController > eng_support_bizanm");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/bizanm");
        return mv;
    }

    @RequestMapping(value = "/eng/support/bizanm/detail.do", method = RequestMethod.GET)
    public ModelAndView eng_support_bizanm_detail() {
        System.out.println("SipaController > eng_support_bizanm_detail");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/bizanm/detail");
        return mv;
    }

    @RequestMapping(value = "/eng/support/issue.do", method = RequestMethod.GET)
    public ModelAndView eng_support_issue() {
        System.out.println("SipaController > eng_support_issue");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/issue");
        return mv;
    }

    @RequestMapping(value = "/eng/support/issue/detail.do", method = RequestMethod.GET)
    public ModelAndView eng_support_issue_detail() {
        System.out.println("SipaController > eng_support_issue_detail");
        ModelAndView mv = new ModelAndView();
        mv.setViewName("/eng/support/issue/detail");
        return mv;
    }

    //***************************************************************************
    // Common
    //***************************************************************************

    /**
     * Upload file response entity.
     *
     * @return the response entity
     */
    @RequestMapping(value = "/uploadFile.do", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity uploadFile(MultipartFile[] uploadFiles, String uploadFilePath) {

        //System.out.println(uploadFilePath); // exhibitor/{id}
        System.out.println(uploadFiles.toString());

        JSONObject obj = new JSONObject();
        ResponseDTO response = new ResponseDTO();
        String resultCode = CommConstants.RESULT_CODE_SUCCESS;
        String resultMessage = CommConstants.RESULT_MSG_SUCCESS;
        if(uploadFiles != null) {
            for (MultipartFile multipartFile : uploadFiles) {
                try {
                    /* Prod */
                    String path = ResourceUtils.getFile("./tomcat/webapps/upload/" + uploadFilePath).toPath().toString();

                    /* Local */
                    //String path = ResourceUtils.getFile("C:/Users/slhge/project/Kibs/upload/" + uploadFilePath).toPath().toString();

                    File folder = new File(path);

                    // 해당 디렉토리가 없을경우 디렉토리를 생성
                    if (!folder.exists()) {
                        Files.createDirectories(folder.toPath());
                    }

                    String fileName = generateFileName(multipartFile);
                    File tmp = new File(path + "/" + fileName);
                    multipartFile.transferTo(tmp);
                } catch (Exception e) {
                    String eMessage = "[UPLOAD] Error : ";
                    resultCode = CommConstants.RESULT_CODE_FAIL;
                    resultMessage = String.format("%s - %s", eMessage, e.getMessage() == null ? "" : e.getMessage());
                }
            }
        }

        response.setResultCode(resultCode);
        response.setResultMessage(resultMessage);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    private String generateFileName(MultipartFile multipartFile) {
        Calendar cal = Calendar.getInstance();
        Date date = cal.getTime();
        return new SimpleDateFormat("yyyyMMdd").format(date)+"_"+multipartFile.getOriginalFilename();
    }

    public HashMap<String, Object> convertMap(HttpServletRequest request) {
        HashMap<String, Object> hm = new HashMap<String, Object>();
        String key;
        Enumeration<?> en = request.getParameterNames();
        while ( en.hasMoreElements()){
            key = (String) en.nextElement();
            if (request.getParameterValues(key).length > 1) {
                hm.put(key, request.getParameterValues(key));
            } else {
                hm.put(key, request.getParameter(key));
            }
        }
        return hm;
    }

    /**
     * Robots string.
     *
     * @return the string
     */
    /* robots.txt */
    @RequestMapping(value = "/robots.txt")
    @ResponseBody
    public String robots() {
        return "User-agent: *\nAllow: /\n";
    }

}
