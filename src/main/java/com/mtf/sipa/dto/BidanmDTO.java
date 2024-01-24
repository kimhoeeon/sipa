package com.mtf.sipa.dto;

import com.mtf.sipa.entity.AbstractPagingRequestVo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BidanmDTO extends AbstractPagingRequestVo {
    Integer totalRecords;
    Integer rownum; //연번
    String seq; //ID
    String supportBizName; //지원사업명
    String applyStartDate; //신청시작일
    String applyEndDate; //신청종료일
    String businessOrganization; //사업수행기관
    String ministryCompetent; //소관부처
    String businessOverview; //사업개요
    String applyWay; //신청방법
    String applyDetailLink; //공고자세히보기 링크
    String contactTel; //문의처
    String content; //내용
    String fileIdList; //파일ID목록
    String note; //비고
    String initRegiPic; //최초 등록 담당자
    String initRegiDttm; //최초 등록 일시
    String finalRegiPic; //최종 변경 담당자
    String finalRegiDttm; //최종 변경 일시

    String condition;
    String searchText;
}