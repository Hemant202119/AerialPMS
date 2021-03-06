package com.edios.cdf.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.entity.to.AccountUserEntityTO;
import com.edios.cdf.entity.to.MenuEntityTO;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.manager.SecurityManager;
import com.edios.cdf.util.PayloadBean;
import com.edios.cdf.validator.BaseResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
public class LoginController extends AbstractController {

	@Autowired
	MessageSource messageSource;
	
	@Autowired
	SecurityManager securityManager;

	@RequestMapping(value = "/", method = RequestMethod.GET, produces = { "text/html" })
	public String getWelcomeFile() {
		return "<html> " + "<title>" + "ediosCDF API" + "</title>" + "<body></br></br></br>" + "</br></br></br>" + ""
				+ "<center><h1>" + "       Welcome to ediosCDF API." + "</br></br>  RESTful API is Working!"
				+ "</center></h1> </body>" + "</html> ";
	}

	@GetMapping("/login")
	public ResponseEntity<UserDetailTO> fetchUserDetails(Principal user) {
		UserDetailTO userDetailTO = securityManager.getCurrentUser(user.getName());
		if (userDetailTO == null) {
			return new ResponseEntity<UserDetailTO>(HttpStatus.UNAUTHORIZED);
		} else {
			return new ResponseEntity<UserDetailTO>(userDetailTO, HttpStatus.OK);
		}
	}
	
	@PostMapping("/fetch-accounts")
	public ResponseEntity<List<AccountUserEntityTO>> fetchAccounts(@RequestBody PayloadBean payloadBean) {
		List<AccountUserEntityTO> AccountUserEntityTOList=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			AccountUserEntityTOList = securityManager.fetchAccounts(payloadBean.getId());
		}
		return new ResponseEntity<List<AccountUserEntityTO>>(AccountUserEntityTOList, HttpStatus.OK);
	}
	
	@PostMapping("/menus")
	public ResponseEntity<List<MenuEntityTO>> fetchAccountMenus(@RequestBody PayloadBean payloadBean) {
		List<MenuEntityTO> menuEntityTOList=null;
		if(payloadBean.getSignatureKey().equals(messageSource.getMessage("signatureKey", null, "", Locale.US))) {
			menuEntityTOList = securityManager.fetchAccountMenus(payloadBean);
		}
		return new ResponseEntity<List<MenuEntityTO>>(menuEntityTOList, HttpStatus.OK);
		
	}
	@RequestMapping(value = "/update-user-default-theme", method = RequestMethod.POST)
	public BaseResponse updateDefaultThemeForUser(HttpServletRequest request,@RequestBody PayloadBean payloadBean)
			throws JsonParseException, JsonMappingException, IOException{
		BaseResponse baseResponse = null;
		String resultString="";
		try {
			payloadBean.setCustomParameter(request.getRemoteAddr());
			resultString=securityManager.updateDefaultThemeForUser(payloadBean);
			if(resultString.equals("UPDATED"))
				baseResponse = new BaseResponse(HttpStatus.OK, "UPDATED", "");
		}catch(Exception exception) {
			exception.printStackTrace();
			return baseResponse = new BaseResponse(HttpStatus.OK, "EXCEPTION", "Some Thing went wrong! please try later.");
		}
		return baseResponse;
	}
}
