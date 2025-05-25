package com.yuqiu.service;

import com.yuqiu.model.vo.GenreVo;

import java.util.List;

public interface GenreService {
    List<GenreVo> list();

    List<String> search(String name);
}
