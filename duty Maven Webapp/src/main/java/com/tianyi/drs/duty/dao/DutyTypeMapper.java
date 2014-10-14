package com.tianyi.drs.duty.dao;

import com.tianyi.drs.duty.model.DutyType;

public interface DutyTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DutyType record);

    int insertSelective(DutyType record);

    DutyType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DutyType record);

    int updateByPrimaryKey(DutyType record);
}