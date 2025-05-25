package com.yuqiu.constant;

public enum MainTypeEnum {
    EMPTY(0, ""),
    MOVIE(1, "电影"),
    BANGUMI(2, "番剧");

    final int no;
    final String name;

    MainTypeEnum(int i, String name) {
        this.no = i;
        this.name = name;
    }

    public static int getCodeByName(String name) {
        for (MainTypeEnum value : values()) {
            if (value.name.equals(name)) return value.no;
        }
        return 0;
    }

    public static String getNameFromCode(Integer type) {
        for (MainTypeEnum value : values()) {
            if (value.no == type) return value.name;
        }
        return EMPTY.name;
    }
}
