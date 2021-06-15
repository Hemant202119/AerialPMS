package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.cdf.util.PayloadBean;
import com.edios.project.bean.ContactsBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.to.ItemReceivedTO;


public interface ReceivedItemManager extends AbstractManager {

	List<ItemReceivedTO> searchAssestItemAutoLookUp(PayloadBean payloadBean);

	List<ItemReceivedTO> searchItemDataOnCriteria(PayloadBean payloadBean);

	String addReceivedItems(ItemsInformationBean itemsInformationBean);

	List<ItemReceivedTO> searchReceivedItems(PayloadBean payloadBean);

	ItemsInformationBean findReceivedItems(Long id);

	String updateReceivedItems(ItemsInformationBean itemsInformationBean);

	String deleteReceivedItems(DeleteRecords deleteRecords);

	List<ProjectBean> fetchProjectAutoLookUpListReceivedItems();

	List<ContactsBean> fetchContactAutoLookUpListReceivedItems();
	

}
