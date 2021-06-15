package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.util.TransactionData;
import com.edios.project.bean.ContactsBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.ProjectBean;
import com.edios.project.entity.StockItemsEntity;
import com.edios.project.entity.to.ItemReceivedTO;

public interface ReceivedItemDao extends BaseDao<StockItemsEntity> {

	List<ItemReceivedTO> searchAssestItemAutoLookUp(String searchParameter);

	List<ItemReceivedTO> searchItemDataOnCriteria(Long itemId);

	boolean addReceievedItem(StockItemsEntity itemsInformationEntity);

	List<ItemReceivedTO> searchReceivedItems(String searchParameter,Long pkID);

	StockItemsEntity findReceivedItemsById(Long receivedItemId);

	boolean updateReceivedItems(StockItemsEntity vendorEntity);

	ItemsInformationBean fetchReceivedItems(Long stockItemId);

	TransactionData fetchTransactionDataById(Long id);

	boolean deleteReceiveItems(Long id, Integer modifiedBy);

	//String checkReceivedItems(Long id);

	List<ProjectBean> fetchProjectAutoLookUpListReceivedItems();

	List<ContactsBean> fetchContactAutoLookUpListReceivedItems();

	Float checkReceivedItems(Long id);

}
