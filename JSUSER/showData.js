builddsshowdata(0, 100);

function builddsshowdata(page, record) {
   
    var dataSend={
		event:"getData",
		page:page,
        record:record
    }
    
    $(".show-data").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/sothich.php",dataSend,function (res) {

            $(".show-data").html("");
		   buildHTMLshowData(res);
		   
	});
	
}

//
function buildHTMLshowData(res) {
	if(res.total==0){
		 $(".show-data").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	var id = 237; //Mã ảnh
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
         '<div class="col-lg-3">'+ // hiện thị ra thông tin
            '<div class="panel">'+
                '<div class="user-heading alt gray-bg">'+
                    '<a href="#">'+
                        '<img alt="" src="https://picsum.photos/id/'+ id +'/200/300">'+ //Hiện ảnh
                    '</a>'+
                 '<h4>'+list.tenuser+'</h4>'+
                 '<p>'+list.namsinh+'</p>'+
             '</div>'+

            ' <ul class="nav nav-pills nav-stacked">'+
                 
                 '<li><a href="javascript:;"> <i class="fa fa-suitcase"></i> Nghề nghiệp: '+ list.nghenghiep +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-pencil"></i> Học vấn:'+ list.hocvan +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-ellipsis-h"></i> Giới tính: '+ list.gioitinh +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-map-marker"></i> Địa chỉ: '+ list.diachi +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-circle-o"></i> Tính cách: '+ list.tentinhcach +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-edit"></i> Sở thích: '+ list.tensothich +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-hand-o-right"></i> Thể loại: '+ list.tentl +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-hand-o-right"></i> Lúc bắt đầu: '+ list.thoigianbdst +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-hand-o-right"></i> Lý do: '+ list.lydo +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-hand-o-right"></i> Tần suất: '+ list.tansuat +'</a></li>'+
                 '<li><a href="javascript:;"> <i class="fa fa-hand-o-right"></i> Mô tả: '+ list.motast +'</a></li>'+
             '</ul>'+
         '</div>'+
      ' </div>';

      id++;
		 $(".show-data").html(html); // hiện thị nội dung vào cái class mình chọn
	 }
	}
 }