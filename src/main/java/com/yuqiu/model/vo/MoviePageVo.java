package com.yuqiu.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MoviePageVo {
    private long totalPage;
    private List<MovieVo> movies;
}
