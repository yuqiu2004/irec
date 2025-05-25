package com.yuqiu.model.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @TableId
    private Integer id;
    private String title;
    private Integer year;
    private String cover;
    private String description;
    private Integer mainType;  // 1=电影，2=番剧
    private Integer popularity;
}
