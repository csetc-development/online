package com.icss.impl;

import java.util.List;

import com.github.pagehelper.PageHelper;
import com.icss.bean.Drawback;
import com.icss.bean.Iaer;
import com.icss.bean.Signed;
import com.icss.dao.SignedMapper;
import com.icss.util.BasicSqlSupport;
import com.icss.util.PageBean;

public class SignedMapperImpl extends BasicSqlSupport implements SignedMapper{

	static final Integer PAGESIZE = 15;
	
	private List<Signed> checkdata(List<Signed> list1,List<Signed> list2){
		for(int i=0;i<list1.size();i++){
			Signed tmp = list1.get(i);
			 for(int j=0;j<list2.size();j++){
				 Signed tmp2 = list2.get(j);
				 if(tmp.getStateid()==tmp2.getStateid()){
					 tmp.setDepositfee(tmp2.getDepositfee());
					 list1.set(i, tmp);
				 }
			 }
		}
		return list1;
	}
	@Override
	public int deleteByPrimaryKey(Integer sid) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Signed record) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.SignedMapper.insert",record);
	}

	@Override
	public int insertSelective(Signed record) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.SignedMapper.insertSelective", record);
	}

	@Override
	public Signed selectByPrimaryKey(Integer sid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.selectByPrimaryKey", sid);
	}

	@Override
	public int updateByPrimaryKeySelective(Signed record) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.updateByPrimaryKeySelective", record);
	}

	@Override
	public int updateByPrimaryKey(Signed record) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.updateByPrimaryKey",record);
	}

	@Override
	public PageBean<Signed> signedinfoIsMine(String sale,int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.signedinfoIsMine",sale);
		return new PageBean<Signed>(list);
	}

	@Override
	public PageBean<Signed> pending(int stateid,int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.pending",stateid);
		return new PageBean<Signed>(list);
	}

	@Override
	public Signed onesignedinfo(int sid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.onesignedinfo",sid);
	}

	@Override
	public int addrecord(Iaer iaer) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.SignedMapper.addrecord", iaer);
	}

	@Override
	public PageBean<Drawback> drawbackinfo(int pagenum,int dbtype) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.drawbackinfo",dbtype);
		return new PageBean<Drawback>(list);
	}

	@Override
	public Drawback onebackinfo(int dbid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.onebackinfo", dbid);
	}

	@Override
	public int updatedrawback(Drawback drawback) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.updatedrawback", drawback);
	}

	@Override
	public PageBean<Iaer> alliaerinfo(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Iaer> list = this.session.selectList("com.icss.dao.SignedMapper.alliaerinfo");
		return new PageBean<Iaer>(list);
	}

	@Override
	public String getdname(String sale) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.getdname", sale);
	}

	@Override
	public int deletemultiple(List<Integer> list) {
		// TODO Auto-generated method stub
		try{
			this.session.delete("com.icss.dao.SignedMapper.deletemultiple", list);
			return 1;
		}catch(Exception e){
			return 0;
		}
		
	}
	
	@Override
	public int updatemultiple(List<Integer> list) {
		// TODO Auto-generated method stub
		try{
			this.session.delete("com.icss.dao.SignedMapper.updatemultiple", list);
			return 1;
		}catch(Exception e){
			return 0;
		}
		
	}

	@Override
	public int insertDreaBack(Drawback drawback) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.SignedMapper.insertDreaBack", drawback);
	}

	@Override
	public PageBean<Signed> dbinfoIsMine(String dbemp, int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.dbinfoIsMine",dbemp);
		return new PageBean<Signed>(list);
	}

	@Override
	public List<Signed> salecontribute(Signed s) { 
		// TODO Auto-generated method stub
		List<Signed> list1 = this.session.selectList("com.icss.dao.SignedMapper.salecontribute",s);
		List<Signed> list2 = this.session.selectList("com.icss.dao.SignedMapper.collectionmoney",s);
		return checkdata(list1, list2);
	}
	
	@Override
	public List<Signed> allsalecontribute(Signed s) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.allsalecontribute",s);
	}

	
	@Override
	public PageBean<Signed> allsign(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.allsign");
		return new PageBean<Signed>(list);
	}

	@Override
	public PageBean<Signed> selectByAll(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.selectByAll");
		return new PageBean<Signed>(list);
	}

	@Override
	public int updateByStateid(Signed record) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.updateByStateid", record);
	}
	@Override
	public int zhuguanagree(List<Integer> list) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.zhuguanagree",list);
	}

	@Override
	public int zongjianagree(List<Integer> list) {
		// TODO Auto-generated method stub
		
		return this.session.update("com.icss.dao.SignedMapper.zongjianagree",list);
	}

	@Override
	public int fuzongagree(List<Integer> list) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.fuzongagree",list);
	}

	@Override
	public int zongjingliagree(List<Integer> list) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.zongjingliagree",list);
	}

	@Override
	public String superjob(String ename) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.superjob", ename);
	}

	@Override
	public String myjob(String ename) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.myjob", ename);
	}

	@Override
	public PageBean<Drawback> selectbyjob(int pagenum, int stateid) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.selectbyjob",stateid);
		return new PageBean<Drawback>(list);
	}

	@Override
	public PageBean<Signed> lowerlevesigninfo(Signed signed,int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.lowerlevesigninfo", signed);
		return new PageBean<Signed>(list);
	}

	@Override
	public List<Signed> select(Integer sid) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.selectByPrimaryKey", sid);
	}

	@Override
	public List<Signed> saleAchievement() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.saleAchievement");
	}

	@Override
	public List<Iaer> typeranking() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.typeranking");
	}

	@Override
	public String applicationstatus(int dbid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.applicationstatus",dbid);
	}

	@Override
	public Double recedone(String sale) {
		// TODO Auto-generated method stub
		Double a = this.session.selectOne("com.icss.dao.SignedMapper.rece", sale);
		Double b = this.session.selectOne("com.icss.dao.SignedMapper.done", sale);
		return a-b;
	}

	@Override
	public Double recedone() {
		// TODO Auto-generated method stub
		Double a = this.session.selectOne("com.icss.dao.SignedMapper.allrece");
		Double b = this.session.selectOne("com.icss.dao.SignedMapper.alldone");
		return a-b;
	}

	@Override
	public Double exerecedone(String sale) {
		// TODO Auto-generated method stub
		Double a = this.session.selectOne("com.icss.dao.SignedMapper.exerece",sale);
		Double b = this.session.selectOne("com.icss.dao.SignedMapper.exedone",sale);
		return a-b;
	}

	@Override
	public Double deptrecedone(String sale) {
		// TODO Auto-generated method stub
		Double a = this.session.selectOne("com.icss.dao.SignedMapper.deptrece",sale);
		Double b = this.session.selectOne("com.icss.dao.SignedMapper.deptdone",sale);
		return a-b;
	}

	@Override
	public List<Signed> DepyCollections(Signed signed) {
		// TODO Auto-generated method stub
		List<Signed> list1 = this.session.selectList("com.icss.dao.SignedMapper.DepyCollections",signed);
		List<Signed> list2= this.session.selectList("com.icss.dao.SignedMapper.deptConllmoney", signed);
		return checkdata(list1,list2);
	}

	@Override
	public List<Signed> AmountCollections(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.AmountCollections",signed);
	}

	@Override
	public PageBean<Iaer> iaerbycondition(Signed signed,int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Iaer> list = this.session.selectList("com.icss.dao.SignedMapper.iaerbycondition",signed);
		return new PageBean<Iaer>(list);
	}

	@Override
	public List<Iaer> alliaeramount(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.alliaeramount",signed);
	}

	@Override
	public List<Signed> deptempiaer(Signed signed) {
		// TODO Auto-generated method stub
		List<Signed> list1 = this.session.selectList("com.icss.dao.SignedMapper.deptempiaer",signed);
		List<Signed> list2 = this.session.selectList("com.icss.dao.SignedMapper.deptcollmoney", signed);
		return checkdata(list1, list2);
	}

	@Override
	public PageBean<Signed> nopayinfo(int pagenum, Signed signed) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.nopayinfo", signed);
		return new PageBean<Signed>(list);
	}
	@Override
	public PageBean<Signed> nopayinfozg(int pagenum, String sale) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.nopayinfozg", sale);
		return new PageBean<Signed>(list);
	}

	@Override
	public List<Signed> view_select() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.view_select");
	}

	@Override
	public PageBean<Signed> tobeprint(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum,PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.tobeprint");
		return new PageBean<Signed>(list);
	}

	@Override
	public PageBean<Signed> selectcusbyname(int pagenum, String cusname) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.selectcusbyname",cusname);
		return new PageBean<Signed>(list);
	}

	@Override
	public PageBean<Iaer> selectiaerbyname(int pagenum, Signed signed) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Iaer> list = this.session.selectList("com.icss.dao.SignedMapper.selectiaerbyname",signed);
		return new PageBean<Iaer>(list);
	}

	@Override
	public int opporeason(Drawback drawback) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.SignedMapper.opporeason", drawback);
	}

	@Override
	public int deletebackfee(int dbid) {
		// TODO Auto-generated method stub
		return this.session.delete("com.icss.dao.SignedMapper.deletebackfee", dbid);
	}

	@Override
	public PageBean<Drawback> selectbyjobzg(int pagenum,String sale) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.selectbyjobzg",sale);
		return new PageBean<Drawback>(list);
	}
	@Override
	public PageBean<Drawback> selectbyjobzj(int pagenum,String sale) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.selectbyjobzj",sale);
		return new PageBean<Drawback>(list);
	}

	@Override
	public List<Signed> collectionNumber(Signed s) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.collectionNumber",s);
	}

	@Override
	public List<Signed> deptConllnum(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.deptConllnum", signed);
		
	}

	@Override
	public List<Signed> deptcollnumber(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.deptcollnumber", signed);
	}

	@Override
	public PageBean<Drawback> alldrawback(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.alldrawback");
		return new PageBean<Drawback>(list);
	}

	@Override
	public PageBean<Drawback> applynotebyname(String cuatomername, int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Drawback> list = this.session.selectList("com.icss.dao.SignedMapper.applynotebyname", cuatomername);
		return new PageBean<Drawback>(list);
	}

	@Override
	public PageBean<Signed> salesign(int pagenum, Signed signed) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum,PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.salesign", signed);
		return new PageBean<Signed>(list);
	}

	@Override
	public PageBean<Signed> refundsign(int pagenum, Signed signed) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.refundsign",signed);
		return new PageBean<Signed>(list);
	}

	@Override
	public int checkifdrawback(int sid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.checkifdrawback", sid);
	}

	@Override
	public int checkcustomername(String name) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.checkcustomername", name);
	}

	@Override
	public Signed checkcustomernames(String name) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.checkcustomernames", name);
	}

	@Override
	public Signed tobeprintone(int sid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.SignedMapper.tobeprintone", sid);
	}

	@Override
	public List<Signed> onesalesigns(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.onesalesigns", signed);
	}

	@Override
	public List<Signed> onesalesignsP(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.onesalesignsP",signed);
	}

	@Override
	public List<Signed> refundsalesign(Signed signed) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.SignedMapper.refundsalesign", signed);
	}

	@Override
	public PageBean<Signed> signedinfoIsMinebycustomername(Signed signed, int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum, PAGESIZE);
		List<Signed> list = this.session.selectList("com.icss.dao.SignedMapper.signedinfoIsMinebycustomername", signed);
 		return new PageBean<Signed>(list);
	}


	
}
