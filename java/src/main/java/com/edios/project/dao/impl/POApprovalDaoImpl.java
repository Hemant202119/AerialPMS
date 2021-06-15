package com.edios.project.dao.impl;

import java.util.List;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.POApprovalDao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.POApprovalTo;

@Repository
public class POApprovalDaoImpl extends BaseDaoImpl<PurchaseOrdersEntity>implements POApprovalDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<POApprovalTo> fetchPOApprovalDetails(String poStatus,String customerName) {
		List<POApprovalTo> poApprovalTo = null;		
		StringBuilder queryBuilder=new StringBuilder();
		try {
			Session session = (Session) entityManager.getDelegate();
			
			queryBuilder.append(createQueryMethod());			
			if(poStatus.equalsIgnoreCase("All") && !customerName.equalsIgnoreCase("All")) {
				queryBuilder.append(" where contact.contactType ='"+customerName+"'");
			}
			else if(customerName.equalsIgnoreCase("All") && !poStatus.equalsIgnoreCase("All")) {
				queryBuilder.append(" where po.poStatus ='"+poStatus+"' and contact.contactType <>'Customer'");
			}
			else if(!(customerName.equalsIgnoreCase("All")|| poStatus.equalsIgnoreCase("All"))){	
				queryBuilder.append(" where contact.contactType ='"+customerName+"' and po.poStatus ='"+poStatus+"'");
			}
			else 
			{
				queryBuilder.append(" where contact.contactType <>'Customer'");
			}
			poApprovalTo= (List<POApprovalTo>) session.createQuery(queryBuilder.toString()).setResultTransformer(Transformers.aliasToBean(POApprovalTo.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return poApprovalTo;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<POApprovalTo> fetchItemDetails(Long poID) {
		List<POApprovalTo> poApprovalTo = null;		
		try {
			Session session = (Session) entityManager.getDelegate();
			String query="select poi.poItemID as poItemID,poi.itemQty as itemQty,poi.itemQty as approvedQty,item.itemName as itemName,item.itemID as itemID"
						   + " from PurchaseOrderItemEntity poi left join poi.itemID as item  where poi.poID.poID=:poID ";
			poApprovalTo= (List<POApprovalTo>) session.createQuery(query).setParameter("poID",poID).setResultTransformer(Transformers.aliasToBean(POApprovalTo.class)).list();
			
			query="select  poItem.itemID.itemID,sum(poItem.approvedQty) from PurchaseOrderItemEntity poItem join PurchaseOrdersEntity as po on poItem.poID.poID=po.poID and po.projectID.projectID=(select projectID from PurchaseOrdersEntity where poID=:poID)  group by poItem.itemID.itemID";
			
			List<Object[]> listOfpoItems=session.createQuery(query).setParameter("poID",poID).getResultList();
			
			query="select p.item_id,sum(p.item_qty) from project_boq_items p left join project_boqs as boq on p.boq_id=boq.boq_id " 
					+  "inner join drawing_type_items po on po.item_id=p.item_id and boq.project_id=(select project_id from purchase_orders where po_id=:poID) " 
					 +  "group by p.item_id";
			List<Object[]> listOfpoItemQty=session.createNativeQuery(query).setParameter("poID",poID).getResultList();
			for(POApprovalTo items:poApprovalTo) {
					for(Object[] objectOfPOItems:listOfpoItems) {		
						
					if(items.getItemID().toString().equals(objectOfPOItems[0].toString())) {
						items.setSum_approvedQty(Long.parseLong(objectOfPOItems[1]==null?String.valueOf(0):objectOfPOItems[1].toString()));
						break;
						
					}
					}
					for(Object[] objectOfPOItemsQty:listOfpoItemQty) {	
							
						if(items.getItemID().toString().equals(objectOfPOItemsQty[0].toString())) {					
								items.setSum_itemQty(Long.parseLong(objectOfPOItemsQty[1]==null?String.valueOf(0):objectOfPOItemsQty[1].toString()));
							break;
						
						}
						}			
				
			}
		}
		
		catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return poApprovalTo;
	}
	@SuppressWarnings("deprecation")
	@Override
	public POApprovalTo findPOTypeById(Long poID) {
		try {	
			Session session = (Session) entityManager.getDelegate();
			
			StringBuilder queryBuilder=new StringBuilder();
			queryBuilder.append(createQueryMethod());
			queryBuilder.append(" where po.poID=:poID ");
			return (POApprovalTo) session.createQuery(queryBuilder.toString()).setParameter("poID", poID).setResultTransformer(Transformers.aliasToBean(POApprovalTo.class)).getSingleResult();
			
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
		
	}
	private String createQueryMethod() {
		StringBuilder queryBuilder=new StringBuilder();
		queryBuilder.append("select po.poID as poID,contact.contactType as contactType,case contact.entityType when 'Business' then contact.businessName else  concat(contact.firstName, ' ' ,contact.lastName) end  as businessName,circle.circleName as circleName, "
				+ "applicationParameterListObj.parameterListValue as activity, po.poDate as poDate, po.totalAmount as poAmount, projectCatagory.categoryName as category,"
				+ "project.allocationDate as startDate,po.poStatus as poApprovalStatus, po.notes as notes,user.loginName as userName,project.projectName as projectName,project.siteID as siteID "
				+ "from POFetchEntity po "
				+ "left join po.contactID as contact "
				+ "left join po.projectID as project "
				+ "left join project.circleID as circle  "
				+ "left join po.activityTypeListID as applicationParameterListObj "
				+ "left join project.categoryID as projectCatagory "
				+ "left join po.createdBy as user ");
		return queryBuilder.toString();
	}	
	// for update
	@Override
	public boolean updatePoApproval(Long poID,String poStatus,String notes ) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			String query="update PurchaseOrdersEntity set poStatus=:poStatus,notes=:notes where poID=:poID";
			Query poUpdate=session.createQuery(query).setParameter("poStatus", poStatus).setParameter("poID",poID).setParameter("notes",notes);
			poUpdate.executeUpdate();
			} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
	@Override
	public boolean updatePoItemApproval(Long poItemID,Long approvedQty ) {
		boolean result = true;
		try {
			
			Session session = (Session) entityManager.getDelegate();
			String query="update PurchaseOrderItemEntity set approvedQty=:approvedQty where poItemID=:poItemID";
			Query poUpdate=session.createQuery(query).setParameter("approvedQty", approvedQty).setParameter("poItemID",poItemID);
			poUpdate.executeUpdate();
			} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
	//for update
	@SuppressWarnings("deprecation")
	@Override
	public PurchaseOrdersBean fetchApprovalStatusById(Long poID) {
		PurchaseOrdersBean purchaseOrdersBean = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select poe.transactionCount As transactionCount , poe.recordType As recordType  from PurchaseOrdersEntity poe "
					+ "where poe.poID=:poID ";

			purchaseOrdersBean = (PurchaseOrdersBean) session.createQuery(sqlQuery)
					.setParameter("poID", poID)
					.setResultTransformer(Transformers.aliasToBean(PurchaseOrdersBean.class)).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return purchaseOrdersBean;
	}
	
	}
