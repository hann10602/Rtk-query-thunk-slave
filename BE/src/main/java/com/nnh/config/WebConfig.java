package com.nnh.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class WebConfig {
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		List<String> originList = new ArrayList<>();
		originList.add("*");
		List<String> methodsList = new ArrayList<>();
		methodsList.add("GET");
		methodsList.add("POST");
		methodsList.add("PUT");
		methodsList.add("DELETE");
		List<String> headerList = new ArrayList<>();
		headerList.add("*");
		
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(originList);
		corsConfig.setAllowedMethods(methodsList);
		corsConfig.setAllowedHeaders(headerList);
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		source.registerCorsConfiguration("*", corsConfig);
		
		return source;
	}
}
