package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.util.PayloadBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.UseItemBean;
import com.edios.project.bean.UseItemsBean;
import com.edios.project.entity.UsedItemEntity;
import com.edios.project.entity.to.UseItemsTO;

public interface UseItemsDao extends BaseDao<UsedItemEntity> {

	List<UseItemsTO> searchReceivedItems(UseItemsBean useItemsBean);

	UseItemsTO editUseItems(PayloadBean payloadBean);

	ItemsInformationBean fetchTransactionData(Long stockItemId);

	Long updateUseItems(UseItemBean useItemBean);

	Boolean addUseItem(UsedItemEntity usedItemEntity);

}
