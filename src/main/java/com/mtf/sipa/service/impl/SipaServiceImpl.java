package com.mtf.sipa.service.impl;

import com.mtf.sipa.dto.*;
import com.mtf.sipa.mapper.SipaMapper;
import com.mtf.sipa.service.SipaService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class SipaServiceImpl implements SipaService {

    private static final String STR_RESULT_H = "%s - %s";

    @Setter(onMethod_ = {@Autowired})
    private SipaMapper sipaMapper;

    @Override
    public void logoutCheck(HttpSession session) {
        session.invalidate(); // 세션 초기화
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<PopupDTO> processSelectMainPopupList(PopupDTO popupDTO) {
        System.out.println("SipaServiceImpl > processSelectMainPopupList");
        return sipaMapper.selectMainPopupList(popupDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<BannerDTO> processSelectMainBannerList(BannerDTO bannerDTO) {
        System.out.println("SipaServiceImpl > processSelectMainBannerList");
        return sipaMapper.selectMainBannerList(bannerDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<SipaNewsDTO> processSelectMainSipaNewsList(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaServiceImpl > processSelectMainSipaNewsList");
        return sipaMapper.selectMainSipaNewsList(sipaNewsDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<NoticeDTO> processSelectMainNoticeList(NoticeDTO noticeDTO) {
        System.out.println("SipaServiceImpl > processSelectMainNoticeList");
        return sipaMapper.selectMainNoticeList(noticeDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<CompanyDTO> processSelectMainCompanyList() {
        System.out.println("SipaServiceImpl > processSelectMainCompanyList");
        return sipaMapper.selectMainCompanyList();
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<AscdirectorsDTO> processSelectAscdirectorsListPaging(AscdirectorsDTO ascdirectorsDTO) {
        System.out.println("SipaServiceImpl > processSelectAscdirectorsListPaging");
        return sipaMapper.selectAscdirectorsListPaging(ascdirectorsDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public AscdirectorsDTO processSelectAscdirectorsSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectAscdirectorsSingle");
        return sipaMapper.selectAscdirectorsSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<AdviserDTO> processSelectAdviserListPaging(AdviserDTO adviserDTO) {
        System.out.println("SipaServiceImpl > processSelectAdviserListPaging");
        return sipaMapper.selectAdviserListPaging(adviserDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public AdviserDTO processSelectAdviserSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectAdviserSingle");
        return sipaMapper.selectAdviserSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<ConsultationDTO> processSelectConsultationListPaging(ConsultationDTO consultationDTO) {
        System.out.println("SipaServiceImpl > processSelectConsultationListPaging");
        return sipaMapper.selectConsultationListPaging(consultationDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<CompanyDTO> processSelectCompanyListPaging(CompanyDTO companyDTO) {
        System.out.println("SipaServiceImpl > processSelectCompanyListPaging");
        return sipaMapper.selectCompanyListPaging(companyDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public CompanyDTO processSelectCompanySingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectCompanySingle");
        return sipaMapper.selectCompanySingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<PartnershipDTO> processSelectPartnershipListPaging(PartnershipDTO partnershipDTO) {
        System.out.println("SipaServiceImpl > processSelectPartnershipListPaging");
        return sipaMapper.selectPartnershipListPaging(partnershipDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public PartnershipDTO processSelectPartnershipSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectPartnershipSingle");
        return sipaMapper.selectPartnershipSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<FaqDTO> processSelectFaqListPaging(FaqDTO faqDTO) {
        System.out.println("SipaServiceImpl > processSelectFaqListPaging");
        return sipaMapper.selectFaqListPaging(faqDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<BizanmDTO> processSelectBizanmListPaging(BizanmDTO bizanmDTO) {
        System.out.println("SipaServiceImpl > processSelectBizanmListPaging");
        return sipaMapper.selectBizanmListPaging(bizanmDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public BizanmDTO processSelectBizanmSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectBizanmSingle");
        return sipaMapper.selectBizanmSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<BidanmDTO> processSelectBidanmListPaging(BidanmDTO bidanmDTO) {
        System.out.println("SipaServiceImpl > processSelectBidanmListPaging");
        return sipaMapper.selectBidanmListPaging(bidanmDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public BidanmDTO processSelectBidanmSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectBidanmSingle");
        return sipaMapper.selectBidanmSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<IssueDTO> processSelectIssueListPaging(IssueDTO issueDTO) {
        System.out.println("SipaServiceImpl > processSelectIssueListPaging");
        return sipaMapper.selectIssueListPaging(issueDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public IssueDTO processSelectIssueSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectIssueSingle");
        return sipaMapper.selectIssueSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<NoticeDTO> processSelectNoticeListPaging(NoticeDTO noticeDTO) {
        System.out.println("SipaServiceImpl > processSelectNoticeListPaging");
        return sipaMapper.selectNoticeListPaging(noticeDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public NoticeDTO processSelectNoticeSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectNoticeSingle");
        return sipaMapper.selectNoticeSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<SipaNewsDTO> processSelectNewsListPaging(SipaNewsDTO sipaNewsDTO) {
        System.out.println("SipaServiceImpl > processSelectNewsListPaging");
        return sipaMapper.selectNewsListPaging(sipaNewsDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public SipaNewsDTO processSelectNewsSingle(String seq) {
        System.out.println("SipaServiceImpl > processSelectNewsSingle");
        return sipaMapper.selectNewsSingle(seq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<EventDTO> processSelectEventListPaging(EventDTO eventDTO) {
        System.out.println("SipaServiceImpl > processSelectEventListPaging");
        return sipaMapper.selectEventListPaging(eventDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<EventDTO> processSelectEventCalendarList(EventDTO eventDTO) {
        System.out.println("SipaServiceImpl > processSelectEventCalendarList");
        return sipaMapper.selectEventCalendarList(eventDTO);
    }

    /*************************************************
     * File
     * ***********************************************/

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public FileDTO processSelectFileIdSingle(FileDTO fileReq) {
        System.out.println("SipaServiceImpl > processSelectFileIdSingle");
        return sipaMapper.selectFileIdSingle(fileReq);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<FileDTO> processSelectFileList(String userId) {
        System.out.println("SipaServiceImpl > processSelectFileList");
        return sipaMapper.selectFileList(userId);
    }

}
