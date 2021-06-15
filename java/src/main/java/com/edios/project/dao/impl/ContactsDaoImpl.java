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
import com.edios.project.dao.ContactsDao;
import com.edios.project.entity.ContactsEntity;
import com.edios.project.entity.to.ContactsEntityTO;

@Repository
public class ContactsDaoImpl extends BaseDaoImpl<ContactsEntity> implements ContactsDao {

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<ContactsEntityTO> searchContacts() {
		List<ContactsEntityTO> contactsEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			sqlQuery = "select c.contactID As contactID  , c.businessName as businessName, c.contactType as contactType,c.transactionCount as transactionCount, "
					+ " c.contactStatus as contactStatus, c.firstName as firstName, c.lastName as lastName "
					+ " from ContactsEntity c where c.contactStatus=:contactStatus and c.recordType<>'D'";
			contactsEntityTO = (List<ContactsEntityTO>) session.createQuery(sqlQuery)
					.setParameter("contactStatus", "Active")
					.setResultTransformer(Transformers.aliasToBean(ContactsEntityTO.class)).list();
		}

		catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return contactsEntityTO;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<ContactsEntityTO> fetchContactDetails(String contactStatus) {
		List<ContactsEntityTO> contactsEntityTO = null;
		String sqlQuery = "";
		try {
			Session session = (Session) entityManager.getDelegate();
			if (contactStatus.equalsIgnoreCase("Active") || contactStatus.equalsIgnoreCase("Inactive")) {
				sqlQuery = "select c.contactID as contactID, c.contactType as contactType, c.businessName as businessName, c.contactStatus as contactStatus, "
						+ " c.transactionCount as transactionCount, c.firstName as firstName, c.lastName as lastName"
						+ " from ContactsEntity c where c.contactStatus=:contactStatus and c.recordType<>'D'";
				contactsEntityTO = (List<ContactsEntityTO>) session.createQuery(sqlQuery)
						.setParameter("contactStatus", contactStatus)
						.setResultTransformer(Transformers.aliasToBean(ContactsEntityTO.class)).list();
			} else {
				sqlQuery = "select c.contactID as contactID, c.contactType as contactType, c.businessName as businessName, "
						+ " c.transactionCount as transactionCount,  c.contactStatus as contactStatus, c.firstName as firstName, c.lastName as lastName "
						+ " from ContactsEntity c where c.recordType<>'D'";
				contactsEntityTO = (List<ContactsEntityTO>) session.createQuery(sqlQuery)
						.setResultTransformer(Transformers.aliasToBean(ContactsEntityTO.class)).list();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return contactsEntityTO;
	}

	@Override
	public boolean addContacts(ContactsEntity contactsEntity) {
		boolean addresult = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.save(contactsEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
		return addresult;
	}

	@Override
	public ContactsEntity editContact(Long contactID) {
		try {

			return entityManager.find(ContactsEntity.class, contactID);
		} catch (Exception exception) {
			exception.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean updateContact(ContactsEntity contactsEntity) {
		boolean result = true;
		try {
			Session session = (Session) entityManager.getDelegate();
			session.merge(contactsEntity);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return result;
	}

	@Override
	public boolean deleteContact(Long id, Integer lastModifiedBy) {
		boolean resultflag = true;	
			String hql = "update ContactsEntity c set c.lastModifiedBy=:lastModifiedBy, c.recordType='D', "
					+ "c.lastModifiedDate=:lastModifiedDate where c.contactID=:contactID";
			Session session = (Session) entityManager.getDelegate();
			Query query = session.createQuery(hql);
			query.setParameter("lastModifiedBy", lastModifiedBy);
			query.setParameter("lastModifiedDate", new Date(), TemporalType.TIMESTAMP);
			query.setParameter("contactID", id);
			query.executeUpdate();
		
		return resultflag;
	}

	@Override
	public boolean isContactIdExist(Long id) {
		try {
			return entityManager.createQuery(
					"select 1 from ProjectsEntity table where "
							+ " table.contactID.contactID="+id)
					.getSingleResult() == null ? false : true;
		} catch (NoResultException ex) {
			return false;
		} catch (Exception exception) {
			exception.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deleteUserRights(Long id) {
		String sqlQuery="delete from UserRightsEntity where contactID.contactID=:id ";
		Session session=(Session) entityManager.getDelegate();
		Query query=session.createQuery(sqlQuery).setParameter("id", id);
		query.executeUpdate();
		return true;
	}
	
	
}
