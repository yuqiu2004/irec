package com.yuqiu.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MovieVo {
    private String title;
    private Integer year;
    private String cover;
    private String mainType;  // 1=电影，2=番剧
    private Integer type;  // 1=电影，2=番剧
    private List<String> genres;
}
