/**
 * @date 2016/10/25
 * @author 李敏
 * 财务操作的内容(收款,返款,退款,查看签单详情)
 */
$(document).ready(function(){
	
	$("input[type=radio]").change(function(){
		$("#shuoming").val($("input[type=radio]:checked").parent().children("label").html());
	})
	
	$("#tuikuan").createPage({
	    pageCount:$("#pagecountT").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : 'signed/nextrefund.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p },
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				for(var obj in data){
	    					htmlcontext +="<tr><td>"+data[obj].sid+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbtime+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbemp+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].dbamount).toLocaleString()+"</td>"
	    					htmlcontext +="<td>"+data[obj].statu+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbremark+"</td>"
	    					htmlcontext +="<td><a onclick='showRefundModel("+data[obj].dbid+")'>退款</a></td>"
	    					htmlcontext +="</tr>"
	    				}
	    			}
	    			$("#refundinfotable").find("tbody").html(htmlcontext);
	    		}
	    	});
	    	
	    }
	});
	$("#fankuan").createPage({
		pageCount:$("#pagecountF").val(),
		current:1,
		backFn:function(p){
			$.ajax({
	    		type : 'POST',
	    		url : 'signed/nextbackmoney.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p },
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				for(var obj in data){
	    					htmlcontext +="<tr><td>"+data[obj].sid+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbtime+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbemp+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].dbamount).toLocaleString()+"</td>"
	    					htmlcontext +="<td>"+data[obj].statu+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
	    					htmlcontext +="<td>"+data[obj].dbremark+"</td>"
	    					htmlcontext +="<td><a onclick='showoutModel("+data[obj].dbid+")'>返款</a></td>"
	    					htmlcontext +="</tr>"
	    				}
	    			}
	    			$("#backinfotable").find("tbody").html(htmlcontext);
	    		}
	    	});
			
			
		}
	});
	$("#printpage").createPage({
		pageCount:$("#pagecountTb").val(),
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/nexttobeprint.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p },
				success : function(data) {
					if(data!=null || data.length>0){
						var htmlcontext = "";
						for(var obj in data){
							htmlcontext +="<tr><td>"+data[obj].sid+"</td>"
							htmlcontext +="<td>"+data[obj].scustomername+"</td>"
							htmlcontext +="<td>"+data[obj].scustomerschool+"</td>"
							htmlcontext +="<td>"+data[obj].stime+"</td>"
							htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>"
							htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>"
							htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
							htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
							htmlcontext +="<td>"+data[obj].bank+"</td>"
							htmlcontext +="<td>"+data[obj].sremark+"</td>"
							htmlcontext +="<td>"+data[obj].sale+"</td>"
							htmlcontext +="<td><a onclick='showprint("+data[obj].sid+")'>打印</a></td>"
							htmlcontext +="</tr>"
						}
					}
					$("#tobeprinttable").find("tbody").html(htmlcontext);
				}
			});
			
			
		}
	});
	
	/*$("#tobeprinttable tr a").click(function() {    
    	var sid = $(this).parent().parent().children(); 
    	showprint(sid);
    });*/
	
})

//弹出返款对话框
function showoutModel(sid){
		$("input[name='time']").val(nowDate());
		$("input[name='handler']").val(username());
		$.ajax({
			type : 'POST',
    		url : 'signed/onebackmoney.do',
    		dataType :'json',
    		async:false, //这是重要的一步，防止重复提交的
    		data : { "dbid" : sid},
    		success : function(data){
    			if(data==null||data==""){
    				alert("请待相关领导同意后再进行退款操作");
    				return false;
    			}else{
    				$("input[name='dbid']").val(sid);
        			for(var obj in data){
        				$("input[name='sid']").val(data[obj].sid);
        				$("#backmoneyform span:eq(2)").text(data[obj].dbemp);
        				$("#backmoneyform span:eq(3)").text(data[obj].scustomername);
        				$("#backmoneyform span:eq(4)").text(data[obj].scustomercardid);
        				$("input[name=amount]").val(data[obj].dbamount);
        				$("#backmoneyform span:eq(5)").text(data[obj].scustomerbankcardid);
        				$("#backmoneyform span:eq(6)").text(data[obj].bank);
        			}
        			$("#backmoneyinfo").modal('show');
    			}
    			
    		}
		})
		
}

