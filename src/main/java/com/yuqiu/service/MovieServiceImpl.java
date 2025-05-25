package com.yuqiu.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yuqiu.constant.MainTypeEnum;
import com.yuqiu.exception.BaseException;
import com.yuqiu.mapper.MovieMapper;
import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.model.entity.Movie;
import com.yuqiu.model.vo.MoviePageVo;
import com.yuqiu.model.vo.MovieVo;
import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService{

    @Resource
    private MovieMapper movieMapper;

    @Override
    public MoviePageVo page(MoviePageDTO moviePageDTO) {
        if (moviePageDTO.getPage() < 0 || moviePageDTO.getPageSize() < 0)
            throw new BaseException("参数错误");
        int pageSize = moviePageDTO.getPageSize();
        int page = (moviePageDTO.getPage() - 1) * pageSize;
        String genreName = moviePageDTO.getGenreName();
        String mainType = moviePageDTO.getMainType();
        int startYear = 0, endYear = 9999;
        if (moviePageDTO.getStartYear() != 0) startYear = moviePageDTO.getStartYear();
        if (moviePageDTO.getEndYear() != 0) endYear = moviePageDTO.getEndYear();
        Integer type  = null;
        if (StringUtils.isNotEmpty(mainType)) type = MainTypeEnum.getCodeByName(mainType);
        long totalPage = movieMapper.selectCount(new QueryWrapper<Movie>());

        List<MovieVo> list = movieMapper.pageQuery(page, pageSize, genreName, type, startYear, endYear);
        return MoviePageVo.builder()
                .totalPage(totalPage)
                .movies(list.stream()
                        .peek(movie -> movie.setMainType(MainTypeEnum.getNameFromCode(movie.getType())))
                        .toList())
                .build();
    }
}
