package com.yuqiu.controller;

import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.service.MovieService;
import com.yuqiu.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Resource
    private MovieService movieService;

    @PostMapping("/page")
    public R page(@RequestBody MoviePageDTO moviePageDTO) {
        return R.success(movieService.page(moviePageDTO));
    }
}
