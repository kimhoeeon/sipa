package com.mtf.sipa.service;

import com.mtf.sipa.dto.*;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface SipaService {

    void logoutCheck(HttpSession session);
    List<PopupDTO> processSelectPopupList(PopupDTO popupDTO);

    List<BannerDTO> processSelectBannerList(BannerDTO bannerDTO);

    FileDTO processSelectFileIdSingle(FileDTO fileReq);

    List<FileDTO> processSelectFileList(String userId);

}
