package com.yuqiu.controller;

import com.yuqiu.service.GenreService;
import com.yuqiu.utils.R;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genre")
public class GenreController {

    @Resource
    private GenreService genreService;

    @GetMapping("/list")
    public R list() {
        return R.success(genreService.list());
    }

    @GetMapping("/{name}")
    public R search(@PathVariable String name) {
        return R.success(genreService.search(name));
    }
}
