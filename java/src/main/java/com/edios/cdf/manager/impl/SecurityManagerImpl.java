package com.edios.cdf.manager.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.bean.security.UserBean;
import com.edios.cdf.dao.SecurityDao;
import com.edios.cdf.entity.security.UserEntity;
import com.edios.cdf.entity.to.AccountUserEntityTO;
import com.edios.cdf.entity.to.MenuEntityTO;
import com.edios.cdf.entity.to.RoleRightsEntityTO;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.manager.SecurityManager;
import com.edios.cdf.util.PayloadBean;

@Service("securityManager")
public class SecurityManagerImpl extends AbstractManagerImpl<UserBean, UserEntity> implements SecurityManager {

	@Autowired
	SecurityDao securityDao;

	@Override
	@Transactional
	public UserDetailTO fetchUserDetails(String userName, UsernamePasswordAuthenticationToken authenticationToken)
			throws AuthenticationException {
		try {
			UserDetailTO userDetailTO = securityDao.fetchUserDetails(userName);
			return userDetailTO;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	@Transactional
	public UserDetailTO fetchUserDetails(String userName) {
		return securityDao.fetchUserDetails(userName);
	}

	@Override
	@Transactional
	public void updateLoginFailedTries(Long userID, int loginTries) {
		securityDao.updateLoginFailedTries(userID, loginTries);

	}

	@Override
	@Transactional
	public void updateUserStatusLocked(Long userID, String string) {
		securityDao.updateUserStatusLocked(userID, string);
	}

	@Override
	@Transactional
	public List<MenuEntityTO> fetchAccountMenus(PayloadBean payloadBean) {
		try {
			List<MenuEntityTO> menuEntityTOList = securityDao.fetchAccountMenus(payloadBean.getId());
			List<MenuEntityTO> parentMenuList = securityDao.fetchRoleRightsMenus(payloadBean.getAccountId());

			for (MenuEntityTO parentMenu : parentMenuList) {
				for (MenuEntityTO childrenMenu : menuEntityTOList) {
					if (parentMenu.getMenuID().equals(childrenMenu.getParentMenuID())) {
						MenuEntityTO menuEntityTO = new MenuEntityTO();
						menuEntityTO.setMenuID(childrenMenu.getMenuID());
						menuEntityTO.setMenuDesc(childrenMenu.getMenuDesc());
						menuEntityTO.setPageUrl(childrenMenu.getPageUrl());
						menuEntityTO.setMenuIcon(childrenMenu.getMenuIcon());
						parentMenu.getItems().add(menuEntityTO);
					}
				}
			}
			//Filter List
			parentMenuList = parentMenuList.stream()                
		                .filter(element -> {
		                	if(element.getItems().size()!=0) {
		                		return true;
		                	}else {
		                		return false;
		                	}
		                }).collect(Collectors.toList());
			
			return parentMenuList;
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}

	}

	@Override
	@Transactional
	public UserDetailTO getCurrentUser(String userName) {
		return securityDao.getCurrentUser(userName);
	}

	@Override
	@Transactional
	public List<AccountUserEntityTO> fetchAccounts(Long id) {
		return securityDao.fetchAccounts(id);
	}

	@Override
	@Transactional
	public RoleRightsEntityTO fetchRoleRights(RoleRightsEntityTO roleRightsEntityTO) {
		Integer menuId = securityDao.getMenuId(roleRightsEntityTO);
		if (menuId != null) {
			roleRightsEntityTO.setMenuID(menuId);
			return securityDao.fetchRoleRights(roleRightsEntityTO);
		} else {
			return null;
		}
	}
	@Override
	@Transactional
	public String updateDefaultThemeForUser(PayloadBean payloadBean) {
		// TODO Auto-generated method stub
		if(securityDao.updateDefaultThemeForUser(payloadBean)) {
			return "UPDATED";
		}
		return null;
	}

}