//弹出退款对话框
function showRefundModel(sid){
		$("#outtime").val(nowDate());
		$("#outhandler").val(username());
		$.ajax({
			type : 'POST',
    		url : 'signed/onebackmoney.do',
    		dataType :'json',
    		async:false, //这是重要的一步，防止重复提交的
    		data : { "dbid" : sid},
    		success : function(data){
    			if(data==null||data==""){
    				alert("请待相关领导同意后再进行退款操作");
    				return false;
    			}else{
    				$("input[name='dbid']").val(sid);
        			for(var obj in data){
        				$("input[name='sid']").val(data[obj].sid);
        				$("#outmoneyform span:eq(2)").text(data[obj].dbemp);
        				$("#outmoneyform span:eq(3)").text(data[obj].scustomername);
        				$("#outmoneyform span:eq(4)").text(data[obj].scustomercardid);
        				$("#outamount").val(data[obj].dbamount);
        				$("#outmoneyform span:eq(5)").text(data[obj].scustomerbankcardid);
        				$("#outmoneyform span:eq(6)").text(data[obj].bank);
        			}
        			$("#outmoneyinfo").modal('show');
    			}
    			
    		}
		})
		
}

//弹出退费退款单
function showprint(sid){
	$.ajax({
		type:'POST',
		url:'signed/tobeprintone.do',
		dataType:'json',
		asnyc:false,
		data:{
			"dbid":sid,
		},
		success:function(data){
			for(var obj in data){
				$("#ptable td:eq(1)").html(data[obj].scustomername);
				$("#ptable td:eq(3)").html(data[obj].scustomerschool);
				$("#ptable td:eq(5)").html(data[obj].stime);
				$("#ptable td:eq(7)").html(data[obj].sid);
				$("#ptable td:eq(9)").html(data[obj].studyfee);
				$("#ptable td:eq(11)").html(data[obj].backfee);
				$("#ptable td:eq(13)").html(data[obj].sremark);
				$("#ptable td:eq(15)").html(data[obj].scustomercardid);
				$("#ptable td:eq(17)").html(data[obj].scustomerbankcardid);
				$("#ptable td:eq(19)").html(data[obj].bank);
				$("#ptable td:eq(21)").html(data[obj].sale);
			}
			
			
		}
	})
	
	$("#ptable td:eq(23)").html(nowDate());
	$("#ptable td:eq(25)").html(username());
	var divcss = {  'text-align':'center','vertical-align':'middle' ,'border':'1px solid #000','border-collapse':' collapse'};
	var divcss1 = {  'text-align':'center','vertical-align':'middle' ,'border':'1px solid #000','border-collapse':' collapse',height:'50px'};
	$("#ptable td").css(divcss1);
	$("#ptable").css(divcss);
	$("#ptable th").css(divcss);
	$("#tobrfprintinfo").modal("show");
}

//提交退返款信息弹出确认的对话框
function identification(){
	if(!confirm("确定吗")){
		return false;
	}else{
		var amount = $("input[name='amount']").val();
		if(amount>0){
			$("input[name='amount']").val("-"+amount);
		}
		$("input[name='stateid']").val($("input[type=radio]:checked").val());
	}
}

//打印
function printar(){
	 $("#printArea").printArea();
}

//获取当前系统时间的（规定格式）
function nowDate(){
	var d = new Date();
	var month = d.getMonth()>=9?"-"+(d.getMonth()+1):"-0"+(d.getMonth()+1);
	var day = d.getDate()>=10?"-"+d.getDate():"-0"+d.getDate();
	var str = d.getFullYear()+month+day;
	return str;
}

//获取当前登录用户名
function username(){
	var handler =$.trim($('#username', parent.document).text());
	handler = handler.substr(handler.indexOf('[')+1, handler.indexOf(']')- handler.indexOf('[')-1);
	return handler;
}