$(document).ready(function() {
		//为下拉框绑定点击事件，点击下拉框选项就向后台获得数据
		$("#selectdate>option").on('click', function() {
			var d = $("#selectdate").val();
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
			getData(starttime,endtime);
		});
		
		
		
		//获得当前当前系统时间的
		var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
		var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
		var starttime = myDate.getFullYear()+month+"-0"+1;
		var endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
		getData(starttime,endtime);
		
		
		 
	}); 
	
	//根据开始时间和结束时间获得柱状图数据
	function getData(starttime,endtime) {
		var salename = [];
		var sign = [];
		var payment = [];
		var speoplenum = [];
		var backfee = [];
		$.ajax({
			type : 'POST',
			url : '../signed/saleranking.do',
			dataType : 'json',
			data : {
				"starttime" : starttime,
				"endtime" : endtime
			},
			success : function(data) {
				var qd = 0;
				var sk = 0;
				var qdr = 0;
				var skr = 0;
				if (data) {
					$.each(data, function(i, p) {
						salename[i] = p['sale'];
						sign[i] = p['studyfee'];
						qd += p['studyfee'];
						payment[i] = p['depositfee'];
						sk += p['depositfee'];
						speoplenum[i] = p['speoplenum'];
						backfee[i] = p['backfee'];
						qdr+=p['speoplenum'];
						skr+=p['backfee'];
					});
				}
				subtext = "签单小计: ￥"+qd.toLocaleString()+"，"+qdr+"人  ；   收款小计: ￥"+sk.toLocaleString()+"，"+skr+"人";
				setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee);
			}
		});
	}
	
	//画柱状图
	function setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee){
		var myChart = echarts.init(document.getElementById('echartsmain'));
		option = {
		    title : {
		        text: '签单收款排名',
		        subtext: subtext,
		        sublink:'../signed/allsigninfo.do',
		        
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[
		            '签单数据','收款数据','签单人数','收款人数'
		        ]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : salename
		        },
		        {
		            type : 'category',
		            axisLine: {show:false},
		            axisTick: {show:false},
		            axisLabel: {show:false},
		            splitArea: {show:false},
		            splitLine: {show:false},
		            data : salename
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{formatter:'{value} 元'}
		        },
		        {
		            type : 'value',
		            splitNumber: 5,
		            axisLabel : {
		                formatter: function (value) {
		                    // Function formatter
		                    return value + ' 人'
		                }
		            },
		            splitLine : {
		                show: false
		            }
		        }
		    ],
		    series : [
		        {
		            name:'签单数据',
		            type:'bar',
		            itemStyle: {normal: {color:'rgba(217,104,49,1)', label:{show:true,position: 'insideTop',formatter: sign}}},
		            data:sign
		        },
		        {
		            name:'收款数据',
		            type:'bar',
		            xAxisIndex:1,
		            itemStyle: {normal: {color:'rgba(141,11,128,1)', label:{show:true,position: 'inside',formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
		            data:payment
		        },
		        {
		            name:'签单人数',
		            type: 'line',
		            yAxisIndex: 1,
		            itemStyle: {normal: {color:'rgba(2,71,168,1)', label:{show:true,position: 'top',formatter:sign}}},
		            data: speoplenum
		        },
		        {
		            name:'收款人数',
		            type: 'line',
		            yAxisIndex: 1,
		            itemStyle: {normal: {color:'rgba(102,205,73,1)', label:{show:true,position: 'top',formatter:sign}}},
		            data: backfee
		        }
		    ]
		};
		myChart.setOption(option);
		myChart.on('click', function (param){
			//根据点击的部门来查询签单与收款
			clickbar(param.name,starttime,endtime);
	    });  
	    /*  myChart.on('click',eConsole);  
	     window.onresize = myChart.resize;  */
		  
	}
	
	function clickbar(dept,starttime,endtime){
		if(dept.indexOf("部")== -1){
			//查看某个员工某时间段的签单和收款数据（表格呈现）
			$.ajax({
				type:'POST',
				url:'../signed/onesalesigns.do',
				dataType : 'json',
				data : {
					"starttime" : starttime,
					"endtime" : endtime,
					"sale" : dept
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
					$("#onesalesignstable").find("tbody").html(htmlcontext);
					$("#onesalesigned h4").html(dept+"的签单和收款详情");
					$("#onesalesigned").modal("show");
				}
			
			});
			
		}else{
			$.ajax({
				type:'POST',
				url:'../signed/deptempsignediaer.do',
				dataType : 'json',
				data : {
					"starttime" : starttime,
					"endtime" : endtime,
					"dept" : dept
				},
				success : function(data) {
					var salename = [];
					var sign = [];
					var payment = [];
					var speoplenum = [];
					var backfee = [];
					var qd = 0;
					var sk = 0;
					var qdr = 0;
					var skr = 0;
					if (data) {
						$.each(data, function(i, p) {
							salename[i] = p['sale'];
							sign[i] = p['studyfee'];
							qd += p['studyfee'];
							payment[i] = p['depositfee'];
							speoplenum[i] = p['speoplenum'];
							backfee[i] = p['backfee'];
							sk += p['depositfee'];
							qdr+=p['speoplenum'];
							skr+=p['backfee'];
						});
					}
					subtext = "签单小计: ￥"+qd.toLocaleString()+"，"+qdr+"人  ；   收款小计: ￥"+sk.toLocaleString()+"，"+skr+"人";
					setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee);
				}
			});
		}
	}
		
	function timeselect(){
		var starttime;
		var endtime;
		if($("#startime").val()!='' && $("#endtime").val()!=""){
			if($("#startime").val()<$("#endtime").val()){
				starttime = $("#startime").val();
				endtime = $("#endtime").val();
			}else {
				starttime = $("#endtime").val();
				endtime = $("#startime").val();
			}
		}
		getData(starttime,endtime);
	}