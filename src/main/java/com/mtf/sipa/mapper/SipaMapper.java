package com.mtf.sipa.mapper;

import com.mtf.sipa.dto.BannerDTO;
import com.mtf.sipa.dto.FileDTO;
import com.mtf.sipa.dto.PopupDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SipaMapper {

    List<PopupDTO> selectPopupList(PopupDTO popupDTO);

    List<BannerDTO> selectBannerList(BannerDTO bannerDTO);

    FileDTO selectFileIdSingle(FileDTO fileReq);

    List<FileDTO> selectFileList(String userId);
}
