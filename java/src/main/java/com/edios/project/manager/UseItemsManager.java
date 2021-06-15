package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.PayloadBean;
import com.edios.project.bean.ItemsInformationBean;
import com.edios.project.bean.UseItemBean;
import com.edios.project.bean.UseItemsBean;
import com.edios.project.entity.to.UseItemsTO;

public interface UseItemsManager extends AbstractManager {

	List<UseItemsTO> searchReceivedItems(UseItemsBean useItemsBean);

	UseItemsTO editUseItems(PayloadBean payloadBean);

	String insertupdateUseItems(UseItemBean useItemBean);

}
