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
import com.edios.project.dao.CircleDao;
import com.edios.project.entity.CircleEntity;
import com.edios.project.entity.to.CirclesEntityTO;

@Repository
public class CircleDaoImpl extends BaseDaoImpl<CircleEntity> implements CircleDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<CirclesEntityTO> fetchCircles() {
		List<CirclesEntityTO> circlesEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select c.circleID As circleID  , c.circleName as circleName, c.circleStatus as circleStatus, "
				+ " c.transactionCount as transactionCount  from CircleEntity c "
				+ " where  c.recordType<>'D' and c.circleStatus=:circleStatus ";
		circlesEntityTO= (List<CirclesEntityTO>) session.createQuery(sqlQuery).setParameter("circleStatus", "Active")
				.setResultTransformer(Transformers.aliasToBean(CirclesEntityTO.class)).list();
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return circlesEntityTO;
	}

	@Override
	public boolean addCircle(CircleEntity circleEntity) {
		boolean addresult = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(circleEntity);	
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return addresult;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<CirclesEntityTO> fetchCircleDetail(String circleStatus) {
		List<CirclesEntityTO> circlesEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if(circleStatus.equalsIgnoreCase("Active") || circleStatus.equalsIgnoreCase("Inactive")) {
				sqlQuery= "select c.circleID As circleID  , c.circleName as circleName, c.circleStatus as circleStatus, "
						+ " c.transactionCount as transactionCount  from CircleEntity c "
						+ " where  c.recordType<>'D' and c.circleStatus=:circleStatus ";
				circlesEntityTO = (List<CirclesEntityTO>) session.createQuery(sqlQuery)
						.setParameter("circleStatus", circleStatus)
						.setResultTransformer(Transformers.aliasToBean(CirclesEntityTO.class)).list();	
			}
			else {
				sqlQuery= "select c.circleID As circleID  , c.circleName as circleName, c.circleStatus as circleStatus, "
						+ " c.transactionCount as transactionCount  from CircleEntity c "
						+ " where  c.recordType<>'D' ";
				circlesEntityTO = (List<CirclesEntityTO>) session.createQuery(sqlQuery)
						.setResultTransformer(Transformers.aliasToBean(CirclesEntityTO.class)).list();
					
			}
				
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		
		
		return circlesEntityTO;
	}

	@Override
	public CircleEntity editCircle(Long circleID) {
		try {
			 return entityManager.find(CircleEntity.class, circleID) ;
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	
	}

	@Override
	public boolean updateCircle(CircleEntity circleEntity) {
			boolean result = true;
			try {
				Session session = (Session) entityManager.getDelegate();
				session.merge(circleEntity);
				//System.out.println(" parameter Updated Successfully");
			} catch (Exception exception) {
				exception.printStackTrace();
				return false;
			}
			return result;
		}
	

	@Override
	public boolean isCircleIdExist(Long  id) {
		try {
			return entityManager.createQuery(
					"select 1 from ProjectsEntity table where "
							+ " table.circleID.circleID="+id)
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deleteCircle(Long deleteRecords, Integer lastModifiedBy) {
		boolean result = true;
		try {
		
			String hql="update CircleEntity c set c.lastModifiedDate=:lastModifiedDate , c.recordType='D', c.lastModifiedBy=:lastModifiedBy"
			+ " WHERE c.circleID=:deleteRecords";
			Session session = (Session) entityManager.getDelegate(); 
			Query query = session.createQuery(hql);
			 query.setParameter("deleteRecords", deleteRecords)
			 .setParameter("lastModifiedBy", lastModifiedBy)
		     .setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
		
		query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		return false;
		}
		return result;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public boolean getCircleNameExist(String circleName) {
		try {
			List<CircleEntity>list = null;
			Session session = (Session) entityManager.getDelegate();
			list = session.createQuery(
			"select c.circleName from CircleEntity c where c.circleName=:circleName")
					.setParameter("circleName", circleName)
					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
			if (list.size() == 0) {
				return false;
			} else {
			return true;
			}
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public boolean getCircleNameExists(String circleName, Long circleID) {
		try {
			List<CircleEntity>list = null;
			Session session = (Session) entityManager.getDelegate();
			list = session.createQuery(
			"select c.circleName from CircleEntity c where c.circleName=:circleName and c.circleID!=:circleID")
					.setParameter("circleName", circleName).setLong("circleID", circleID)
					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
			if (list.size() == 0) {
				return false;
			} else {
			return true;
			}
		}
		catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	}

	
//	@SuppressWarnings({ "unchecked", "deprecation" })
//	@Override
//	public boolean getAppParameterNameExists(String circleName) {
//		try {
//			List<CircleEntity>list = null;
//			Session session = (Session) entityManager.getDelegate();
//			list = session.createQuery(
//			"select c.circleName from CircleEntity c where c.circleName!=:circleName")
//					.setParameter("circleName", circleName)
//					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
//			if (list.size() == 0) {
//				return false;
//			} else {
//			return true;
//			}
//					
//		}
//		catch (Exception e) {
//		e.printStackTrace();
//		
//		return false;
//		}
//	}
//	
//	@SuppressWarnings({ "unchecked", "deprecation" })
//	@Override
//	public boolean isAppParameterCodeExists(Long circleStatusID, Long circleID) {
//		try {
//			List<CircleEntity> list = null;
//			Session session = (Session) entityManager.getDelegate();
//			list = session.createQuery(
//					"select c.circleName from CircleEntity c where c.circleStatusID=:circleStatusID and c.circleID!=:circleID")
//					.setParameter("circleStatusID", circleStatusID).setLong("circleID", circleID)
//					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
//			if (list.size() == 0) {
//				return false;
//			} else {
//				return true;
//			}
//		} catch (Exception exception) {
//			exception.printStackTrace();
//			return false;
//		}
//	}
//
//	@SuppressWarnings({ "unchecked", "deprecation" })
//	@Override
//	public boolean getAppParameterNameExists(String circleName, Long circleID) {
//		try {
//			List<CircleEntity> list = null;
//			Session session = (Session) entityManager.getDelegate();
//			list = session.createQuery(
//					"select c.circleName from CircleEntity c where c.circleName=:circleName and c.circleID!=:circleID")
//					.setParameter("circleName", circleName).setLong("circleID", circleID)
//					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
//			if (list.size() == 0) {
//				return false;
//			} else {
//				return true;
//			}
//		} catch (Exception exception) {
//			exception.printStackTrace();
//			return false;
//		}
//		
//	}
	
//	@SuppressWarnings({ "unchecked", "deprecation" })
//	@Override
//	public boolean getAppParameterCodeExists(Long circleStatusID) {
//		try {
//			List<CircleEntity> list = null;
//			Session session = (Session) entityManager.getDelegate();
//			list = session.createQuery(
//					"select c.circleName from CircleEntity c where c.circleStatusID=:circleStatusID")
//					.setParameter("circleStatusID", circleStatusID)
//					.setResultTransformer(Transformers.aliasToBean(CircleEntity.class)).list();
//			if (list.size() == 0) {
//				return false;
//			} else {
//				return true;
//			}
//		} catch (Exception exception) {
//			exception.printStackTrace();
//			return false;
//		}
//		
//	}
	}
	
	
