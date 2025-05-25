package com.yuqiu.service;

import com.yuqiu.model.dto.MovieDTO;
import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.model.vo.MoviePageVo;
import com.yuqiu.model.vo.MovieTopVo;

import java.util.List;

public interface MovieService {
    MoviePageVo page(MoviePageDTO moviePageDTO);

    List<MovieTopVo> top10();

    Boolean add(MovieDTO movieDTO);
}
