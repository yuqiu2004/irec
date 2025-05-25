package com.yuqiu.model.dto;

import lombok.Data;

@Data
public class MoviePageDTO {
    private int id;
    private int page;
    private int pageSize;
    private String mainType;
    private String genreName;
    private int startYear;
    private int endYear;
}
