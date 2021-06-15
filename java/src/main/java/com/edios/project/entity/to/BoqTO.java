package com.edios.project.entity.to;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
public class BoqTO  implements Serializable{
	private static final long serialVersionUID = 3961409324722899586L;

	private Long boqID;

	private Date boqdate;

	private String boqNotes;

	private String boqUserName;
	
	private Double totalBoqAmount;
	
	private Double grandTotalOfBOQ;
	
	
}
