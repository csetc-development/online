package com.icss.dao;


import java.util.List;

import com.icss.bean.Drawback;
import com.icss.bean.Iaer;
import com.icss.bean.Signed;
import com.icss.util.PageBean;

public interface SignedMapper {
    int deleteByPrimaryKey(Integer sid);

    int insert(Signed record);

    int insertSelective(Signed record);

    Signed selectByPrimaryKey(Integer sid);

    int updateByPrimaryKeySelective(Signed record);

    int updateByPrimaryKey(Signed record);
    
    PageBean<Signed> signedinfoIsMine(String sale,int pagenum);
    
    PageBean<Signed> signedinfoIsMinebycustomername(Signed signed ,int pagenum);
    
    PageBean<Signed> pending(int stateid,int pagenum);
    
    Signed onesignedinfo(int sid);
    
    int addrecord(Iaer iaer);
    
    PageBean<Drawback> drawbackinfo(int pagenum,int dbtype);
    
    Drawback onebackinfo(int dbid);
    
    int updatedrawback(Drawback drawback);
    
    PageBean<Iaer> alliaerinfo(int pagenum);
    
    String getdname(String sale);
    
    int deletemultiple(List<Integer> list);
    
    int updatemultiple(List<Integer> list);
       
    int insertDreaBack(Drawback drebBack);
    
    int checkifdrawback(int sid);
    
    PageBean<Signed> dbinfoIsMine(String dbemp,int pagenum);
    
    PageBean<Signed> allsign(int pagenum);
    
    List<Signed> salecontribute(Signed s);
    List<Signed> collectionNumber(Signed s);
    
    List<Signed> allsalecontribute(Signed s);
    
    PageBean<Signed> selectByAll(int pagenum);
    
    
    int updateByStateid(Signed record);
    
    int checkcustomername(String name);
    
    Signed checkcustomernames(String name);
    
    int zhuguanagree(List<Integer> list);
    int zongjianagree(List<Integer> list);
    int fuzongagree(List<Integer> list);
    int zongjingliagree(List<Integer> list);
    
    String superjob(String eanme);
    
    String myjob(String ename);
    
    PageBean<Drawback> selectbyjob(int pagenum, int stateid);
    
    PageBean<Drawback> selectbyjobzg(int pagenum,String sale);
    
    PageBean<Drawback> selectbyjobzj(int pagenum,String sale);
    
    PageBean<Drawback> alldrawback(int pagenum);
    
    
    PageBean<Signed> lowerlevesigninfo(Signed signed,int pagenum);

    List<Signed> select(Integer sid);
    
    List<Signed> saleAchievement();
    
    List<Iaer> typeranking();
    
    String applicationstatus(int dbid);
    
    Double recedone(String sale);
    
    Double recedone();
    
    Double exerecedone(String sale);
    
    Double deptrecedone(String sale);
    
    PageBean<Iaer> iaerbycondition(Signed signed,int pagenun);
    
    //Double notpay();
    
    //签单与收款 柱形图
    List<Signed> DepyCollections(Signed signed);
    List<Signed> deptConllnum(Signed signed);
    
    List<Signed> AmountCollections(Signed signed);
    
    List<Iaer> alliaeramount(Signed signed);
    
    List<Signed> deptempiaer(Signed signed);
    List<Signed> deptcollnumber(Signed signed);
    
    PageBean<Signed> nopayinfo(int pagenum ,Signed signed);
    
    PageBean<Signed> nopayinfozg(int pagenum ,String sale);
    
    //导出
    List<Signed> view_select();
    
    PageBean<Signed> tobeprint(int pagenum);
    
    Signed tobeprintone(int dbid);
    
    PageBean<Signed> selectcusbyname(int pagenum, String cusname);
    
    PageBean<Iaer> selectiaerbyname(int pagenum ,Signed signed);
    
    int opporeason(Drawback drawback);
    
    int deletebackfee(int dbid);
    
    PageBean<Drawback> applynotebyname(String cuatomername,int pagenum);
    
    PageBean<Signed> salesign(int pagenum,Signed signed);
    
    PageBean<Signed> refundsign(int pagenum,Signed signed);
    
    List<Signed> onesalesigns(Signed signed);
    
    List<Signed> onesalesignsP(Signed signed);
    
    List<Signed> refundsalesign(Signed signed);
    
    List<Signed> selectsomrbyall(String name);
}