$(document).ready(function(){
	alert(12);
	initHideColum();
	initselect();
	
	$('#datetimepicker').datetimepicker({format: 'yyyy-mm-dd hh:ii'});
	
	$(".formcontrols select,#startime,#endtime").change(function(){
		$.ajax({
			type:"POST",
			url:"customer/Screen.do",
			dataType:"json",
			data:$("#Screenform").serialize(),
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				 $("#distributiontable").bootstrapTable('load', data);
				 $("#consulationtable").bootstrapTable('load', data);
			}
		});
	})
	
	$("select[name='source']").change(function(){
		$.ajax({
			type:"POST",
			url:"customer/modalselectdata.do",
			dataType:"json",
			data:{"selectname":"channel","scdid":$(this).val()},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("select[name='channel'] option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
					}
					$("select[name='channel']").html(htmlcontext);
				}
			}
		});
	})
});


function initHideColum(){
	alert(1);
	$("table").bootstrapTable("hideColumn", "workexperience");
	$("table").bootstrapTable("hideColumn", "birthdate");
	$("table").bootstrapTable("hideColumn", "residence");
	$("table").bootstrapTable("hideColumn", "domicile");
	$("table").bootstrapTable("hideColumn", "politics");
	$("table").bootstrapTable("hideColumn", "nation");
	$("table").bootstrapTable("hideColumn", "marriage");
	$("table").bootstrapTable("hideColumn", "worklife");
	$("table").bootstrapTable("hideColumn", "workplace");
	$("table").bootstrapTable("hideColumn", "salary");
	$("table").bootstrapTable("hideColumn", "remark");
	$("table").bootstrapTable("hideColumn", "distribution");
	$("table").bootstrapTable("hideColumn", "signletimr");
	$("table").bootstrapTable("hideColumn", "collectiontime");
	$("table").bootstrapTable("hideColumn", "follownum");
	$("table").bootstrapTable("hideColumn", "lastfollowtime");
	$("table").bootstrapTable("hideColumn", "lastfollowup");
	$("table").bootstrapTable("hideColumn", "oldcoursepeople");
	alert();
}

function initselect(){
	var selectdata = $("#Screenform select");
	selectdata.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
		var selectid = $(this).attr("class");
		$.ajax({
			type:"POST",
			url:"customer/selectdata.do",
			dataType:"json",
			data:{"selectid":selectid},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("."+selectid+" option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
					}
					$("."+selectid).html(htmlcontext);
				}
			}
		});
	}); 
}

//弹出分配客户消息框
function allot(){
	if($("#distributiontable tbody input[type='checkbox']:checked").length<=0){
		alert("请选择需要分配的客户!");
	}else{
		var htmlcontext=""
		$.ajax({
			type:"POST",
			url:"user/getunderstake.do",
			dataType:"json",
			success:function(data){
				for(var obj in data){
					htmlcontext +="<option value='"+data[obj].username+"'>"+data[obj].username+"</option>";
				}
				$("#disributionSelect").html(htmlcontext);
			}
		});
		$("#distributionModal").modal("show");
	}
}

