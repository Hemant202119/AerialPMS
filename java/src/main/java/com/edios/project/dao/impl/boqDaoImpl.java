package com.edios.project.dao.impl;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.dao.BoqDao;
import com.edios.project.entity.BudgetOrderedQuantityEntity;
import com.edios.project.entity.BudgetOrderedQuantityItemsEntity;
import com.edios.project.entity.to.BoqTO;
import com.edios.project.entity.to.DrawingItemsTO;

@Repository
public class boqDaoImpl extends BaseDaoImpl<BudgetOrderedQuantityEntity> implements BoqDao{

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<BoqTO> fetchBoqRecords(Long projectID) {
	
		List<BoqTO> boqEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select boq.boqID as boqID,boq.boqNotes as boqNotes,user.loginName as boqUserName, boq.boqdate as boqdate,sum(boqItems.itemtotalRate) as totalBoqAmount from BudgetOrderedQuantityItemsEntity boqItems left join boqItems.boqID as boq join UserEntity as user on boq.createdBy=user.userID where boq.projectID.projectID=:projectID group by boq.boqID";
		boqEntityTO= (List<BoqTO>) session.createQuery(sqlQuery).setParameter("projectID",projectID).setResultTransformer(Transformers.aliasToBean(BoqTO.class)).list();
		Double grandTotal=(Double)session.createQuery("select sum(boqItems.itemtotalRate) as totalBoqAmount from BudgetOrderedQuantityItemsEntity boqItems left join boqItems.boqID as boq join UserEntity as user on boq.createdBy=user.userID where boq.projectID.projectID=:projectID").setParameter("projectID", projectID).getSingleResult();
		
		if(!boqEntityTO.isEmpty()) 
			boqEntityTO.get(boqEntityTO.size()-1).setGrandTotalOfBOQ(grandTotal);
		
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		return boqEntityTO;
	}
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<DrawingItemsTO> fetchBoqDrawingItems(Long projectID,Long drawingID) {		
		List<DrawingItemsTO> drawingEntityTO = null;
		
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select drawingTypeEntity.itemID As itemID,"
				+ "drawingTypeEntity.itemName as itemName, "
				+ "drawingTypeEntity.itemUnit as itemUnit,"
				+ "drawingTypeEntity.itemQty as ItemQty,"
				+ "drawingTypeEntity.itemHead as itemHead,"
				+ "drawingTypeEntity.itemWeight as itemWeight,"
				+ "drawingTypeEntity.itemStatusID as itemStatusID,"
				+ "drawingTypeEntity.itemtotalRate as budgetAmount,"				
				+ "drawingTypeEntity.itemUnitRate as ItemUnitRate"												
				+ " from DrawingTypeItemsEntity drawingTypeEntity where drawingTypeEntity.drawingTypeID.drawingTypeID =:drawingID";
		drawingEntityTO=session.createQuery(sqlQuery).setParameter("drawingID",drawingID).setResultTransformer(Transformers.aliasToBean(DrawingItemsTO.class)).list();
		}catch (Exception e) {
		e.printStackTrace();	
		}
		return drawingEntityTO;
	}

	@Override
	public Long addBoq(BudgetOrderedQuantityEntity boq) {
		Session session = (Session) entityManager.getDelegate();
		Long pkOfBoq=(Long)session.save(boq);			
	    return pkOfBoq;

	}
	public boolean addBoqItems(BudgetOrderedQuantityItemsEntity boqItems) {
		Session session = (Session) entityManager.getDelegate();
		session.save(boqItems);			
	    return true;
	}

	@Override
	public BudgetOrderedQuantityEntity findBoqById(Long boqID) {
		try {				
			Session session = (Session)entityManager.getDelegate();		
				return (BudgetOrderedQuantityEntity)session.get(BudgetOrderedQuantityEntity.class, boqID);
				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<DrawingItemsTO> fetchBoqDrawingItemsByID(Long boqID) {		
		List<DrawingItemsTO> drawingEntityTO = null;
		
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select boqItem.boqItemID As itemID,"
				+ "boqItem.itemName as itemName, "
				+ "boqItem.itemUnit as itemUnit,"
				+ "boqItem.itemQty as ItemQty,"			
				+ "boqItem.itemtotalRate as budgetAmount,"				
				+ "boqItem.itemUnitRate as ItemUnitRate"												
				+ " from BudgetOrderedQuantityItemsEntity boqItem where boqItem.boqID.boqID =:boqID";
		drawingEntityTO=session.createQuery(sqlQuery).setParameter("boqID",boqID).setResultTransformer(Transformers.aliasToBean(DrawingItemsTO.class)).list();
		}catch (Exception e) {
		e.printStackTrace();	
		}
		return drawingEntityTO;
	}
	
}
