$(document).ready(function(){
	initHideColum();
	initselect();
	
	$("select,#startime,#endtime").change(function(){
		$.ajax({
			type:"POST",
			url:"customer/Screen.do",
			dataType:"json",
			data:$("#Screenform").serialize(),
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				 $("#distributiontable").bootstrapTable('load', data);
			}
		});
	})
	/*$("#distributiontable").bootstrapTable({
		onDblClickCell: function (field, value,row,td) {
	        alert(value);
	    }
	});*/
	
	/*$('#distributiontable').on('dbl-click-cell.bs.table', function (e, arg1, arg2) {
	    alert(e);
	    alert(arg1);
	    alert(arg2);
	});*/
	$("#distributiontable click-cell.bs.table").onClickCell(function(row){
		alert(row);
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
	var selectdata = $("select");
	selectdata.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
		var selectid = $(this).attr("id");
		$.ajax({
			type:"POST",
			url:"customer/selectdata.do",
			dataType:"json",
			data:{"selectid":selectid},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				if(data!=null && data.length>0){
					var htmlcontext="<option value=''>"+$("#"+selectid+" option:first").html()+"</option>";
					for(var obj in data){
						var v = data[obj].ctypeid>0?data[obj].ctypeid:data[obj].ctypename;
						htmlcontext +="<option value='"+v+"'>"+data[obj].ctypename+"</option>";
					}
					$("#"+selectid).html(htmlcontext);
				}
			}
		});
	}); 
}

function allot(){
	if(!$("tbody input[type='checkbox']:checked").length>0){
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
	var cuscheckbox = $("tbody input[type='checkbox']:checked");
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