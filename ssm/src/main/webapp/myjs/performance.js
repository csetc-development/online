$(document).ready(function() {
		//为下拉框绑定点击事件，点击下拉框选项就向后台获得数据
		$("#selectdateP>option").on('click', function() {
			var d = $("#selectdateP").val();
			var starttime;
			var endtime;
			switch(d){
				case "thismonth": {
					var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
					var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
					starttime = myDate.getFullYear()+month+"-0"+1;
					endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
				}break;
				case "lastmonth": {
					var myDate = new Date(new Date().getFullYear(),new Date().getMonth(),0);
					var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
					starttime = myDate.getFullYear()+month+"-0"+1;
					endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
				}break;
				case "today": {
					var now = new Date();
					starttime = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
					endtime = starttime;
				}break;
				case "thisweek": {
					var now = new Date();
					var month = now.getMonth()>=9?"-"+(now.getMonth()+1):"-0"+(now.getMonth()+1);
					var date = now.getDate()-now.getDay();
					if(date<10){
						starttime = now.getFullYear()+month+"-0"+date;
					}else{
						starttime = now.getFullYear()+month+"-"+date;
					}
					
					endtime = now.getFullYear()+month+"-"+(date+6);
				}break;
				case "thisseason": {
					var now = new Date();
					var m = parseInt(now.getMonth()/3)*3;
					starttime = now.getFullYear()+"-"+(m+1)+"-01";
					endtime = now.getFullYear()+"-"+(m+3)+"-31";
				}break;
				case "thisyear":{
					var now = new Date();
					starttime = now.getFullYear()+"-01-01";
					endtime = now.getFullYear()+"-12-31";
				} break;
			}
			$("input[name='stime']").val(starttime);
			$("input[name='sremark']").val(endtime);
		});
		
		$("#comeinperformance").createPage({
		    pageCount:$("#saleperformance").val(),
		    current:1,
		    backFn:function(p){
		    	ajaxinper(p);
		    }
		});
		$("#outperformance").createPage({
			pageCount:$("#refundperformance").val(),
			current:1,
			backFn:function(p){
				ajaxoutper(p)
			}
		});
		
		
		$("#inperformancetable a").click(function(){
			saledetails("signed/onesalesignsP.do",$(this).html(),"ponesalesigned","ponesalesignstable");
		});
		
		$("#outperformancetable a").click(function(){
			saledetails("signed/refundsalesign.do",$(this).html(),"ponesalerefund","ponesalerefundtable");
		});
		
}); 
	
function saledetails(url,sale,modalname,tablename){
	$.ajax({
		type:'POST',
		url:url,
		dataType : 'json',
		data : {
			"starttime" : $("input[name='sale']").val(),
			"endtime" : $("input[name='stime']").val(),
			"sale" : sale
		},
		success : function(data) {
			var htmlcontext="";
			var count=0;
			for(var obj in data){
				count++;
				var total= data[obj].depositfee+data[obj].backfee+data[obj].spacefee+data[obj].studyfee;
				htmlcontext += "<tr><td>"+count+"</td>";
				htmlcontext += "<td>"+data[obj].scustomername+"</td>";
				htmlcontext += "<td>"+data[obj].stime+"</td>";
				htmlcontext += "<td>"+data[obj].studyfee+"</td>";
				htmlcontext += "<td>"+data[obj].spacefee+"</td>";
				htmlcontext += "<td>"+data[obj].backfee+"</td>";
				htmlcontext += "<td>"+data[obj].depositfee+"</td>";
				htmlcontext += "<td>￥"+total.toLocaleString()+"</td>";
				htmlcontext += "<td>"+data[obj].sremark+"</td>";
				htmlcontext += "<td>￥"+parseInt(data[obj].bank).toLocaleString()+"</td></td>";
			}
			$("#"+tablename).find("tbody").html(htmlcontext);
			$("#"+modalname+" h4").html(sale+"的签单/退款详情");
			$("#"+modalname).modal("show");
		}
	
	});
}

