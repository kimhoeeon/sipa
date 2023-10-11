package com.mtf.sipa.mapper;

import com.mtf.sipa.dto.CommCodeDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommMapper {
    List<CommCodeDTO> getCommCodeList(CommCodeDTO commCodeDTO);
}
