package com.edios.cdf.util;

import java.io.Serializable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RoleData implements Serializable {

	private static final long serialVersionUID = -1167091116783726829L;

	private String menuDesc;

	private boolean isParent;

	private Integer insertVisible;

	private Integer updateVisible;

	private Integer deleteVisible;

	private Integer viewVisible;

	private Integer printVisible;

	private Integer exportVisible;

	private boolean viewAccess;

	private boolean insertAccess;

	private boolean updateAccess;

	private boolean deleteAccess;

	private boolean printAccess;

	private boolean exportAccess;

}
