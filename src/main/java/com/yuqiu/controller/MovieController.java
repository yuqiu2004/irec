package com.yuqiu.controller;

import com.yuqiu.model.dto.MovieDTO;
import com.yuqiu.model.dto.MoviePageDTO;
import com.yuqiu.service.MovieService;
import com.yuqiu.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/movie")
public class MovieController {

    private static final String uploadCode = "yuqiu";

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

    @PutMapping
    public R add(@RequestBody MovieDTO movieDTO) {
        if (!movieDTO.getUploadCode().equals(uploadCode)) return R.error("upload code wrong");
        return R.success(movieService.add(movieDTO));
    }

    @GetMapping("/{id}")
    public R detail(@PathVariable int id) {
        return R.success(movieService.detail(id));
    }
}
