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

function updatecustomerinfo(){
	var cuscheckbox = $("#distributiontable tbody input[type='checkbox']:checked");
	if(cuscheckbox.length!=1){
		alert("请选择一条数据再修改");
	}else{
		//弹出modal
		var customerinfo = $("#distributiontable").bootstrapTable('getRowByUniqueId', cuscheckbox.val());
		$("#updatecustomerModal input[name='cid']").val(customerinfo.cid);
		$("#updatecustomerModal input[name='name']").val(customerinfo.name);
		$("#updatecustomerModal input[type='radio'][name='sex'][value='"+customerinfo.sex+"']").attr("checked","checked");
		$("#updatecustomerModal input[name='tel']").val(customerinfo.tel);
		$("#updatecustomerModal input[name='email']").val(customerinfo.email);
		$("#updatecustomerModal input[name='ctypeid']").val(customerinfo.ctypeid);
		$("#updatecustomerModal input[name='source']").val(customerinfo.source);
		$("#updatecustomerModal input[name='channel']").val(customerinfo.channel);
		$("#updatecustomerModal input[name='market']").val(customerinfo.market);
		$("#updatecustomerModal input[name='intentionjob']").val(customerinfo.intentionjob);
		$("#updatecustomerModal input[name='school']").val(customerinfo.school);
		$("#updatecustomerModal input[name='education']").val(customerinfo.education);
		$("#updatecustomerModal input[name='major']").val(customerinfo.major);
		$("#updatecustomerModal input[name='remark']").val(customerinfo.remark);
		$("#updatecustomerModal").modal("show");
	}
}

function updatecustomersubmit(){
	$.ajax({ 
		type:"POST",
		url:"customer/updatecustomerinfo.do",
		data:$("#updatecustomerform").serialize(),
		dataType:"text",
		success:function(data){
			alert(data);
			$("#updatecustomerModal").modal("hide");
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