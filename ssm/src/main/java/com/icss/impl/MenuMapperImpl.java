package com.icss.impl;

import java.util.List;

import com.icss.bean.Menu;
import com.icss.dao.MenuMapper;
import com.icss.util.BasicSqlSupport;

public class MenuMapperImpl extends BasicSqlSupport implements MenuMapper {

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Menu selectByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Menu record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Menu> rootdirectory() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.MenuMapper.rootdirectory");
	}

	@Override
	public List<Menu> nextdirectory(int id) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.MenuMapper.nextdirectory",id);
	}

}
