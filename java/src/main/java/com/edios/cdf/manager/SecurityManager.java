package com.edios.cdf.manager;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.edios.cdf.entity.to.AccountUserEntityTO;
import com.edios.cdf.entity.to.MenuEntityTO;
import com.edios.cdf.entity.to.RoleRightsEntityTO;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.util.PayloadBean;

public interface SecurityManager extends AbstractManager{
	
	public UserDetailTO fetchUserDetails(String userName);

	public UserDetailTO fetchUserDetails(String userName, UsernamePasswordAuthenticationToken authenticationToken);

	public void updateLoginFailedTries(Long userID, int loginTries);

	public void updateUserStatusLocked(Long userID, String string);
	
	public List<MenuEntityTO> fetchAccountMenus(PayloadBean userID);

	public UserDetailTO getCurrentUser(String name);

	public List<AccountUserEntityTO> fetchAccounts(Long id);

	public RoleRightsEntityTO fetchRoleRights(RoleRightsEntityTO payloadBean);

	public String updateDefaultThemeForUser(PayloadBean payloadBean);

	
}
