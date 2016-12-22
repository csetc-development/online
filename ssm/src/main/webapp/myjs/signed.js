$(document).ready(function(){
	//$(".tooltips").tooltip();
	
	$("#addcardid").change(function() {
		$('#addcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#addcardid').val())){
			$('#addcardid').parent().addClass("has-error");
		}
	});
	$("#refundcardid").change(function() {
		$('#refundcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#refundcardid').val())){
			$('#refundcardid').parent().addClass("has-error");
		}
	});
	$("#backcardid").change(function() {
		$('#backcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#backcardid').val())){
			$('#backcardid').parent().addClass("has-error");
		}
	});
	
	$("input[name='scustomername']").bind("input propertychange",function(){
		$("input[name='scustomername']").val();
		$.ajax({
			type:'POST',
			url:'signed/checkcustomername.do',
			dataType:'text',
			asnyc:false,
			data:{"scustomername":$("input[name='scustomername']").val()},
			success:function(data){
				if(data>0){
					if(!confirm("已经有该客户的签单了，还要继续新增该签单吗？")){
						$("input[name='scustomername']").val("");
					}
				}
			}
		})
	})
	notpay();
	
	$("#mysign").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : 'signed/nextsignedinfo.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p },
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				for(var obj in data){
	    					var count  = data[obj].studyfee+data[obj].spacefee+data[obj].backfee+data[obj].depositfee;
	    					if(data[obj].condition=="已完成"){
	    						htmlcontext +="<tr class='success'>";
	    					}else if(data[obj].condition=="未收款"){
	    						htmlcontext +="<tr class='warning'>";
	    					}else if(data[obj].condition=="已收款"){
	    						htmlcontext +="<tr class='info'>";
	    					}else if(data[obj].condition=="已删除"){
	    						htmlcontext +="<tr class='danger'>";
	    					}else{
	    						htmlcontext +="<tr>";
	    					}
	    					htmlcontext +="<td><input type='checkbox' value='"+data[obj].sid+"' name='signed_checkbox'></td>"
	    					htmlcontext +="<td>"+data[obj].sid+"</td>"
	    					htmlcontext +="<td>"+data[obj].stime+"</td>"
	    					htmlcontext +="<td>"+data[obj].sbusinesstype+"</td>"
	    					htmlcontext +="<td>"+data[obj].sale+"</td>"
	    					htmlcontext +="<td>"+data[obj].dept+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].spacefee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].depositfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].stateid).toLocaleString()+"</td>"
	    					htmlcontext +="<td>"+data[obj].sarea+"</td>"
	    					htmlcontext +="<td>"+data[obj].condition+"</td></tr>"
	    				}
	    			}
	    			
	    			$("#customerinfotable").find("tbody").html(htmlcontext);
	    		}
	    		
	    	});
	    }
	});
	$("#ourmanament").createPage({
		pageCount:$("#ourmanagmentpages").val(),
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/nextourmanagment.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p },
				success : function(data) {
					if(data!=null || data.length>0){
						var htmlcontext = "";
						for(var obj in data){
							htmlcontext +="<tr onMouseOver='$(this).tooltip('show')' class='tooltips' data-toggle='tooltip' data-placement='bottom' data-original-title='"+data[obj].dbremark+"'><td>"+data[obj].sid+"</td>"
							htmlcontext +="<td><input type='checkbox' value='"+data[obj].dbid+"' name='agree_checkbox'></td>"
							htmlcontext +="<td>"+data[obj].dbtime+"</td>"
							htmlcontext +="<td>"+data[obj].scustomername+"</td>"
							htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
							htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
							htmlcontext +="<td>￥"+(data[obj].dbamount).toLocaleString()+"</td>"
							htmlcontext +="<td>"+data[obj].dbemp+"</td>"
							if(data[obj].dbtype==1){
								htmlcontext +="<td>返款</td>"
							}else if(data[obj].dbtype==2){
								htmlcontext +="<td><font color='red'>退款</font></td>"
							}
							htmlcontext +="<td>"+data[obj].statu+"</td></tr>"
						}
					}
					$("#ourmanamentinfotable").find("tbody").html(htmlcontext);
				}
			});
		}
	});
	$("#alldrawback").createPage({
		pageCount:$("#alldrawbackpages").val(),
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/nextalldrawback.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p },
				success : function(data) {
					var htmlcontext = "";
					if(data!=null || data.length>0){
						for(var obj in data){
							htmlcontext +="<tr class='tooltips' data-toggle='tooltip' data-placement='bottom' data-original-title='"+data[obj].dbremark+"'><td>"+data[obj].sid+"</td>"
							htmlcontext +="<td>"+data[obj].dbtime+"</td>"
							htmlcontext +="<td>"+data[obj].scustomername+"</td>"
							htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
							htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
							htmlcontext +="<td>￥"+(data[obj].dbamount).toLocaleString()+"</td>"
							htmlcontext +="<td>"+data[obj].dbemp+"</td>"
							if(data[obj].dbtype==1 ){
								htmlcontext +="<td>返款</td>"
							}else if(data[obj].dbtype==2){
								htmlcontext +="<td><font color='red'>退款</font></td>"
							}
							htmlcontext +="<td>"+data[obj].statu+"</td></tr>"
						}
					}
					$("#alldrawbacktable").find("tbody").html(htmlcontext);
				}
			});
		}
	});
	$("#allsign").createPage({
	    pageCount:$("#allsignpages").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
    		type : 'POST',
    		url : 'signed/nextallsigninfo.do',
    		dataType :'json',
    		async:false, //这是重要的一步，防止重复提交的
    		data : { "pagenum" : p },
    		success : function(data) {
    			if(data!=null || data.length>0){
    				var htmlcontext = "";
    				for(var obj in data){
    					var count  = data[obj].studyfee+data[obj].spacefee;
    					if(data[obj].bank=="已完成"){
    						htmlcontext +="<tr class='success'>";
    					}else if(data[obj].bank=="未收款"){
    						htmlcontext +="<tr class='warning'>";
    					}else if(data[obj].bank=="已收款"){
    						htmlcontext +="<tr class='info'>";
    					}else if(data[obj].bank=="已删除"){
    						htmlcontext +="<tr class='danger'>";
    					}else{
    						htmlcontext +="<tr>";
    					}
    					htmlcontext +="<td>"+data[obj].sid+"</td>"
    					htmlcontext +="<td>"+data[obj].stime+"</td>"
    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].spacefee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].depositfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].stateid).toLocaleString()+"</td>"
    					htmlcontext +="<td>"+data[obj].bank+"</td>"
    					htmlcontext +="<td><a>"+data[obj].sale+"</a></td>"
    					htmlcontext +="</tr>"
    				}
    			}
    			$("#allsigninfotable").find("tbody").html(htmlcontext);
    		}
    	});
	    }
    });
	
});


