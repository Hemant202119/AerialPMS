package com.edios.project.manager.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.UserRightsBean;
import com.edios.project.dao.UserRightsDao;
import com.edios.project.entity.UserRightsEntity;
import com.edios.project.entity.to.UserRightsTO;
import com.edios.project.manager.UserRightsManager;

@Service("userRightsManager")
public class UserRightsManagerImpl extends AbstractManagerImpl<UserRightsBean, UserRightsEntity> implements UserRightsManager {

	@Autowired
	UserRightsDao userrightsDao;

	@Override
	@Transactional
	public List<UserDetailTO> usersDropdown() {
		List<UserDetailTO> autoCompleteTO = null;
		try {
			autoCompleteTO = userrightsDao.usersDropdown();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}

	@Override
	@Transactional
	public List<UserEntityTO> getUsersList() {
		List<UserEntityTO> userRightsTO = null;
		try {

			userRightsTO = userrightsDao.getUsersList();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return userRightsTO;
	}

	@Override
	@Transactional
	public List<UserRightsTO> fetchUsersOnCriteria(String searchParameter, Integer accountId) {
		return userrightsDao.fetchUsersOnCriteria(searchParameter, accountId);
	}

	@Override
	@Transactional
	public List<UserRightsTO> userRightsOnBasisOfUsers() {
		return userrightsDao.userRightsOnBasisOfUsers();
	}

	@Override
	@Transactional
	public List<UserRightsTO> selectedUserRightsOnBasisOfUsers(Integer accountId, Long id) {
		return userrightsDao.selectedUserRightsOnBasisOfUsers(accountId, id);
	}

	@Override
	@Transactional
	public String saveUserRights(List<UserRightsTO> userRightsTOList) {
		Long userID = null;
		boolean result;

		for (UserRightsTO userRights : userRightsTOList) {
			userID = userRights.getUserID();
				break;
		}

		result = userrightsDao.deleteUserRights(userID);
		if (result) {
			for (UserRightsTO userRights : userRightsTOList) {
				UserRightsBean userRightsBean = new UserRightsBean();
				userRightsBean.getUserID().setUserID(userRights.getUserID());
				userRightsBean.getCircleID().setCircleID(userRights.getCircleID());
				userRightsBean.getContactID().setContactID(userRights.getContactID());
				UserRightsEntity userRightsEntity = mapper.map(userRightsBean, UserRightsEntity.class);
				result = userrightsDao.saveUserRights(userRightsEntity);
			}
		}

		return "success";
	}

	@Override
	@Transactional
	public synchronized String deleteUserRight(UserRightsTO deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;
		if(deleteRecords.getUserRightsID()!=null) {
			
			resultFlag=userrightsDao.checkUserRights(deleteRecords);
			System.out.println("resultFlag=="+resultFlag);
			if(!resultFlag) {
				resultFlag= userrightsDao.deleteUserRight(deleteRecords.getUserRightsID());
				if(resultFlag)
				   return "DELETED";
			}else {
				return "NOT_DELETED";
			}
		}
		return resultString;
	}
}