function selectbyall(){
	$.ajax({
		type:'POST',
		url:'signed/inperformancebysome.do',
		dataType:'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { 
			"pagenum" : 1 ,
			"sale" : $("input[name='sale']").val(),
			"stime": $("input[name='stime']").val(),
			"sremark": $("input[name='sremark']").val()
		},
		success : function(data) {
			var htmlcontext ='';
			var pagecount;
			for(var tmp in data){
				pagecount = data[tmp].pages;
				if(pagecount==0){
					htmlcontext +="<tr><td colspan='4'>没有相关数据</td></tr>";
					return false;
				}else{
					var list = data[tmp].list;
					for(var obj in list){
						htmlcontext += "<tr><td><a>"+list[obj].sale+"</a></td>"
						htmlcontext += "<td>"+list[obj].spacefee+"</td>"
						htmlcontext += "<td>"+list[obj].backfee+"</td>"
						htmlcontext += "<td>"+list[obj].speoplenum+"</td></tr>"
					}
				}
			}
			createpagegroupin(pagecount);
			$("#inperformancetable").find("tbody").html(htmlcontext);
		}
	});
	
	$.ajax({
		type:'POST',
		url:'signed/outperformancebysome.do',
		dataType:'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { 
			"pagenum" : 1 ,
			"sale" : $("input[name='sale']").val(),
			"stime": $("input[name='stime']").val(),
			"sremark": $("input[name='sremark']").val()
		},
		success : function(data) {
			var htmlcontext ='';
			var pagecount;
			for(var tmp in data){
				pagecount = data[tmp].pages;
				if(pagecount==0){
					htmlcontext +="<tr><td colspan='4'>没有相关数据</td></tr>";
					return false;
				}else{
					var list = data[tmp].list;
					for(var obj in list){
						htmlcontext += "<tr><td><a>"+list[obj].sale+"</a></td>";
						htmlcontext += "<td>"+list[obj].studyfee+"</td>";
						htmlcontext += "<td>"+list[obj].depositfee+"</td>";
						htmlcontext += "<td>"+list[obj].speoplenum+"</td></tr>";
					}
				}
			}
			createpagegroupout(pagecount);
			$("#outperformancetable").find("tbody").html(htmlcontext);
		}
	});
}	

function createpagegroupin(pagecounts){
	$("#comeinperformance").html("");
	$("#comeinperformance").createPage({
		pageCount:pagecounts,
		current:1,
		backFn:function(p){
			ajaxinper(p);
		}
	});
}

function ajaxinper(p){
	$.ajax({
		type:'POST',
		url:'signed/inperformancebysome.do',
		dataType:'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { 
			"pagenum" : p ,
			"sale" : $("input[name='sale']").val(),
			"stime": $("input[name='stime']").val(),
			"sremark": $("input[name='sremark']").val()
		},
		success : function(data) {
			var htmlcontext ='';
			var pagecount=0;
			for(var tmp in data){
				pagecount = data[tmp].pages;
				if(pagecount=0){
					htmlcontext +="<tr><td colspan='4'>没有相关数据</td></tr>";
					return false;
				}else{
					var list = data[tmp].list;
					for(var obj in list){
						htmlcontext += "<tr><td><a>"+list[obj].sale+"</a></td>";
						htmlcontext += "<td>"+list[obj].spacefee+"</td>";
						htmlcontext += "<td>"+list[obj].backfee+"</td>";
						htmlcontext += "<td>"+list[obj].speoplenum+"</td></tr>";
					}
				}
			}
			$("#outperformancetable").find("tbody").html(htmlcontext);
		}
	});
}

function ajaxoutper(p){
	$.ajax({
		type:'POST',
		url:'signed/outperformancebysome.do',
		dataType:'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { 
			"pagenum" : p ,
			"sale" : $("input[name='sale']").val(),
			"stime": $("input[name='stime']").val(),
			"sremark": $("input[name='sremark']").val()
		},
		success : function(data) {
			var htmlcontext ='';
			var pagecount=0;
			for(var tmp in data){
				pagecount = data[tmp].pages;
				if(pagecount=0){
					htmlcontext +="<tr><td colspan='4'>没有相关数据</td></tr>";
					return false;
				}else{
					var list = data[tmp].list;
					for(var obj in list){
						htmlcontext += "<tr><td>"+list[obj].sale+"</td>";
						htmlcontext += "<td>"+list[obj].studyfee+"</td>";
						htmlcontext += "<td>"+list[obj].depositfee+"</td>";
						htmlcontext += "<td>"+list[obj].speoplenum+"</td></tr>";
					}
				}
			}
			$("#outperformancetable").find("tbody").html(htmlcontext);
		}
	});
}

function createpagegroupout(pagecounts){
	$("#comeinperformance").html("");
	$("#comeinperformance").createPage({
		pageCount:pagecounts,
		current:1,
		backFn:function(p){
			ajaxoutper(p);
		}
	});
}



	
	
	