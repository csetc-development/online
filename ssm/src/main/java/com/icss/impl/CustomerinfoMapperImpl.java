package com.icss.impl;

import com.icss.bean.Customerinfo;
import com.icss.dao.CustomerinfoMapper;
import com.icss.util.BasicSqlSupport;

public class CustomerinfoMapperImpl extends BasicSqlSupport implements CustomerinfoMapper{

	@Override
	public int deleteByPrimaryKey(String tel) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Customerinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Customerinfo record) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.CustomerinfoMapper.insertSelective", record);
	}

	@Override
	public Customerinfo selectByPrimaryKey(String tel) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Customerinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Customerinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
