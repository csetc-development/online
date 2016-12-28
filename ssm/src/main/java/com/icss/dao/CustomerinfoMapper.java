package com.icss.dao;

import java.util.List;

import com.icss.bean.Customerinfo;
import com.icss.bean.Customertype;

public interface CustomerinfoMapper {
    int deleteByPrimaryKey(String tel);

    int insert(Customerinfo record);

    int insertSelective(Customerinfo record);

    Customerinfo selectByPrimaryKey(String tel);

    int updateByPrimaryKeySelective(Customerinfo record);

    int updateByPrimaryKey(Customerinfo record);
    
    List<Customerinfo> allresume();
    
    int distributionInfo(Customerinfo customerinfo);
    
    List<Customertype> nowcoursepeopleselect();
    List<Customertype> sourceselect();
    List<Customertype> channelselect();
    List<Customertype> intentionjobselect();
    List<Customertype> customertypeselect();
    List<Customertype> validityselect();
    List<Customertype> customerlabelselect();
    
    List<Customerinfo> Screen(Customerinfo customerinfo);
    
    
}