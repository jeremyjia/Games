package com.pbz.demo.hello.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Value("${server.port}")
	private String app_port;

	@Bean
	public Docket createRestApi() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				.apis(RequestHandlerSelectors.basePackage("com.pbz.demo.hello.controller")).paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		String url = "http://localhost:" + app_port;
		return new ApiInfoBuilder().title("API接口说明").description("用于描述已有API接口").termsOfServiceUrl("No term of service")
				.contact(new Contact("Maomaof", "", "lalaxy87@hotmail.com")).version("1.02").license("Back to HomePage")
				.licenseUrl(url).build();
	}
}
