package com.icss.util;

import java.awt.Color;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashMap;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class OutExcel {
	/*private String path = "";
	
	private boolean autoColumnWidth = false;
	public OutExcel() {
		// TODO Auto-generated constructor stub
	}
	public OutExcel(String path) {
		this.path=path;
		// TODO Auto-generated constructor stub
	}*/
	
	public static <T> XSSFWorkbook generateXlsxWorkbook(String title, LinkedHashMap<String, String> propertyHeaderMap, Collection<T> dataSet) {
		 // 声明一个工作薄  
        XSSFWorkbook workbook = new XSSFWorkbook();  
        // 生成一个表格  
        XSSFSheet sheet = workbook.createSheet(title);  
        // 设置表格默认列宽度为15个字节  
        sheet.setDefaultColumnWidth((int)20);  
          
        XSSFCellStyle headerStyle = getHeaderStyle(workbook);  
        XSSFCellStyle contentStyle = getContentStyle(workbook);  

       
        // 生成表格标题行  
        XSSFRow row = sheet.createRow(0);  
        int i=0;
        for(String key : propertyHeaderMap.keySet()){
        	XSSFCell cell = row.createCell(i);  
        	cell.setCellStyle(headerStyle);
        	 XSSFRichTextString text = new XSSFRichTextString(propertyHeaderMap.get(key));  
             cell.setCellValue(text);  
             i++;          	
        }
      //循环dataSet，每一条对应一行  
        int index = 0;  
        for(T data: dataSet){
        	index ++;  
            row = sheet.createRow(index);  
            int j = 0;  
            for(String property : propertyHeaderMap.keySet()){  
                XSSFCell cell = row.createCell(j);  
                cell.setCellStyle(contentStyle);  
                String getMethodName = "get" + property.substring(0, 1).toUpperCase() + property.substring(1);  
                
                
                try {
                	Class<? extends Object> tCls = data.getClass();  
                    Method getMethod = tCls.getMethod(getMethodName, new Class[] {});  
                    Object value = getMethod.invoke(data, new Object[] {}); //调用getter从data中获取数据  
                      
                    // 判断值的类型后进行类型转换  
                    String textValue = null;  
                    if (value instanceof Date) {  
                        Date date = (Date) value;  
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
                        textValue = sdf.format(date);  
                        
                    } else {  
                        // 其它数据类型都当作字符串简单处理  
                        textValue = value.toString();  
                    }  
                    XSSFRichTextString richString = new XSSFRichTextString(textValue);  
                    cell.setCellValue(richString);  
					
				} catch (Exception e) {
					// TODO: handle exception
				}
                j++;  
            }
        }		
		return workbook;		
	}
	/** 
     * 生成一个标题style 
     * @return style 
     */  
    public static XSSFCellStyle getHeaderStyle(Workbook workbook){  
        return getHeaderStyle(workbook, Color.BLUE, IndexedColors.WHITE.getIndex());  
    }  
    public static XSSFCellStyle getHeaderStyle(Workbook workbook, Color foregroundColor, short fontColor){ 
    	 // 生成一个样式（用于标题）  
        XSSFCellStyle style = (XSSFCellStyle) workbook.createCellStyle();
        // 设置这些样式  
        style.setFillForegroundColor(new XSSFColor(foregroundColor));  
        style.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);  
        style.setBorderBottom(XSSFCellStyle.BORDER_THIN);  
        style.setBorderLeft(XSSFCellStyle.BORDER_THIN);  
        style.setBorderRight(XSSFCellStyle.BORDER_THIN);  
        style.setBorderTop(XSSFCellStyle.BORDER_THIN);  
        style.setAlignment(XSSFCellStyle.ALIGN_CENTER);  
        // 生成一个字体  
        XSSFFont font = (XSSFFont) workbook.createFont();  
        font.setColor(fontColor);  
        font.setFontHeightInPoints((short) 12);  
        font.setBoldweight(XSSFFont.BOLDWEIGHT_BOLD);  
        // 把字体应用到当前的样式  
        style.setFont(font);      
		return style;  	
    }
    /** 
     * 生成一个用于内容的style 
     * @param workbook 
     * @return 
     */  
    public static XSSFCellStyle getContentStyle(Workbook workbook){  
        // 生成并设置另一个样式（用于内容）  
        XSSFCellStyle style = (XSSFCellStyle) workbook.createCellStyle();  
        //style.setFillForegroundColor(new XSSFColor(Color.YELLOW));  
        //style.setFillPattern(XSSFCellStyle.SOLID_FOREGROUND);  
        style.setBorderBottom(XSSFCellStyle.BORDER_THIN);  
        style.setBorderLeft(XSSFCellStyle.BORDER_THIN);  
        style.setBorderRight(XSSFCellStyle.BORDER_THIN);  
        style.setBorderTop(XSSFCellStyle.BORDER_THIN);  
        style.setAlignment(XSSFCellStyle.ALIGN_CENTER);  
        style.setVerticalAlignment(XSSFCellStyle.VERTICAL_CENTER);  
        // 生成另一个字体  
        XSSFFont font = (XSSFFont) workbook.createFont();  
        font.setBoldweight(XSSFFont.BOLDWEIGHT_NORMAL);  
        // 把字体应用到当前的样式  
        style.setFont(font);                   
        return style;  
    }  
    
    
    
}

