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
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.PurchaseOrderDao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.PurchaseOrderTO;

@Repository
public class PurchaseOrderDaoImpl extends BaseDaoImpl<PurchaseOrdersEntity>implements PurchaseOrderDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<PurchaseOrderTO> fetchPurchaseOrdersDetails(Long projectID,String customerName) {
		List<PurchaseOrderTO> purchaseOrderTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select  poe.poID As poID , poe.poNo As poNo ,poe.poDate As poDate , poe.basicAmount As basicAmount , poe.taxAmount As taxAmount , poe.poStatus As poStatus ,at.parameterListValue as boqItemName ,  "
				     + " poe.totalAmount As totalAmount, poe.invoiceStatus As invoiceStatus, poe.frStatus as frStatus, poe.paymentStatus as paymentStatus , apl.parameterListValue As activityType , case ce.entityType when 'Business' then ce.businessName else  concat(ce.firstName, ' ' ,ce.lastName) end  As businessName "
				     + " from  PurchaseOrdersEntity poe  LEFT JOIN poe.projectID As pe LEFT JOIN poe.contactID As ce LEFT JOIN poe.activityTypeListID As apl LEFT JOIN poe.activityTypeListID as at"
				     + " where poe.projectID.projectID=:projectID and ce.contactType=:contactType  "
				     + " order by poe.poID DESC";

				   purchaseOrderTO = (List<PurchaseOrderTO>) session.createQuery(sqlQuery).setParameter("projectID", projectID).setParameter("contactType", customerName)
				     .setResultTransformer(Transformers.aliasToBean(PurchaseOrderTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return purchaseOrderTO;
	}

	@Override
	public Long addCustomerPOs(PurchaseOrdersEntity purchaseOrdersEntity) {	    
				Session session = (Session) entityManager.getDelegate();
				 Long pkID=(Long) session.save(purchaseOrdersEntity);
				return (pkID);	
   }

	@Override
	public PurchaseOrdersEntity findCustomerPOById(Long poID) {
		try {				
			Session session = (Session)entityManager.getDelegate();
				return (PurchaseOrdersEntity)session.get(PurchaseOrdersEntity.class, poID);
				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
	}

	@Override
	public boolean updateCustomerPO(PurchaseOrdersEntity purchaseOrdersEntity) {
		boolean result = true;	
			Session session = (Session) entityManager.getDelegate();
			session.merge(purchaseOrdersEntity);	
		return result;
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public PurchaseOrdersBean fetchCustomerPOById(Long poID) {
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
	public boolean addContractorPOs(PurchaseOrdersEntity purchaseOrdersEntity) {		
			// TODO Auto-generated method stub
	        boolean addresult = true;		
			try {
				Session session = (Session) entityManager.getDelegate();
				session.save(purchaseOrdersEntity);					
			} catch (Exception exception) {
				exception.printStackTrace();
				return false;		
		
	       }
			return addresult;
   }

	@Override
	public Double checkPOAmount(Long poID) {
		Double basicAmount = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select sum(IDE.totalAmount) from InvoiceDetailsEntity IDE "
					+ "where IDE.poID.poID=:poID ";

			basicAmount=(Double) session.createQuery(sqlQuery)
					.setParameter("poID", poID).list().get(0);
		} catch (Exception exception) {		
			exception.printStackTrace();
			return null;
		}
		return basicAmount;
		
		
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
			exception.printStackTrace();
			return true;
		}
	}
	@Override
	public boolean isPONumberExistsForEdit(String poNo, Long poID) {
		try {
			return entityManager.createQuery(
					"select purchaseOrdersEntity.poNo as poNo from PurchaseOrdersEntity purchaseOrdersEntity where "
							+ " purchaseOrdersEntity.poNo='" + poNo+"' and purchaseOrdersEntity.poID<> '"+poID+"'").getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
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

	@Override
	public boolean updatePOStatus(PurchaseOrdersBean purchaseOrdersBean) {
		boolean result = true;
		try {
			String hql = "update PurchaseOrdersEntity poe set poe.lastModifiedDate=:lastModifiedDate,poe.poStatus=:poStatus WHERE poe.poID=:poID";
			Session session = (Session) entityManager.getDelegate();
			Query query = session.createQuery(hql);
			query.setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
			query.setParameter("poStatus", purchaseOrdersBean.getPoStatus());
			query.setParameter("poID", purchaseOrdersBean.getPoID());
			 query.executeUpdate();
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return result;

	}
	@Override
	public TransactionData fetchTransactionDataById2(Long id) {
		TransactionData transactionData = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select table.transactionCount as transactionCount,table.recordType as recordType "
					+ " from PurchaseOrdersEntity table where table.poID=:poID";
			transactionData = (TransactionData) session.createQuery(sqlQuery).setParameter("poID", id)
					.setResultTransformer(Transformers.aliasToBean(TransactionData.class)).list().get(0);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return transactionData;

	}
	
	
}
