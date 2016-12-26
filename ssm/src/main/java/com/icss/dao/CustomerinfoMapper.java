package com.icss.dao;

import java.util.List;

import com.icss.bean.Customerinfo;

public interface CustomerinfoMapper {
    int deleteByPrimaryKey(String tel);

    int insert(Customerinfo record);

    int insertSelective(Customerinfo record);

    Customerinfo selectByPrimaryKey(String tel);

    int updateByPrimaryKeySelective(Customerinfo record);

    int updateByPrimaryKey(Customerinfo record);
    
    List<Customerinfo> allresume();
}