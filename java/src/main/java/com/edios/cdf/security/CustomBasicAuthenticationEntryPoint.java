package com.edios.cdf.security;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;

import com.edios.cdf.validator.BaseResponse;
import com.google.gson.Gson;

public class CustomBasicAuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

	@Override
	public void commence(final HttpServletRequest request, final HttpServletResponse response,
			final AuthenticationException authException) throws IOException, ServletException {
		System.out.println("in commence" + authException.getMessage());
		if (request.getMethod().equals("OPTIONS")) {
			response.addHeader("Access-Control-Allow-Origin", "*");
			response.addHeader("Access-Control-Allow-Methods", "POST,PUT, GET, OPTIONS, DELETE");
			response.addHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Request-Headers", "X-Requested-With, Content-Type, Accept");
			response.setHeader("Access-Control-Allow-Headers",
					"Origin, X-Requested-With, Content-Type, Accept,AUTH-TOKEN, Authorization");
		} else {
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers", "X-requested-with, Content-Type");
			try {
				BaseResponse error = new BaseResponse(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED",
						authException.getMessage());
				String json = new Gson().toJson(error);
				//response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				//response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
				response.getWriter().write(json);
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			// response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User not found!");
			// response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
			// authException.getMessage());
		}
	}

	@Override
	public void afterPropertiesSet() throws Exception {
		setRealmName("MY_TEST_REALM");
		super.afterPropertiesSet();
	}
}