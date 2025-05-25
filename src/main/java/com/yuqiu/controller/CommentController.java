package com.yuqiu.controller;

import com.yuqiu.model.dto.CommentDTO;
import com.yuqiu.service.CommentService;
import com.yuqiu.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
public class CommentController {

    @Resource
    private CommentService commentService;

    @GetMapping("/{id}")
    public R listAll(@PathVariable int id) {
        return R.success(commentService.listAll(id));
    }

    @PutMapping
    public R add(@RequestBody CommentDTO commentDTO) {
        return R.success(commentService.add(commentDTO));
    }
}
