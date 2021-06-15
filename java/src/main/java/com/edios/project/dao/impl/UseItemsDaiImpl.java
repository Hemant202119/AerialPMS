package com.edios.project.dao.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.TemporalType;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;
import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.cdf.util.PayloadBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.UseItemBean;
import com.edios.project.bean.UseItemsBean;
import com.edios.project.dao.UseItemsDao;
import com.edios.project.entity.UsedItemEntity;
import com.edios.project.entity.to.UseItemsTO;

@Repository
public class UseItemsDaiImpl  extends BaseDaoImpl<UsedItemEntity>  implements UseItemsDao {

	@Override
	public List<UseItemsTO> searchReceivedItems(UseItemsBean useItemsBean) {
		StringBuilder sqlQuery = new StringBuilder();
		
		
			List<UseItemsTO> searchReceivedItems =null;
			
				Session session = (Session) entityManager.getDelegate();
				sqlQuery.append("select project.projectName as projectName,contact.businessName as businessName,item.itemName as itemName,stock.transactionType as transactionType,"
						+ "DATE_FORMAT(stock.receivedDate,'%d-%b-%Y') as receivedDate,stock.itemQuantityReceived as itemQuantityReceived,stock.itemQuantityUsed as itemQuantityUsed,stock.itemQuantityWasted as itemQuantityWasted,"
						+ "stock.itemQuantityBalance as itemQuantityBalance,stock.stockItemId as stockItemId from StockItemsEntity stock left join stock.project as project left join "
						+ "stock.contact as contact left join stock.assetItemId as item where stock.recordType<>'D' ");
				
				
				if (useItemsBean.getProject()!=null && useItemsBean.getProject().getProjectID()!=null) {
					sqlQuery.append("and project.projectID="+useItemsBean.getProject().getProjectID()+" ");
				}
				
				if (useItemsBean.getAssetItemId()!=null && useItemsBean.getAssetItemId().getAssetItemID()!=null) {
					sqlQuery.append(" and item.assetItemID="+useItemsBean.getAssetItemId().getAssetItemID()+" ");
				}
				
				
				searchReceivedItems = session.createQuery(sqlQuery.toString()).setResultTransformer(Transformers.aliasToBean(UseItemsTO.class)).getResultList();
				return searchReceivedItems;
	}

	@Override
	public UseItemsTO editUseItems(PayloadBean payloadBean) {
		StringBuilder sqlQuery = new StringBuilder();
		
		
		UseItemsTO searchReceivedItems =null;
		
			Session session = (Session) entityManager.getDelegate();
			sqlQuery.append("select project.projectName as projectName,stock.stockItemId as stockItemId,project.projectID as projectID,contact.contactID as contactID,contact.businessName as businessName,CONCAT(item.itemName,' ',COALESCE(item.itemUnit,'')) as itemNameUnit,stock.transactionType as transactionType,"
					+ "DATE_FORMAT(stock.receivedDate,'%d-%b-%Y') as receivedDate,stock.itemQuantityReceived as quantityReceived,stock.itemQuantityUsed as quantityUsed,stock.itemQuantityWasted as quantityWasted,"
					+ "stock.itemQuantityBalance as quantityBalance,stock.transactionCount as transactionCount from StockItemsEntity stock left join stock.project as project left join "
					+ "stock.contact as contact left join stock.assetItemId as item where stock.recordType<>'D' and stock.stockItemId="+payloadBean.getId()+" " );
							
			searchReceivedItems = (UseItemsTO) session.createQuery(sqlQuery.toString()).setResultTransformer(Transformers.aliasToBean(UseItemsTO.class)).getSingleResult();
			return searchReceivedItems;
	}

	@Override
	public ItemsInformationBean fetchTransactionData(Long stockItemId) {
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

	@Override
	public Long updateUseItems(UseItemBean useItemBean) {
		String sqlQuery = "";
		Session session = (Session) entityManager.getDelegate();
		sqlQuery= " update StockItemsEntity set itemQuantityUsed="+useItemBean.getItemQuantityUsed()+",itemQuantityWasted="+useItemBean.getItemQuantityWasted()+","
				+ " itemQuantityBalance="+useItemBean.getItemQuantityBalance()+ " ,recordType='"+useItemBean.getRecordType()+"',lastModifiedBy="+useItemBean.getLastModifiedBy()+ ","
				+ " lastModifiedDate=:lastModifiedDate "
				+ " where stockItemId="+useItemBean.getStockItemidpk()+"  ";
		
		Long id= (long) session.createQuery(sqlQuery).setParameter("lastModifiedDate", new Date(),TemporalType.TIMESTAMP).executeUpdate();
		
		return id;
	}

	@Override
	public Boolean addUseItem(UsedItemEntity usedItemEntity) {
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(usedItemEntity);				
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return true;
	}

	

}
