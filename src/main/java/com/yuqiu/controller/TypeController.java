package com.yuqiu.controller;

import cn.hutool.core.lang.Pair;
import com.yuqiu.constant.MainTypeEnum;
import com.yuqiu.utils.R;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/type")
public class TypeController {

    @GetMapping
    public R list() {
        MainTypeEnum[] values = MainTypeEnum.values();
        List<Pair<Integer, String>> data = new ArrayList<>();
        for (MainTypeEnum value : values) {
            data.add(Pair.of(value.no, value.name));
        }
        return R.success(data);
    }
}
