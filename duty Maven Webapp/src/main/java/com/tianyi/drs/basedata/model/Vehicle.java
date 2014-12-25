package com.tianyi.drs.basedata.model;
/*
 * 车辆实体类
 */
public class Vehicle {
	/*
	 * 主键值id
	 */
    private int id;
    /*
	 * 车辆类型id
	 */
    private int vehicleTypeId;
    /*
	 * 车辆所属组织机构id
	 */
    private int orgId;
    /*
	 * 车牌号码
	 */
    private String number;
    /*
	 * 对讲机组呼号
	 */
    private String intercomGroup;
    /*
	 * 对讲机个呼号
	 */
    private String intercomPerson;
    /*
	 * 对应gpsid
	 */
    private int gpsId;
    /*
	 * 对饮gps名称
	 */
    private String gpsName;
    /*
	 * 车辆用途
	 */
    private String purpose;
    /*
	 * 车辆品牌
	 */
    private String brand;
    /*
	 * 座位数
	 */
    private String siteQty;
    /*
	 *平台标识 
	 */
    private Boolean syncState;
    /*
	 * 平台id
	 */
    private int platformId;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getVehicleTypeId() {
        return vehicleTypeId;
    }

    public void setVehicleTypeId(int vehicleTypeId) {
        this.vehicleTypeId = vehicleTypeId;
    }

    public int getOrgId() {
        return orgId;
    }

    public void setOrgId(int orgId) {
        this.orgId = orgId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getIntercomGroup() {
        return intercomGroup;
    }

    public void setIntercomGroup(String intercomGroup) {
        this.intercomGroup = intercomGroup;
    }

    public int getGpsId() {
        return gpsId;
    }

    public void setGpsId(int gpsId) {
        this.gpsId = gpsId;
    }

    public String getGpsName() {
        return gpsName;
    }

    public void setGpsName(String gpsName) {
        this.gpsName = gpsName;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getSiteQty() {
        return siteQty;
    }

    public void setSiteQty(String siteQty) {
        this.siteQty = siteQty;
    }

    public Boolean getSyncState() {
        return syncState;
    }

    public void setSyncState(Boolean syncState) {
        this.syncState = syncState;
    }

    public int getPlatformId() {
        return platformId;
    }

    public void setPlatformId(int platformId) {
        this.platformId = platformId;
    }

	public String getIntercomPerson() {
		return intercomPerson;
	}

	public void setIntercomPerson(String intercomPerson) {
		this.intercomPerson = intercomPerson;
	}
}