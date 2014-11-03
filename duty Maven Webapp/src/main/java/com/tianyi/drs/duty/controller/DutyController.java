package com.tianyi.drs.duty.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tianyi.drs.duty.service.DutyService;
import com.tianyi.drs.duty.util.DateJsonValueProcessor;
import com.tianyi.drs.duty.viewmodel.DutyItemVM;
import com.tianyi.drs.duty.viewmodel.DutyTypePropertyVM;
import com.tianyi.drs.duty.viewmodel.DutyVM;
import com.tianyi.drs.duty.viewmodel.ListResult;
import com.tianyi.drs.duty.viewmodel.ObjResult;

@Scope("prototype")
@Controller
@RequestMapping("/duty")
public class DutyController {
	@Resource(name = "dutyService")
	protected DutyService dutyService;
	
	@RequestMapping(value = "load.do")
	public @ResponseBody String load(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			@RequestParam(value = "ymd", required = false) Integer ymd,
			HttpServletRequest request
			){
		
		
		
		return null;
	}
	
	@RequestMapping(value = "loadDutyDesc.do")
	public @ResponseBody String loadDutyDesc(
			@RequestParam(value = "id", required = false) Integer id,
			HttpServletRequest request
			){
		
			return null;
	}

	@RequestMapping(value = "loadDutyByOrgIdAndYMD.do")
	public @ResponseBody String loadDutyByOrgIdAndYMD(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			@RequestParam(value = "ymd", required = false) Integer ymd,
			HttpServletRequest request
			){
		
		/*
		 * JSONUtils.getMorpherRegistry().registerMorpher(
          new DateMorpher(new String[] { "yyyy-MM-dd HH:mm" }));
		 */
		
		DutyVM dvm=dutyService.loadVMByOrgIdAndYmd(orgId, ymd);
	
		ObjResult<DutyVM> rs=new ObjResult<DutyVM>(true,null,dvm==null?0:dvm.getId(),dvm);
		
		String s=rs.toJson();
		
		return s;
	}
	
	@RequestMapping(value = "save.do")
	public @ResponseBody String save(
			@RequestParam(value = "duty", required = false) String dvm,
			HttpServletRequest request
			){
		
		JSONObject jobj=JSONObject.fromObject(dvm);

		Map<String, Class<?>> classMap = new HashMap<String, Class<?>>();

		classMap.put("items", DutyItemVM.class);
		classMap.put("children", DutyItemVM.class);
		DutyVM d=(DutyVM)JSONObject.toBean(jobj, DutyVM.class,classMap);
		
		dutyService.save(d);
		
		ObjResult<DutyVM> rs=new ObjResult<DutyVM>(true,null,d.getId(),null);//暂时不
		
		return rs.toJson();
	}
	
	@RequestMapping(value = "loadTemplateByOrgId.do")
	public @ResponseBody String loadTemplateByOrgId(
			@RequestParam(value = "orgId", required = false) Integer orgId,
			HttpServletRequest request
			){
		
		List<DutyVM> dvms=dutyService.loadTemplatesWithOutItem(orgId);
		
		ListResult<DutyVM> rs=new ListResult<DutyVM>(dvms.size(),dvms,true);
		
		return rs.toJson();
	}
}
