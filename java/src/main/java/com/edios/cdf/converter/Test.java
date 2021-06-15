package com.edios.cdf.converter;

import java.util.Date;
import java.util.concurrent.TimeUnit;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Test {
 public static void main(String[] args) throws ParseException {
//	long tes=23_2_____3434534l;
//	int a = 0;
//	const int b =10 , c=11;
	
//	while(true) {
//		
//		
//	}
//	
	 int k=21;
	for(int i=1;i<=k;i++) {
		for(int j=1;j<=k;j++) {
//			if(i%2==0)
//				continue;
			
			if(i==1 || i==k ||j==k || j==1) {
			if(j%2==0) {
				System.out.print("*");
				continue;
			}
				System.out.print("$");
			}
			else {
			if(j!=1 &&  j!=k)
				System.out.print("*");
			}
		}
		System.out.println("*");

	}
//	char i=64;
//	System.out.println(i);
	
	String myDate1 = "2021/10/27 18:10:34";
	SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	Date date1 = sdf1.parse(myDate1);
	long millis1
	= date1.getTime();
	String myDate = "2021/10/29 18:40:45";
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	Date date = sdf.parse(myDate);
	long millis = date.getTime();
	long cillis = millis-millis1;
 System.out.println(millis-millis1);
 
 String hms = String.format("%02d:%02d:%02d", TimeUnit.MILLISECONDS.toHours(cillis),
         TimeUnit.MILLISECONDS.toMinutes(cillis) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(cillis)),
         TimeUnit.MILLISECONDS.toSeconds(cillis) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(cillis)));
 System.out.println(hms);
 
 }
}
