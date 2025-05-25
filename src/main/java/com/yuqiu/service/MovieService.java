package com.yuqiu.service;

import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.model.vo.MoviePageVo;

public interface MovieService {
    MoviePageVo page(MoviePageDTO moviePageDTO);
}
