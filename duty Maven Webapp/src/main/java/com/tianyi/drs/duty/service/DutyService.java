package com.tianyi.drs.duty.service;

import java.util.List;
import java.util.Map;

import com.tianyi.drs.duty.model.Duty;
import com.tianyi.drs.duty.model.DutyItem;
import com.tianyi.drs.duty.model.DutyProperty;
import com.tianyi.drs.duty.viewmodel.DutyItemCountVM;
import com.tianyi.drs.duty.viewmodel.DutyVM;

public interface DutyService {

	List<DutyVM> loadVMList(Map<String,Object> map);
	
	DutyVM loadVMByOrgIdAndYmd(Integer orgId,Integer ymd);
	
	DutyVM loadById(Integer id);
	
	List<Duty> loadTemplatesWithOutItem(Integer orgId);
	
	
	void save(DutyVM vm);

	List<DutyItemCountVM> loadTotalPolice(Map<String, Object> map);

	List<DutyItemCountVM> loadTotalPolicedetail(Map<String, Object> map);

	List<DutyProperty> selectdutyProperty();

	void deleteByDutyId(int dId);

	void deleteByYMD(Integer targetYmd);

	int insert(Duty nduty);

	List<DutyItem> loadlistByDutyId(Integer id);

	int insertDutyItem(DutyItem di);
 

	List<Duty> loadVMListByOrgAndYmd(Map<String, Object> maps);

	void deleteByDutyIdlist(Map<String, Object> map);

	void deleteByPrimaryKey(int dId);
}
