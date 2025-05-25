package com.yuqiu.controller;

import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.service.MovieService;
import com.yuqiu.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movie")
public class MovieController {

    @Resource
    private MovieService movieService;

    @PostMapping("/page")
    public R page(@RequestBody MoviePageDTO moviePageDTO) {
        return R.success(movieService.page(moviePageDTO));
    }

    @GetMapping("/top10")
    public R top10() {
        return R.success(movieService.top10());
    }
}
