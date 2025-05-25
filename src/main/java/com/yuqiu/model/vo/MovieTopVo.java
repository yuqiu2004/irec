package com.yuqiu.model.vo;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MovieTopVo {
    private int id;
    private String title;
    private int popularity;
}
