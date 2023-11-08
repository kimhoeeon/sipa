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
}
