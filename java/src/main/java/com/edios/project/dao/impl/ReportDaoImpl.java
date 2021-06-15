package com.edios.project.dao.impl;

import java.util.List;
import java.util.Optional;

import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import com.edios.cdf.dao.impl.BaseDaoImpl;
import com.edios.cdf.entity.to.ReportBean;
import com.edios.project.dao.ReportDao;
import com.edios.project.entity.ProjectsEntity;
import com.edios.project.entity.to.CirclesEntityTO;
import com.edios.project.entity.to.MISReportTO;
import com.edios.project.entity.to.ProjectStatusReportTO;
import com.edios.project.entity.to.SiteStatusEntityTO;
import com.edios.project.entity.to.SupplierPOEntityTO;

@Repository
public class ReportDaoImpl extends BaseDaoImpl<ProjectsEntity> implements ReportDao {

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<SiteStatusEntityTO> getSiteStatusReport(ReportBean reportBean) {
		Session session = (Session) entityManager.getDelegate();
		List<SiteStatusEntityTO> siteStatusTo = null;
		try {
			StringBuilder queryBuilder = new StringBuilder();
			queryBuilder.append(createSQLQuery());
			queryBuilder.append(
					" where project.record_type<>'D' order by project.project_ID, ps.status_date,circle.circle_name,project.site_id");
			siteStatusTo = session.createNativeQuery(queryBuilder.toString())
					.addScalar("circleName", StandardBasicTypes.STRING)
					.addScalar("CustomerName", StandardBasicTypes.STRING).addScalar("siteID", StandardBasicTypes.STRING)
					.addScalar("siteType", StandardBasicTypes.STRING)
					.addScalar("allocationDate", StandardBasicTypes.DATE)
					.addScalar("projectStatus", StandardBasicTypes.STRING)
					.addScalar("statusDate", StandardBasicTypes.DATE)
					.addScalar("customerPOAmount", StandardBasicTypes.LONG)
					.addScalar("supplierPOAmount", StandardBasicTypes.LONG)
					.addScalar("contractorPOAmount", StandardBasicTypes.LONG)
					.addScalar("totalPOAmount", StandardBasicTypes.LONG)
					.addScalar("contractorFRAmount", StandardBasicTypes.LONG)
					.addScalar("supplierFRAmount", StandardBasicTypes.LONG)
					.addScalar("totalFRAmount", StandardBasicTypes.LONG)
					.addScalar("supplierBoqTotal", StandardBasicTypes.LONG)
					.setResultTransformer(Transformers.aliasToBean(SiteStatusEntityTO.class)).list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return siteStatusTo;
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<CirclesEntityTO> getcircleNames(ReportBean reportBean) {
		try {
			Session session = (Session) entityManager.getDelegate();
			String sqlQuery = "select distinct(circle.circleID) as circleID,circle.circleName as circleName from UserRightsEntity ur left join ur.circleID as circle where ur.userID.userID=:userID and circle.recordType<>'D' and circle.circleStatus<>'InActive'  order by circle.circleName asc";
			return session.createQuery(sqlQuery).setParameter("userID", reportBean.getUserID())
					.setResultTransformer(Transformers.aliasToBean(CirclesEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<SupplierPOEntityTO> getCustomerNames(ReportBean reportBean) {
		try {
			Session session = (Session) entityManager.getDelegate();
			String sqlQuery = "select distinct(c.contactID) As contactID, case c.entityType when 'Business' then c.businessName else  concat(c.firstName, ' ' ,c.lastName) end "
					+ " as businessName from UserRightsEntity ur left join ur.contactID as c where ur.userID.userID=:userID and ur.circleID.circleID=:circleID and c.contactType ='Customer' and c.recordType<>'D' and c.contactStatus <>'Inactive' order by c.businessName ASC";
			return session.createQuery(sqlQuery).setParameter("userID", reportBean.getUserID())
					.setParameter("circleID", reportBean.getCircleID())
					.setResultTransformer(Transformers.aliasToBean(SupplierPOEntityTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<SiteStatusEntityTO> getSiteStatusReportOnCriteria(ReportBean reportBean) {

		Session session = (Session) entityManager.getDelegate();
		List<SiteStatusEntityTO> siteStatusTo = null;
		try {
			StringBuilder queryBuilder = new StringBuilder();
			queryBuilder.append(createSQLQuery() + " where ");
			queryBuilder.append(queryOnBasisOfSearchCriteria(reportBean));
			queryBuilder.append(
					" and project.record_type<>'D' order by project.project_ID, ps.status_date,circle.circle_name,project.site_id");

			siteStatusTo = session.createNativeQuery(queryBuilder.toString())
					.addScalar("circleName", StandardBasicTypes.STRING)
					.addScalar("CustomerName", StandardBasicTypes.STRING).addScalar("siteID", StandardBasicTypes.STRING)
					.addScalar("siteType", StandardBasicTypes.STRING)
					.addScalar("allocationDate", StandardBasicTypes.DATE)
					.addScalar("projectStatus", StandardBasicTypes.STRING)
					.addScalar("statusDate", StandardBasicTypes.DATE)
					.addScalar("customerPOAmount", StandardBasicTypes.LONG)
					.addScalar("supplierPOAmount", StandardBasicTypes.LONG)
					.addScalar("contractorPOAmount", StandardBasicTypes.LONG)
					.addScalar("totalPOAmount", StandardBasicTypes.LONG)
					.addScalar("contractorFRAmount", StandardBasicTypes.LONG)
					.addScalar("supplierFRAmount", StandardBasicTypes.LONG)
					.addScalar("totalFRAmount", StandardBasicTypes.LONG)
					.addScalar("supplierBoqTotal", StandardBasicTypes.LONG)
					.setResultTransformer(Transformers.aliasToBean(SiteStatusEntityTO.class)).list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return siteStatusTo;

	}

	private String queryOnBasisOfSearchCriteria(ReportBean reportBean) {
		boolean secondElementFlag = false;
		StringBuilder queryBuilder = new StringBuilder();
		if (reportBean.getAllocationDateString() != null) {
			queryBuilder.append(" (project.allocation_date >='" + reportBean.getAllocationDateString()
					+ "' || project.completion_date >='" + reportBean.getAllocationDateString() + "') ");
			secondElementFlag = true;
		}
		if (reportBean.getCompletionDateString() != null && secondElementFlag) {
			queryBuilder.append(" and (project.allocation_date <='" + reportBean.getCompletionDateString()
					+ "' || project.completion_date <='" + reportBean.getCompletionDateString() + "') ");
			secondElementFlag = true;
		} else if (reportBean.getCompletionDateString() != null && !secondElementFlag) {
			queryBuilder.append(" (project.allocation_date <='" + reportBean.getCompletionDateString()
					+ "' || project.completion_date <='" + reportBean.getCompletionDateString() + "')");
			secondElementFlag = true;
		}

		if (reportBean.getContactID() != null && secondElementFlag) {
			queryBuilder.append(" and project.contact_id='" + reportBean.getContactID() + "' ");
			secondElementFlag = true;
		} else if (reportBean.getContactID() != null && !secondElementFlag) {
			queryBuilder.append(" project.contact_id='" + reportBean.getContactID() + "' ");
			secondElementFlag = true;
		}

		if (reportBean.getCircleID() != null && secondElementFlag) {
			queryBuilder.append(" and project.circle_id='" + reportBean.getCircleID() + "' ");
			secondElementFlag = true;
		} else if (reportBean.getCircleID() != null && !secondElementFlag) {
			queryBuilder.append(" project.circle_id='" + reportBean.getCircleID() + "' ");
			secondElementFlag = true;
		}

		if (reportBean.getSiteTypeID() != null && secondElementFlag) {
			queryBuilder.append(" and project.category_id='" + reportBean.getSiteTypeID() + "' ");
			secondElementFlag = true;
		} else if (reportBean.getSiteTypeID() != null && !secondElementFlag) {
			queryBuilder.append(" project.category_id='" + reportBean.getSiteTypeID() + "' ");
			secondElementFlag = true;
		}
		return queryBuilder.toString();
	}

	private String createSQLQuery() {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("select circle.circle_name as circleName,"
				+ " case contact.entity_Type when 'Business' then contact.business_Name else  concat(contact.PC_FIRST_NAME, ' ' ,contact.PC_LAST_NAME) end as customerName,project.site_id as siteID,pc.category_name as siteType,"
				+ " project.allocation_date as allocationDate,apls.parameter_list_value as projectStatus,ps.status_date as statusDate,"
				+ " (select coalesce(sum(total_amount),0) from purchase_orders where project_id = project.project_id and contact_id=project.contact_id ) as customerPOAmount,"
				+ " (select coalesce(sum(total_amount),0) from purchase_orders where project_id = project.project_id and contact_id in (select contact_id from contacts"
				+ " where contact_type='Supplier') and po_status='Approved') as supplierPOAmount,(select coalesce(sum(total_amount),0) from purchase_orders where project_id = project.project_id and contact_id in (select contact_id from contacts"
				+ " where contact_type='Contractor') and po_status='Approved') as contractorPOAmount,(select coalesce(sum(total_amount),0) from purchase_orders where project_id = project.project_id and contact_id in (select contact_id from contacts"
				+ " where contact_type in('Contractor','Supplier','Customer')) and po_status='Approved' ) as totalPOAmount,(select coalesce(sum(fr_amount),0) from fund_requests where po_id in (select po_id from purchase_orders where project_id = project.project_id"
				+ " and contact_id in (select contact_id from contacts where contact_type='Contractor'))) as contractorFRAmount,(select coalesce(sum(fr_amount),0) from fund_requests where po_id in (select po_id from purchase_orders where project_id = project.project_id"
				+ " and contact_id in (select contact_id from contacts where contact_type='Supplier'))) as supplierFRAmount,(select coalesce(sum(fr_amount),0) from fund_requests where po_id in (select po_id from purchase_orders where project_id = project.project_id"
				+ " and contact_id in (select contact_id from contacts where contact_type in ('Contractor','Supplier')))) as totalFRAmount,"
				+ " (select coalesce(sum(item_total_rate),0) from project_boq_items where boq_id in(select boq_id from project_boqs where project_id=project.project_id )) as supplierBoqTotal"
				+ " from project_Statuses ps" + " left join projects as project  on ps.project_id=project.project_id"
				+ " left join circles as circle on project.circle_id=circle.circle_id"
				+ " left join contacts as contact on project.contact_id=contact.contact_id"
				+ " left join project_categories as pc on project.category_id=pc.category_id"
				+ " left join application_parameter_lists as apls on apls.parameter_list_id=ps.status_list_id ");
		return queryBuilder.toString();
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<MISReportTO> getMIStatusReport(ReportBean reportBean) {
		try {
			StringBuilder queryBuilder = new StringBuilder();
			queryBuilder.append(createMISQLQuery());
			queryBuilder.append(
					" and project.record_type<>'D' group by project.project_id order by project.project_id,circle.circle_name,project.site_id;");
			Session session = (Session) entityManager.getDelegate();
			List<MISReportTO> misList = session.createNativeQuery(queryBuilder.toString())
					.addScalar("circleName", StandardBasicTypes.STRING)
					.addScalar("customerName", StandardBasicTypes.STRING).addScalar("siteID", StandardBasicTypes.STRING)
					.addScalar("siteType", StandardBasicTypes.STRING)
					.addScalar("allocationDate", StandardBasicTypes.DATE)
					.addScalar("statusDate", StandardBasicTypes.DATE)
					.addScalar("projectStatus", StandardBasicTypes.STRING)
					.addScalar("customerPOTotal", StandardBasicTypes.LONG)
					.addScalar("customerInvoiceAmount", StandardBasicTypes.LONG)
					.addScalar("supplierBudgetTotal", StandardBasicTypes.LONG)
					.addScalar("supplierPOTotal", StandardBasicTypes.LONG)
					.addScalar("supplierPendingBudgetUtilisation", StandardBasicTypes.LONG)
					.addScalar("contractorPOTotal", StandardBasicTypes.LONG)
					.addScalar("poTotal", StandardBasicTypes.LONG)
					.addScalar("fundRequestedTotal", StandardBasicTypes.LONG)
					.addScalar("fundReleasedTotal", StandardBasicTypes.LONG)
					.addScalar("fundNotReleased", StandardBasicTypes.LONG)
					.addScalar("fundReleasedInvoicePending", StandardBasicTypes.LONG)
					.setResultTransformer(Transformers.aliasToBean(MISReportTO.class)).list();
			return misList;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private String createMISQLQuery() {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append(
				"select circle.circle_name as circleName,project.site_name as siteName,case contact.entity_Type when 'Business' then contact.business_Name else  concat(contact.PC_FIRST_NAME, ' ' ,contact.PC_LAST_NAME) end as customerName,project.site_id as siteID,"
						+ " pc.category_name as siteType, project.allocation_date as allocationDate,project.status_date as statusDate, Apl.parameter_list_value as projectStatus "
						+ " ,(select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type='Customer')) as customerPOTotal "
						+ " ,(select coalesce(sum(total_amount),0) from invoice_details where po_id in (select po_id from purchase_orders where project_id in"
						+ " (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in "
						+ " (select contact_id from contacts where contact_type='Customer'))) as customerInvoiceAmount  "
						+ " ,(select coalesce(sum(item_total_rate),0) from project_boq_items boq_items left join project_boqs boq on boq_items.boq_id = boq.boq_id where boq.project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id)) as supplierBudgetTotal,"
						+ " (select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type='Supplier') and po_status='Approved') as supplierPOTotal,"
						+ " (select coalesce(sum(item_total_rate),0) from project_boq_items boq_items  left join project_boqs boq on boq_items.boq_id = boq.boq_id "
						+ "  where boq.project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id)) -(select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id)  and contact_id in (select contact_id from contacts where contact_type='Supplier') and po_status='Approved') as supplierPendingBudgetUtilisation,"
						+ " (select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type='Contractor') and po_status='Approved') as contractorPOTotal,"
						+ " (select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type='Supplier')"
						+ "  and po_status='Approved')+(select coalesce(sum(total_amount),0) from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type='Contractor') and po_status='Approved') as poTotal "
						+ " ,(select coalesce(sum(fr_amount),0) from fund_requests where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) as fundRequestedTotal,(select coalesce(sum(payment_amount),0) from payment_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) as fundReleasedTotal "
						+ " ,(select coalesce(sum(fr_amount),0) from fund_requests where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) -  (select coalesce(sum(payment_amount),0) from payment_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) as fundNotReleased "
						+ " ,(select coalesce(sum(payment_amount),0) from payment_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) -  (select coalesce(sum(total_amount),0) from invoice_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id = project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer')))  as fundReleasedInvoicePending "
						+ " ,(select coalesce(sum(invoice_amount),0) from invoice_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id =project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) as invoiceBasicAmount "
						+ ",(select coalesce(sum(gst),0) from invoice_details where po_id in(select po_id from purchase_orders where project_id in (select project_id from projects where contact_id=project.contact_id and circle_id=project.circle_id and site_id =project.site_id and project_id=project.project_id) and contact_id in (select contact_id from contacts where contact_type<>'Customer'))) as invoiceGSTAmount "
						+ " from purchase_orders po left join projects project on project.project_id=po.project_id "
						+ " left join circles circle on project.circle_id=circle.circle_id "
						+ " left join application_parameter_lists Apl on project.status_list_id=Apl.parameter_list_id "
						+ " left join project_categories pc on project.category_id=pc.category_id "
						+ " left join contacts contact on contact.contact_id=project.contact_id ");
		return queryBuilder.toString();
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<MISReportTO> getMIStatusReportOnCriteria(ReportBean reportBean) {

		Session session = (Session) entityManager.getDelegate();
		List<MISReportTO> misStatusTo = null;
		try {
			StringBuilder queryBuilder = new StringBuilder();
			queryBuilder.append(createMISQLQuery() + " where ");
			queryBuilder.append(queryOnBasisOfSearchCriteria(reportBean));
			if (Optional.ofNullable(reportBean.getCircleID()).isPresent()
					&& Optional.ofNullable(reportBean.getContactID()).isPresent())
				queryBuilder.append(
						" and project.record_type<>'D' group by project.project_id order by project.project_id,circle.circle_name,project.site_id ; ");
			else {
				if (Optional.ofNullable(reportBean.getSiteTypeID()).isPresent()
						|| Optional.ofNullable(reportBean.getAllocationDate()).isPresent()
						|| Optional.ofNullable(reportBean.getCompletionDate()).isPresent())
					queryBuilder.append(
							" and project.record_type<>'D' group by project.project_id order by project.project_id,circle.circle_name,project.site_id ; ");
				else
					queryBuilder.append(
							" project.record_type<>'D' group by project.project_id order by project.project_id,circle.circle_name,project.site_id ; ");

			}
			misStatusTo = session.createNativeQuery(queryBuilder.toString())
					.addScalar("circleName", StandardBasicTypes.STRING)
					.addScalar("customerName", StandardBasicTypes.STRING)
					.addScalar("siteName", StandardBasicTypes.STRING).addScalar("siteID", StandardBasicTypes.STRING)
					.addScalar("siteType", StandardBasicTypes.STRING)
					.addScalar("allocationDate", StandardBasicTypes.DATE)
					.addScalar("statusDate", StandardBasicTypes.DATE)
					.addScalar("projectStatus", StandardBasicTypes.STRING)
					.addScalar("customerPOTotal", StandardBasicTypes.LONG)
					.addScalar("customerInvoiceAmount", StandardBasicTypes.LONG)
					.addScalar("supplierBudgetTotal", StandardBasicTypes.LONG)
					.addScalar("supplierPOTotal", StandardBasicTypes.LONG)
					.addScalar("supplierPendingBudgetUtilisation", StandardBasicTypes.LONG)
					.addScalar("contractorPOTotal", StandardBasicTypes.LONG)
					.addScalar("poTotal", StandardBasicTypes.LONG)
					.addScalar("fundRequestedTotal", StandardBasicTypes.LONG)
					.addScalar("fundReleasedTotal", StandardBasicTypes.LONG)
					.addScalar("fundNotReleased", StandardBasicTypes.LONG)
					.addScalar("fundReleasedInvoicePending", StandardBasicTypes.LONG)
					.addScalar("invoiceBasicAmount", StandardBasicTypes.LONG)
					.addScalar("invoiceGSTAmount", StandardBasicTypes.LONG)
					.setResultTransformer(Transformers.aliasToBean(MISReportTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return misStatusTo;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<ProjectStatusReportTO> getProjectStatusReportOnCriteria(ReportBean reportBean) {
		Session session = (Session) entityManager.getDelegate();
		List<ProjectStatusReportTO> projectStatusReportTO = null;
		try {
			StringBuilder sqlBuilder = new StringBuilder(
					"select contact1.contact_type as suplConame, case contact1.entity_Type when 'Business' then contact1.business_Name else  concat(contact1.PC_FIRST_NAME, ' ' ,contact1.PC_LAST_NAME) end as name,(select coalesce(sum(fr_amount),0) from fund_requests where po_id=po.po_id)  as frAmount,"
							+ "(select coalesce(sum(payment_amount),0) from payment_details where po_id=po.po_id) as paymentAmount,"
							+ "(select coalesce(sum(total_amount),0) from invoice_details where po_id=po.po_id) as invoiceAmount"
							+ ",po.po_date as poDate ,poActivity.parameter_list_value as activityName,pc.category_name as projectCategory,po.total_amount as poAmount,"
							+ " project.site_name as siteName,circle.circle_name as circleName, case contact.entity_Type when 'Business' then contact.business_Name else "
							+ " concat(contact.PC_FIRST_NAME, ' ',contact.PC_LAST_NAME) end as customerName,project.site_id as siteID,po.po_no as poNumber,pc.category_name as siteType,"
							+ " project.allocation_date as allocationDate,apls.parameter_list_value as projectStatus,project.status_date as statusDate  "
							+ " from purchase_orders po"
							+ " left join projects as project  on po.project_id=project.project_id"
							+ " left join contacts as contact1  on po.contact_id=contact1.contact_id"
							+ " left join circles as circle on project.circle_id=circle.circle_id"
							+ " left join contacts as contact on project.contact_id=contact.contact_id"
							+ " left join project_categories as pc on project.category_id=pc.category_id"
							+ " left join application_parameter_lists as poActivity on po.activity_type_list_id=poActivity.parameter_list_id"
							+ " left join application_parameter_lists as apls on apls.parameter_list_id=project.status_list_id where ");
			sqlBuilder.append(queryOnBasisOfSearchCriteria(reportBean));
			if (Optional.ofNullable(reportBean.getCircleID()).isPresent()
					&& Optional.ofNullable(reportBean.getContactID()).isPresent())
				sqlBuilder.append(
						" and project.record_type<>'D' and contact1.contact_type<>'Customer' order by project.project_ID");
			else {
				if (Optional.ofNullable(reportBean.getSiteTypeID()).isPresent()
						|| Optional.ofNullable(reportBean.getAllocationDate()).isPresent()
						|| Optional.ofNullable(reportBean.getCompletionDate()).isPresent())
					sqlBuilder.append(
							" and project.record_type<>'D' and contact1.contact_type<>'Customer' order by project.project_ID");
				else
					sqlBuilder.append(
							"  project.record_type<>'D' and contact1.contact_type<>'Customer' order by project.project_ID");
			}

//			sqlBuilder.append(
//					" and project.record_type<>'D' and contact1.contact_type<>'Customer' order by project.project_ID");
			projectStatusReportTO = session.createNativeQuery(sqlBuilder.toString())
					.addScalar("circleName", StandardBasicTypes.STRING)
					.addScalar("customerName", StandardBasicTypes.STRING)
					.addScalar("siteName", StandardBasicTypes.STRING).addScalar("siteID", StandardBasicTypes.STRING)
					.addScalar("projectCategory", StandardBasicTypes.STRING)
					.addScalar("allocationDate", StandardBasicTypes.DATE)
					.addScalar("statusDate", StandardBasicTypes.DATE)
					.addScalar("projectStatus", StandardBasicTypes.STRING)
					.addScalar("frAmount", StandardBasicTypes.LONG).addScalar("paymentAmount", StandardBasicTypes.LONG)
					.addScalar("invoiceAmount", StandardBasicTypes.LONG)
					.addScalar("suplConame", StandardBasicTypes.STRING).addScalar("poAmount", StandardBasicTypes.LONG)
					.addScalar("poNumber", StandardBasicTypes.STRING)
					.addScalar("activityName", StandardBasicTypes.STRING).addScalar("poDate", StandardBasicTypes.DATE)
					.addScalar("name", StandardBasicTypes.STRING)
					.setResultTransformer(Transformers.aliasToBean(ProjectStatusReportTO.class)).list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return projectStatusReportTO;
	}
}
