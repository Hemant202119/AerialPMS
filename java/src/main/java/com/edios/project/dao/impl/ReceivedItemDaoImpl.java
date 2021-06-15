package com.edios.project.dao.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.Query;
import javax.persistence.TemporalType;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ContactsBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.ProjectBean;
import com.edios.project.dao.ReceivedItemDao;
import com.edios.project.entity.StockItemsEntity;
import com.edios.project.entity.to.ItemReceivedTO;

@Repository
public class ReceivedItemDaoImpl extends BaseDaoImpl<StockItemsEntity> implements ReceivedItemDao{

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ItemReceivedTO> searchAssestItemAutoLookUp(String searchParameter) {
		try {
			Session sesion=(Session) entityManager.getDelegate();
			String sqlQuery="select assetItem.assetItemID as assetItemID ,assetItem.itemName as itemName from AssetSubCategoryItemEnitity assetItem where assetItem.recordType<>'D' and assetItem.itemStatus=:itemStatus";
			return sesion.createQuery(sqlQuery).setParameter("itemStatus", searchParameter).setResultTransformer(Transformers.aliasToBean(ItemReceivedTO.class)).list();
			
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ItemReceivedTO> searchItemDataOnCriteria(Long itemId) {
		try {
			Session sesion=(Session) entityManager.getDelegate();
			String sqlQuery="select sum(stockItems.itemQuantityBalance) as currentProjectItemStock,assetItem.itemCode as itemCode,assetItem.itemUnit as itemUnit,assetItem.itemType as itemType,assetItem.itemStatus as itemStatus,assetItem.itemDescription as itemDescription,"
						   + "	assetCategory.categoryName as categoryName,assetSubCategory.subCategoryName as subCategoryName from AssetSubCategoryItemEnitity assetItem "
					       + " left join assetItem.assetSubCategoryID as assetSubCategory left join assetSubCategory.assetCategoryID as assetCategory inner join StockItemsEntity stockItems on stockItems.assetItemId.assetItemID=assetItem.assetItemID  where "
					       + " assetItem.recordType<>'D' and assetItem.assetItemID=:itemId and stockItems.recordType<>'D'" ;
			return sesion.createQuery(sqlQuery).setParameter("itemId", itemId).setResultTransformer(Transformers.aliasToBean(ItemReceivedTO.class)).list();
			
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean addReceievedItem(StockItemsEntity itemsInformationEntity) {
		
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(itemsInformationEntity);				
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return true;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<ItemReceivedTO> searchReceivedItems(String searchParameter,Long pkID) {

		try {
			Session sesion=(Session) entityManager.getDelegate();
			StringBuilder queryBuilder=new StringBuilder("select stockItem.stockItemId as stockItemId,stockItem.transactionNumber as mrnSRN,stockItem.receivedDate as receivedDate"
					   + ",stockItem.transactionType as transactionType,assetItem.itemCode as itemCode,assetItem.itemType as itemType,"
					   + " assetItem.itemName as itemName,stockItem.transactionCount as transactionCount from StockItemsEntity stockItem left join stockItem.assetItemId as assetItem where "
				       + " stockItem.recordType<>'D' and assetItem.assetItemID=:pkID ");
			//if(searchParameter.equals("All")) {
				return sesion.createQuery(queryBuilder.toString()).setParameter("pkID",pkID).setResultTransformer(Transformers.aliasToBean(ItemReceivedTO.class)).list();	
			//}
		/*	else {
				queryBuilder.append(" and stockItem.stockItemStatus=:itemStatus");
				return sesion.createQuery(queryBuilder.toString()).setParameter("itemStatus", searchParameter).setParameter("pkID",pkID).setResultTransformer(Transformers.aliasToBean(ItemReceivedTO.class)).list();
			}*/
			
			
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}

	@Override
	public StockItemsEntity findReceivedItemsById(Long receivedItemId) {
		try {			
			Session session = (Session)entityManager.getDelegate();
				return (StockItemsEntity)session.get(StockItemsEntity.class, receivedItemId);
				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
	
	}

	@Override
	public boolean updateReceivedItems(StockItemsEntity stockItemEntity) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.merge(stockItemEntity);			
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	
	}

	@SuppressWarnings("deprecation")
	@Override
	public ItemsInformationBean fetchReceivedItems(Long stockItemId) {
		ItemsInformationBean receivedItemsBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select stockItemEntity.transactionCount As transactionCount , stockItemEntity.recordType As recordType  from StockItemsEntity stockItemEntity "
					+ "where stockItemEntity.stockItemId=:stockItemId ";

			receivedItemsBean = (ItemsInformationBean) session.createQuery(sqlQuery)
					.setParameter("stockItemId", stockItemId).setResultTransformer(Transformers.aliasToBean(ItemsInformationBean.class)).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return receivedItemsBean;
	
	}

	@SuppressWarnings("deprecation")
	@Override
	public TransactionData fetchTransactionDataById(Long stockItemId) {

		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select stockItemEntity.transactionCount As transactionCount , stockItemEntity.recordType As recordType  from StockItemsEntity stockItemEntity "
					+ "where stockItemEntity.stockItemId=:stockItemId ";

			transactionData = (TransactionData) session.createQuery(sqlQuery)
					.setParameter("stockItemId", stockItemId).setResultTransformer(Transformers.aliasToBean(TransactionData.class)).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;
	
	
	}

	@Override
	public boolean deleteReceiveItems(Long stockItemId, Integer lastModifiedBy) {

		boolean result = true;
		try {
			String hql = "update StockItemsEntity stockItemEntity set stockItemEntity.lastModifiedDate=:lastModifiedDate"
					+ " , stockItemEntity.recordType='D' , stockItemEntity.lastModifiedBy=:lastModifiedBy"
					+ " WHERE stockItemEntity.stockItemId=:deleteRecordId";

			Session session = (Session) entityManager.getDelegate();
			Query query = session.createQuery(hql);
			query.setParameter("lastModifiedBy", lastModifiedBy);
			query.setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
			query.setParameter("deleteRecordId", stockItemId);
			query.executeUpdate();
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	
	}

	@Override
	public Float checkReceivedItems(Long stockItemId) {	
		String sqlQuery="select stockItemEntity.itemQuantityUsed from StockItemsEntity stockItemEntity where stockItemEntity.stockItemId=:stockItemId";
		Session session=(Session) entityManager.getDelegate();
		Float stockStatus=(Float) session.createQuery(sqlQuery).setParameter("stockItemId", stockItemId).getSingleResult();
		return stockStatus;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ProjectBean> fetchProjectAutoLookUpListReceivedItems() {
		List<ProjectBean> projectList = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select projectID As projectID , projectName As projectName  from ProjectsEntity  "
					+ "where recordType<>'D' order by projectName asc";

			projectList = (List<ProjectBean>) session.createQuery(sqlQuery).setResultTransformer(Transformers.aliasToBean(ProjectBean.class)).getResultList();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return projectList;
	}

	@Override
	public List<ContactsBean> fetchContactAutoLookUpListReceivedItems() {
		List<ContactsBean> contactList = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select contactID as contactID,coalesce(businessName,firstName) as businessName  from ContactsEntity  "
					+ "where recordType<>'D' and contactStatus='Active' and contactType='Supplier' group by coalesce(businessName,firstName) order by coalesce(businessName,firstName) asc";

			contactList = (List<ContactsBean>) session.createQuery(sqlQuery).setResultTransformer(Transformers.aliasToBean(ContactsBean.class)).getResultList();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return contactList;
	}
	

}
