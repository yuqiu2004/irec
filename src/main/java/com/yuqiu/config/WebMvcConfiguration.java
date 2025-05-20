package com.yuqiu.config;

import com.yuqiu.intercept.LoginIntercept;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Component
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Resource
    private LoginIntercept loginIntercept;

    /**
     * 注册自定义拦截器
     *
     * @param registry
     */
    protected void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginIntercept)
                .addPathPatterns("/manage/**");
    }
}
