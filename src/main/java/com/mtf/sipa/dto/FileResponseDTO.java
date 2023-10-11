package com.mtf.sipa.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class FileResponseDTO {
    String resultCode; //Code
    String resultMessage; //Msg
    String fileId; // file table seq id
}