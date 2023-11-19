package com.mtf.sipa.dto;

import com.mtf.sipa.entity.AbstractPagingRequestVo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchDTO extends AbstractPagingRequestVo {
    String condition; //검색조건
    String searchText; //검색단어
    String lang; //언어
    String gbn; //구분
}