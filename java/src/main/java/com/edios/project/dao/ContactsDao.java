package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.ContactsEntity;
import com.edios.project.entity.to.ContactsEntityTO;

public interface ContactsDao extends BaseDao<ContactsEntity> {

	List<ContactsEntityTO> searchContacts();

	List<ContactsEntityTO> fetchContactDetails(String contactStatus);

	boolean addContacts(ContactsEntity contactsEntity);

	ContactsEntity editContact(Long id);

	boolean updateContact(ContactsEntity contactsEntity);

	boolean deleteContact(Long id, Integer modifiedBy);

	boolean isContactIdExist(Long id);  
	
	boolean deleteUserRights(Long id);



	
		

}