//分配客户信息
function dismodalsubmit(){
	//获得当前被选中的复选框
	var cuscheckbox = $("#distributiontable tbody input[type='checkbox']:checked");
	var checkboxarray ="";
	cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
		checkboxarray += $(this).val()+",";
	}); 
	var nowcoursepeople= $("#disributionSelect").val();
	if(confirm("要将这"+cuscheckbox.length+"个人分给"+nowcoursepeople+"负责吗？")){
		$.ajax({
			type:"POST",
			url:"customer/allot.do",
			data:{"cids":checkboxarray,"nowcoursepeople":nowcoursepeople},
			dataType:"text",
			success:function(data){
				alert(data);
				$("#distributionModal").modal("hide");
				$('table').bootstrapTable('refresh');
			}
		});
	}
}
//弹出修改信息对话框
function updatecustomerinfo(modalid,tableid){
	var cuscheckbox = $("#"+tableid+" tbody input[type='checkbox']:checked");
	if(cuscheckbox.length!=1){
		alert("请选择一条数据再修改");
	}else{
		//弹出modal
		var customerinfo = $("#"+tableid).bootstrapTable('getRowByUniqueId', cuscheckbox.val());
		$("#"+modalid+" input[name='cid']").val(customerinfo.cid);
		$("#"+modalid+" input[name='name']").val(customerinfo.name);
		$("#"+modalid+" input[type='radio'][name='sex'][value='"+customerinfo.sex+"']").attr("checked","checked");
		$("#"+modalid+" input[name='tel']").val(customerinfo.tel);
		$("#"+modalid+" input[name='email']").val(customerinfo.email);
		$("#"+modalid+" input[name='ctypeid']").val(customerinfo.ctypeid);
		$("#"+modalid+" input[name='source']").val(customerinfo.source);
		$("#"+modalid+" input[name='channel']").val(customerinfo.channel);
		$("#"+modalid+" input[name='market']").val(customerinfo.market);
		$("#"+modalid+" input[name='intentionjob']").val(customerinfo.intentionjob);
		$("#"+modalid+" input[name='school']").val(customerinfo.school);
		$("#"+modalid+" input[name='education']").val(customerinfo.education);
		$("#"+modalid+" input[name='major']").val(customerinfo.major);
		$("#"+modalid+" input[name='remark']").val(customerinfo.remark);
		selectmodaldata(modalid,customerinfo.ctypeid,customerinfo.source,customerinfo.channel,customerinfo.market,customerinfo.intentionjob);
		$("#"+modalid+"").modal("show");
	}
}
//为每个下拉框赋值
function selectmodaldata(modalid,ctypeid,source,channel,market,intentionjob){
	var selectdata = $("#"+modalid+" select");
	selectdata.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
		var selectname = $(this).attr("name");
		var tmp = selectname;
		$.ajax({
			url:"customer/modalselectdata.do",
			dataType:"json",
			data:{"selectname":selectname,"scdid":0},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						if(selectname=="ctypeid"&&ctypeid==v){
							htmlcontext +="<option selected='selected' value='"+v+"'>"+data[obj].ctypename+"</option>";
						}else if(selectname="source"&&source==v ){
							htmlcontext +="<option selected='selected' value='"+v+"'>"+data[obj].ctypename+"</option>";
						}else if(selectname="channel"&&channel==v ){
							htmlcontext +="<option selected='selected' value='"+v+"'>"+data[obj].ctypename+"</option>";
						}else if(selectname="market"&&market==v ){
							htmlcontext +="<option selected='selected' value='"+v+"'>"+data[obj].ctypename+"</option>";
						}else if(selectname="intentionjob"&&intentionjob==v ){
							htmlcontext +="<option selected='selected' value='"+v+"'>"+data[obj].ctypename+"</option>";
						}else{
							htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
						}
					}
					$("#"+modalid+" select[name='"+tmp+"']").html(htmlcontext);
				}
			}
		});
	}); 
}


//修改用户信息
function updatecustomersubmit(formid,modalid){
	$("input[name='lyqd']").val($("#"+modalid+" select[name='source']").find("option:selected").text());
	$("input[name='qdmx']").val($("#"+modalid+" select[name='channel']").find("option:selected").text());
	$.ajax({ 
		type:"POST",
		url:"customer/updatecustomerinfo.do",
		data:$("#"+formid).serialize(),
		dataType:"text",
		success:function(data){
			alert(data);
			$("#"+modalid).modal("hide");
			$('table').bootstrapTable('refresh');
			
		}
	});
	
}

//打开登记客户模态框
function register(){
	var selectdata = $("#insertcustomerform select");
	selectdata.each(function(){
		var selectname = $(this).attr("name");
		$.ajax({
			type:"POST",
			url:"customer/modalselectdata.do",
			dataType:"json",
			data:{"selectname":selectname,"scdid":0},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("select[name='"+selectname+"'] option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
					}
					$("select[name='"+selectname+"']").html(htmlcontext);
				}
			}
		});
	});
	$("#registerModal").modal("show");
}
 
/**
 * 新增客户信息
 */
function registersubmit(){
	$("input[name='lyqd']").val($("#registerModal select[name='source']").find("option:selected").text());
	$("input[name='qdmx']").val($("#registerModal select[name='channel']").find("option:selected").text());
	$.ajax({
		type:"POST",
		url:"customer/insertcustomer.do",
		data:$("#insertcustomerform").serialize(),
		dataType:"text",
		success:function(data){
			if(data==1){
				alert("新增成功！")
			}else{
				alert("新增失败！");
			}
			$("#registerModal").modal("hide");
			$('table').bootstrapTable('refresh');
		}
	});
}

