package com.edios.cdf.dao;

import java.util.List;

import com.edios.cdf.bean.security.AccountUserBean;
import com.edios.cdf.entity.security.UserEntity;
import com.edios.cdf.entity.to.AccountUserEntityTO;
import com.edios.cdf.entity.to.MenuEntityTO;
import com.edios.cdf.entity.to.RoleRightsEntityTO;
import com.edios.cdf.entity.to.RoleRightsTO;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.util.PayloadBean;

public interface SecurityDao extends BaseDao<UserEntity> {

	public UserDetailTO fetchUserDetails(String userName);

	public boolean updateLoginFailedTries(Long userID, int loginFlag);

	public boolean updateUserStatusLocked(Long userID, String string);
	
	public List<MenuEntityTO> fetchAccountMenus(Long roleID);
	
	List<MenuEntityTO> fetchRoleRightsMenus(Integer integer);

	public UserDetailTO getCurrentUser(String userName);

	public List<AccountUserEntityTO> fetchAccounts(Long id);

	public RoleRightsEntityTO fetchRoleRights(RoleRightsEntityTO roleRightsEntityTO);

	public Integer getMenuId(RoleRightsEntityTO roleRightsEntityTO);

	public boolean updateDefaultThemeForUser(PayloadBean payloadBean);

}
