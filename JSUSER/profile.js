builddsprofile(0, 2);

function builddsprofile(page, record) {
   var user = localStorage.getItem("username");
   
    var dataSend={
		event:"getUserlocal",
		page:page,
        record:record,
        user: user
    }
    
    $(".show-profile").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/profile.php",dataSend,function (res) {
        console.log(res);

            $(".show-profile").html("");
		   buildHTMLprofileData(res);
		   
	});
	
}

//Lấy database
function buildHTMLprofileData(res) {
	if(res.total==0){
		 $(".show-profile").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
         '<div class="panel-body profile-information">'+
         '<div class="col-md-3">'+
             '<div class="profile-pic text-center">'+
                 '<img src="images/lock_thumb.jpg" alt=""/>'+
             '</div>'+
         '</div>'+
         '<div class="col-md-6">'+
             '<div class="profile-desk">'+
                 '<h1>'+list.tenuser+'</h1>'+
                 '<span class="text-muted">'+list.tennghenghiep+'</span>'+
                 '<h4>Năm sinh: '+list.namsinhuser+'</h4>'+
                 '<h4>Giới tính: '+list.gioitinhuser+'</h4>'+
                 '<h4>Địa chỉ: '+list.diachiuser+'</h4>'+
             '</div>'+
         '</div>'+
         '<div class="col-md-3">'+
             '<div class="profile-statistics">'+
                 '<ul>'+
                     '<li>'+
                         '<a href="#">'+
                             '<i class="fa fa-facebook"></i>'+
                         '</a>'+
                     '</li>'+
                     '<li class="active">'+
                         '<a href="#">'+
                             '<i class="fa fa-twitter"></i>'+
                         '</a>'+
                     '</li>'+
                     '<li>'+
                        '<a href="#">'+
                             '<i class="fa fa-google-plus"></i>'+
                         '</a>'+
                     '</li>'+
                 '</ul>'+
             '</div>'+
         '</div>'+
      '</div>';
      
		 $(".show-profile").html(html)
	 }
	}
 }