package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.display.ParameterListTO;
import com.edios.cdf.entity.to.StatusEntityTO;
import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.entity.to.DrawingTypeEnityTO;
import com.edios.project.entity.to.ExecutionModelsEntityTO;
import com.edios.project.entity.to.ProjectCategoriesEntityTO;
import com.edios.project.entity.to.ProjectsTO;

public interface ProjectManager extends AbstractManager {

	List<ProjectsTO> fetchProjectDetails(Long userID);

	List<ProjectsTO> projectDetails(String statusCode,Long userID);

	List<StatusEntityTO> projectStatus(String statusType);

	String addProject(ProjectBean projectBean);	

	List<ContactsEntityTO> contactAutoLookup(Long userID);

	List<CirclesEntityTO> circleAutoLookup( Long contactID,Long userID);

	List<ProjectCategoriesEntityTO> projectCategoryAutoLookup();

	List<ExecutionModelsEntityTO> executionModelAutoLookup();

	List<DrawingTypeEnityTO> drawingTypeAutoLookup(Long executionModelID);

	List<ParameterDropDownTO> parameterListDropdown(String listType);

	ProjectBean findProjectById(Long id);

	List<ParameterListTO> parameterList(String listType);

	String updateProject(ProjectBean projectBean);

	String deleteProject(DeleteRecords deleteRecords);

}
