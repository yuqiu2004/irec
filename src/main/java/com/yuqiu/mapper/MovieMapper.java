package com.yuqiu.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuqiu.model.entity.Movie;
import com.yuqiu.model.vo.MovieVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MovieMapper extends BaseMapper<Movie> {
    List<MovieVo> pageQuery(
            @Param("page") int page,
            @Param("pageSize") int pageSize,
            @Param("genreName") String genreName,
            @Param("type") Integer type,
            @Param("startYear") int startYear,
            @Param("endYear") int endYear);
}
