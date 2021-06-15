package com.edios.project.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.dao.FundRequestDao;
import com.edios.project.entity.FundRequestsEntity;
import com.edios.project.entity.PurchaseOrdersEntity;
import com.edios.project.entity.to.FundRequestsTO;
import com.edios.project.entity.to.InvoiceDetailsTO;
import com.edios.project.entity.to.PaymentRequestsTO;
@Repository
public class FundRequestDaoImpl extends BaseDaoImpl<FundRequestsEntity> implements FundRequestDao {

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<FundRequestsTO> fetchFundRequestDetails(Long poID) {
		List<FundRequestsTO> fundRequestsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select ide.frID As frID , ide.frDate As frDate , ide.frAmount As frAmount ,"
					+ " ide.notes As notes  from FundRequestsEntity ide left join ide.poID As po  where ide.recordType <> 'D' and po.poID=:poID order by ide.frDate desc ";

			fundRequestsTO =(List<FundRequestsTO>)session.createQuery(sqlQuery)
					.setParameter("poID", poID)
					.setResultTransformer(Transformers.aliasToBean(FundRequestsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return fundRequestsTO;
	}

	@Override
	public Long addFundRequestDetails(FundRequestsEntity fundRequestsEntity) {
		    Long idID=null;
			try {
				Session session = (Session) entityManager.getDelegate();
				idID=(Long) session.save(fundRequestsEntity);				
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
			return idID;
		}

	@Override
	public FundRequestsEntity findFundRequestDetailsById(Long idID) {				
				try {				
				Session session = (Session)entityManager.getDelegate();
					return session.get(FundRequestsEntity.class, idID);
					
				} catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}		
		  }

	@Override
	public boolean updateFundRequestDetails(FundRequestsEntity fundRequestsEntity) {
			boolean result = true;
				try {
					Session session = (Session) entityManager.getDelegate();
					session.merge(fundRequestsEntity);
					System.out.println(" Fund request details Updated Successfully");
				} catch (Exception exception) {
					exception.printStackTrace();
					return false;
				}
				return result;		
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<FundRequestsTO> getDataForEmail(Long frID) {
		List<FundRequestsTO> fundRequestsTO = null;
		String sqlQuery = "";
		try {		
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select po.poID as poID,fr.frAmount as frAmount,po.totalAmount as totalAmount ,fr.frDate as frDate,fr.notes as notes,case contact.entityType when 'Business' then contact.businessName else  concat(contact.firstName, ' ' ,contact.lastName) end as businessName,contact.bankName as bankName"
					+ ",contact.branchAddress as branchAddress,contact.ifscCode as ifscCode,user.loginName as userName,user.emailAddress as userEmailAddress "
					+ ",contact.panNo as panNumber,contact.accountNo as accountNo,contact.accountHolderName as accountHolderName,contact.gstNo as gstNo"
					+ ",contact.aadharNo as aadharNo,project.siteName as siteName,project.siteID as siteID,project.circleID.circleName as circleName"
					+ ",po.activityTypeListID.parameterListValue as parameterListValue,project.statusListID.parameterListValue as statusName,case project.contactID.entityType when 'Business' then project.contactID.businessName else  concat(project.contactID.firstName, ' ' ,project.contactID.lastName) end as customerName,project.statusDate as projectStatusDate,project.projectID as projectID "
					+ " from FundRequestsEntity fr left join fr.poID as po left join po.contactID as contact left join po.projectID as project "					
					+ " join UserEntity as user on fr.createdBy=user.userID where fr.frID=:frID";
			fundRequestsTO =(List<FundRequestsTO>)session.createQuery(sqlQuery).setParameter("frID", frID).setResultTransformer(Transformers.aliasToBean(FundRequestsTO.class)).list();
//			for(FundRequestsTO fundRequest:fundRequestsTO) {
//				sqlQuery="select sum(po.totalAmount) from PurchaseOrdersEntity po group by po.projectID.projectID having po.projectID.projectID=:projectID";
//				List<Long> totalAmountList=session.createQuery(sqlQuery).setParameter("projectID",fundRequest.getProjectID()).getResultList();
//			if(!totalAmountList.isEmpty())
//			{				
//				fundRequest.setTotalAmount(totalAmountList.get(0));
//			}
//		}
		
		
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return fundRequestsTO;
	}
	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<PaymentRequestsTO> getDataForContractorEmail(Long pdID) {
		List<PaymentRequestsTO> paymentRequestsTO = null;
		String sqlQuery = "";
		try {		
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select po.poID as poID,fr.paymentAmount as paymentAmount,po.totalAmount as totalAmount ,fr.paymentDate as paymentDate,fr.notes as notes,case contact.entityType when 'Business' then contact.businessName else  concat(contact.firstName, ' ' ,contact.lastName) end as businessName,contact.bankName as bankName"
					+ ",contact.branchAddress as branchAddress,contact.ifscCode as ifscCode,user.loginName as userName,user.emailAddress as userEmailAddress "
					+ ",contact.panNo as panNumber,contact.accountNo as accountNo,contact.accountHolderName as accountHolderName,contact.gstNo as gstNo"
					+ ",contact.aadharNo as aadharNo,project.siteName as siteName,project.siteID as siteID,project.circleID.circleName as circleName"
					+ ",po.activityTypeListID.parameterListValue as parameterListValue,project.statusListID.parameterListValue as statusName,case project.contactID.entityType when 'Business' then project.contactID.businessName else  concat(project.contactID.firstName, ' ' ,project.contactID.lastName) end as customerName,project.statusDate as projectStatusDate,project.projectID as projectID "
					+ " from PaymentRequestsEntity fr left join fr.poID as po left join po.contactID as contact left join po.projectID as project "					
					+ " join UserEntity as user on fr.createdBy=user.userID where fr.pdID=:pdID";
			paymentRequestsTO =(List<PaymentRequestsTO>)session.createQuery(sqlQuery).setParameter("pdID", pdID).setResultTransformer(Transformers.aliasToBean(PaymentRequestsTO.class)).list();

		
		
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return paymentRequestsTO;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<InvoiceDetailsTO> getDataForReminderEmail(Long pdID) {
		List<InvoiceDetailsTO> invoiceDetailsTO = null;
		String sqlQuery = "";
		try {		
			Long id=getPOID(pdID);
			
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select po.poID as poID,fr.invoiceAmount as invoiceAmount,po.totalAmount as totalAmount1 ,fr.invoiceDate as invoiceDate,fr.notes as notes,case contact.entityType when 'Business' then contact.businessName else  concat(contact.firstName, ' ' ,contact.lastName) end as businessName,contact.bankName as bankName"
					+ ",contact.branchAddress as branchAddress,contact.ifscCode as ifscCode,user.loginName as userName,user.emailAddress as userEmailAddress "
					+ ",contact.panNo as panNumber,contact.accountNo as accountNo,contact.accountHolderName as accountHolderName,contact.gstNo as gstNo"
					+ ",contact.aadharNo as aadharNo,project.siteName as siteName,project.siteID as siteID,project.circleID.circleName as circleName"
					+ ",po.activityTypeListID.parameterListValue as parameterListValue,project.statusListID.parameterListValue as statusName,case project.contactID.entityType when 'Business' then project.contactID.businessName else  concat(project.contactID.firstName, ' ' ,project.contactID.lastName) end as customerName,project.statusDate as projectStatusDate,project.projectID as projectID "
					+ " from InvoiceDetailsEntity fr left join fr.poID as po left join po.contactID as contact left join po.projectID as project "					
					+ " join UserEntity as user on fr.createdBy=user.userID where fr.idID='"+id+"'";
			invoiceDetailsTO =(List<InvoiceDetailsTO>)session.createQuery(sqlQuery).setResultTransformer(Transformers.aliasToBean(InvoiceDetailsTO.class)).list();

			
		
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return invoiceDetailsTO;
	}

	private Long getPOID(Long id) {
		Long poid = null;
		String sqlQuery = "";
		try {		
			PurchaseOrdersEntity purchaseOrdersEntity=new PurchaseOrdersEntity();
			purchaseOrdersEntity.setPoID(id);
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="Select max(fr.idID) from InvoiceDetailsEntity fr where fr.poID=:pdID ORDER BY fr.idID DESC ";
			poid =(Long)session.createQuery(sqlQuery).setParameter("pdID", purchaseOrdersEntity).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return poid;
		
	}
	@Override
	public Double getTotalAmount(Long id) {
		Double poid = null;
		String sqlQuery = "";
		try {		
			PurchaseOrdersEntity purchaseOrdersEntity=new PurchaseOrdersEntity();
			purchaseOrdersEntity.setPoID(id);
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="Select sum(fr.totalAmount) from InvoiceDetailsEntity fr where fr.poID=:pdID ";
			poid =(Double)session.createQuery(sqlQuery).setParameter("pdID", purchaseOrdersEntity).getSingleResult();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return poid;
		
	}
}
