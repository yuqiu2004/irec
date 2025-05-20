package com.yuqiu.constant;

public enum CodeEnum {
    SUCCESS_DEFAULT(200, "success"),
    ERROR_DEFAULT(500, "error"),
    ;

    // 枚举字段
    private final int code;
    private final String message;

    // 构造方法
    CodeEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    // 获取代码值
    public int getCode() {
        return code;
    }

    // 获取描述信息
    public String getMessage() {
        return message;
    }
}