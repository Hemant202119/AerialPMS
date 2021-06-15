package com.edios.project.dao.impl;

import java.util.List;

import javax.persistence.NoResultException;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.project.dao.InvoiceDetailsDao;
import com.edios.project.entity.InvoiceDetailsEntity;
import com.edios.project.entity.to.InvoiceDetailsTO;

@Repository
public class InvoiceDetailsDaoImpl extends BaseDaoImpl<InvoiceDetailsEntity> implements InvoiceDetailsDao {

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<InvoiceDetailsTO> fetchInvoiceDetails(Long poID) {
		List<InvoiceDetailsTO> invoiceDetailsTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery ="select ide.idID As idID , ide.invoiceDate As invoiceDate , ide.invoiceAmount As invoiceAmount , ide.invoiceNo As invoiceNo , ide.totalAmount As totalAmount , "
					+ " ide.gst as gst,ide.notes As notes from InvoiceDetailsEntity ide left join ide.poID As po  where ide.recordType <> 'D' and po.poID=:poID order by ide.invoiceDate desc ";

			invoiceDetailsTO =(List<InvoiceDetailsTO>)session.createQuery(sqlQuery)
					.setParameter("poID", poID)
					.setResultTransformer(Transformers.aliasToBean(InvoiceDetailsTO.class)).list();
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
		return invoiceDetailsTO;
	}

	@Override
	public Long addInvoiceDetails(InvoiceDetailsEntity invoiceDetailsEntity) {
		    Long idID=null;
			try {
				Session session = (Session) entityManager.getDelegate();
				idID=(Long) session.save(invoiceDetailsEntity);
			} catch (Exception exception) {
				exception.printStackTrace();
				return null;
			}
			return idID;
		}

	@Override
	public InvoiceDetailsEntity findInvoiceDetailsById(Long idID) {				
				try {				
				Session session = (Session)entityManager.getDelegate();
					return session.get(InvoiceDetailsEntity.class, idID);
					
				} catch (Exception exception) {
					exception.printStackTrace();
					return null;
				}		
		  }

	@Override
	public boolean updateInvoiceDetails(InvoiceDetailsEntity invoiceDetailsEntity) {
			boolean result = true;
				try {
					Session session = (Session) entityManager.getDelegate();
					session.merge(invoiceDetailsEntity);
					System.out.println(" Invoice details Updated Successfully");
				} catch (Exception exception) {
					exception.printStackTrace();
					return false;
				}
				return result;		
	}

	@Override
	public boolean isPONumberExists(String invoiceNo) {
		try {
			return entityManager.createQuery(
					"select invoiceDetailsEntity.invoiceNo as invoiceNo from InvoiceDetailsEntity invoiceDetailsEntity where "
							+ " invoiceDetailsEntity.invoiceNo='" + invoiceNo+"'")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}

	@Override
	public boolean isPONumberExistsForEdit(String invoiceNo, Long InvoiceID) {
		try {
			return entityManager.createQuery(
					"select invoiceDetailsEntity.invoiceNo as invoiceNo from InvoiceDetailsEntity invoiceDetailsEntity where "
							+ " invoiceDetailsEntity.invoiceNo='" + invoiceNo+"' and invoiceDetailsEntity.idID<>'"+InvoiceID+"'")
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return true;
		}
	}
		

}
