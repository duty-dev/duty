package com.tianyi.drs.duty.common;

public class Constants {

	public static final String USER_SESSION_NAME = "userInfo";
	public static final String USER_SESSION_FUNCTION = "userFunctions";
	public static final String CURRENT_MENU_ID = "__currentMenuId";
	public static final int IMAGE_RESIZE_WIDTH = 150;
	public static final int IMAGE_RESIZE_HEIGHT = 150;

	/**
	 * api接口返回状�?公共码表 start
	 */
	public static final Integer API_RESULT_SUCCESS = 0;
	public static final Integer API_RESULT_FAILURE = 1;
	public static final Integer API_RESULT_TIMEOUT = 95;
	public static final Integer API_RESULT_SUBMIT_DUPLICATE = 96;
	public static final Integer API_RESULT_PARAMTER_ERROR = 97;
	public static final Integer API_RESULT_TOKEN_ERROR = 98;
	public static final Integer API_RESULT_ORTHER_ERROR = 99;
	/**
	 * api接口返回状�?公共码表 end
	 */
	
	/**
	 * 数据状态，启用、停用
	 */
	public static final Integer STATUS_ENABLE = 1;
	public static final Integer STATUS_DISABLE = 1;
	
	/**
	 * 通过TCP协议传输成功,失败
	 */
	public static final Integer TRANSFORM_SUCCESS = 1;
	public static final Integer TRANSFORM_FAIL = 0;
	
}

