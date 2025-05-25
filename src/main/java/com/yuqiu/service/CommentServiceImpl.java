package com.yuqiu.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yuqiu.mapper.CommentMapper;
import com.yuqiu.model.dto.CommentDTO;
import com.yuqiu.model.entity.Comment;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{

    @Resource
    private CommentMapper commentMapper;

    @Override
    public List<Comment> listAll(int id) {
        return commentMapper.selectList((new QueryWrapper<Comment>()).eq("movie_id", id));
    }

    @Override
    public Boolean add(CommentDTO commentDTO) {
        commentMapper.insert(Comment.builder()
                .movieId(commentDTO.getMovieId())
                .userName(commentDTO.getUserName())
                .text(commentDTO.getText())
                .build());
        return true;
    }
}