//客户跟进模态框
function followupmodal(){
	var cuscheckbox = $("#consulationtable tbody input[type='checkbox']:checked");
	if(cuscheckbox.length!=1){
		alert("请选择一条数据再操作");
		return false;
	}
	//基本信息
	var customerinfo = $("#consulationtable").bootstrapTable('getRowByUniqueId', cuscheckbox.val());
	$("#basicinformation td:eq(1)").text(customerinfo.cid);
	$("#basicinformation td:eq(3)").text(customerinfo.name);
	$("#basicinformation td:eq(5)").text(customerinfo.tel);
	$("#basicinformation td:eq(7)").text(customerinfo.domicile);
	$("#basicinformation td:eq(9)").text(customerinfo.source+"->>"+customerinfo.channel);
	$("#basicinformation td:eq(11)").text(customerinfo.remark);
	$("#followuocustomerform input[name='cid']").val(customerinfo.cid);
	
	//跟进客户
	$("#followuocustomerform span:eq(0)").text(new Date().toLocaleString( ))
	//有效性validityid
	$.ajax({
		type:"POST",
		url:"customer/validityid.do",
		data:{"cid":customerinfo.cid},
		dataType:"json",
		async:false, //这是重要的一步，防止重复提交的
		success:function(data){
			var htmlcontext=""
			for(var obj in data){
				htmlcontext +="<option value='"+data[obj].ctypeid+"'>"+data[obj].ctypename+"</option>";
			}
			$("#yxx").html(htmlcontext);
		}
	});
	//客户分类customertype
	$.ajax({
		type:"POST",
		url:"customer/customertype.do",
		data:{"cid":customerinfo.cid},
		dataType:"json",
		async:false, //这是重要的一步，防止重复提交的
		success:function(data){
			var htmlcontext="";
			for(var obj in data){
				htmlcontext +="<option value='"+data[obj].ctypeid+"'>"+data[obj].ctypename+"</option>";
			}
			$("#khfl").html(htmlcontext);
		}
	});
	//跟进历史
	$.ajax({
		type:"POST",
		url:"customer/followuphistory.do",
		data:{"cid":customerinfo.cid},
		dataType:"json",
		success:function(data){
			if(data.length>0){
				var htmlcontext="";
				for(var obj in data){
					htmlcontext+="<tr><td>"+data[obj].fid+"</td>";
					htmlcontext+="<td>"+data[obj].fcontent+"</td>";
					htmlcontext+="<td>"+data[obj].fremind+"</td>";
					htmlcontext+="<td>"+data[obj].fpeople+"</td>";
					htmlcontext+="<td>"+data[obj].ftime+"</td>";
					htmlcontext+="<td>"+data[obj].fnexttime+"</td>";
				}
				$("#followhistory").find("tbody").html(htmlcontext);
			}
		}
	})
	
	$("#followupModla").modal("show");
}

//跟进客户
function followupsubmits(){
	$.ajax({
		type:"POST",
		url:"customer/followupsubmit.do",
		data:$("#followuocustomerform").serialize(),
		async:false, //这是重要的一步，防止重复提交的
		success:function(data){
			if(data!=1){
				alert("跟进数据记录失败！");
			}else{
				$("#followupModla").modal("hide");
			}
		}
	});
}
//预约客户
function order(){
	var cid = $("#consulationtable tbody input[type='checkbox']:checked");
	if(cid.length!=1){
		alert("请选择一个需要预约的客户!");
	}else{
		$("#orderform input[name='cid']").val(cid.val());
		//预约目的下拉框数据
		$.ajax({
			type:"POST",
			url:"customer/purpose.do",
			data:{"selectid":"purpose"},
			dataType:"json",
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("#orderform select[name=bintent] option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option>"+data[obj].ctypename+"</option>";
					}
					$("#orderform select[name=bintent]").html(htmlcontext);
				}
			}
		});
		//接待校区下拉框数据
		$.ajax({
			type:"POST",
			url:"customer/receptionaddress.do",
			data:{"selectid":"receptionaddress"},
			dataType:"json",
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("#orderform select[name=baddress] option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option>"+data[obj].ctypename+"</option>";
					}
					$("#orderform select[name=baddress]").html(htmlcontext);
				}
			}
		});
		//接待老师下拉框数据
		$.ajax({
			type:"POST",
			url:"customer/selectdata.do",
			dataType:"json",
			data:{"selectid":"nowcoursepeopleselect"},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("#orderform select[name=bteacher] option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
					}
					$("#orderform select[name=bteacher]").html(htmlcontext);
				}
			}
		});
		//预约记录数据
	/*	$.ajax({
			type:"POST",
			url:"customer/orderrecord.do",
			dataType:"json",
			data:{"cid":cid.val()},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlContext="";
					for(var obj in data){
						var visit = "";
						if(data[obj].bvisit>0){visit = "已到";}else{ visit = "未到"; $("#ordermessage").html("<font color='red'>提醒：该客户已预约未反馈</font>") }
						htmlContext +="<tr><td>"+data[obj].bid+"</td>";
						htmlContext +="<td>"+data[obj].bintent+"</td>";
						htmlContext +="<td>"+data[obj].baddress+"</td>";
						htmlContext +="<td>"+data[obj].bteacher+"</td>";
						htmlContext +="<td>"+data[obj].bcontents+"</td>";
						htmlContext +="<td>"+visit+"</td>";
						htmlContext +="<td>"+data[obj].bappotime+"</td>";
						htmlContext +="<td>"+data[obj].barritime+"</td>";
						htmlContext +="<td>"+data[obj].bactualtime+"</td></tr>";
					}
					$("#ordertable").find("tbody").html(htmlContext);
				}
			}
		});*/
		
		$("#orderModal").modal("show");
	}
	
}

//预约记录提交
function ordersubmits(){
	$.ajax({
		type:"POST",
		url:"customer/ordersubmits.do",
		data:$("#orderform").serialize(),
		dataType:'text',
		async:false,
		success:function(data){
			if(data!=1){
				alert("预约失败");
			}eles{
				$("#orderModal").modal("hide");
			}
		}
	})
}


//申请试听
function audition(){
	
}