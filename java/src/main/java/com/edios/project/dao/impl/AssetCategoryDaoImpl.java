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
import com.edios.cdf.entity.common.ApplicationParameterListEntity;
import com.edios.cdf.util.TransactionData;
import com.edios.project.dao.AssetCategoryDao;
import com.edios.project.entity.AssetCategoryEnitity;
import com.edios.project.entity.to.AssetCategoryTO;


@Repository
public class AssetCategoryDaoImpl extends BaseDaoImpl<AssetCategoryEnitity> implements AssetCategoryDao {

	
	
	@SuppressWarnings({"deprecation","unchecked"})
	@Override
	public List<AssetCategoryTO> fetchCategories(String status) {
		List<AssetCategoryTO> assetCategoryTOList=null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			System.out.println("Session is ::::::::::::::::: "+session);
			if(status.equalsIgnoreCase("All")) {
				sqlQuery = "select zone.assetCategoryID As assetCategoryID, zone.categoryName As categoryName, zone.categoryCode As categoryCode, zone.categoryDescription As categoryDescription,"
						+ " zone.categoryStatus As categoryStatus,zone.transactionCount As transactionCount "
						+ " from AssetCategoryEnitity As zone  where zone.recordType<>'D' "
						+ " order by zone.assetCategoryID asc";
				assetCategoryTOList =(List<AssetCategoryTO>)session.createQuery(sqlQuery).setResultTransformer(Transformers.aliasToBean(AssetCategoryTO.class)).list();
			} else {
				sqlQuery = "select zone.assetCategoryID As assetCategoryID, zone.categoryName As categoryName, zone.categoryCode As categoryCode, zone.categoryDescription As categoryDescription,"
						+ " zone.categoryStatus As categoryStatus,zone.transactionCount As transactionCount "
						+ " from AssetCategoryEnitity As zone  where zone.categoryStatus=:categoryStatus and zone.recordType<>'D' "
						+ " order by zone.assetCategoryID asc";
				assetCategoryTOList =(List<AssetCategoryTO>) session.createQuery(sqlQuery).setParameter("categoryStatus", status).setResultTransformer(Transformers.aliasToBean(AssetCategoryTO.class)).list();
			}
		}
			 catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}
				return assetCategoryTOList;
	}

	@Override
	public boolean checkCategoryNameExists(Long assetCategoryID, String categoryName) {
		try{
			return entityManager.createQuery("select assetCategory.assetCategoryID as assetCategoryID from AssetCategoryEnitity assetCategory"
					+ " where assetCategory.categoryName='"+categoryName+"'"+
					" and assetCategory.assetCategoryID!="+assetCategoryID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean checkCategoryCodeExists(Long assetCategoryID, String categoryCode) {
		try{
			return entityManager.createQuery("select assestCategory.assetCategoryID from AssetCategoryEnitity assestCategory"
					+ " where assestCategory.categoryCode='"+categoryCode+"'"+
					" and assestCategory.assetCategoryID!="+assetCategoryID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean addCategory(AssetCategoryEnitity assetCategoryEnitity) {
		boolean resultFlag=false;
		entityManager.persist(assetCategoryEnitity);
		resultFlag=true;
		return resultFlag;
	}
	
	@Override
	public AssetCategoryEnitity findCategoryById(Long id) {
		try {
			return entityManager.find(AssetCategoryEnitity.class, id);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public TransactionData fetchTransactionDataById(Long id) {
		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select aple.transactionCount as transactionCount,aple.recordType as recordType "
					+ " from  AssetCategoryEnitity aple  "
					+ " where aple.assetCategoryID=:assetCategoryID";

			transactionData = (TransactionData) session.createQuery(sqlQuery)
					.setParameter("assetCategoryID", id)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}
	
	@Override
	public boolean updateCategory(AssetCategoryEnitity assetCategoryEnitity) {
		boolean result = false;
			Session session = (Session) entityManager.getDelegate();
			session.update(assetCategoryEnitity);
			result=true;
		return result;
	}
	
	@Override
	public boolean deleteCategory(Long deleteRecordId, Long lastModifiedBy) {
		boolean result = true;
		try {
			String hql = "update AssetCategoryEnitity aple set aple.lastModifiedDate=:lastModifiedDate"
					+ " , aple.recordType='D' , aple.lastModifiedBy=:lastModifiedBy"
					+ " WHERE aple.assetCategoryID=:deleteRecordId";

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
