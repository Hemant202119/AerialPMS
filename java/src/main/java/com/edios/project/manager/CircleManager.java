package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.manager.AbstractManager;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.CircleBean;
import com.edios.project.entity.to.CirclesEntityTO;

public interface CircleManager extends AbstractManager {

	List<CirclesEntityTO> fetchCircles();

	String addCircle(CircleBean circleBean);

	List<CirclesEntityTO> fetchCircleDetail(String circleStatus);

	CircleBean editCircle(Long id);

	String updateCircle(CircleBean circleBean);

	String deleteCircle(DeleteRecords deleteRecords);

	boolean isCircleNameExist(String circleName);

	boolean isCircleNameExists(String circleName, Long circleID);

}
