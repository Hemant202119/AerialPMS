package com.edios.project.dao.impl;

import java.util.List;


import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.bean.PurchaseOrdersBean;
import com.edios.project.dao.ContractorPODao;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.ContractorPOEntityTo;

@Repository
public class ContractorPODaoImpl  extends BaseDaoImpl<PurchaseOrdersEntity>  implements ContractorPODao{
	
	
	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ContractorPOEntityTo> fetchContractorDetails() {	
		
		List<ContractorPOEntityTo> contractorEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
		sqlQuery= "select c.contactID As contactID,"
				+ "  c.businessName as businessName "
				+ " from ContactsEntity c where c.contactType = :contactType and c.recordType<>'D' and c.contactStatus='Active' order by c.businessName ASC";
		
		contractorEntityTO= (List<ContractorPOEntityTo>) session.createQuery(sqlQuery).setParameter("contactType","Contractor")
						 .setResultTransformer(Transformers.aliasToBean(ContractorPOEntityTo.class)).list();
		}
		
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return contractorEntityTO;
	}
/*	@Override
	public boolean addContractorPOs(PurchaseOrdersEntity purchaseOrdersEntity) {
		
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
	@Override
	public Long addContractorPOs(PurchaseOrdersEntity purchaseOrdersEntity) {
		Long pkOfPurchaseOrder=null;       
		try {
			Session session = (Session) entityManager.getDelegate();
			pkOfPurchaseOrder=(Long) session.save(purchaseOrdersEntity);					
		} catch (Exception exception) {
			exception.printStackTrace();
			return pkOfPurchaseOrder;		
	
       }
		return pkOfPurchaseOrder;

	}
	
	@Override
	public PurchaseOrdersEntity findContractorPOById(Long poID) {
		try {				
			Session session = (Session)entityManager.getDelegate();
				return (PurchaseOrdersEntity)session.get(PurchaseOrdersEntity.class, poID);
				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public PurchaseOrdersBean fetchContractorPOById(Long poID) {
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
	public boolean updateContractorPO(PurchaseOrdersEntity purchaseOrdersEntity) {

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
	
	
}
