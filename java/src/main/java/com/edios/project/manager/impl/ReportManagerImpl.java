package com.edios.project.manager.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.edios.cdf.entity.to.ReportBean;
import com.edios.cdf.manager.impl.AbstractManagerImpl;
import com.edios.project.bean.ProjectBean;
import com.edios.project.dao.ReportDao;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.MISReportTO;
import com.edios.project.entity.to.ProjectStatusReportTO;
import com.edios.project.entity.to.SiteStatusEntityTO;
import com.edios.project.entity.to.SupplierPOEntityTO;
import com.edios.project.manager.ReportManager;
 
@Service
public class ReportManagerImpl   extends AbstractManagerImpl<ProjectBean, ProjectsEntity> implements ReportManager {

	@Autowired
	ReportDao reportDao;
	
	
	@Override
	@Transactional
	public List<SiteStatusEntityTO> getSiteStatusReport(ReportBean reportBean) {
		List<SiteStatusEntityTO> statusEntityTOList=null;
		statusEntityTOList=reportDao.getSiteStatusReport(reportBean);
		return statusEntityTOList;
	}
	@Override
	@Transactional
	public List<MISReportTO> getMIStatusReport(ReportBean reportBean) {
		List<MISReportTO> misEntityTOList=null;
		misEntityTOList=reportDao.getMIStatusReport(reportBean);
		return misEntityTOList;
	}
	@Override
	@Transactional
	public List<CirclesEntityTO> getcircleNames(ReportBean reportBean){
		List<CirclesEntityTO> circleNameList=null;
		circleNameList=reportDao.getcircleNames(reportBean);
		return circleNameList;
	}
	@Override
	@Transactional
	public List<SupplierPOEntityTO> getCustomerNames(ReportBean reportBean) {
		List<SupplierPOEntityTO> circleNameList=null;
		circleNameList=reportDao.getCustomerNames(reportBean);
		return circleNameList;
	}
	@Override
	@Transactional
	public List<SiteStatusEntityTO> getSiteStatusReportOnCriteria(ReportBean reportBean) {
		List<SiteStatusEntityTO> statusEntityTOList=null;
		if(reportBean.getAllocationDate()!=null)
		reportBean.setAllocationDateString(formatDate(reportBean.getAllocationDate()));
		if(reportBean.getCompletionDate()!=null)
		reportBean.setCompletionDateString(formatDate(reportBean.getCompletionDate()));;
		statusEntityTOList=reportDao.getSiteStatusReportOnCriteria(reportBean);
		return statusEntityTOList;
	}
	@Override
	@Transactional
	public List<ProjectStatusReportTO> getProjectStatusReportOnCriteria(ReportBean reportBean) {
		List<ProjectStatusReportTO> statusEntityTOList=null;
		if(reportBean.getAllocationDate()!=null)
		reportBean.setAllocationDateString(formatDate(reportBean.getAllocationDate()));
		if(reportBean.getCompletionDate()!=null)
		reportBean.setCompletionDateString(formatDate(reportBean.getCompletionDate()));;
		statusEntityTOList=reportDao.getProjectStatusReportOnCriteria(reportBean);
		return statusEntityTOList;
	}
	@Override
	@Transactional
	public List<MISReportTO> getmisStatusReportOnCriteria(ReportBean reportBean) {
		List<MISReportTO> misstatusEntityTOList=null;
		if(reportBean.getAllocationDate()!=null)
		reportBean.setAllocationDateString(formatDate(reportBean.getAllocationDate()));
		if(reportBean.getCompletionDate()!=null)
		reportBean.setCompletionDateString(formatDate(reportBean.getCompletionDate()));;
		misstatusEntityTOList=reportDao.getMIStatusReportOnCriteria(reportBean);
		return misstatusEntityTOList;
	}
	private String formatDate(Date frDate) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = simpleDateFormat.format(frDate);	
		return date;
	}

}
