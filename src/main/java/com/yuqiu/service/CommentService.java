package com.yuqiu.service;

import com.yuqiu.model.dto.CommentDTO;
import com.yuqiu.model.entity.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> listAll(int id);

    Boolean add(CommentDTO commentDTO);
}
