package com.edios.project.manager;

import java.util.List;

import com.edios.cdf.entity.to.ReportBean;
import com.edios.cdf.manager.AbstractManager;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.MISReportTO;
import com.edios.project.entity.to.ProjectStatusReportTO;
import com.edios.project.entity.to.SiteStatusEntityTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

public interface ReportManager extends AbstractManager {

	List<SiteStatusEntityTO> getSiteStatusReport(ReportBean reportBean);
	List<MISReportTO>getMIStatusReport(ReportBean reportBean);
	List<MISReportTO>getmisStatusReportOnCriteria(ReportBean reportBean);
	List<CirclesEntityTO>getcircleNames(ReportBean reportBean);
	List<SupplierPOEntityTO>getCustomerNames(ReportBean reportBean);
	List<SiteStatusEntityTO> getSiteStatusReportOnCriteria(ReportBean reportBean);
	List<ProjectStatusReportTO> getProjectStatusReportOnCriteria(ReportBean reportBean);
}
