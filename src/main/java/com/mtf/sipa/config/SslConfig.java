package com.mtf.sipa.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SslConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/.well-known/pki-validation/**")           // 해당 경로의 요청이 올 때
                .addResourceLocations("classpath:/.well-known/pki-validation/"); // classpath 기준으로 'm' 디렉토리 밑에서 제공
    }
}
