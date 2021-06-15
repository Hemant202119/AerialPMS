package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.ContactsBean;
import com.edios.project.dao.ContactsDao;
import com.edios.project.entity.ContactsEntity;
import com.edios.project.entity.to.ContactsEntityTO;
import com.edios.project.manager.ContactsManager;

@Service
public class ContactsManagerImpl extends AbstractManagerImpl<ContactsBean, ContactsEntity> implements ContactsManager {
	
	@Autowired
	ContactsDao contactDao;
	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_DELETE = 'D';

	private static final Character RECORDTYPE_UPDATE = 'U';
	
	@Override
	@Transactional
	public List<ContactsEntityTO> searchContacts() {
		List<ContactsEntityTO> contactsEntityTO= null;
		try {
			contactsEntityTO = contactDao.searchContacts();
//			for (ContactsEntityTO contactlist : contactsEntityTO) {
//				if (contactlist.getContactStatusID().equals(1l))
//					contactlist.setContactStatusValue("Active");
//				else
//					contactlist.setContactStatusValue("Inactive");
//
//			
		}
		catch (Exception exception) {
			exception.printStackTrace();
		}
		return contactsEntityTO;
	}

	@Override
	@Transactional
	public List<ContactsEntityTO> fetchContactDetails(String contactStatus) {
		List<ContactsEntityTO> contactsEntityTO = null;
		try {
			contactsEntityTO = contactDao.fetchContactDetails(contactStatus);
//			for (ContactsEntityTO contactlist : contactsEntityTO) {
//				if (contactlist.getContactStatusID().equals(1l))
//					contactlist.setContactStatusValue("Active");
//				else
//					contactlist.setContactStatusValue("Inactive");
//
//			
//		}
			
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return contactsEntityTO;

	}

	@Override
	@Transactional
	public String addContacts(ContactsBean contactsBean) {
		
		String resultString = "";
		boolean resultFlag = false;
//		resultFlag = isCircleNameExist(contactsBean.getCircleName());
//		if (resultFlag) {
//			return "NameAlreadyExist";
//		}
		setAuditInfo(contactsBean, "newFlag");
		ContactsEntity contactsEntity = mapper.map(contactsBean, ContactsEntity.class);
		resultFlag = contactDao.addContacts(contactsEntity);
		if (resultFlag)
			return "ADDED";
		return resultString;
	
	}
	private void setAuditInfo(ContactsBean contactsBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			contactsBean.setTransactionCount(TRANSACTION_BEGIN);
			contactsBean.setRecordType(RECORDTYPE_INSERT);
			contactsBean.setCreatedDate(new Date());
		} else {
			contactsBean.setTransactionCount(contactsBean.getTransactionCount() + TRANSACTION_BEGIN);
			contactsBean.setRecordType(RECORDTYPE_UPDATE);
			contactsBean.setLastModifiedDate(new Date());
		}
	}

	@Override
	public ContactsBean editContact(Long id) {
		ContactsBean contactsBean=null;
		contactsBean=mapper.map(contactDao.editContact(id), ContactsBean.class);
		return contactsBean;
	}

	@Override
	@Transactional
	public synchronized String updateContact(ContactsBean contactsBean) {
		String resultString = "";
		boolean resultFlag = false;
		ContactsBean latestData = editContact(contactsBean.getContactID());
		if (latestData.getTransactionCount() > (contactsBean.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		setAuditInfo(contactsBean, "editFlag");
		ContactsEntity contactsEntity = mapper.map(contactsBean, ContactsEntity.class);
		resultFlag = contactDao.updateContact(contactsEntity);

		if (resultFlag) {
			return "UPDATED";
		}

		return resultString;
		
	}

	@Override
	@Transactional
	public synchronized String deleteContact(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;
		ContactsBean latestData = editContact(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";
		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		if(!contactDao.isContactIdExist(deleteRecords.getId())) 
			resultFlag = contactDao.deleteContact(deleteRecords.getId(), deleteRecords.getModifiedBy());
			 else 
				 return "NOT_DELETED";
	    if (resultFlag) {
	    	//contactDao.deleteUserRights(deleteRecords.getId());
	    	return "DELETED";
	    
	    }

		return resultString;
	}
}
