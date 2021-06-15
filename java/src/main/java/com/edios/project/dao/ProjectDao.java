package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.display.ParameterListTO;
import com.edios.cdf.entity.to.StatusEntityTO;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.entity.to.DrawingTypeEnityTO;
import com.edios.project.entity.to.ExecutionModelsEntityTO;
import com.edios.project.entity.to.ProjectCategoriesEntityTO;
import com.edios.project.entity.to.ProjectsTO;

public interface ProjectDao  extends BaseDao<ProjectsEntity>{

	List<ProjectsTO> fetchProjectDetails(Long userID);

	List<ProjectsTO> projectDetails(String searchCode,Long userID);

	List<StatusEntityTO> projectStatus(String statusType);

	Long addProject(ProjectsEntity projectsEntity);

	List<ContactsEntityTO> contactAutoLookup(Long userID);

	List<CirclesEntityTO> circleAutoLookup(Long contactID,Long userID);

	List<ProjectCategoriesEntityTO> projectCategoryAutoLookup();

	List<ExecutionModelsEntityTO> executionModelAutoLookup();

	List<DrawingTypeEnityTO> drawingTypeAutoLookup(Long executionModelID);

	List<ParameterDropDownTO> parameterListDropdown(String listType);

	Object findProjectById(Long id);

	List<ParameterListTO> parameterList(String listType);

	boolean updateProject(ProjectsEntity projectsEntity);

	ProjectBean fetchProjectById(Long projectID);

	TransactionData fetchTransactionDataById(Long id);

	boolean deleteProject(Long id, Integer modifiedBy);

	boolean searchUniqueProjectName(String siteName);

//	List<ProjectsTO> fetchBOQDetails(Long projectId);


}
