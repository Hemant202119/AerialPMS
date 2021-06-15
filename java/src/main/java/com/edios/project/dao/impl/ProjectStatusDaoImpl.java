package com.edios.project.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.dao.ProjectStatusDao;
import com.edios.project.entity.ProjectStatusEntity;
import com.edios.project.entity.to.ProjectStatusTO;


@Repository
public class ProjectStatusDaoImpl extends BaseDaoImpl<ProjectStatusEntity>implements ProjectStatusDao {

	@Override
	public boolean addProjectStatus(ProjectStatusEntity projectStatusEntity) {
		// TODO Auto-generated method stub
        boolean addresult = true;		
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(projectStatusEntity);		
			System.out.println("  project Addedd Successfully");
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return addresult;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<ProjectStatusTO> fetchProjectStatusDetails(Long projectID) {
		// TODO Auto-generated method stub
		List<ProjectStatusTO> projectStatusTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select pse.projectStatusID As projectStatusID , pse.statusDate As statusDate , pse.notes As notes , apl.parameterListValue As statusName "
					+ " from  ProjectStatusEntity pse  LEFT JOIN pse.projectID As pe LEFT JOIN pse.statusListID As apl where pse.projectID.projectID=:projectID  "
					+ " order by pse.statusDate DESC";

			projectStatusTO = (List<ProjectStatusTO>) session.createQuery(sqlQuery).setParameter("projectID", projectID)
					.setResultTransformer(Transformers.aliasToBean(ProjectStatusTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectStatusTO;
	}

	@Override
	public boolean updateProjectStatus(ProjectStatusEntity projectStatusEntity) {		
			boolean result = true;
			try {
				Session session = (Session) entityManager.getDelegate();
				session.merge(projectStatusEntity);
				System.out.println(" project Status Updated Successfully");
			} catch (Exception exception) {
				exception.printStackTrace();
				return false;
			}
			return result;		
	}

	@Override
	public ProjectStatusEntity findProjectStatusById(Long projectStatusID) {		
			
				try {				
				Session session = (Session)entityManager.getDelegate();
					return (ProjectStatusEntity)session.get(ProjectStatusEntity.class, projectStatusID);
					
				} catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}		
		  }
	}
	
	
	