function notpay(){
	$.ajax({
		type : 'POST',
		url : 'signed/notpay.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "pagenum" : "" },
		success : function(data) {
			$("#notpaymoney").html("<a href='signed/nopayinfo.do?pagenum=1'>未收款：￥"+data.toLocaleString()+"</a>");
		}
		
	})
	
}


function addsigned(){
	if($(".has-error").length>0){
		return false;
	}
	$("#sale").val(username());
	$("#stime").val(nowDate());
	
}


function updatacustomerinfo(){
	
}



function ck(){
    var tbodyObj = document.getElementById('tbodyID');
        $("table :checkbox").each(function(key,value){
            if($(value).prop('checked')){
                alert(tbodyObj.rows[key].cells[1].innerHTML); 
                alert(tbodyObj.rows[key].cells[2].innerHTML); 
            }
        })
    }
function delectsigninfo(){
	var cuscheckbox = $("input[name='signed_checkbox']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要删除这"+cuscheckbox.length+"条签单信息吗，只允许删除未收款的签单")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			checkboxarray += $(this).val()+",";
		});
		
		var flag=0;
		var tbodyObj = document.getElementById('customerinfotable');
        $("table :checkbox").each(function(key,value){
            if($(value).prop('checked')){
                if(tbodyObj.rows[key+1].cells[14].innerHTML!="未收款"){
                	alert("所选数据中有不符合要求的数据，不能删除！");
                	flag=1;
                	return false;
                }
            }
        })
		if(flag!=1){
			window.location.href="signed/delectmultiple.do?str="+checkboxarray;
		}
		
	}
}

//同意申请
function agree(){
	var cuscheckbox = $("input[name='agree_checkbox']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要同意这"+cuscheckbox.length+"条申请信息吗")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			checkboxarray += $(this).val()+",";
		});
		window.location.href="signed/updateByStateid.do?str="+checkboxarray;
	}
}

