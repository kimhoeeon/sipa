package com.mtf.sipa.service;

import com.mtf.sipa.dto.*;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface SipaService {

    void logoutCheck(HttpSession session);

}
