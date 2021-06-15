package com.edios.project.dao.impl;

import java.util.List;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.cdf.entity.to.UserDetailTO;
import com.edios.cdf.entity.to.UserEntityTO;
import com.edios.project.dao.UserRightsDao;
import com.edios.project.entity.UserRightsEntity;
import com.edios.project.entity.to.UserRightsTO;

@Repository
public class UserRightsDaoImpl extends BaseDaoImpl<UserRightsEntity> implements UserRightsDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<UserDetailTO> usersDropdown() {
		List<UserDetailTO> autoCompleteTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select u.userID As userID , u.loginName As loginName "
					+ " from   UserEntity u where u.recordType <>'D' and u.userStatus='Active' order by u.loginName asc";

			autoCompleteTO = (List<UserDetailTO>) session.createQuery(sqlQuery)
					.setResultTransformer(Transformers.aliasToBean(UserDetailTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return autoCompleteTO;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<UserEntityTO> getUsersList() {
		List<UserEntityTO> userRightsTO = null;
		String sqlQuery = "";
		try {

			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select u.userID as userID, u.loginName as loginName from UserEntity u where u.recordType <>'D' and u.userStatus='Active' order by u.loginName asc ";
			userRightsTO = (List<UserEntityTO>) session.createQuery(sqlQuery)
					.setResultTransformer(Transformers.aliasToBean(UserEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return userRightsTO;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	 @Override
	 public List<UserRightsTO> fetchUsersOnCriteria(String searchParameter, Integer accountId) {
	  List<UserRightsTO> userRightsTO = null;
	  String sqlQuery = "";
	  try {
	   Session session = (Session) entityManager.getDelegate();
	   sqlQuery = "select ur.userRightsID as userRightsID, "
	     + " u.loginName as loginName,u.userID as userID, "
	     + " c.contactID as contactID,case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end  as businessName, "
	     + " cr.circleName as circleName, cr.circleID as circleID "
	     + " from UserRightsEntity ur LEFT JOIN ur.contactID as c left join ur.circleID as cr left join ur.userID as u "
	     + " where  u.loginName=:loginName and c.recordType<>'D' and c.contactStatus='Active'  order by u.loginName asc";
	   userRightsTO = (List<UserRightsTO>) session.createQuery(sqlQuery).setParameter("loginName", searchParameter)
	     .setResultTransformer(Transformers.aliasToBean(UserRightsTO.class)).list();

	  } catch (Exception e) {
	   e.printStackTrace();
	   return null;
	  }
	  return userRightsTO;

	 }

	 @SuppressWarnings({ "deprecation", "unchecked" })
	 @Override
	 public List<UserRightsTO> userRightsOnBasisOfUsers() {
	  List<UserRightsTO> userRightsTO = null;
	  String sqlQuery = "";
	  try {
	   Session session = (Session) entityManager.getDelegate();
	   sqlQuery = "SELECT c.contactID as contactID, case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end as businessName, "
	   			+ " d.circleName as circleName, d.circleID as circleID FROM ContactsEntity c ,CircleEntity d where c.contactType='Customer'"
	   			+ "and c.contactStatus='Active' and d.circleStatus='Active' and c.recordType <>'D' and d.recordType <>'D' order by c.businessName";
	   userRightsTO = (List<UserRightsTO>) session.createQuery(sqlQuery)
	     .setResultTransformer(Transformers.aliasToBean(UserRightsTO.class)).list();
	  } catch (Exception e) {
	   e.printStackTrace();
	   return null;
	  }
	  return userRightsTO;
	 }

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<UserRightsTO> selectedUserRightsOnBasisOfUsers(Integer accountId, Long id) {
		List<UserRightsTO> userRightsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select  case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end as businessName,"
					+ " c.contactID as contactID, cr.circleName as circleName,cr.circleID as circleID from UserRightsEntity ur LEFT JOIN ur.contactID as c "
					+ " left join ur.circleID as cr left join ur.userID as u  where  u.userID=:userID and c.recordType<>'D' and c.contactStatus='Active' order by case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end ASC";
			userRightsTO = (List<UserRightsTO>) session.createQuery(sqlQuery).setParameter("userID", id)
					.setResultTransformer(Transformers.aliasToBean(UserRightsTO.class)).list();

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return userRightsTO;
	}

	@Override
	public boolean deleteUserRights(Long Id) {
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "delete UserRightsEntity ur" + " where  ur.userID.userID=:userID";
			session.createQuery(sqlQuery).setParameter("userID", Id).executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean saveUserRights(UserRightsEntity userRightsEntity) {
		Session session = (Session) entityManager.getDelegate();
		session.save(userRightsEntity);
		return true;
	}
	@Override
	public boolean deleteUserRight(Long id) {
		String sqlQuery= "";
		try {
		sqlQuery= "delete UserRightsEntity ur where ur.userRightsID=:userRightsID";
		Session session = (Session) entityManager.getDelegate();
		session.createQuery(sqlQuery).setParameter("userRightsID", id).executeUpdate();
		}
		catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean checkUserRights(UserRightsTO deleteRecords) {
		try {
			return entityManager.createQuery(
					"select table.projectID as projectID from ProjectsEntity table where "
							+ " table.createdBy=" + deleteRecords.getUserID()+" and "
							+ " table.contactID.contactID=" + deleteRecords.getContactID()+" and "
					        + " table.circleID.circleID=" + deleteRecords.getCircleID()+" and "
							+ " table.recordType<>'D' ")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}
	
}
