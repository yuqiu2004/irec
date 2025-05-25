package com.yuqiu.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetailVo {
    private String title;
    private Integer year;
    private String cover;
    private String mainType;  // 1=电影，2=番剧
    private Integer type;  // 1=电影，2=番剧
    private List<String> genres;
    private String description;
    private Integer popularity;
}
