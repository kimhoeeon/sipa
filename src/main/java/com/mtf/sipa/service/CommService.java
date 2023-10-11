package com.mtf.sipa.service;

import com.mtf.sipa.dto.CommCodeDTO;
import com.mtf.sipa.dto.SmsDTO;
import com.mtf.sipa.dto.SmsResponseDTO;

import java.util.List;

public interface CommService {

    List<CommCodeDTO> getCommCodeList(CommCodeDTO commCodeDTO);

    SmsResponseDTO smsSend(SmsDTO smsDTO);

}
