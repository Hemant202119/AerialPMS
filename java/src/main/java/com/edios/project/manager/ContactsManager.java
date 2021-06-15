package com.edios.project.manager;
import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.ContactsBean;
import com.edios.project.entity.to.ContactsEntityTO;

public interface ContactsManager extends AbstractManager {

	List<ContactsEntityTO> searchContacts();

	List<ContactsEntityTO> fetchContactDetails(String contactStatus);

	String addContacts(ContactsBean contactsBean);

	ContactsBean editContact(Long id);

	String updateContact(ContactsBean contactsBean);

	String deleteContact(DeleteRecords deleteRecords);

}
