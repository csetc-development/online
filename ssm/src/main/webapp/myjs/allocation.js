$(document).ready(function(){
	initHideColum();
	initselect();
	
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