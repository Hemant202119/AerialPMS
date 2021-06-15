package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.display.ParameterListTO;
import com.edios.cdf.entity.common.ApplicationParameterListEntity;
import com.edios.cdf.entity.to.StatusEntityTO;
import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.AppConstants;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ProjectBean;
import com.edios.project.dao.ProjectDao;
import com.edios.project.dao.ProjectStatusDao;
import com.edios.project.entity.ProjectStatusEntity;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.entity.to.DrawingTypeEnityTO;
import com.edios.project.entity.to.ExecutionModelsEntityTO;
import com.edios.project.entity.to.ProjectCategoriesEntityTO;
import com.edios.project.entity.to.ProjectsTO;
import com.edios.project.manager.ProjectManager;

@Service
public class ProjectManagerImpl extends AbstractManagerImpl<ProjectBean, ProjectsEntity>
implements ProjectManager {
	
	@Autowired
	ProjectDao projectDao;
	
	@Autowired
	ProjectStatusDao projectStatusDao;
	
	@Override
	@Transactional
	public List<ProjectsTO> fetchProjectDetails(Long userID) {
		List<ProjectsTO> projectsTO = null;
		try {
			projectsTO = projectDao.fetchProjectDetails(userID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return projectsTO;

	}

	
	@Override
	@Transactional
	public List<ProjectsTO> projectDetails(String searchCode,Long userID) {
		List<ProjectsTO> projectsTO = null;
		try {
			projectsTO = projectDao.projectDetails(searchCode,userID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return projectsTO;

	}
	
	@Override
	@Transactional
	public List<StatusEntityTO> projectStatus(String statusType) {
		List<StatusEntityTO> statusEntityTO = null;
		try {
			statusEntityTO = projectDao.projectStatus(statusType);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return statusEntityTO;

	}

	@Override
	@Transactional
	public List<ContactsEntityTO> contactAutoLookup(Long userID) {
		List<ContactsEntityTO> autoCompleteTO = null;
		try {
			autoCompleteTO = projectDao.contactAutoLookup(userID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}
	
	@Override
	@Transactional
	public List<CirclesEntityTO> circleAutoLookup(Long contactID,Long userID) {
		List<CirclesEntityTO> autoCompleteTO = null;
		try {
			autoCompleteTO = projectDao.circleAutoLookup(contactID,userID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}
	
	
	@Override
	@Transactional
	public List<ProjectCategoriesEntityTO> projectCategoryAutoLookup() {
		List<ProjectCategoriesEntityTO> autoCompleteTO = null;
		try {
			autoCompleteTO = projectDao.projectCategoryAutoLookup();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}
	
	@Override
	@Transactional
	public List<ExecutionModelsEntityTO> executionModelAutoLookup() {
		List<ExecutionModelsEntityTO> autoCompleteTO = null;
		try {
			autoCompleteTO = projectDao.executionModelAutoLookup();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}
	
	@Override
	@Transactional
	public List<DrawingTypeEnityTO> drawingTypeAutoLookup(Long executionModelID) {
		List<DrawingTypeEnityTO> autoCompleteTO = null;
		try {
			autoCompleteTO = projectDao.drawingTypeAutoLookup(executionModelID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return autoCompleteTO;

	}
	
	
	@Override
	@Transactional
	public List<ParameterDropDownTO> parameterListDropdown(String listType) {
		List<ParameterDropDownTO> applicationParameterListTO = null;
		try {
			applicationParameterListTO = projectDao.parameterListDropdown(listType);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return applicationParameterListTO;

	}
	
	@Override
	@Transactional
	public List<ParameterListTO> parameterList(String listType) {
		List<ParameterListTO> parameterListTO = null;
		try {
			parameterListTO = projectDao.parameterList(listType);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return parameterListTO;

	}
	
	@Override
	@Transactional
	public String addProject(ProjectBean projectBean) {
		boolean addresult=false;
		Long projectID=null;	
		boolean projectNameExist=projectDao.searchUniqueProjectName(projectBean.getSiteName());
		if(projectNameExist)
			return "PROJECT_EXIST";
		setAuditInfo(projectBean,"newFlag");
		ProjectsEntity projectsEntity=	 mapper.map(projectBean, ProjectsEntity.class);	
		projectID=projectDao.addProject(projectsEntity);
		
		if(projectID!=null) {
			ProjectStatusEntity projectStatusEntity=new ProjectStatusEntity();			
			ProjectsEntity newProjectsEntity=new ProjectsEntity();
			newProjectsEntity.setProjectID(projectID);
			projectStatusEntity.setProjectID(newProjectsEntity);
			projectStatusEntity.setStatusDate(projectBean.getStatusDate());
			ApplicationParameterListEntity applicationParameterListEntity=new ApplicationParameterListEntity();
			applicationParameterListEntity.setParameterListID(projectBean.getStatusListID().getParameterListID());
			projectStatusEntity.setStatusListID(applicationParameterListEntity);
			projectStatusEntity.setNotes(projectBean.getNotes());
			projectStatusEntity.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			projectStatusEntity.setRecordType(AppConstants.RECORDTYPE_INSERT);
			projectStatusEntity.setCreatedBy(projectBean.getCreatedBy());
			projectStatusEntity.setCreatedDate(new Date());
			addresult=projectStatusDao.addProjectStatus(projectStatusEntity);
		}
		
		if(addresult) {
			System.out.println(" Project added successfully");
			return "ADDED";
			
		}
		
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	@Transactional
	public ProjectBean findProjectById(Long id) {
		// TODO Auto-generated method stub
		ProjectBean projectBean =null;
		projectBean = mapper.map(projectDao.findProjectById(id),
				ProjectBean.class);
		return projectBean;
		
	}

    @Transactional
	@Override
	public String updateProject(ProjectBean projectBean) {
		// TODO Auto-generated method stub		
			String resultString = "";
			boolean resultFlag = false;

			ProjectBean latestData = projectDao.fetchProjectById(projectBean.getProjectID());
			if (latestData.getTransactionCount() > (projectBean.getTransactionCount())) {
				projectBean = latestData;
				// sessionManager.getLogging().logDebugInfo("Transaction Failed", "INFO");
				return "TransactionFailed";
			}
			if (latestData.getRecordType() == 'D') {
				projectBean = latestData;
				// sessionManager.getLogging().logDebugInfo("Transaction Failed due to record is
				// already deleted", "INFO");
				return "recordDeleted";
			}
			setAuditInfo(projectBean,"editFlag");
            ProjectsEntity projectsEntity = mapper.map(projectBean,ProjectsEntity.class);
			resultFlag = projectDao.updateProject(projectsEntity);
			System.out.println("resultFlag==" + resultFlag);
			if (resultFlag) {
				resultString= "UPDATED";
			}
			return resultString;
		
	}
    
	private void setAuditInfo(ProjectBean projectBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			projectBean.setTransactionCount(AppConstants.TRANSACTION_BEGIN);
			projectBean.setRecordType(AppConstants.RECORDTYPE_INSERT);
			projectBean.setCreatedDate(new Date());
		}else {
			projectBean.setTransactionCount(projectBean.getTransactionCount()+AppConstants.TRANSACTION_BEGIN);
			projectBean.setRecordType(AppConstants.RECORDTYPE_UPDATE);
			projectBean.setLastModifiedDate(new Date());
		}
	}

	
	@Override
	@Transactional
	public synchronized String deleteProject(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;
		TransactionData latestData = projectDao.fetchTransactionDataById(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = projectDao.deleteProject(deleteRecords.getId(), deleteRecords.getModifiedBy());
		if (resultFlag)
			return "DELETED";

		return resultString;
		
		
	}
}
