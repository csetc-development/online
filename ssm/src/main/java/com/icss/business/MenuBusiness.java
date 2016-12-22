package com.icss.business;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.icss.bean.Menu;
import com.icss.dao.MenuMapper;

public class MenuBusiness {
	private MenuMapper menuDao;

	public MenuMapper getMenuDao() {
		return menuDao;
	}

	public void setMenuDao(MenuMapper menuDao) {
		this.menuDao = menuDao;
	}
	
	public List<Menu> rootdirectory(){
		return menuDao.rootdirectory();
	}
	
	public List<Menu> nextdirectory(HttpServletRequest request){
		int id = Integer.parseInt(request.getParameter("id"));
		return menuDao.nextdirectory(id);
	}
	
}
