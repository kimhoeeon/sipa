package com.mtf.sipa.mapper;

import com.mtf.sipa.dto.AdminDTO;
import org.springframework.stereotype.Repository;

/**
 * The interface Sipa Mng mapper.
 */
@Repository
public interface SipaMngMapper {

    AdminDTO login(AdminDTO customerDTO);

}
