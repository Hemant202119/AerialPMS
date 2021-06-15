package com.edios.project.bean;

import com.edios.cdf.bean.AbstractBean;
import com.edios.cdf.bean.security.UserBean;

public class UserRightsBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private Long userRightsID;

	private ContactsBean contactID;

	private CircleBean circleID;

	private UserBean userID;

	public Long getUserRightsID() {
		return userRightsID;
	}

	public void setUserRightsID(Long userRightsID) {
		this.userRightsID = userRightsID;
	}

	public ContactsBean getContactID() {
		return contactID == null ? contactID = new ContactsBean() : contactID;
	}

	public void setContactID(ContactsBean contactID) {
		this.contactID = contactID;
	}

	public CircleBean getCircleID() {
		return circleID == null ? circleID = new CircleBean() : circleID;
	}

	public void setCircleID(CircleBean circleID) {
		this.circleID = circleID;
	}

	public UserBean getUserID() {
		return userID == null ? userID = new UserBean() : userID;
	}

	public void setUserID(UserBean userID) {
		this.userID = userID;
	}

}
