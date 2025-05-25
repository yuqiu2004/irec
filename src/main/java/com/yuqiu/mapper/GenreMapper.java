package com.yuqiu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuqiu.model.entity.Genre;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GenreMapper extends BaseMapper<Genre> {
    List<Genre> selectTop10();
}