//不同意申请
function oppose(){
	var cuscheckbox = $("input[name='agree_checkbox']:checkbox:checked");
	if(cuscheckbox.length!=1){
		alert("请选择一条申请再操作")
		return false;
	}
	$("#opporeason input[name=dbid]").val(cuscheckbox.val());
	$("#opporeason").modal('show');
}

//根据客户姓名查看申请
function applynotebyname(){
	var sqname = $("#sqname").val();
	if(sqname!=""){
		$.ajax({
			type:"POST",
			url:"signed/applynotebyname.do",
			dataType:"json",
			data:{"pagenum":1,"sqname":sqname},
			async:false, //这是重要的一步，防止重复提交的
			success:function(data){
				var htmlcontext="";
				var pages = 1;
				for(var tmp in data){
					var list = data[tmp].list;
					pages = data[tmp].pages;
					if(pages==0){
						alert("没有查到相关数据");
						return false;
					}
					for(var obj in list){
						alert(list[obj].dbremark);
						htmlcontext +="<tr class='tooltips' data-toggle='tooltip' data-placement='bottom' data-original-title='"+list[obj].dbremark+"'><td>"+list[obj].sid+"</td>"
						htmlcontext +="<td>"+list[obj].dbtime+"</td>"
						htmlcontext +="<td>"+list[obj].scustomername+"</td>"
						htmlcontext +="<td>"+list[obj].scustomercardid+"</td>"
						htmlcontext +="<td>"+list[obj].scustomerbankcardid+"</td>"
						htmlcontext +="<td>￥"+(list[obj].dbamount).toLocaleString()+"</td>"
						htmlcontext +="<td>"+list[obj].dbemp+"</td>"
						if(list[obj].dbtype==1 ){
							htmlcontext +="<td>返款</td>"
						}else if(list[obj].dbtype==2){
							htmlcontext +="<td><font color='red'>退款</font></td>"
						}
						htmlcontext +="<td>"+list[obj].statu+"</td></tr>"
					}
				}
				$("#alldrawbacktable").find("tbody").html(htmlcontext);
				$("#alldrawback").html("");
				pagebutton(pages)
				
			}
		})
	}
}

//查询后的分页按钮
function pagebutton(pages){
		$("#alldrawback").createPage({
		pageCount:pages,
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/applynotebyname.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p ,"sqname":$("#sqname").val()},
				success : function(data) {
					var htmlcontext = "";
					for(var tmp in data){
						var list = data[tmp].list;
						var pages = data[tmp].pages;
						for(var obj in list){
							htmlcontext +="<tr data-toggle='tooltip' data-placement='bottom' data-original-title='"+list[obj].dbremark+"'><td>"+list[obj].sid+"</td>"
							htmlcontext +="<td>"+list[obj].dbtime+"</td>"
							htmlcontext +="<td>"+list[obj].scustomername+"</td>"
							htmlcontext +="<td>"+list[obj].scustomercardid+"</td>"
							htmlcontext +="<td>"+list[obj].scustomerbankcardid+"</td>"
							htmlcontext +="<td>￥"+(list[obj].dbamount).toLocaleString()+"</td>"
							htmlcontext +="<td>"+list[obj].dbemp+"</td>"
							if(list[obj].dbtype==1 ){
								htmlcontext +="<td>返款</td>"
							}else if(list[obj].dbtype==2){
								htmlcontext +="<td><font color='red'>退款</font></td>"
							}
							htmlcontext +="<td>"+list[obj].statu+"</td></tr>"
						}
					}
					$("#alldrawbacktable").find("tbody").html(htmlcontext);
				}
			});
		}
	})
}

