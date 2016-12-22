package com.icss.conroller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.icss.bean.Customerinfo;
import com.icss.business.CustomerinfoBusiness;
import com.icss.util.ReadExcel;

@Controller
@RequestMapping("customer")
public class CustomerinfoController {
	@Resource(name="customerinfoBusiness")
	private CustomerinfoBusiness customerinfoBusiness;

	public void setCustomerinfoBusiness(CustomerinfoBusiness customerinfoBusiness) {
		this.customerinfoBusiness = customerinfoBusiness;
	}
	
	@RequestMapping("skipimport.do")
	public String skipimport(){
		return "sale/customer";
	}
	
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
			reslut="导入失败！";
		}finally{
			return reslut;
		}
		
	}
}
