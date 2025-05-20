package com.yuqiu.utils;

import com.yuqiu.constant.CodeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class R<T> {
    private int code;
    private String message;
    private T data;

    public static R success() {
        CodeEnum codeEnum = CodeEnum.SUCCESS_DEFAULT;
        return new R<>(codeEnum.getCode(), codeEnum.getMessage(), null);
    }

    public static <T> R<T> success(T data) {
        CodeEnum codeEnum = CodeEnum.SUCCESS_DEFAULT;
        return new R<>(codeEnum.getCode(), codeEnum.getMessage(), data);
    }

    public static R error(String message) {
        CodeEnum codeEnum = CodeEnum.ERROR_DEFAULT;
        return new R<>(codeEnum.getCode(), message, null);
    }

    public static R error() {
        CodeEnum codeEnum = CodeEnum.ERROR_DEFAULT;
        return new R<>(codeEnum.getCode(), codeEnum.getMessage(), null);
    }
}