package com.yuqiu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuqiu.model.entity.Movie;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieMapper extends BaseMapper<Movie> {
}
