package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.ProjectStatusEntity;
import com.edios.project.entity.to.ProjectStatusTO;


public interface ProjectStatusDao extends BaseDao<ProjectStatusEntity>{

	boolean addProjectStatus(ProjectStatusEntity projectStatusEntity);	

	List<ProjectStatusTO> fetchProjectStatusDetails(Long projectID);

	boolean updateProjectStatus(ProjectStatusEntity projectStatusEntity);

	ProjectStatusEntity findProjectStatusById(Long projectStatusID);

}
