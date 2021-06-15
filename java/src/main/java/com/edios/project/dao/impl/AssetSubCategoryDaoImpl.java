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
import com.edios.cdf.util.TransactionData;
import com.edios.project.dao.AssetSubCategoryDao;
import com.edios.project.entity.AssetSubCategoryEnitity;
import com.edios.project.entity.to.AssetSubCategoryTO;


@Repository
public class AssetSubCategoryDaoImpl extends BaseDaoImpl<AssetSubCategoryEnitity> implements AssetSubCategoryDao {

	
	
	@SuppressWarnings({"deprecation","unchecked"})
	@Override
	public List<AssetSubCategoryTO> fetchSubCategories(String status,Long assetCategoryID) {
		List<AssetSubCategoryTO> assetSubCategoryTOList=null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if(status.equalsIgnoreCase("All")) {
				sqlQuery = "select zone.assetSubCategoryID As assetSubCategoryID, zone.subCategoryName As subCategoryName, zone.subCategoryCode As subCategoryCode, zone.subCategoryDescription As subCategoryDescription,"
						+ " zone.subCategoryStatus As subCategoryStatus,zone.transactionCount As transactionCount,assetCat.categoryName As categoryName "
						+ " from AssetSubCategoryEnitity As zone left join zone.assetCategoryID assetCat  where zone.recordType<>'D' and assetCat.assetCategoryID=:assetCategoryID "
						+ " order by zone.assetSubCategoryID asc";
				assetSubCategoryTOList =(List<AssetSubCategoryTO>)session.createQuery(sqlQuery).setParameter("assetCategoryID", assetCategoryID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryTO.class)).list();
			} else {
				sqlQuery = "select zone.assetSubCategoryID As assetSubCategoryID, zone.subCategoryName As subCategoryName, zone.subCategoryCode As subCategoryCode, zone.subCategoryDescription As subCategoryDescription,"
						+ " zone.subCategoryStatus As subCategoryStatus,zone.transactionCount As transactionCount,assetCat.categoryName As categoryName"
						+ " from AssetSubCategoryEnitity As zone left join zone.assetCategoryID assetCat where zone.subCategoryStatus=:subCategoryStatus and zone.recordType<>'D' and assetCat.assetCategoryID=:assetCategoryID "
						+ " order by zone.assetSubCategoryID asc";
				assetSubCategoryTOList =(List<AssetSubCategoryTO>) session.createQuery(sqlQuery).setParameter("subCategoryStatus", status).setParameter("assetCategoryID", assetCategoryID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryTO.class)).list();
			}
		}
			 catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}
				return assetSubCategoryTOList;
	}

	@Override
	public boolean checkSubCategoryNameExists(Long assetSubCategoryID, String subCategoryName) {
		try{
			return entityManager.createQuery("select assetCategory.assetSubCategoryID as assetSubCategoryID from AssetSubCategoryEnitity assetCategory"
					+ " where assetCategory.subCategoryName='"+subCategoryName+"'"+
					" and assetCategory.assetSubCategoryID!="+assetSubCategoryID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean checkSubCategoryCodeExists(Long assetSubCategoryID, String subCategoryCode) {
		try{
			return entityManager.createQuery("select assestCategory.assetSubCategoryID from AssetSubCategoryEnitity assestCategory"
					+ " where assestCategory.subCategoryCode='"+subCategoryCode+"'"+
					" and assestCategory.assetSubCategoryID!="+assetSubCategoryID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean addSubCategory(AssetSubCategoryEnitity assetSubCategoryEnitity) {
		boolean resultFlag=false;
		entityManager.persist(assetSubCategoryEnitity);
		resultFlag=true;
		return resultFlag;
	}
	
	@Override
	public AssetSubCategoryEnitity findSubCategoryById(Long id) {
		try {
			return entityManager.find(AssetSubCategoryEnitity.class, id);
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
					+ " from  AssetSubCategoryEnitity aple  "
					+ " where aple.assetSubCategoryID=:assetSubCategoryID";

			transactionData = (TransactionData) session.createQuery(sqlQuery)
					.setParameter("assetSubCategoryID", id)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}
	
	@Override
	public boolean updateSubCategory(AssetSubCategoryEnitity assetSubCategoryEnitity) {
		boolean result = false;
			Session session = (Session) entityManager.getDelegate();
			session.update(assetSubCategoryEnitity);
			result=true;
		return result;
	}
	
	@Override
	public boolean deleteSubCategory(Long deleteRecordId, Long lastModifiedBy) {
		boolean result = true;
		try {
			String hql = "update AssetSubCategoryEnitity aple set aple.lastModifiedDate=:lastModifiedDate"
					+ " , aple.recordType='D' , aple.lastModifiedBy=:lastModifiedBy"
					+ " WHERE aple.assetSubCategoryID=:deleteRecordId";

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
