package com.yuqiu.constant;

public enum MainTypeEnum {
    EMPTY(0, "全部"),
    MOVIE(1, "电影"),
    BANGUMI(2, "番剧");

    public final Integer no;
    public final String name;

    MainTypeEnum(int no, String name) {
        this.no = no;
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
            if (value.no.equals(type)) return value.name;
        }
        return EMPTY.name;
    }
}
