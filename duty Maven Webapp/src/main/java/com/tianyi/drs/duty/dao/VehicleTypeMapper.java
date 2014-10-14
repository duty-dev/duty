package com.tianyi.drs.duty.dao;

import com.tianyi.drs.duty.dao.core.MyBatisRepository;
import com.tianyi.drs.duty.model.VehicleType;
@MyBatisRepository
public interface VehicleTypeMapper {
    int deleteByPrimaryKey(Long id);

    int insert(VehicleType record);

    int insertSelective(VehicleType record);

    VehicleType selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(VehicleType record);

    int updateByPrimaryKey(VehicleType record);
}