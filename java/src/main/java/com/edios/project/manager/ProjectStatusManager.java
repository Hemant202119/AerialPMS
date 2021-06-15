package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.project.bean.ProjectStatusBean;
import com.edios.project.entity.to.ProjectStatusTO;

public interface ProjectStatusManager extends AbstractManager {

	String addProjectStatus(ProjectStatusBean projectStatusBean);	

	List<ProjectStatusTO> fetchProjectStatusDetails(Long projectID);

	String updateProjectStatus(ProjectStatusBean projectStatusBean);

	ProjectStatusBean findProjectStatusById(Long projectStatusID);

}
