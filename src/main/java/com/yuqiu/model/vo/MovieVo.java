package com.yuqiu.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieVo {
    private Integer id;
    private String title;
    private Integer year;
    private String cover;
    private String mainType;  // 1=电影，2=番剧
    private Integer type;  // 1=电影，2=番剧
    private String genres;
}
