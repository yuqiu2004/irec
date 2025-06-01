package com.yuqiu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieDTO {
    private String title;
    private Integer year;
    private String cover;
    private String description;
    private Integer type;
    private List<String> genres;
    private String uploadCode;
}
