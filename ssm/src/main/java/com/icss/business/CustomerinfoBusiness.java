package com.icss.business;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.transaction.annotation.Transactional;

import com.icss.bean.Bespeak;
import com.icss.bean.Customerinfo;
import com.icss.bean.Customertype;
import com.icss.bean.Followup;
import com.icss.bean.User;
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
	/**
	 * 查询所有客户数据
	 * @return
	 */
	public List<Customerinfo> allresume(){
		return customerinfoDao.allresume();
	}
	
	/**
	 * 进行资源分配
	 * @param request
	 * @param session
	 * @return
	 */
	public String allot(HttpServletRequest request,HttpSession session){
		String str = request.getParameter("cids").substring(0, request.getParameter("cids").length()-1);
		String [] strArrays = str.trim().split(",");
		System.out.println(strArrays.toString());
		if(strArrays.length>0){
			String distribution = ((User)session.getAttribute("tempuser")).getUsername();
			String nowcoursepeople = request.getParameter("nowcoursepeople");
			for(int i=0;i<strArrays.length;i++){
				Customerinfo customer = new Customerinfo();
				customer.setCid(Integer.parseInt(strArrays[i]));
				customer.setDistribution(distribution);
				customer.setNowcoursepeople(nowcoursepeople);
				customer.setSignletimr(new Date());
				if(customerinfoDao.distributionInfo(customer)!=1){
					return "分配失败！";
				}
			}
			return "分配完成！";
		}
		return "提供的数据有误，没有进行分配";
	}
	
	/**
	 * 获得下拉框数据
	 * @param request
	 * @return
	 */
	public List<Customertype> selectdata(HttpServletRequest request){
		String selectid = request.getParameter("selectid");
		List<Customertype> list = new ArrayList<Customertype>();
		switch (selectid) {
			case "sourceselect": list= customerinfoDao.sourceselect();break;
			case "channelselect": list= customerinfoDao.channelselect();break;
			case "validityselect": list= customerinfoDao.validityselect();break;
			case "customertypeselect": list= customerinfoDao.customertypeselect();break;
			case "nowcoursepeopleselect": list= customerinfoDao.nowcoursepeopleselect();break;
			case "customerlabelselect": list= customerinfoDao.customerlabelselect();break;
			case "intentionjobselect": list= customerinfoDao.intentionjobselect();break;
			case "purpose": list= customerinfoDao.purpose();break;
			case "receptionaddress": list= customerinfoDao.receptionaddress();break;
			default:break;
		}
		return list;
	}
	
	/**
	 * 多条件查询
	 * @param customer
	 * @return
	 * @throws ParseException 
	 */
	public List<Customerinfo> Screen(Customerinfo customer,HttpServletRequest request) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		if(request.getParameter("startime").length()>0 && request.getParameter("endtime").length()>0){
			customer.setEntrydate(sdf.parse(request.getParameter("startime")));
			customer.setSignletimr(sdf.parse(request.getParameter("endtime")));
		}
		return customerinfoDao.Screen(customer);
	}
	
	/**
	 * 修改客户信息
	 * @param customerinfo
	 * @return
	 */
	public String updatecustomer(Customerinfo customerinfo,HttpServletRequest request){
		customerinfo.setSource(request.getParameter("lyqd"));;
		customerinfo.setChannel(request.getParameter("qdmx"));
		if(customerinfoDao.updateByPrimaryKeySelective(customerinfo)==0){
			return "修改"+customerinfo.getName()+"失败！";
		}
		return customerinfo.getName()+"的信息修改成功！";
	}
	
	/**
	 * 模态框中下拉框数据
	 * @param request
	 * @return
	 */
	public List<Customertype> modalselectdata(HttpServletRequest request){
		String selectname = request.getParameter("selectname");
		int scdid = Integer.parseInt(request.getParameter("scdid"));
		List<Customertype> list = new ArrayList<Customertype>();
		switch(selectname){
		case "ctypeid" : list= customerinfoDao.customertypeselect(); break;
		case "source" : list=customerinfoDao.sourceandchannel(scdid);break;
		case "channel" : list=customerinfoDao.sourceandchannel(scdid);break;
		case "market" : list= customerinfoDao.nowcoursepeopleselect();break;
		case "intentionjob" :list=customerinfoDao.allcoure();break;
		}
		return list;
	}
	
	
	/**
	 * 某客户的跟进历史记录
	 * @param request
	 * @return
	 */
	public List<Followup> followuphistory(HttpServletRequest request){
		int cid = Integer.parseInt(request.getParameter("cid"));
		return customerinfoDao.followuphistory(cid);
	}
	
	/**
	 * 跟进时客户类型
	 * @param request
	 * @return
	 */
	public List<Customertype> customertype(HttpServletRequest request){
		return customerinfoDao.customertype(Integer.parseInt(request.getParameter("cid")));
	}
	
	/**
	 * 跟进时客户有效性
	 * @param request
	 * @return
	 */
	public List<Customertype> validity(HttpServletRequest request){
		return customerinfoDao.validity(Integer.parseInt(request.getParameter("cid")));
	}
	
	/**
	 * 新增客户跟进信息
	 * @param followup
	 * @return
	 * @throws ParseException 
	 */
	public int followupsubmit(Followup followup,HttpServletRequest request,HttpSession session) throws ParseException{
		//修改客户咨询（简历）信息
		Customerinfo c = new Customerinfo();
		c.setCid(followup.getCid());
		if(request.getParameter("validityid")!=null){
			c.setValidityid(Integer.parseInt(request.getParameter("validityid")));
		}
		if(request.getParameter("ctypeid")!=null){
			c.setCtypeid(Integer.parseInt(request.getParameter("ctypeid")));
		}
		customerinfoDao.updateByPrimaryKeySelective(c);
		
		//新增跟进记录
		followup.setFpeople(((User)session.getAttribute("tempuser")).getUsername());
		followup.setFtime(new Date());
		SimpleDateFormat sdf =   new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		followup.setFnexttime(sdf.parse( request.getParameter("xcgjsj")));
		return customerinfoDao.followupsubmit(followup);
		
	} 
	
	/**
	 * 新增预约记录
	 * @param bespeak
	 * @return
	 */
	public int ordersubmits(Bespeak bespeak,HttpSession session){
		bespeak.setBappotime(new Date());
		bespeak.setBperson(((User)session.getAttribute("tempuser")).getUsername());
		bespeak.setBvisit(0);
		return customerinfoDao.ordersubmits(bespeak);
	}
	
	/**
	 * 查看某学员全部预约记录
	 * @param request
	 * @return
	 */
	public List<Bespeak> orderrecord(HttpServletRequest request){
		return customerinfoDao.orderrecord(Integer.parseInt(request.getParameter("cid")));
	}
}
