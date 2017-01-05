package com.icss.conroller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.icss.bean.Bespeak;
import com.icss.bean.Customerinfo;
import com.icss.bean.Followup;
import com.icss.bean.User;
import com.icss.business.CustomerinfoBusiness;
import com.icss.util.JsonDateValueProcessor;
import com.icss.util.ReadExcel;

@Controller
@RequestMapping("customer")
public class CustomerinfoController {
	@Resource(name="customerinfoBusiness")
	private CustomerinfoBusiness customerinfoBusiness;

	public void setCustomerinfoBusiness(CustomerinfoBusiness customerinfoBusiness) {
		this.customerinfoBusiness = customerinfoBusiness;
	}
	
	/**
	 * 进行页面跳转
	 * @return
	 */
	@RequestMapping("skipimport.do")
	public String skipimport(){
		return "sale/customer";
	}
	
	/**
	 * 导入简历信息
	 * @param mFile
	 * @param request
	 * @param session
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@SuppressWarnings("finally")
	@RequestMapping(value="importcustomer.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String importcustomer(@RequestParam(value="mFile") MultipartFile mFile,HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException{
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		//MultipartFile 
    	mFile = multipartRequest.getFile("mFile");
    	String path = request.getSession().getServletContext().getRealPath("/WEB-INF/upload/");//获取文件名 的路径
    	System.out.println(path);
    	String name = mFile.getOriginalFilename();   //获取文件名     
    	System.out.println(name);
    	InputStream inputStream = mFile.getInputStream();
    	 
		byte[] b = new byte[1048576];
		int length = inputStream.read(b);
		path += "\\" + name;
		FileOutputStream outputStream = new FileOutputStream(path);
		outputStream.write(b, 0, length);
		inputStream.close();
		outputStream.close();
        String reslut = null;
    	ReadExcel xlsMain = new ReadExcel();
    	Customerinfo cus=null;
    	try {
			List<Customerinfo> ListResult =xlsMain.ReadCoustomerExcel(path,session);
			if(ListResult!=null){				
				for(int i=0;i<ListResult.size();i++){
					cus=ListResult.get(i);				
					customerinfoBusiness.insertinto(cus);
				}				
			}
			reslut="导入成功";
			
    	} catch (DuplicateKeyException dke) {
    		// TODO Auto-generated catch block
    		reslut="导入失败，电话号码不对"+dke.getCause();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			reslut="导入失败！电话号码格式不对！"+e.getCause();
			e.printStackTrace();
		}finally{
			return reslut;
		}
		
	}
	
	/**
	 * 跳转到分配客户信息页面
	 * @param request
	 * @return
	 */
	@RequestMapping("distribution.do")
	public String distribution(){
		return "sale/allocation";
	}
	/**
	 * 跳转到咨询客户页面
	 * @param request
	 * @return
	 */
	@RequestMapping("consultation.do")
	public String consultation(){
		return "sale/consultation";
	}
	/**
	 * 所有的客户简历信息
	 * @param request
	 * @return
	 */
	@RequestMapping("allcustomerinfo.do")
	public @ResponseBody String allcustomerinfo(HttpServletRequest request){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class,new JsonDateValueProcessor("yyyy-MM-dd"));
		return JSONArray.fromObject(customerinfoBusiness.allresume(),jsonConfig).toString();
	}
	
	/**
	 * 资源分配
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping(value="allot.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String allot(HttpServletRequest request,HttpSession session){
		return customerinfoBusiness.allot(request, session);
	}
	
	/**
	 * 获得下拉框数据
	 * @param request
	 * @return
	 */
	@RequestMapping("selectdata.do")
	public @ResponseBody String selectdata(HttpServletRequest request){
		return JSONArray.fromObject(customerinfoBusiness.selectdata(request)).toString();
	}
	
	/**
	 * 条件筛选
	 * @return
	 * @throws ParseException 
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(value="Screen.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String Screen(@ModelAttribute("customer") Customerinfo customer,HttpServletRequest request) throws ParseException{
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class,new JsonDateValueProcessor("yyyy-MM-dd"));
		return JSONArray.fromObject(customerinfoBusiness.Screen(customer,request),jsonConfig).toString();
	}
	
	/**
	 * 更新简历信息
	 * @param customer
	 * @return
	 */
	@RequestMapping(value="updatecustomerinfo.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String updatecustomerinfo(@ModelAttribute("customer") Customerinfo customer,HttpServletRequest request){
		return customerinfoBusiness.updatecustomer(customer,request);
	}
	
	/**
	 * 新增客户简历信息
	 * @param customer
	 * @return
	 */
	@RequestMapping(value="insertcustomer.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String insertcustomer(@ModelAttribute("customer") Customerinfo customer,HttpSession session,HttpServletRequest request){
		String loginer = ((User)session.getAttribute("tempuser")).getUsername();
		customer.setRegistrant(loginer);
		customer.setNowcoursepeople(loginer);
		customer.setEntrydate(new Date());
		customer.setSource(request.getParameter("lyqd"));
		customer.setChannel(request.getParameter("qdmx"));
		return customerinfoBusiness.insertinto(customer)+"";
	}
	
	/**
	 * 模态框中下拉框数据
	 * @param request
	 * @return
	 */
	@RequestMapping("modalselectdata.do")
	public @ResponseBody String modalselectdata(HttpServletRequest request){
		return JSONArray.fromObject(customerinfoBusiness.modalselectdata(request)).toString();
	}
	
	/**
	 * 跟进客户历史信息
	 * @param request
	 * @return
	 */
	@RequestMapping("followuphistory.do")
	public @ResponseBody String followuphistory(HttpServletRequest request){
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class,new JsonDateValueProcessor("yyyy-MM-dd HH:mm:ss"));
		return JSONArray.fromObject(customerinfoBusiness.followuphistory(request),jsonConfig).toString();
	}
	/**
	 * 有效性
	 * @param request
	 * @return
	 */
	@RequestMapping("validityid.do")
	public @ResponseBody String validityid(HttpServletRequest request){
		return JSONArray.fromObject(customerinfoBusiness.validity(request)).toString();
	}
	/**
	 * 客户类型
	 * @param request
	 * @return
	 */
	@RequestMapping("customertype.do")
	public @ResponseBody String customertype(HttpServletRequest request){
		return JSONArray.fromObject(customerinfoBusiness.customertype(request)).toString();
	}
	
	/**
	 * 客户跟进信息
	 * @param followup
	 * @param request
	 * @param session
	 * @return
	 * @throws ParseException
	 */
	@RequestMapping("followupsubmit.do")
	public @ResponseBody String followupsubmit(@ModelAttribute("followup") Followup followup,HttpServletRequest request,HttpSession session) throws ParseException{
		return customerinfoBusiness.followupsubmit(followup,request,session)+"";
	}
	
	@RequestMapping("purpose.do")
	public @ResponseBody String purpose(HttpServletRequest request) {
		return JSONArray.fromObject(customerinfoBusiness.selectdata(request)).toString();
	}
	
	@RequestMapping("receptionaddress.do")
	public @ResponseBody String receptionaddress(HttpServletRequest request) {
		return JSONArray.fromObject(customerinfoBusiness.selectdata(request)).toString();
	}
	
	/**
	 * 新增预约客户记录
	 * @param bespeak
	 * @return
	 */
	@RequestMapping("ordersubmits.do")
	public @ResponseBody String ordersubmits(@ModelAttribute("bespeak") Bespeak bespeak ,HttpSession session){
		return customerinfoBusiness.ordersubmits(bespeak,session)+"";
	}
	
	/**
	 * 查看某客户的所有预约记录
	 * @param request
	 * @return
	 */
	/*@RequestMapping("orderrecord.do")
	public @ResponseBody String orderrecord(HttpServletRequest request){
		return JSONArray.fromObject(customerinfoBusiness.orderrecord(request)).toString();
	}*/
	
}
