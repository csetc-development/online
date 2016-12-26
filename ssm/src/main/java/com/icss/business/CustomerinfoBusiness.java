package com.icss.business;

import java.util.List;


import org.springframework.transaction.annotation.Transactional;
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
	
	@Transactional
	public int insertinto(Customerinfo customer){
		return customerinfoDao.insertSelective(customer);
	}
	
	public List<Customerinfo> allresume(){
		return customerinfoDao.allresume();
	}
}
