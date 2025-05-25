package com.yuqiu.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yuqiu.mapper.GenreMapper;
import com.yuqiu.model.entity.Genre;
import com.yuqiu.model.vo.GenreVo;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService{

    @Resource
    private GenreMapper genreMapper;

    @Override
    public List<GenreVo> list() {
        // 从数据库查找种类最多的10种
        QueryWrapper<Genre> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("popularity").last("LIMIT 10");
        List<Genre> list = genreMapper.selectList(wrapper);
        return list.stream()
                .map(genre -> GenreVo.builder().name(genre.getName()).build())
                .toList();
    }
}
