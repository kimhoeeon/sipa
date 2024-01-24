package com.mtf.sipa.service;

import com.mtf.sipa.dto.*;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface SipaService {

    void logoutCheck(HttpSession session);

    FileDTO processSelectFileIdSingle(FileDTO fileReq);

    List<FileDTO> processSelectFileList(String userId);

    List<PopupDTO> processSelectMainPopupList(PopupDTO popupDTO);

    List<BannerDTO> processSelectMainBannerList(BannerDTO bannerDTO);

    List<SipaNewsDTO> processSelectMainSipaNewsList(SipaNewsDTO sipaNewsDTO);

    List<NoticeDTO> processSelectMainNoticeList(NoticeDTO noticeDTO);

    List<CompanyDTO> processSelectMainCompanyList();

    List<AscdirectorsDTO> processSelectAscdirectorsListPaging(AscdirectorsDTO ascdirectorsDTO);

    AscdirectorsDTO processSelectAscdirectorsSingle(String seq);

    List<AdviserDTO> processSelectAdviserListPaging(AdviserDTO adviserDTO);

    AdviserDTO processSelectAdviserSingle(String seq);

    List<ConsultationDTO> processSelectConsultationListPaging(ConsultationDTO consultationDTO);

    List<CompanyDTO> processSelectCompanyListPaging(CompanyDTO companyDTO);

    CompanyDTO processSelectCompanySingle(String seq);

    List<PartnershipDTO> processSelectPartnershipListPaging(PartnershipDTO partnershipDTO);

    PartnershipDTO processSelectPartnershipSingle(String seq);

    List<FaqDTO> processSelectFaqListPaging(FaqDTO faqDTO);

    List<BizanmDTO> processSelectBizanmListPaging(BizanmDTO bizanmDTO);

    BizanmDTO processSelectBizanmSingle(String seq);

    List<BidanmDTO> processSelectBidanmListPaging(BidanmDTO bidanmDTO);

    BidanmDTO processSelectBidanmSingle(String seq);

    List<IssueDTO> processSelectIssueListPaging(IssueDTO issueDTO);

    IssueDTO processSelectIssueSingle(String seq);

    List<NoticeDTO> processSelectNoticeListPaging(NoticeDTO noticeDTO);

    NoticeDTO processSelectNoticeSingle(String seq);

    List<SipaNewsDTO> processSelectNewsListPaging(SipaNewsDTO sipaNewsDTO);

    SipaNewsDTO processSelectNewsSingle(String seq);

    List<EventDTO> processSelectEventListPaging(EventDTO eventDTO);

    List<EventDTO> processSelectEventCalendarList(EventDTO eventDTO);
}
