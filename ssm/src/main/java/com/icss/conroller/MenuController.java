package com.icss.conroller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.icss.business.MenuBusiness;

@Controller
@RequestMapping("menu")
public class MenuController {
	
	@Resource(name="menuBusiness")
	private MenuBusiness menuBusiness=null;

	public void setMenuBusiness(MenuBusiness menuBusiness) {
		this.menuBusiness = menuBusiness;
	}
	
	
	@RequestMapping("get.do")
	public @ResponseBody String getMenu(){
		System.out.println("12312313"); 
		JSONArray jsonArray = JSONArray.fromObject(menuBusiness.rootdirectory());
		return jsonArray.toString();
	}
	
	@RequestMapping("nextlevel.do")
	public @ResponseBody String nextlevel(HttpServletRequest request){
		JSONArray jsonArray = JSONArray.fromObject(menuBusiness.nextdirectory(request));
		return jsonArray.toString();
	}
}
