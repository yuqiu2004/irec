package com.yuqiu.model.dto;

import lombok.Data;

@Data
public class MoviePageDTO {
    private int page;
    private int pageSize;
    private Integer type;
    private String genreName;
    private int startYear;
    private int endYear;
}
