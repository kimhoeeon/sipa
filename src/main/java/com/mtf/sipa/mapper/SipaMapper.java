package com.mtf.sipa.mapper;

import com.mtf.sipa.dto.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SipaMapper {

    FileDTO selectFileIdSingle(FileDTO fileReq);

    List<FileDTO> selectFileList(String userId);

    List<PopupDTO> selectMainPopupList(PopupDTO popupDTO);

    List<BannerDTO> selectMainBannerList(BannerDTO bannerDTO);

    List<SipaNewsDTO> selectMainSipaNewsList(SipaNewsDTO sipaNewsDTO);

    List<NoticeDTO> selectMainNoticeList(NoticeDTO noticeDTO);

    List<CompanyDTO> selectMainCompanyList();

    List<AscdirectorsDTO> selectAscdirectorsListPaging(AscdirectorsDTO ascdirectorsDTO);

    AscdirectorsDTO selectAscdirectorsSingle(String seq);

    List<AdviserDTO> selectAdviserListPaging(AdviserDTO adviserDTO);

    AdviserDTO selectAdviserSingle(String seq);

    List<ConsultationDTO> selectConsultationListPaging(ConsultationDTO consultationDTO);

    List<CompanyDTO> selectCompanyListPaging(CompanyDTO companyDTO);

    CompanyDTO selectCompanySingle(String seq);

    List<PartnershipDTO> selectPartnershipListPaging(PartnershipDTO partnershipDTO);

    PartnershipDTO selectPartnershipSingle(String seq);

    List<FaqDTO> selectFaqListPaging(FaqDTO faqDTO);

    List<BizanmDTO> selectBizanmListPaging(BizanmDTO bizanmDTO);

    BizanmDTO selectBizanmSingle(String seq);

    List<BidanmDTO> selectBidanmListPaging(BidanmDTO bidanmDTO);

    BidanmDTO selectBidanmSingle(String seq);

    List<IssueDTO> selectIssueListPaging(IssueDTO issueDTO);

    IssueDTO selectIssueSingle(String seq);

    List<NoticeDTO> selectNoticeListPaging(NoticeDTO noticeDTO);

    NoticeDTO selectNoticeSingle(String seq);

    List<SipaNewsDTO> selectNewsListPaging(SipaNewsDTO sipaNewsDTO);

    SipaNewsDTO selectNewsSingle(String seq);

    List<EventDTO> selectEventListPaging(EventDTO eventDTO);

    List<EventDTO> selectEventCalendarList(EventDTO eventDTO);
}
