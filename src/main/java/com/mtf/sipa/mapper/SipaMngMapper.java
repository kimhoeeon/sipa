package com.mtf.sipa.mapper;

import com.mtf.sipa.dto.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The interface Sipa Mng mapper.
 */
@Repository
public interface SipaMngMapper {

    AdminDTO login(AdminDTO customerDTO);

    List<NoticeDTO> selectNoticeList(SearchDTO searchDTO);

    NoticeDTO selectNoticeSingle(NoticeDTO noticeDTO);

    List<FileDTO> selectFileUserIdList(FileDTO fileDTO);

    Integer updateFileUseN(FileDTO fileDTO);

    Integer deleteNotice(NoticeDTO noticeDTO);

    Integer updateFileUserId(FileDTO fileDTO);

    Integer updateNotice(NoticeDTO noticeDTO);

    String getNoticeSeq();

    Integer insertNotice(NoticeDTO noticeDTO);

    String getFileId();

    Integer insertFileInfo(FileDTO fileDTO);

    List<SipaNewsDTO> selectSipaNewsList(SearchDTO searchDTO);

    SipaNewsDTO selectSipaNewsSingle(SipaNewsDTO sipaNewsDTO);

    Integer deleteSipaNews(SipaNewsDTO sipaNewsDTO);

    Integer updateSipaNews(SipaNewsDTO sipaNewsDTO);

    String getSipaNewsSeq();

    Integer insertSipaNews(SipaNewsDTO sipaNewsDTO);

    List<EventDTO> selectEventList(SearchDTO searchDTO);

    EventDTO selectEventSingle(EventDTO eventDTO);

    Integer deleteEvent(EventDTO eventDTO);

    Integer updateEvent(EventDTO eventDTO);

    String getEventSeq();

    Integer insertEvent(EventDTO eventDTO);
}
