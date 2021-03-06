package com.edios.cdf.dao.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.bean.security.SiteBean;
import com.edios.cdf.dao.SiteDao;
import com.edios.cdf.entity.common.ApplicationParameterEntity;
import com.edios.cdf.entity.security.SiteEntity;
import com.edios.cdf.entity.to.SiteEntityTO;
import com.edios.cdf.util.TransactionData;

@Repository
public class SiteDaoImpl extends BaseDaoImpl<SiteEntity> implements SiteDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<SiteEntityTO> fetchSites(Integer accountID) {
		List<SiteEntityTO> siteEntityTOList = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select se.siteID As siteID , se.siteName As siteName , se.siteCode As siteCode ,"
					+ " se.siteStatus As siteStatus ,se.transactionCount as transactionCount, "
					+ " aple.parameterListValue As siteTypeValue ,se.accountID As accountID , se.city As city ,"
					+ " se.state As state from  SiteEntity se  LEFT JOIN se.siteTypeListID as aple"
					+ " where se.recordType<>'D' and se.siteStatus=:siteStatus and se.accountID=:accountID "
					+ " order by se.siteName asc";
			siteEntityTOList = (List<SiteEntityTO>) session.createQuery(sqlQuery).setParameter("siteStatus", "Active")
					.setParameter("accountID", accountID)
					.setResultTransformer(Transformers.aliasToBean(SiteEntityTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return siteEntityTOList;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<SiteEntityTO> fetchSites(String searchParameter, Integer accountID) {
		List<SiteEntityTO> SiteEntityTOList = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if (searchParameter.equalsIgnoreCase("Active") || searchParameter.equalsIgnoreCase("InActive")) {

				sqlQuery = "select se.siteID As siteID , se.siteName As siteName , se.siteCode As siteCode ,"
						+ " se.siteStatus As siteStatus ,se.transactionCount as transactionCount, "
						+ " aple.parameterListValue As siteTypeValue ,se.accountID As accountID , se.city As city ,"
						+ " se.state As state from  SiteEntity se  LEFT JOIN se.siteTypeListID as aple"
						+ " where se.recordType<>'D' and se.siteStatus=:siteStatus and se.accountID=:accountID "
						+ " order by se.siteName asc";
				
				SiteEntityTOList = (List<SiteEntityTO>) session.createQuery(sqlQuery)
						.setParameter("siteStatus", searchParameter).setParameter("accountID", accountID)
						.setResultTransformer(Transformers.aliasToBean(SiteEntityTO.class)).list();
			} else {
				sqlQuery = "select se.siteID As siteID , se.siteName As siteName , se.siteCode As siteCode ,"
						+ " se.siteStatus As siteStatus ,se.transactionCount as transactionCount, "
						+ " aple.parameterListValue As siteTypeValue ,se.accountID As accountID , se.city As city ,"
						+ " se.state As state from  SiteEntity se  LEFT JOIN se.siteTypeListID as aple"
						+ " where se.recordType<>'D' and se.accountID=:accountID "
						+ " order by se.siteName asc";
				SiteEntityTOList = (List<SiteEntityTO>) session.createQuery(sqlQuery)
						.setParameter("accountID", accountID)
						.setResultTransformer(Transformers.aliasToBean(SiteEntityTO.class)).list();
			}
		} catch (NoResultException noResultException) {
			return null;
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return SiteEntityTOList;
	}

	

	@Override
	public boolean addSite(SiteEntity siteEntity) {
		boolean result = true;
		try {
			entityManager.persist(siteEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}

	@Override
	public SiteEntity findSiteById(Long siteId, Integer accountId) {
			SiteEntity siteEntity = null;
			String sqlQuery = "";
			try {
				sqlQuery = "from  SiteEntity as se left join fetch se.siteTypeListID as list   where se.siteID=:siteID and se.accountID=:accountID ";
				siteEntity = (SiteEntity) entityManager.createQuery(sqlQuery)
					.setParameter("siteID", siteId).setParameter("accountID", accountId).getSingleResult();
			} catch (NoResultException noResultException) {
				return null;
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
			return siteEntity;
	}

	@SuppressWarnings("deprecation")
	@Override
	public TransactionData fetchTransactionDataById(Long siteID) {
		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select table.transactionCount as transactionCount,table.recordType as recordType "
					+ " from  SiteEntity table where table.siteID=:siteID";
			transactionData = (TransactionData) session.createQuery(sqlQuery).setParameter("siteID", siteID)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}

	@Override
	public boolean updateSite(SiteEntity siteEntity) {
		boolean result = true;
		try {
			//entityManager.merge(siteEntity);
			Session session = (Session) entityManager.getDelegate();
			session.update(siteEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
	
	@Override
	public boolean isSiteNameExist(String siteName) {
		try {
			return entityManager.createQuery(
					"select table.siteName as siteName from SiteEntity table where "
							+ " table.siteName='" + siteName+"'")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}

	@Override
	public boolean isSiteCodeExists(String siteCode) {
		try {
			return entityManager.createQuery(
					"select table.siteCode as siteCode from SiteEntity table where "
							+ " table.siteCode='" + siteCode+"'")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}

	@Override
	public boolean isSiteNameExist(String siteName, Long siteID) {
		try {
			return entityManager.createQuery(
					"select table.siteName as siteName from SiteEntity table where "
							+ " table.siteName='" + siteName+"' and table.siteID!="+siteID)
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}

	@Override
	public boolean isSiteCodeExists(String siteCode, Long siteID) {
		try {
			return entityManager.createQuery(
					"select table.siteCode as siteCode from SiteEntity table where "
							+ " table.siteCode='" + siteCode+"' and table.siteID!="+siteID)
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}

	@Override
	public boolean deleteSite(Long deleteRecordId, Integer lastModifiedBy) {
		boolean result = true;
		try {
			String hql = "update SiteEntity se set se.lastModifiedOn=:lastModifiedDate"
					+ " , se.recordType='D' , se.lastModifiedBy=:lastModifiedBy"
					+ " WHERE se.siteID=:deleteRecordId";
			Session session = (Session) entityManager.getDelegate();
			Query query = session.createQuery(hql);
			query.setParameter("lastModifiedBy", lastModifiedBy);
			query.setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
			query.setParameter("deleteRecordId", deleteRecordId);
			int resultID = query.executeUpdate();
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
}
