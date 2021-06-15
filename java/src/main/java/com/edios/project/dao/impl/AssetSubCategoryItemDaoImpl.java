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
import com.edios.project.dao.AssetSubCategoryItemDao;
import com.edios.project.entity.AssetSubCategoryItemEnitity;
import com.edios.project.entity.to.AssetSubCategoryItemTO;


@Repository
public class AssetSubCategoryItemDaoImpl extends BaseDaoImpl<AssetSubCategoryItemEnitity> implements AssetSubCategoryItemDao {

	
	
	@SuppressWarnings({"deprecation","unchecked"})
	@Override
	public List<AssetSubCategoryItemTO> fetchSubCategoryItems(String status,Long assetSubCategoryID) {
		List<AssetSubCategoryItemTO> assetSubCategoryTOList=null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if(status.equalsIgnoreCase("All")) {
				sqlQuery = "select zone.assetItemID As assetItemID, zone.itemName As itemName, zone.itemCode As itemCode, zone.itemUnit As itemUnit,"
						+ " zone.itemStatus As itemStatus,zone.itemType as itemType,zone.transactionCount As transactionCount,assetCat.subCategoryName As subCategoryName "
						+ " from AssetSubCategoryItemEnitity As zone left join zone.assetSubCategoryID assetCat  where zone.recordType<>'D' and assetCat.assetSubCategoryID=:assetSubCategoryID "
						+ " order by zone.assetItemID asc";
				assetSubCategoryTOList =(List<AssetSubCategoryItemTO>)session.createQuery(sqlQuery).setParameter("assetSubCategoryID", assetSubCategoryID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryItemTO.class)).list();
			} else {
				
				sqlQuery = "select zone.assetItemID As assetItemID, zone.itemName As itemName, zone.itemCode As itemCode, zone.itemUnit As itemUnit,"
						+ " zone.itemStatus As itemStatus,zone.itemType as itemType,zone.transactionCount As transactionCount,assetCat.subCategoryName As subCategoryName "
						+ " from AssetSubCategoryItemEnitity As zone left join zone.assetSubCategoryID assetCat where zone.itemStatus=:itemStatus and  zone.recordType<>'D' and assetCat.assetSubCategoryID=:assetSubCategoryID "
						+ " order by zone.assetItemID asc";
				
				assetSubCategoryTOList =(List<AssetSubCategoryItemTO>) session.createQuery(sqlQuery).setParameter("itemStatus", status).setParameter("assetSubCategoryID", assetSubCategoryID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryItemTO.class)).list();
			}
		}
			 catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}
				return assetSubCategoryTOList;
	}
	
	@SuppressWarnings({"deprecation","unchecked"})
	@Override
	public List<AssetSubCategoryItemTO> fetchAllSubCategoryItems(String status,Long catID) {
		List<AssetSubCategoryItemTO> assetSubCategoryTOList=null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if(status.equalsIgnoreCase("All")) {
				sqlQuery = "select zone.assetItemID As assetItemID, zone.itemName As itemName, zone.itemCode As itemCode, zone.itemUnit As itemUnit,"
						+ " zone.itemStatus As itemStatus,zone.itemType as itemType,zone.transactionCount As transactionCount,assetCat.subCategoryName As subCategoryName "
						+ " from AssetSubCategoryItemEnitity As zone left join zone.assetSubCategoryID assetCat  where zone.recordType<>'D' and assetCat.assetCategoryID.assetCategoryID=:catID "
						+ " order by zone.assetItemID asc";
				assetSubCategoryTOList =(List<AssetSubCategoryItemTO>)session.createQuery(sqlQuery).setParameter("catID", catID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryItemTO.class)).list();
			} else {
				
				sqlQuery = "select zone.assetItemID As assetItemID, zone.itemName As itemName, zone.itemCode As itemCode, zone.itemUnit As itemUnit,"
						+ " zone.itemStatus As itemStatus,zone.itemType as itemType,zone.transactionCount As transactionCount,assetCat.subCategoryName As subCategoryName "
						+ " from AssetSubCategoryItemEnitity As zone left join zone.assetSubCategoryID assetCat where zone.itemStatus=:itemStatus and  zone.recordType<>'D' and assetCat.assetCategoryID.assetCategoryID=:catID "
						+ " order by zone.assetItemID asc";
				
				assetSubCategoryTOList =(List<AssetSubCategoryItemTO>) session.createQuery(sqlQuery).setParameter("itemStatus", status).setParameter("catID", catID).setResultTransformer(Transformers.aliasToBean(AssetSubCategoryItemTO.class)).list();
			}
		}
			 catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}
				return assetSubCategoryTOList;
	}

	@Override
	public boolean checkItemNameExists(Long assetItemID, String itemName) {
		try{
			return entityManager.createQuery("select assetCategory.assetItemID as assetItemID from AssetSubCategoryItemEnitity assetCategory"
					+ " where assetCategory.itemName='"+itemName+"'"+
					" and assetCategory.assetItemID!="+assetItemID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean checkItemCodeExists(Long assetItemID, String itemCode) {
		try{
			return entityManager.createQuery("select assestCategory.assetItemID from AssetSubCategoryItemEnitity assestCategory"
					+ " where assestCategory.itemCode='"+itemCode+"'"+
					" and assestCategory.assetItemID!="+assetItemID).getSingleResult() == null ? false : true;
		}catch(NoResultException noResultException) {
			return false;
		}
	}

	@Override
	public boolean addSubCategoryItem(AssetSubCategoryItemEnitity assetSubCategoryItemEnitity) {
		boolean resultFlag=false;
		entityManager.persist(assetSubCategoryItemEnitity);
		resultFlag=true;
		return resultFlag;
	}
	
	@Override
	public AssetSubCategoryItemEnitity findSubCategoryItemById(Long id) {
		try {
			return entityManager.find(AssetSubCategoryItemEnitity.class, id);
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
					+ " from  AssetSubCategoryItemEnitity aple  "
					+ " where aple.assetItemID=:assetItemID";

			transactionData = (TransactionData) session.createQuery(sqlQuery)
					.setParameter("assetItemID", id)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	}
	
	@Override
	public boolean updateSubCategoryItem(AssetSubCategoryItemEnitity assetSubCategoryItemEnitity) {
		boolean result = false;
			Session session = (Session) entityManager.getDelegate();
			session.update(assetSubCategoryItemEnitity);
			result=true;
		return result;
	}
	
	@Override
	public boolean deleteSubCategoryItem(Long deleteRecordId, Long lastModifiedBy) {
		boolean result = true;
		try {
			String hql = "update AssetSubCategoryItemEnitity aple set aple.lastModifiedDate=:lastModifiedDate"
					+ " , aple.recordType='D' , aple.lastModifiedBy=:lastModifiedBy"
					+ " WHERE aple.assetItemID=:deleteRecordId";

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
