package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.project.entity.CircleEntity;
import com.edios.project.entity.to.CirclesEntityTO;

public interface CircleDao extends BaseDao<CircleEntity> {

	List<CirclesEntityTO> fetchCircles();

	boolean addCircle(CircleEntity circleEntity);

	List<CirclesEntityTO> fetchCircleDetail(String circleStatus);

	CircleEntity editCircle(Long id);

	boolean updateCircle(CircleEntity circleEntity);

	boolean getCircleNameExist(String circleName);

	boolean getCircleNameExists(String circleName, Long circleID);

	boolean deleteCircle(Long id, Integer modifiedBy);

	boolean isCircleIdExist(Long id);

}
