package com.edios.project.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.dao.PaymentRequestDao;
import com.edios.project.entity.PaymentRequestsEntity;
import com.edios.project.entity.to.PaymentRequestsTO;
@Repository
public class PaymentRequestDaoImpl extends BaseDaoImpl<PaymentRequestsEntity> implements PaymentRequestDao {

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<PaymentRequestsTO> fetchPaymentRequestDetails(Long poID) {
		List<PaymentRequestsTO> fundRequestsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select ide.pdID As pdID , ide.paymentDate As paymentDate , ide.paymentAmount As paymentAmount ,"
					+ " ide.notes As notes  from PaymentRequestsEntity ide left join ide.poID As po  where ide.recordType <> 'D' and po.poID=:poID order by ide.paymentDate desc ";

			fundRequestsTO =(List<PaymentRequestsTO>)session.createQuery(sqlQuery)
					.setParameter("poID", poID)
					.setResultTransformer(Transformers.aliasToBean(PaymentRequestsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return fundRequestsTO;
	}

	@Override
	public Long addPaymentRequestDetails(PaymentRequestsEntity fundRequestsEntity) {
		    Long idID=null;
			try {
				Session session = (Session) entityManager.getDelegate();
				idID=(Long) session.save(fundRequestsEntity);
				System.out.println("ID"+idID);
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
			return idID;
		}

	@Override
	public PaymentRequestsEntity findPaymentRequestDetailsById(Long idID) {				
				try {				
				Session session = (Session)entityManager.getDelegate();
					return session.get(PaymentRequestsEntity.class, idID);
					
				} catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}		
		  }

	@Override
	public boolean updatePaymentRequestDetails(PaymentRequestsEntity fundRequestsEntity) {
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

	@Override
	public List<PaymentRequestsTO> fetchPaymentSum(Long poID) {
		List<PaymentRequestsTO> fundRequestsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select Sum(ide.paymentAmount) AS addition from PaymentRequestsEntity ide left join ide.poID As po  where ide.recordType <> 'D' and po.poID=:poID  ";

			fundRequestsTO =(List<PaymentRequestsTO>)session.createQuery(sqlQuery)
					.setParameter("poID", poID)
					.setResultTransformer(Transformers.aliasToBean(PaymentRequestsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return fundRequestsTO;
	}
		

}
