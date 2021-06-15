package com.edios.project.manager.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.cdf.util.DeleteRecords;
import com.edios.project.bean.CircleBean;
import com.edios.project.dao.CircleDao;
import com.edios.project.entity.CircleEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.manager.CircleManager;

@Service
public class CircleManagerImpl extends AbstractManagerImpl<CircleBean, CircleEntity> implements CircleManager {

	private static final Long TRANSACTION_BEGIN = 1l;

	private static final Character RECORDTYPE_INSERT = 'I';

	private static final Character RECORDTYPE_DELETE = 'D';

	private static final Character RECORDTYPE_UPDATE = 'U';

	@Autowired
	CircleDao circleDao;

	@Override
	@Transactional
	public List<CirclesEntityTO> fetchCircles() {
		List<CirclesEntityTO> circlesTOList = null;
		try {
			circlesTOList = circleDao.fetchCircles();
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return circlesTOList;
	}

	@Override
	@Transactional
	public String addCircle(CircleBean circleBean) {

		String resultString = "";
		boolean resultFlag = false;
		resultFlag = isCircleNameExist(circleBean.getCircleName());
		if (resultFlag) {
			return "NameAlreadyExist";
		}
		setAuditInfo(circleBean, "newFlag");
		CircleEntity circleEntity = mapper.map(circleBean, CircleEntity.class);
		resultFlag = circleDao.addCircle(circleEntity);
		if (resultFlag)
			return "ADDED";
		return resultString;
	}

	@Override
	@Transactional
	public List<CirclesEntityTO> fetchCircleDetail(String circleStatus) {
		List<CirclesEntityTO> circlesEntityTOList = null;
		try {
			circlesEntityTOList = circleDao.fetchCircleDetail(circleStatus);
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return circlesEntityTOList;
	}

	@Override
	public CircleBean editCircle(Long id) {
		CircleBean circleBean = null;
		circleBean = mapper.map(circleDao.editCircle(id), CircleBean.class);
		return circleBean;
	}

	private void setAuditInfo(CircleBean circleBean, String string) {
		if (string.equalsIgnoreCase("newFlag")) {
			circleBean.setTransactionCount(TRANSACTION_BEGIN);
			circleBean.setRecordType(RECORDTYPE_INSERT);
			circleBean.setCreatedDate(new Date());
		} else {
			circleBean.setTransactionCount(circleBean.getTransactionCount() + TRANSACTION_BEGIN);
			circleBean.setRecordType(RECORDTYPE_UPDATE);
			circleBean.setLastModifiedDate(new Date());
		}
	}

	@Override
	@Transactional
	public synchronized String updateCircle(CircleBean circleBean) {
		String resultString = "";
		boolean resultFlag = false;
		CircleBean latestData = editCircle(circleBean.getCircleID());
		if (latestData.getTransactionCount() > (circleBean.getTransactionCount())) {
			return "TransactionFailed";

		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		resultFlag = isCircleNameExists(circleBean.getCircleName(), circleBean.getCircleID());
		if (resultFlag) {
			return "NameAlreadyExist";
		}

		setAuditInfo(circleBean, "editFlag");
		CircleEntity circleEntity = mapper.map(circleBean, CircleEntity.class);
		resultFlag = circleDao.updateCircle(circleEntity);

		if (resultFlag) {
			return "UPDATED";
		}

		return resultString;
	}

	@Override
	@Transactional
	public synchronized String deleteCircle(DeleteRecords deleteRecords) {
		String resultString = "";
		boolean resultFlag = false;
		
		CircleBean latestData = editCircle(deleteRecords.getId());
		if (latestData.getTransactionCount() > (deleteRecords.getTransactionCount())) {
			return "TransactionFailed";

		}
		if (latestData.getRecordType() == 'D') {
			return "recordDeleted";
		}
		if(!circleDao.isCircleIdExist(deleteRecords.getId())) 
		  resultFlag = circleDao.deleteCircle(deleteRecords.getId(), deleteRecords.getModifiedBy());
		 else 
			 return "NOT_DELETED";
		if (resultFlag)
			return "DELETED";

		return resultString;
	}

	@Override
	public boolean isCircleNameExist(String circleName) {
		return circleDao.getCircleNameExist(circleName);

	}

	@Override
	public boolean isCircleNameExists(String circleName, Long circleID) {

		return circleDao.getCircleNameExists(circleName, circleID);
	}
	// @Override
	// public boolean isAppParameterNameExist(String circleName) {
	// return circleDao.getAppParameterNameExists(circleName);
	// }
	//
	// @Override
	// public boolean isAppParameterNameExist(String circleName, Long circleID) {
	// return circleDao.getAppParameterNameExists(circleName, circleID);
	// }

}
