package com.yuqiu.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MovieDTO {
    private String title;
    private Integer year;
    private String cover;
    private String description;
    private String type;
    private List<String> genres;
}
