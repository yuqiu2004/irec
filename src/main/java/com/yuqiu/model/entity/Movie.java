package com.yuqiu.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
    @TableId(type = IdType.AUTO)
    private Integer id;
    private String title;
    private Integer year;
    private String cover;
    private String description;
    private Integer type;  // 1=电影，2=番剧
    private Integer popularity;
}
