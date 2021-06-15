package com.edios.project.dao;

import java.util.List;

import com.edios.cdf.dao.BaseDao;
import com.edios.cdf.entity.to.ReportBean;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.MISReportTO;
import com.edios.project.entity.to.ProjectStatusReportTO;
import com.edios.project.entity.to.SiteStatusEntityTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

public interface ReportDao extends BaseDao<ProjectsEntity> {

	List<MISReportTO> getMIStatusReport(ReportBean reportBean);
	List<SiteStatusEntityTO> getSiteStatusReport(ReportBean reportBean);

	List<CirclesEntityTO> getcircleNames(ReportBean reportBean);

	List<SupplierPOEntityTO> getCustomerNames(ReportBean reportBean);
	
	List<SiteStatusEntityTO> getSiteStatusReportOnCriteria(ReportBean reportBean);
	List<MISReportTO> getMIStatusReportOnCriteria(ReportBean reportBean);
	List<ProjectStatusReportTO> getProjectStatusReportOnCriteria(ReportBean reportBean);
}
