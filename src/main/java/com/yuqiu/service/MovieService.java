package com.yuqiu.service;

import com.yuqiu.model.dto.MovieDTO;
import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.model.vo.MovieDetailVo;
import com.yuqiu.model.vo.MoviePageVo;
import com.yuqiu.model.vo.MovieTopVo;
import com.yuqiu.model.vo.MovieVo;

import java.util.List;

public interface MovieService {
    MoviePageVo page(MoviePageDTO moviePageDTO);

    List<MovieTopVo> top10();

    Boolean add(MovieDTO movieDTO);

    MovieDetailVo detail(int id);
}
