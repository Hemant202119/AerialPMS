package com.edios.project.dao.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.cdf.display.ParameterDropDownTO;
import com.edios.cdf.display.ParameterListTO;
import com.edios.cdf.entity.to.StatusEntityTO;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ProjectBean;
import com.edios.project.dao.ProjectDao;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.entity.to.DrawingTypeEnityTO;
import com.edios.project.entity.to.ExecutionModelsEntityTO;
import com.edios.project.entity.to.ProjectCategoriesEntityTO;
import com.edios.project.entity.to.ProjectsTO;

@Repository
public class ProjectDaoImpl extends BaseDaoImpl<ProjectsEntity>implements ProjectDao {
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ProjectsTO> fetchProjectDetails(Long userID) {
		List<ProjectsTO> projectsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select p.projectID As projectID,p.siteID As siteID,p.siteName As siteName,p.allocationDate As allocationDate ,p.projectName As projectName ,"
					+ " p.transactionCount as transactionCount, case ct.entityType when 'Business' then ct.businessName else  concat(ct.firstName, ' ' ,ct.lastName) end As customerName,c.circleName As circleName,"
					+ " pc.categoryName As categoryName ,em.execModelName As execModelName,apl.parameterListValue As status "
					+ " from  ProjectsEntity p  "
					+ " LEFT JOIN p.contactID As ct "
					+ " LEFT JOIN p.circleID As c "
					+ " LEFT JOIN p.categoryID As pc "
					+ " LEFT JOIN p.execModelID As em "
					+ " LEFT JOIN p.drawingTypeID as dt"
					+ " LEFT JOIN p.statusListID As apl "
					+ "	INNER JOIN UserRightsEntity as ur on ur.userID.userID=:userID and ur.contactID.contactID=ct.contactID and ur.circleID.circleID=c.circleID "
					+ " where p.recordType<>'D'  and ct.contactType=:contactType "
					+ " order by p.projectID DESC";

			projectsTO = (List<ProjectsTO>) session.createQuery(sqlQuery).setParameter("userID",userID).setParameter("contactType", "CUSTOMER")
					.setResultTransformer(Transformers.aliasToBean(ProjectsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectsTO;
	}
/*	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ProjectsTO> fetchProjectDetails() {
		List<ProjectsTO> projectsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select p.projectID As projectID , p.siteID As siteID , p.siteName As siteName ,"
					+ " p.allocationDate As allocationDate ,p.projectName As projectName ,"
					+ " p.transactionCount as transactionCount, "
					+ " ct.businessName As customerName , c.circleName As circleName , "
					+ " pc.categoryName As categoryName ,em.execModelName As execModelName , "
					+ " apl.parameterListValue As status  "
					+ " from  ProjectsEntity p  LEFT JOIN p.contactID As ct  LEFT JOIN p.circleID As c "
					+ " LEFT JOIN p.categoryID As pc LEFT JOIN p.execModelID As em "
					+ " LEFT JOIN p.drawingTypeID as dt  LEFT JOIN p.statusListID As apl  "
					+ " where apl.parameterListCode=:parameterListCode and ct.contactType=:contactType "
					+ " and p.recordType<>'D' order by p.projectID DESC";

			projectsTO = (List<ProjectsTO>) session.createQuery(sqlQuery)
					.setParameter("parameterListCode", "NEW").setParameter("contactType", "CUSTOMER")
					.setResultTransformer(Transformers.aliasToBean(ProjectsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectsTO;
	}
	*/
	
	

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<ProjectsTO> projectDetails(String searchCode,Long userID) {
		List<ProjectsTO> projectsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if(searchCode.equalsIgnoreCase("ALL")) {
				sqlQuery ="select p.projectID As projectID,p.siteID As siteID,p.siteName As siteName,p.allocationDate As allocationDate ,p.projectName As projectName ,"
						+ " p.transactionCount as transactionCount,case ct.entityType when 'Business' then ct.businessName else  concat(ct.firstName, ' ' ,ct.lastName) end As customerName,c.circleName As circleName,"
						+ " pc.categoryName As categoryName ,em.execModelName As execModelName,apl.parameterListValue As status "
						+ " from  ProjectsEntity p  "
						+ " LEFT JOIN p.contactID As ct "
						+ " LEFT JOIN p.circleID As c "
						+ " LEFT JOIN p.categoryID As pc "
						+ " LEFT JOIN p.execModelID As em "
						+ " LEFT JOIN p.drawingTypeID as dt"
						+ " LEFT JOIN p.statusListID As apl "
						+ "	INNER JOIN UserRightsEntity as ur on ur.userID.userID=:userID and ur.contactID.contactID=ct.contactID and ur.circleID.circleID=c.circleID "
						+ " where p.recordType<>'D' and ct.contactType=:contactType "
						+ " order by p.projectID DESC";
				
				projectsTO = (List<ProjectsTO>) session.createQuery(sqlQuery).setParameter("userID",userID).setParameter("contactType", "CUSTOMER")
						.setResultTransformer(Transformers.aliasToBean(ProjectsTO.class)).list();
			}else {
				sqlQuery ="select p.projectID As projectID,p.siteID As siteID,p.siteName As siteName,p.allocationDate As allocationDate ,p.projectName As projectName ,"
						+ " p.transactionCount as transactionCount,case ct.entityType when 'Business' then ct.businessName else  concat(ct.firstName, ' ' ,ct.lastName) end As customerName,c.circleName As circleName,"
						+ " pc.categoryName As categoryName ,em.execModelName As execModelName,apl.parameterListValue As status "
						+ " from  ProjectsEntity p  "
						+ " LEFT JOIN p.contactID As ct "
						+ " LEFT JOIN p.circleID As c "
						+ " LEFT JOIN p.categoryID As pc "
						+ " LEFT JOIN p.execModelID As em "
						+ " LEFT JOIN p.drawingTypeID as dt"
						+ " LEFT JOIN p.statusListID As apl "
						+ "	INNER JOIN UserRightsEntity as ur on ur.userID.userID=:userID and ur.contactID.contactID=ct.contactID and ur.circleID.circleID=c.circleID "
						+ " where apl.parameterListCode=:parameterListCode and  p.recordType<>'D'  and ct.contactType=:contactType "
						+ " order by p.projectID DESC";
				projectsTO =(List<ProjectsTO>)session.createQuery(sqlQuery)
						.setParameter("parameterListCode", searchCode).setParameter("userID", userID).setParameter("contactType", "CUSTOMER")
						.setResultTransformer(Transformers.aliasToBean(ProjectsTO.class)).list();
			}
			
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectsTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<StatusEntityTO> projectStatus(String statusType) {
		List<StatusEntityTO> statusEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select se.statusId As statusId , se.statusName As statusName ,se.statusCode As statusCode "
					+ "  , se.statusType As statusType from   StatusesEntity se where se.statusType=:statusType order by statusName ASC";

			statusEntityTO = (List<StatusEntityTO>) session.createQuery(sqlQuery)
					.setParameter("statusType", statusType)
					.setResultTransformer(Transformers.aliasToBean(StatusEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return statusEntityTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ContactsEntityTO> contactAutoLookup(Long userID) {
		List<ContactsEntityTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			/*sqlQuery = "select ce.contactID As contactID , ce.businessName As businessName "
					+ " from UserRightsEntity user left join user.contactID as ce where user.userID.userID=:userID and ce.contactType=:contactType and ce.recordType <>'D' group by ce.businessName order by ce.contactID ASC";
*/
			sqlQuery = "select ce.contactID As contactID , case ce.entityType when 'Business' then ce.businessName else  concat(ce.firstName, ' ' ,ce.lastName) "
					+ " end  as businessName from UserRightsEntity user left join user.contactID as ce where user.userID.userID=:userID "
					+ " and ce.contactType=:contactType and ce.recordType <>'D' and ce.contactStatus='Active' group by case ce.entityType when 'Business' then ce.businessName else  ce.firstName end order by ce.contactID ASC";

			autoCompleteTO = (List<ContactsEntityTO>) session.createQuery(sqlQuery).setParameter("userID",userID)
					.setParameter("contactType", "CUSTOMER")
					.setResultTransformer(Transformers.aliasToBean(ContactsEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<CirclesEntityTO> circleAutoLookup(Long contactID,Long userID) {
		List<CirclesEntityTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select ce.circleID As circleID , ce.circleName As circleName "
					+ " from UserRightsEntity user left join user.circleID as ce where user.userID.userID=:userID and user.contactID.contactID=:contactID and  ce.recordType <>'D' and ce.circleStatus='Active' order by ce.circleID ASC";

			autoCompleteTO = (List<CirclesEntityTO>) session.createQuery(sqlQuery).setParameter("userID", userID).setParameter("contactID", contactID)					
					.setResultTransformer(Transformers.aliasToBean(CirclesEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ProjectCategoriesEntityTO> projectCategoryAutoLookup() {
		List<ProjectCategoriesEntityTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select pce.categoryID As categoryID , pce.categoryName As categoryName "
					+ " from   ProjectCategoriesEntity pce where pce.recordType <>'D' and pce.categoryStatus='Active' order by pce.categoryID ASC";

			autoCompleteTO = (List<ProjectCategoriesEntityTO>) session.createQuery(sqlQuery)					
					.setResultTransformer(Transformers.aliasToBean(ProjectCategoriesEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}
	
	
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ExecutionModelsEntityTO> executionModelAutoLookup() {
		List<ExecutionModelsEntityTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select eme.execModelID As execModelID , eme.execModelName As execModelName "
					+ " from   ExecutionModelsEntity eme  where eme.recordType <>'D' and eme.execModelStatus='Active' order by eme.execModelID ASC";

			autoCompleteTO = (List<ExecutionModelsEntityTO>) session.createQuery(sqlQuery)					
					.setResultTransformer(Transformers.aliasToBean(ExecutionModelsEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<DrawingTypeEnityTO> drawingTypeAutoLookup(Long executionModelID) {
		List<DrawingTypeEnityTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select de.drawingTypeID As drawingTypeID , de.drawingTypeName As drawingTypeName "
					+ " from   DrawingTypeEntity de where de.recordType <>'D' and de.drawingTypeStatus='Active' and de.execModelID.execModelID=:executionModelID order by de.drawingTypeID ASC";

			autoCompleteTO = (List<DrawingTypeEnityTO>) session.createQuery(sqlQuery).setParameter("executionModelID",executionModelID)					
					.setResultTransformer(Transformers.aliasToBean(DrawingTypeEnityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}
	
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ParameterDropDownTO> parameterListDropdown(String listType) {
		List<ParameterDropDownTO> applicationParameterListTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select apl.parameterListID As parameterListID , apl.parameterListCode As parameterListCode ,apl.parameterListValue As parameterListValue "
					+ "  , apl.parameterListDesc As parameterListDesc from   ApplicationParameterListEntity apl LEFT JOIN apl.parameterID As ap "
					+ "  where ap.parameterID=(select parameterID from ApplicationParameterEntity a where a.parameterCode=:parameterCode) order by apl.parameterListCode ASC";

			applicationParameterListTO = (List<ParameterDropDownTO>) session.createQuery(sqlQuery)
					.setParameter("parameterCode", listType)
					.setResultTransformer(Transformers.aliasToBean(ParameterDropDownTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return applicationParameterListTO;
	} 
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ParameterListTO> parameterList(String listType) {
		List<ParameterListTO> parameterListTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select apl.parameterListID As id , apl.parameterListCode As code ,apl.parameterListValue As value "
					+ "  , from   ApplicationParameterListEntity apl LEFT JOIN apl.parameterID As ap "
					+ "  where ap.parameterID=(select parameterID from ApplicationParameterEntity a where a.parameterCode=:parameterCode) order by apl.parameterListID ASC";

			parameterListTO = (List<ParameterListTO>) session.createQuery(sqlQuery)
					.setParameter("parameterCode", listType)
					.setResultTransformer(Transformers.aliasToBean(ParameterListTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return parameterListTO;
	} 
	
	
	@Override
	public Long addProject(ProjectsEntity projectsEntity) {
		Long projectID=null;
		try {
			Session session = (Session) entityManager.getDelegate();
			projectID=(Long) session.save(projectsEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectID;
	}




	@Override
	public ProjectsEntity findProjectById(Long projectID) {
		
			try {				
			Session session = (Session)entityManager.getDelegate();
				return session.get(ProjectsEntity.class, projectID);
				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}		
	  }




	@Override
	public boolean updateProject(ProjectsEntity projectsEntity) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.merge(projectsEntity);
			System.out.println(" project Updated Successfully");
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}




	@SuppressWarnings("deprecation")
	@Override
	public ProjectBean fetchProjectById(Long projectID) {
		ProjectBean projectBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select pe.transactionCount As transactionCount , pe.recordType As recordType  from ProjectsEntity pe "
					+ "where pe.projectID=:projectID ";

			projectBean = (ProjectBean) session.createQuery(sqlQuery)
					.setParameter("projectID", projectID)
					.setResultTransformer(Transformers.aliasToBean(ProjectBean.class)).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectBean;
	}

	@Override
	public boolean deleteProject(Long projectID, Integer lastModifiedBy) {
		boolean result = true;
		try {
			String hql = "update ProjectsEntity pe set pe.lastModifiedDate=:lastModifiedDate"
					+ " , pe.recordType='D' , pe.lastModifiedBy=:lastModifiedBy"
					+ " WHERE pe.projectID=:projectID";

			Session session = (Session) entityManager.getDelegate();
			Query query = session.createQuery(hql);
			query.setParameter("projectID", projectID);
			query.setParameter("lastModifiedBy", lastModifiedBy);
			query.setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
			int resultID = query.executeUpdate();
			System.out.println("Rows Affected: " + resultID);
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}




	@SuppressWarnings("deprecation")
	@Override
	public TransactionData fetchTransactionDataById(Long projectID) {
		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select pe.transactionCount as transactionCount,pe.recordType as recordType "
					+ " from  ProjectsEntity pe  where pe.projectID=:projectID";

			transactionData = (TransactionData) session.createQuery(sqlQuery).setParameter("projectID", projectID)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}



	@Override
	public boolean searchUniqueProjectName(String siteName) {
		try {
			return entityManager.createQuery("select projectEntity.siteName as siteName from ProjectsEntity projectEntity where "
							+ " projectEntity.siteName=:siteName").setParameter("siteName", siteName).getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {			
			return true;
		}
	
	}



//	@Override
//	public List<ProjectsTO> fetchBOQDetails(Long projectId) {
//		List<ProjectsTO> projectsTO = null;
//		String sqlQuery = "";
//		try {
//			Session session = (Session) entityManager.getDelegate();
//			sqlQuery = "select apl.parameterListID As id , apl.parameterListCode As code ,apl.parameterListValue As value "
//					+ "  , from   ApplicationParameterListEntity apl LEFT JOIN apl.parameterID As ap "
//					+ "  where ap.parameterID=(select parameterID from ApplicationParameterEntity a where a.parameterCode=:parameterCode) order by apl.parameterListID ASC";
//
//			projectsTO = (List<ProjectsTO>) session.createQuery(sqlQuery)
//					.setParameter("parameterCode", projectId)
//					.setResultTransformer(Transformers.aliasToBean(ProjectsTO.class)).list();
//		} catch (Exception exception) {
//			exception.printStackTrace();
//			return null;
//		}
//		return projectsTO;
//	}




}
