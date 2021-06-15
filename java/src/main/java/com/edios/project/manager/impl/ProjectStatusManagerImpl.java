package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.ProjectBean;
import com.edios.project.bean.ProjectStatusBean;
import com.edios.project.dao.ProjectDao;
import com.edios.project.dao.ProjectStatusDao;
import com.edios.project.entity.ProjectStatusEntity;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.ProjectStatusTO;
import com.edios.project.manager.ProjectStatusManager;

@Service
public class ProjectStatusManagerImpl 
extends AbstractManagerImpl<ProjectStatusBean, ProjectStatusEntity>
implements ProjectStatusManager {

	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_DELETE = 'D';

	private static final Character RECORDTYPE_UPDATE = 'U';
	
	@Autowired
	ProjectStatusDao projectStatusDao;
	
	@Autowired
	ProjectDao projectDao;
	
	
	@Override
	@Transactional
	public List<ProjectStatusTO> fetchProjectStatusDetails(Long projectID) {
		List<ProjectStatusTO> projectStatusTO = null;
		try {
			projectStatusTO = projectStatusDao.fetchProjectStatusDetails(projectID);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return projectStatusTO;

	}	
	@Override
	@Transactional
	public String addProjectStatus(ProjectStatusBean projectStatusBean) {
		String resultString = "";
		boolean resultFlag = false;
			
		setAuditInfo(projectStatusBean,"newFlag");
		ProjectStatusEntity projectStatusEntity = mapper.map(projectStatusBean,
				ProjectStatusEntity.class);
		resultFlag = projectStatusDao.addProjectStatus(projectStatusEntity);
		if (resultFlag) {
			boolean updateResultFlag=false;
			ProjectBean projectBean=null;		
			projectBean = mapper.map(projectDao.findProjectById(projectStatusBean.getProjectID().getProjectID()),
					ProjectBean.class);			
			projectBean.setStatusListID(projectStatusBean.getStatusListID());
			projectBean.setStatusDate(projectStatusBean.getStatusDate());
			ProjectsEntity projectsEntity = mapper.map(projectBean,ProjectsEntity.class);			
			updateResultFlag = projectDao.updateProject(projectsEntity);
			if(updateResultFlag) {
			resultString= "ADDED";			
			}
		}
		return resultString;
	}
	
	@Override
	@Transactional
	public ProjectStatusBean findProjectStatusById(Long id) {
		// TODO Auto-generated method stub
		ProjectStatusBean projectStatusBean =null;
		projectStatusBean = mapper.map(projectStatusDao.findProjectStatusById(id),
				ProjectStatusBean.class);
		return projectStatusBean;
		
	}
	@Transactional
	@Override
	public String updateProjectStatus(ProjectStatusBean projectStatusBean) {
		// TODO Auto-generated method stub		
			String resultString = "";
			boolean resultFlag = false;

			ProjectStatusBean latestData =findProjectStatusById(projectStatusBean.getProjectStatusID());
			if (latestData.getTransactionCount() > (projectStatusBean.getTransactionCount())) {
				projectStatusBean = latestData;
				// sessionManager.getLogging().logDebugInfo("Transaction Failed", "INFO");
				return "TransactionFailed";
			}
			if (latestData.getRecordType() == 'D') {
				projectStatusBean = latestData;
				// sessionManager.getLogging().logDebugInfo("Transaction Failed due to record is
				// already deleted", "INFO");
				return "recordDeleted";
			}
			setAuditInfo(projectStatusBean,"editFlag");
            ProjectStatusEntity projectStatusEntity = mapper.map(projectStatusBean,ProjectStatusEntity.class);
			resultFlag = projectStatusDao.updateProjectStatus(projectStatusEntity);
			System.out.println("resultFlag==" + resultFlag);
			if (resultFlag) {
				resultString= "UPDATED";
			}
			return resultString;
		
	}

	private void setAuditInfo(ProjectStatusBean projectStatusBean, String string) {
		if(string.equalsIgnoreCase("newFlag")) {
			projectStatusBean.setTransactionCount(TRANSACTION_BEGIN);
			projectStatusBean.setRecordType(RECORDTYPE_INSERT);
			//projectStatusBean.setCreatedBy(1l);
			projectStatusBean.setCreatedDate(new Date());
		}else {
			projectStatusBean.setTransactionCount(projectStatusBean.getTransactionCount()+TRANSACTION_BEGIN);
			projectStatusBean.setRecordType(RECORDTYPE_UPDATE);
			//projectStatusBean.setLastModifiedBy(1l);
			projectStatusBean.setLastModifiedDate(new Date());
		}
	}

}
