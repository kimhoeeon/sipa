package com.mtf.sipa.service.impl;

import com.mtf.sipa.mapper.SipaMapper;
import com.mtf.sipa.service.SipaService;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

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


}
