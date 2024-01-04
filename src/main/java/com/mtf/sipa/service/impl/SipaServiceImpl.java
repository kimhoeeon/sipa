package com.mtf.sipa.service.impl;

import com.mtf.sipa.dto.BannerDTO;
import com.mtf.sipa.dto.FileDTO;
import com.mtf.sipa.dto.PopupDTO;
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

    //private final SqlSession sqlSession;

    @Setter(onMethod_ = {@Autowired})
    private SipaMapper sipaMapper;

    /*public SipaServiceImpl(SqlSession ss) {
        this.sqlSession = ss;
    }*/

    @Override
    public void logoutCheck(HttpSession session) {
        session.invalidate(); // 세션 초기화
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<PopupDTO> processSelectPopupList(PopupDTO popupDTO) {
        System.out.println("SipaServiceImpl > processSelectPopupList");
        return sipaMapper.selectPopupList(popupDTO);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW, rollbackFor = {Exception.class})
    @Override
    public List<BannerDTO> processSelectBannerList(BannerDTO bannerDTO) {
        System.out.println("SipaServiceImpl > processSelectBannerList");
        return sipaMapper.selectBannerList(bannerDTO);
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
