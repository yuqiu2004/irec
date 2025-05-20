package com.yuqiu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class IRecApplication {

    private static final String successLabel = "\n=========================================   项目启动成功   =========================================\n";

    public static void main(String[] args) {
        SpringApplication.run(IRecApplication.class, args);
        System.out.println(successLabel);
    }

}
