package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.cdf.manager.AbstractManager;
import com.edios.project.entity.to.UserRightsTO;

public interface UserRightsManager extends AbstractManager {

	List<UserDetailTO> usersDropdown();

	List<UserEntityTO> getUsersList();

	List<UserRightsTO> fetchUsersOnCriteria(String searchParameter, Integer accountId);

	List<UserRightsTO> userRightsOnBasisOfUsers();

	List<UserRightsTO> selectedUserRightsOnBasisOfUsers(Integer accountId, Long id);

	String saveUserRights(List<UserRightsTO> userRightsTO);

	String deleteUserRight(UserRightsTO deleteRecords);  

}
