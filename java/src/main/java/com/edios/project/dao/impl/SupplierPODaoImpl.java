package com.edios.project.dao.impl;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.SupplierPODao;
import com.edios.project.entity.PurchaseOrderItemEntity;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.DrawingItemsTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

@Repository
public class SupplierPODaoImpl  extends BaseDaoImpl<PurchaseOrdersEntity>  implements SupplierPODao{
	
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<SupplierPOEntityTO> fetchSupplierDetails(String customerName) {		
		
		List<SupplierPOEntityTO> supplierEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select c.contactID As contactID,"
				+ " case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end "
				+ " as businessName from ContactsEntity c where c.contactType =:contactType and c.recordType<>'D' and c.contactStatus='Active' order by c.businessName ASC";
				supplierEntityTO= (List<SupplierPOEntityTO>) session.createQuery(sqlQuery).setParameter("contactType",customerName)
						 .setResultTransformer(Transformers.aliasToBean(SupplierPOEntityTO.class)).list();

		/*	sqlQuery="select contact.CONTACT_ID as contactID," + 
					"case contact.entity_type" + 
					" when 'Business' then  contact.business_name" + 
					" else concat(contact.pc_first_name, ' ' ,contact.pc_last_name)" + 
					" end as businessName " + 
					" from contacts contact where contact.CONTACT_TYPE=:contactType" + 
					" order by contact.business_name ASC;";	
			System.out.println("***"+sqlQuery);
			supplierEntityTO= (List<SupplierPOEntityTO>) session.createNativeQuery(sqlQuery).setParameter("contactType",customerName)
					.addScalar("contactID", StandardBasicTypes.LONG).addScalar("businessName",StandardBasicTypes.STRING)
					 .setResultTransformer(Transformers.aliasToBean(SupplierPOEntityTO.class)).list();*/
		}
		
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return supplierEntityTO;
	}
	/*@Override
	public boolean addSuppplierPOs(PurchaseOrdersEntity purchaseOrdersEntity) {
		
        boolean addresult = true;		
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(purchaseOrdersEntity);					
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;		
	
       }
		return addresult;

	}*/
	public boolean addSupplierPoItems(PurchaseOrderItemEntity objpurchaseOrderItemEntity) {
		Session session = (Session) entityManager.getDelegate();
		session.save(objpurchaseOrderItemEntity);			
	    return true;
	}
	
	@Override
	public Long addSuppplierPOs(PurchaseOrdersEntity purchaseOrdersEntity) {      
			Session session = (Session) entityManager.getDelegate();
			Long pkOfPO=(Long)session.save(purchaseOrdersEntity);			
		    return pkOfPO;

	}
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<DrawingItemsTO> fetchSupplierDrawingItems(Long drawingID,Long projectID) {		
		List<DrawingItemsTO> drawingEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
/*		sqlQuery= "select drawingTypeEntity.itemID As itemID,"
				+ "drawingTypeEntity.itemName as itemName, "
				+ "drawingTypeEntity.itemUnit as itemUnit,"
				+ "drawingTypeEntity.itemQty as ItemQty,"
				+ "drawingTypeEntity.itemtotalRate as budgetAmount,"				
				+ "drawingTypeEntity.itemUnitRate as ItemUnitRate"												
				+ " from DrawingTypeItemsEntity drawingTypeEntity where drawingTypeEntity.drawingTypeID.execModelID =:drawingID";
		
		drawingEntityTO= (List<DrawingItemsTO>) session.createQuery(sqlQuery).setParameter("drawingID",drawingID)
						 .setResultTransformer(Transformers.aliasToBean(DrawingItemsTO.class)).list();*/
		sqlQuery="select boqItems.itemID.itemID As itemID,"			
				+ "boqItems.itemName as itemName, "
				+ "boqItems.itemUnit as itemUnit,"
				+ "boqItems.itemQty as ItemQty,"
				+ "boqItems.itemtotalRate as budgetAmount,"				
				+ "boqItems.itemUnitRate as ItemUnitRate"												
				+ " from BudgetOrderedQuantityItemsEntity boqItems left join boqItems.boqID as boq where boq.projectID.projectID=:projectID group by boqItems.itemID.itemID ";	
		drawingEntityTO= (List<DrawingItemsTO>) session.createQuery(sqlQuery).setParameter("projectID",projectID)
				 .setResultTransformer(Transformers.aliasToBean(DrawingItemsTO.class)).list();
		
		sqlQuery="select purchaseOrderItemEntity.itemID.itemID,purchaseOrderItemEntity.itemUnitRate from PurchaseOrdersEntity purchaseOrderEntity "
				+ " join PurchaseOrderItemEntity purchaseOrderItemEntity on purchaseOrderItemEntity.poID.poID=purchaseOrderEntity.poID  and purchaseOrderEntity.projectID.projectID=:projectID"
				+ " where purchaseOrderItemEntity.poItemID in(select max(poItems.poItemID) from PurchaseOrderItemEntity poItems group by poItems.itemID.itemID )";		
		List<Object[]> unitRateList = session.createQuery(sqlQuery).setParameter("projectID",projectID).getResultList();		
				
		sqlQuery="select purchaseOrderItemEntity.Item_id,sum(PurchaseOrderItemEntity.total_Amount),sum(case when purchaseOrderEntity.po_Status = 'Approved' then purchaseOrderItemEntity.approved_Qty " + 
				"else purchaseOrderItemEntity.item_Qty end) from purchase_orders purchaseOrderEntity join purchase_order_items purchaseOrderItemEntity "
				+ " on purchaseOrderItemEntity.po_ID=purchaseOrderEntity.po_ID  and purchaseOrderEntity.project_ID=:projectID "
				+ " group by purchaseOrderItemEntity.item_id";							
		List<Object[]> totalAmountList =session.createNativeQuery(sqlQuery).setParameter("projectID",projectID).getResultList();
		
		sqlQuery="select boqItems.itemID.itemID,sum(boqItems.itemQty),sum(boqItems.itemtotalRate) from BudgetOrderedQuantityItemsEntity boqItems join BudgetOrderedQuantityEntity as boq on boqItems.boqID.boqID=boq.boqID and boq.projectID.projectID=:projectID group by boqItems.itemID.itemID";
		List<Object[]> totalBoqAmountList =session.createQuery(sqlQuery).setParameter("projectID",projectID).getResultList();		
		
		setSumOfItems(drawingEntityTO, unitRateList, totalAmountList, totalBoqAmountList);
		
		
		
		/*for(DrawingItemsTO drawingTOObj : drawingEntityTO) {
			sqlQuery="select purchaseOrderItemEntity.itemUnitRate from PurchaseOrderItemEntity purchaseOrderItemEntity where "
					+ "purchaseOrderItemEntity.poID.poID in(SELECT purchaseOrdersEntity.poID FROM PurchaseOrdersEntity purchaseOrdersEntity where "
					+ "purchaseOrdersEntity.projectID.projectID =:projectID and contact_id in(select contactsEntity.contactID from ContactsEntity "
					+ "contactsEntity where contactsEntity.contactType='Supplier')) and purchaseOrderItemEntity.poItemID="
					+ "(select max(poItemID) from purchaseOrderItemEntity where purchaseOrderItemEntity.itemID.itemID=:itemID ) ";			
			List<Double> unitRateList = session.createQuery(sqlQuery).setParameter("projectID",projectID).setParameter("itemID",drawingTOObj.getItemID()).list();
		    if(!unitRateList.isEmpty())
		    	drawingTOObj.setItemUnitRate(unitRateList.get(0));
			
		    sqlQuery="select sum(purchaseOrderItemEntity.totalAmount) ,sum(purchaseOrderItemEntity.itemQty)  from PurchaseOrderItemEntity purchaseOrderItemEntity where "
					+ "purchaseOrderItemEntity.poID.poID in(SELECT purchaseOrdersEntity.poID FROM PurchaseOrdersEntity purchaseOrdersEntity where "
					+ "purchaseOrdersEntity.projectID.projectID =:projectID and contact_id in(select contactsEntity.contactID from ContactsEntity "
					+ "contactsEntity where contactsEntity.contactType='Supplier')) and purchaseOrderItemEntity.itemID.itemID=:itemID";								
			List<Object> totalAmountList = (List<Object>)session.createQuery(sqlQuery).setParameter("projectID",projectID).setParameter("itemID",drawingTOObj.getItemID()).list();
			Iterator itr = totalAmountList.iterator();
			while(itr.hasNext()){
			   Object[] obj = (Object[]) itr.next();
			   drawingTOObj.setAlreadySpent((Double) obj[0]);
			drawingTOObj.setQtyApprovedforProcurement((Double)obj[1]);		
			}
		    
			}*/
		}

		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return drawingEntityTO;
	}
	@SuppressWarnings("deprecation")
	@Override
	public PurchaseOrdersBean fetchSupplierPOById(Long poID) {
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
	
	@Override
	public boolean updateSupplierPO(PurchaseOrdersEntity purchaseOrdersEntity) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.merge(purchaseOrdersEntity);			
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
	@Override
	public boolean updateSupplierPoItems(PurchaseOrderItemEntity purchaseOrderitemssEntity) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.merge(purchaseOrderitemssEntity);			
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;
	}
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<DrawingItemsTO> fetchsupplierPOItems(List<String> drawingIDList, Long poID , Long projectID) {				
		List<DrawingItemsTO> drawingEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
	/*	sqlQuery= "select drawingTypeEntity.itemID As itemID,"
				+ "  drawingTypeEntity.itemName as itemName, "
				+ "drawingTypeEntity.itemUnit as itemUnit,"
				+ "drawingTypeEntity.itemQty as ItemQty,"
				+ "purchaseOrderItemEntity.itemUnitRate as ItemUnitRate,drawingTypeEntity.itemtotalRate as budgetAmount , purchaseOrderItemEntity.itemQty as newProcurementQty,"
				+ "purchaseOrderItemEntity.itemUnitRate as currentUnitRate, purchaseOrderItemEntity.itemUnitTax as currentUnitGST,"
				+ " purchaseOrderItemEntity.totalAmount as amount "																
				+ " from PurchaseOrderItemEntity purchaseOrderItemEntity left join purchaseOrderItemEntity.itemID as drawingTypeEntity  where  drawingTypeEntity.boqItemID in (:itemID) and purchaseOrderItemEntity.poID.poID =:poID";
		*/
		/*sqlQuery= "select boqItems.itemID.itemID As itemID,"
				+ "  boqItems.itemName as itemName, "
				+ "boqItems.itemUnit as itemUnit,"
				+ "boqItems.itemQty as ItemQty,"
				+ "purchaseOrderItemEntity.itemUnitRate as ItemUnitRate,boqItems.itemtotalRate as budgetAmount , purchaseOrderItemEntity.itemQty as newProcurementQty,"
				+ "purchaseOrderItemEntity.itemUnitRate as currentUnitRate, purchaseOrderItemEntity.itemUnitTax as currentUnitGST,"
				+ " purchaseOrderItemEntity.totalAmount as amount "																
				+ " from PurchaseOrderItemEntity purchaseOrderItemEntity left join purchaseOrderItemEntity.boqItemID as boqItems  where  boqItems.boqItemID in (:itemID) and purchaseOrderItemEntity.poID.poID =:poID";
		*/
			
			sqlQuery= "select boqItems.itemID.itemID As itemID,"
					+ "  boqItems.itemName as itemName, "
					+ "boqItems.itemUnit as itemUnit,"
					+ "boqItems.itemQty as ItemQty,"
					+ "purchaseOrderItemEntity.itemUnitRate as ItemUnitRate,boqItems.itemtotalRate as budgetAmount , purchaseOrderItemEntity.itemQty as newProcurementQty,"
					+ "purchaseOrderItemEntity.itemUnitRate as currentUnitRate, purchaseOrderItemEntity.itemUnitTax as currentUnitGST,"
					+ " purchaseOrderItemEntity.totalAmount as amount "																
					+ " from PurchaseOrderItemEntity purchaseOrderItemEntity join BudgetOrderedQuantityItemsEntity as boqItems on boqItems.itemID=purchaseOrderItemEntity.itemID  where  boqItems.itemID in (:itemID) and purchaseOrderItemEntity.poID.poID =:poID  group by boqItems.itemID.itemID";
		drawingEntityTO= (List<DrawingItemsTO>) session.createQuery(sqlQuery).setParameterList("itemID",drawingIDList).setParameter("poID", poID)
				.setResultTransformer(Transformers.aliasToBean(DrawingItemsTO.class)).list();
		
		sqlQuery="select purchaseOrderItemEntity.itemID.itemID,purchaseOrderItemEntity.itemUnitRate from PurchaseOrdersEntity purchaseOrderEntity "
				+ " join PurchaseOrderItemEntity purchaseOrderItemEntity on purchaseOrderItemEntity.poID.poID=purchaseOrderEntity.poID  and purchaseOrderEntity.projectID.projectID=:projectID"
				+ " where purchaseOrderItemEntity.poItemID in(select max(poItems.poItemID) from PurchaseOrderItemEntity poItems group by poItems.itemID.itemID )";		
		List<Object[]> unitRateList = session.createQuery(sqlQuery).setParameter("projectID",projectID).getResultList();
				
		sqlQuery="select purchaseOrderItemEntity.item_ID,sum(PurchaseOrderItemEntity.total_Amount),sum(case when purchaseOrderEntity.po_Status = 'Approved' then purchaseOrderItemEntity.approved_Qty " + 
				"else purchaseOrderItemEntity.item_Qty end) from purchase_orders purchaseOrderEntity join purchase_order_items purchaseOrderItemEntity "
				+ " on purchaseOrderItemEntity.po_ID=purchaseOrderEntity.po_ID  and purchaseOrderEntity.project_ID=:projectID "
				+ " group by purchaseOrderItemEntity.item_ID";							
		List<Object[]> totalAmountList =session.createNativeQuery(sqlQuery).setParameter("projectID",projectID).getResultList();
		
		sqlQuery="select boqItems.itemID.itemID,sum(boqItems.itemQty),sum(boqItems.itemtotalRate) from BudgetOrderedQuantityItemsEntity boqItems join BudgetOrderedQuantityEntity as boq on boqItems.boqID.boqID=boq.boqID and boq.projectID.projectID=:projectID group by boqItems.itemID.itemID";
		List<Object[]> totalBoqAmountList =session.createQuery(sqlQuery).setParameter("projectID",projectID).getResultList();		
		
		setSumOfItems(drawingEntityTO, unitRateList, totalAmountList, totalBoqAmountList);
		/*for(DrawingItemsTO drawingTOObj : drawingEntityTO) {
			sqlQuery="select purchaseOrderItemEntity.itemUnitRate from PurchaseOrderItemEntity purchaseOrderItemEntity where "
					+ "purchaseOrderItemEntity.poID.poID in(SELECT purchaseOrdersEntity.poID FROM PurchaseOrdersEntity purchaseOrdersEntity where "
					+ "purchaseOrdersEntity.projectID.projectID =:projectID and contact_id in(select contactsEntity.contactID from ContactsEntity "
					+ "contactsEntity where contactsEntity.contactType='Supplier')) and purchaseOrderItemEntity.poItemID="
					+ "(select max(poItemID) from purchaseOrderItemEntity where purchaseOrderItemEntity.itemID.itemID=:itemID ) ";			
			List<Double> unitRateList = session.createQuery(sqlQuery).setParameter("projectID",projectID).setParameter("itemID",drawingTOObj.getItemID()).list();
			if(!unitRateList.isEmpty())
			drawingTOObj.setItemUnitRate(unitRateList.get(0));
			
			 sqlQuery="select sum(purchaseOrderItemEntity.totalAmount),sum(purchaseOrderItemEntity.itemQty) from PurchaseOrderItemEntity purchaseOrderItemEntity where "
						+ "purchaseOrderItemEntity.poID.poID in(SELECT purchaseOrdersEntity.poID FROM PurchaseOrdersEntity purchaseOrdersEntity where "
						+ "purchaseOrdersEntity.projectID.projectID =:projectID and contact_id in(select contactsEntity.contactID from ContactsEntity "
						+ "contactsEntity where contactsEntity.contactType='Supplier')) and purchaseOrderItemEntity.itemID.itemID=:itemID";								
				List<Object> totalAmountList = (List<Object>)session.createQuery(sqlQuery).setParameter("projectID",projectID).setParameter("itemID",drawingTOObj.getItemID()).list();
				Iterator itr = totalAmountList.iterator();
				while(itr.hasNext()){
				   Object[] obj = (Object[]) itr.next();
				   drawingTOObj.setAlreadySpent((Double) obj[0]);
				drawingTOObj.setQtyApprovedforProcurement((Double)obj[1]);		
				}
			    
				
		}*/
		}
		
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return drawingEntityTO;
	}
	private void setSumOfItems(List<DrawingItemsTO> drawingEntityTO, List<Object[]> unitRateList,
			List<Object[]> totalAmountList, List<Object[]> totalBoqAmountList) {
		for(DrawingItemsTO drawingTOObj : drawingEntityTO) {			
			for (Object[] result : unitRateList) {			
				if(drawingTOObj.getItemID()==result[0]) {					
					drawingTOObj.setItemUnitRate(Double.parseDouble(result[1]==null?String.valueOf(0):result[1].toString()));
					break;
				}
				drawingTOObj.setItemUnitRate(Double.parseDouble(String.valueOf(0)));
			}
			for(Object[] result: totalAmountList) {				
				if(drawingTOObj.getItemID().toString().equals(result[0].toString())) {					
					drawingTOObj.setAlreadySpent(Double.parseDouble(result[1]==null?String.valueOf(0):result[1].toString()));
					drawingTOObj.setQtyApprovedforProcurement(Double.parseDouble(result[2]==null?String.valueOf(0):result[2].toString()));
					break;
				}
				drawingTOObj.setAlreadySpent(Double.parseDouble(String.valueOf(0)));
				drawingTOObj.setQtyApprovedforProcurement(Double.parseDouble(String.valueOf(0)));
			}
			for(Object[] result:totalBoqAmountList) {				
				if(drawingTOObj.getItemID().toString().equals(result[0].toString())) {						
					drawingTOObj.setItemQty(Double.parseDouble(result[1]==null?String.valueOf(0):result[1].toString()));
					drawingTOObj.setBudgetAmount(Double.parseDouble(result[2]==null?String.valueOf(0):result[2].toString()));
					break;
				}
				drawingTOObj.setItemQty(Double.parseDouble(String.valueOf(0)));
				drawingTOObj.setBudgetAmount(Double.parseDouble(String.valueOf(0)));
			}
			
		}
	}
	
	@SuppressWarnings({ "unchecked" })
	@Override
	public List<String> fetchDrawingItemsID(Long drawingID) {		
		String sqlQuery = "";
		 List<String> listOfDrawingItems=null;
		try {
			Session session = (Session) entityManager.getDelegate();
//			sqlQuery = "select drawingTypeItemsEntity.itemID from DrawingTypeItemsEntity drawingTypeItemsEntity where drawingTypeItemsEntity.drawingTypeID.execModelID =:drawingID ";
			sqlQuery = "select boqItems.itemID from BudgetOrderedQuantityItemsEntity boqItems left join boqItems.boqID as boq where boq.projectID.projectID =:drawingID group by boqItems.itemID";
			listOfDrawingItems= session.createQuery(sqlQuery).setParameter("drawingID", drawingID).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return listOfDrawingItems;
	}
	
	@Override
	public boolean deletePOItems(Long poID) {
		String sqlQuery="";
		boolean deletePOItems=true;
		Session session=(Session)entityManager.getDelegate();
		sqlQuery="delete from PurchaseOrderItemEntity purchaseOrderItemEntity where purchaseOrderItemEntity.poID.poID =:poID";
		Query query=session.createQuery(sqlQuery).setParameter("poID",poID);	
		query.executeUpdate();
		return deletePOItems;
	}
	
	@Override
	public boolean isPONumberExists(String poNo) {
		try {
			return entityManager.createQuery(
					"select purchaseOrdersEntity.poNo as poNo from PurchaseOrdersEntity purchaseOrdersEntity where "
							+ " purchaseOrdersEntity.poNo='" + poNo+"'")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {			
			return true;
		}
	}
	@Override
	public boolean isPONumberExistsForEdit(String poNo, Long poID) {
		try {
			return entityManager.createQuery("select purchaseOrdersEntity.poNo as poNo from PurchaseOrdersEntity purchaseOrdersEntity where "
							+ " purchaseOrdersEntity.poNo='" + poNo+"' and purchaseOrdersEntity.poID<> '"+poID+"'").getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {			
			return true;
		}
	}
	@Override
	public String getCircleName(long projectID) {
		try {
	String query="select project.circleID.circleName  from ProjectsEntity project where project.projectID=:projectID";
	Session session=(Session) entityManager.getDelegate();
			return (String) session.createQuery(query).setParameter("projectID",projectID).getSingleResult();
			
		}
		catch (Exception e) {
			return "";
		}
	}
	@Override
	public boolean updatePoNumberOfPO(String poNumber,Long poID) {		
		Session session=(Session)entityManager.getDelegate();
		String queryString="update PurchaseOrdersEntity set poNo=:poNumber where poID=:poID";	
		Query query=session.createQuery(queryString).setParameter("poNumber",poNumber).setParameter("poID",poID);		
		query.executeUpdate();
		return true;
		
	}
}