function selectcustmer(){
	var customer = $("input[name='customer']").val();
	if(customer!=""){
		$.ajax({
			type:"POST",
			url:"signed/customername.do",
			data:{"customer":customer,"pagenum":1},
			dataType:"json",
			async:false,
			success:function(data){
				var pagecount=0;
				var htmlcontext=""
				for(var tmp in data){
					var list = data[tmp].list;
					pagecount = data[tmp].pages;
					if(pagecount>0){
						for(var obj in list){
							var count  = list[obj].studyfee+list[obj].spacefee+list[obj].backfee+list[obj].depositfee;
	    					if(list[obj].condition=="已完成"){
	    						htmlcontext +="<tr class='success'>";
	    					}else if(list[obj].condition=="未收款"){
	    						htmlcontext +="<tr class='warning'>";
	    					}else if(list[obj].condition=="已收款"){
	    						htmlcontext +="<tr class='info'>";
	    					}else if(list[obj].condition=="已删除"){
	    						htmlcontext +="<tr class='danger'>";
	    					}else{
	    						htmlcontext +="<tr>";
	    					}
	    					htmlcontext +="<td><input type='checkbox' value='"+list[obj].sid+"' name='signed_checkbox'></td>"
	    					htmlcontext +="<td>"+list[obj].sid+"</td>"
	    					htmlcontext +="<td>"+list[obj].stime+"</td>"
	    					htmlcontext +="<td>"+list[obj].sbusinesstype+"</td>"
	    					htmlcontext +="<td>"+list[obj].sale+"</td>"
	    					htmlcontext +="<td>"+list[obj].dept+"</td>"
	    					htmlcontext +="<td>"+list[obj].scustomername+"</td>"
	    					htmlcontext +="<td>￥"+(list[obj].studyfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(list[obj].spacefee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(list[obj].backfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(list[obj].depositfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(list[obj].stateid).toLocaleString()+"</td>"
	    					htmlcontext +="<td>"+list[obj].sarea+"</td>"
	    					htmlcontext +="<td>"+list[obj].condition+"</td></tr>"
						}
					}else{
						htmlcontext="<tr><td><font color='red'>没有找到相关数据！</font></td></tr>"
					}
					
					selectcustmernext(pagecount)
					$("#customerinfotable").find("tbody").html(htmlcontext);
				}
			}
		})
	}
}

function selectcustmernext(pagecount){
	$("#mysign").html("");
	$("#mysign").createPage({
	    pageCount:pagecount,
	    current:1,
	    backFn:function(p){
	    	$.ajax({
				type:"POST",
				url:"signed/customername.do",
				data:{"customer":customer,"pagenum":p},
				dataType:"json",
				async:false,
				success:function(data){
					var pagecount=0;
					var htmlcontext=""
					for(var tmp in data){
						var list = data[tmp].list;
						pagecount = data[tmp].pages;
						if(pagecount>0){
							for(var obj in list){
								var count  = list[obj].studyfee+list[obj].spacefee+list[obj].backfee+list[obj].depositfee;
		    					if(list[obj].condition=="已完成"){
		    						htmlcontext +="<tr class='success'>";
		    					}else if(list[obj].condition=="未收款"){
		    						htmlcontext +="<tr class='warning'>";
		    					}else if(list[obj].condition=="已收款"){
		    						htmlcontext +="<tr class='info'>";
		    					}else if(list[obj].condition=="已删除"){
		    						htmlcontext +="<tr class='danger'>";
		    					}else{
		    						htmlcontext +="<tr>";
		    					}
		    					htmlcontext +="<td><input type='checkbox' value='"+list[obj].sid+"' name='signed_checkbox'></td>"
		    					htmlcontext +="<td>"+list[obj].sid+"</td>"
		    					htmlcontext +="<td>"+list[obj].stime+"</td>"
		    					htmlcontext +="<td>"+list[obj].sbusinesstype+"</td>"
		    					htmlcontext +="<td>"+list[obj].sale+"</td>"
		    					htmlcontext +="<td>"+list[obj].dept+"</td>"
		    					htmlcontext +="<td>"+list[obj].scustomername+"</td>"
		    					htmlcontext +="<td>￥"+(list[obj].studyfee).toLocaleString()+"</td>"
		    					htmlcontext +="<td>￥"+(list[obj].spacefee).toLocaleString()+"</td>"
		    					htmlcontext +="<td>￥"+(list[obj].backfee).toLocaleString()+"</td>"
		    					htmlcontext +="<td>￥"+(list[obj].depositfee).toLocaleString()+"</td>"
		    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
		    					htmlcontext +="<td>￥"+(list[obj].stateid).toLocaleString()+"</td>"
		    					htmlcontext +="<td>"+list[obj].sarea+"</td>"
		    					htmlcontext +="<td>"+list[obj].condition+"</td></tr>"
							}
						}else{
							htmlcontext="<tr><td><font color='red'>没有找到相关数据！</font></td></tr>"
						}
						$("#customerinfotable").find("tbody").html(htmlcontext);
					}
				}
			});
	    	
	    }
	})
}


function tips(){
	alert("确定要修改签单信息吗？申请过退款或者返款的签单不能修改签单的金额哦！");
}
