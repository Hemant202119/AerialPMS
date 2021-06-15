package com.edios.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edios.cdf.controller.AbstractController;
import com.edios.cdf.entity.to.ReportBean;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.MISReportTO;
import com.edios.project.entity.to.ProjectStatusReportTO;
import com.edios.project.entity.to.SiteStatusEntityTO;
import com.edios.project.entity.to.SupplierPOEntityTO;
import com.edios.project.manager.ReportManager;

@RestController
public class ReportController extends AbstractController{
	
	@Autowired
	MessageSource messageSource;
	
	@Autowired
	ReportManager reportManager;
	
	

	@PostMapping("/circle-name")
	public ResponseEntity<List<CirclesEntityTO>> getcircleName(@RequestBody ReportBean reportBean) {
		List<CirclesEntityTO> circleEntityTOList = reportManager.getcircleNames(reportBean);
		return new ResponseEntity<List<CirclesEntityTO>>(circleEntityTOList, HttpStatus.OK);
	}
	@PostMapping("/customer-name")
	public ResponseEntity<List<SupplierPOEntityTO>> getCustomerName(@RequestBody ReportBean reportBean) {
		List<SupplierPOEntityTO> cutomerEntityTOList = reportManager.getCustomerNames(reportBean);
		return new ResponseEntity<List<SupplierPOEntityTO>>(cutomerEntityTOList, HttpStatus.OK);
	}
	@PostMapping("/mis-status-report-onBasis-search-criteria")
	public ResponseEntity<List<MISReportTO>> getmisStatusReportOnCriteria(@RequestBody ReportBean reportBean) {
		System.out.println(reportBean.toString());
		List<MISReportTO> misStatusEntityTOList = reportManager.getmisStatusReportOnCriteria(reportBean);
		return new ResponseEntity<List<MISReportTO>>(misStatusEntityTOList, HttpStatus.OK);
	}
	@PostMapping("/site-status-report-onBasis-search-criteria")
	public ResponseEntity<List<SiteStatusEntityTO>> getSiteStatusReportOnCriteria(@RequestBody ReportBean reportBean) {
		List<SiteStatusEntityTO> siteStatusEntityTOList = reportManager.getSiteStatusReportOnCriteria(reportBean);
		return new ResponseEntity<List<SiteStatusEntityTO>>(siteStatusEntityTOList, HttpStatus.OK);
	}
	@PostMapping("/site-status-report")
	public ResponseEntity<List<SiteStatusEntityTO>> getSiteStatusReport(@RequestBody ReportBean reportBean) {
		List<SiteStatusEntityTO> siteStatusEntityTOList = reportManager.getSiteStatusReport(reportBean);
		return new ResponseEntity<List<SiteStatusEntityTO>>(siteStatusEntityTOList, HttpStatus.OK);
	}	
	@PostMapping("/mis-status-report")
	public ResponseEntity<List<MISReportTO>> getMIStatusReport(@RequestBody ReportBean reportBean) {
		List<MISReportTO> miStatusEntityTOList = reportManager.getMIStatusReport(reportBean);
		return new ResponseEntity<List<MISReportTO>>(miStatusEntityTOList, HttpStatus.OK);
	}	
	@PostMapping("/project-status-report-onBasis-search-criteria")
	public ResponseEntity<List<ProjectStatusReportTO>> getProjectStatusReportOnCriteria(@RequestBody ReportBean reportBean) {
		List<ProjectStatusReportTO> projectStatusReportTO = reportManager.getProjectStatusReportOnCriteria(reportBean);
		return new ResponseEntity<List<ProjectStatusReportTO>>(projectStatusReportTO, HttpStatus.OK);
	}
}
