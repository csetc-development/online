package com.icss.business;

import com.icss.bean.Customerinfo;
import com.icss.dao.CustomerinfoMapper;

public class CustomerinfoBusiness {
	private CustomerinfoMapper customerinfoDao;

	public CustomerinfoMapper getCustomerinfoDao() {
		return customerinfoDao;
	}

	public void setCustomerinfoDao(CustomerinfoMapper customerinfoDao) {
		this.customerinfoDao = customerinfoDao;
	}
	
	public int insertinto(Customerinfo customer){
		return customerinfoDao.insertSelective(customer);
	}
}
