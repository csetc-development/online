package com.icss.dao;

import java.util.List;

import com.icss.bean.Bespeak;
import com.icss.bean.Customerinfo;
import com.icss.bean.Customertype;
import com.icss.bean.Followup;

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
    List<Customertype> purpose();
    List<Customertype> receptionaddress();
    
    List<Customerinfo> Screen(Customerinfo customerinfo);
    
    List<Customertype> sourceandchannel(int scdid);
    List<Customertype> allcoure();
    List<Customertype> validity(int cid);
    List<Customertype> customertype(int cid);
    
    List<Followup> followuphistory(int cid);
    
    int followupsubmit(Followup followup);
    
    int ordersubmits(Bespeak bespeak);
    
    List<Bespeak> orderrecord(int cid);
}