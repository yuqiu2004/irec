package com.yuqiu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuqiu.model.entity.MovieGenre;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MovieGenreMapper extends BaseMapper<MovieGenre> {
    List<String> selectNameByMovieId(@Param("id") int id);
}
