package com.icss.impl;

import java.util.List;

import com.icss.bean.Customerinfo;
import com.icss.bean.Customertype;
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
		return this.session.update("com.icss.dao.CustomerinfoMapper.updateByPrimaryKeySelective",record);
	}

	@Override
	public int updateByPrimaryKey(Customerinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Customerinfo> allresume() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.allresume");
	}

	@Override
	public int distributionInfo(Customerinfo customerinfo) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.CustomerinfoMapper.distributionInfo", customerinfo);
	}

	@Override
	public List<Customertype> nowcoursepeopleselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.nowcoursepeopleselect");
	}

	@Override
	public List<Customertype> sourceselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.sourceselect");
	}

	@Override
	public List<Customertype> channelselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.channelselect");
	}

	@Override
	public List<Customertype> intentionjobselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.intentionjobselect");
	}

	@Override
	public List<Customertype> customertypeselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.customertypeselect");
	}

	@Override
	public List<Customertype> validityselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.validityselect");
	}

	@Override
	public List<Customertype> customerlabelselect() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.customerlabelselect");
	}

	@Override
	public List<Customerinfo> Screen(Customerinfo customerinfo) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.Screen",customerinfo);
	}

	@Override
	public List<Customertype> sourceandchannel(int scdid) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.sourceandchannel",scdid);
	}

	@Override
	public List<Customertype> allcoure() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.CustomerinfoMapper.allcoure");
	}

}
