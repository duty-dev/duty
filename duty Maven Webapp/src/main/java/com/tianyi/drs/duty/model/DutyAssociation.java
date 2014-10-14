package com.tianyi.drs.duty.model;

public class DutyAssociation {
    private Long id;

    private Long dutyId;

    private Integer item1Type;

    private Long itme1Id;

    private Integer item2Type;

    private Long itme2Id;

    private Boolean syncState;

    private Integer platformId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDutyId() {
        return dutyId;
    }

    public void setDutyId(Long dutyId) {
        this.dutyId = dutyId;
    }

    public Integer getItem1Type() {
        return item1Type;
    }

    public void setItem1Type(Integer item1Type) {
        this.item1Type = item1Type;
    }

    public Long getItme1Id() {
        return itme1Id;
    }

    public void setItme1Id(Long itme1Id) {
        this.itme1Id = itme1Id;
    }

    public Integer getItem2Type() {
        return item2Type;
    }

    public void setItem2Type(Integer item2Type) {
        this.item2Type = item2Type;
    }

    public Long getItme2Id() {
        return itme2Id;
    }

    public void setItme2Id(Long itme2Id) {
        this.itme2Id = itme2Id;
    }

    public Boolean getSyncState() {
        return syncState;
    }

    public void setSyncState(Boolean syncState) {
        this.syncState = syncState;
    }

    public Integer getPlatformId() {
        return platformId;
    }

    public void setPlatformId(Integer platformId) {
        this.platformId = platformId;
    }
}