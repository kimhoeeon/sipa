package com.mtf.sipa.service;

import com.mtf.sipa.dto.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * The interface GoingSool service.
 */
public interface SipaMngService {

    /**
     * Login check customer dto.
     *
     * @param adminDTO the admin dto
     * @param session     the session
     * @return the customer dto
     */
    AdminDTO login(AdminDTO adminDTO, HttpSession session);

    /**
     * Logout check.
     *
     * @param session the session
     */
    void logoutCheck(HttpSession session);

    List<NoticeDTO> processSelectNoticeList(SearchDTO searchDTO);

    NoticeDTO processSelectNoticeSingle(NoticeDTO noticeDTO);

    ResponseDTO processDeleteNotice(NoticeDTO noticeDTO);

    ResponseDTO processUpdateNotice(NoticeDTO noticeDTO);

    ResponseDTO processInsertNotice(NoticeDTO noticeDTO);

    List<SipaNewsDTO> processSelectSipaNewsList(SearchDTO searchDTO);

    ResponseDTO processUpdateFileUserId(FileDTO fileDTO);

    List<FileDTO> processSelectFileUserIdList(FileDTO fileDTO);

    FileResponseDTO processUpdateFileUseN(FileDTO fileDTO);

    FileResponseDTO processInsertFileInfo(FileDTO fileDTO);

    List<?> uploadExcelFile(MultipartFile file);

    ResponseDTO processMailSend(MailRequestDTO mailRequestDTO);

    SipaNewsDTO processSelectSipaNewsSingle(SipaNewsDTO sipaNewsDTO);

    ResponseDTO processDeleteSipaNews(SipaNewsDTO sipaNewsDTO);

    ResponseDTO processUpdateSipaNews(SipaNewsDTO sipaNewsDTO);

    ResponseDTO processInsertSipaNews(SipaNewsDTO sipaNewsDTO);

    List<EventDTO> processSelectEventList(SearchDTO searchDTO);

    EventDTO processSelectEventSingle(EventDTO eventDTO);

    ResponseDTO processDeleteEvent(EventDTO eventDTO);

    ResponseDTO processUpdateEvent(EventDTO eventDTO);

    ResponseDTO processInsertEvent(EventDTO eventDTO);

    List<FaqDTO> processSelectFaqList(SearchDTO searchDTO);

    FaqDTO processSelectFaqSingle(FaqDTO faqDTO);

    ResponseDTO processDeleteFaq(FaqDTO faqDTO);

    ResponseDTO processUpdateFaq(FaqDTO faqDTO);

    ResponseDTO processInsertFaq(FaqDTO faqDTO);

    List<AscdirectorsDTO> processSelectAscdirectorsList(SearchDTO searchDTO);

    AscdirectorsDTO processSelectAscdirectorsSingle(AscdirectorsDTO ascdirectorsDTO);

    ResponseDTO processDeleteAscdirectors(AscdirectorsDTO ascdirectorsDTO);

    ResponseDTO processUpdateAscdirectors(AscdirectorsDTO ascdirectorsDTO);

    ResponseDTO processInsertAscdirectors(AscdirectorsDTO ascdirectorsDTO);

    List<AdviserDTO> processSelectAdviserList(SearchDTO searchDTO);

    AdviserDTO processSelectAdviserSingle(AdviserDTO adviserDTO);

    ResponseDTO processDeleteAdviser(AdviserDTO adviserDTO);

    ResponseDTO processUpdateAdviser(AdviserDTO adviserDTO);

    ResponseDTO processInsertAdviser(AdviserDTO adviserDTO);

    List<ConsultationDTO> processSelectConsultationList(SearchDTO searchDTO);

    ConsultationDTO processSelectConsultationSingle(ConsultationDTO consultationDTO);

    ResponseDTO processDeleteConsultation(ConsultationDTO consultationDTO);

    ResponseDTO processUpdateConsultation(ConsultationDTO consultationDTO);

    ResponseDTO processInsertConsultation(ConsultationDTO consultationDTO);

    List<CompanyDTO> processSelectCompanyList(SearchDTO searchDTO);

    CompanyDTO processSelectCompanySingle(CompanyDTO companyDTO);

    ResponseDTO processDeleteCompany(CompanyDTO companyDTO);

    ResponseDTO processUpdateCompany(CompanyDTO companyDTO);

    ResponseDTO processInsertCompany(CompanyDTO companyDTO);

    List<PartnershipDTO> processSelectPartnershipList(SearchDTO searchDTO);

    PartnershipDTO processSelectPartnershipSingle(PartnershipDTO partnershipDTO);

    ResponseDTO processDeletePartnership(PartnershipDTO partnershipDTO);

    ResponseDTO processUpdatePartnership(PartnershipDTO partnershipDTO);

    ResponseDTO processInsertPartnership(PartnershipDTO partnershipDTO);

    List<PopupDTO> processSelectPopupList(SearchDTO searchDTO);

    PopupDTO processSelectPopupSingle(String seq);

    ResponseDTO processUpdatePopup(PopupDTO popupDTO);

    ResponseDTO processInsertPopup(PopupDTO popupDTO);

    ResponseDTO processDeletePopup(PopupDTO popupDTO);

    List<BannerDTO> processSelectBannerList(SearchDTO searchDTO);

    BannerDTO processSelectBannerSingle(BannerDTO bannerDTO);

    ResponseDTO processDeleteBanner(BannerDTO bannerDTO);

    ResponseDTO processUpdateBanner(BannerDTO bannerDTO);

    ResponseDTO processInsertBanner(BannerDTO bannerDTO);

    List<BizanmDTO> processSelectBizanmList(SearchDTO searchDTO);

    BizanmDTO processSelectBizanmSingle(BizanmDTO bizanmDTO);

    ResponseDTO processDeleteBizanm(BizanmDTO bizanmDTO);

    ResponseDTO processUpdateBizanm(BizanmDTO bizanmDTO);

    ResponseDTO processInsertBizanm(BizanmDTO bizanmDTO);

    List<BidanmDTO> processSelectBidanmList(SearchDTO searchDTO);

    BidanmDTO processSelectBidanmSingle(BidanmDTO bidanmDTO);

    ResponseDTO processDeleteBidanm(BidanmDTO bidanmDTO);

    ResponseDTO processUpdateBidanm(BidanmDTO bidanmDTO);

    ResponseDTO processInsertBidanm(BidanmDTO bidanmDTO);

    List<IssueDTO> processSelectIssueList(SearchDTO searchDTO);

    IssueDTO processSelectIssueSingle(IssueDTO issueDTO);

    ResponseDTO processDeleteIssue(IssueDTO issueDTO);

    ResponseDTO processUpdateIssue(IssueDTO issueDTO);

    ResponseDTO processInsertIssue(IssueDTO issueDTO);
}
