
$(document).ready(function(){
});

function nextlayer(id,basePath){
	$.ajax({
		type:"POST",
		url:basePath+"menu/nextlevel.do",
		dataType :'json',
		data:{"id":id},
		async:false, //这是重要的一步，防止重复提交的
		success : function(data) {
			var htmlContext2="";
			var quote;
			var murl;
			for(var obj in data){
				if(data[obj].id==id){
					quote = data[obj].quote;
				}else{
					if(data[obj].havanextlevel){
						htmlcontext2 +="<li><a href='#"+data[obj].quote+"' class='nav-header collapsed' data-toggle='collapse' onclick='nextlayer("+data[obj].id+","+basePath+")'>";
						htmlcontext2 += data[obj].text+"</a></li>";
						htmlcontext2 += "<ul class='nav nav-list secondmenu collapse' style='height: 0px;' id='"+data[obj].quote+"'><li><a></a></li></ul>";
					}else{
						nurl=basePath+data[obj].url;
						htmlContext2 += "<li><a target='con' onclick='return menuurl(\""+nurl+ "\")' href='"+nurl+"'>"+data[obj].text+"</a></li>";
					}
									
				}
			}
			$("#"+quote).html(htmlContext2);
		}
	})
}

function menuurl(nurl){
	$("iframe").attr("src",nurl);
	return false;
}


