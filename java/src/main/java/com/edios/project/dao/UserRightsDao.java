package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.project.entity.UserRightsEntity;
import com.edios.project.entity.to.UserRightsTO;

public interface UserRightsDao extends BaseDao<UserRightsEntity> {

	List<UserDetailTO> usersDropdown();

	List<UserEntityTO> getUsersList();

	List<UserRightsTO> fetchUsersOnCriteria(String searchParameter, Integer accountId);

	List<UserRightsTO> userRightsOnBasisOfUsers();

	List<UserRightsTO> selectedUserRightsOnBasisOfUsers(Integer accountId, Long id);

	boolean saveUserRights(UserRightsEntity userRightsEntity);

	boolean deleteUserRights(Long userID);

	boolean deleteUserRight(Long id);

	boolean checkUserRights(UserRightsTO deleteRecords); 

}
