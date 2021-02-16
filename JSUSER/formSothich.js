 var resallsothich;
 var recordSothich = 2;
 var sothich_current = 0; //Trang Đầu tiên

$(".btn_themsothich").click(function(){
	
	//Lấy giá trị từ form
	var mast=$(".txtmasothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tenst=$(".txttensothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var theloaist=$(".select-theloai").val(); //Lấy giá trị từ người dùng nhập trên form
    var thoigianbdst=$(".txttgbdsothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var lydost=$(".txtlydosothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tansuatst=$(".txttssothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tinhcachst=$(".select-tinhcach").val(); //Lấy giá trị từ người dùng nhập trên form
	var username=localStorage.getItem("username");
    var motast=$(".txtmotasothich").val(); 
	
	if(mast == "" || mast.length != 3) //kiểm tra form dữ liệu không bị sai
	{
		alert_info("Mã phải là 3 kí tự");
	}else if(tenst == "")
	{
		alert_info("Tên không để trống");
		
	}else if(thoigianbdst == "")
	{
		alert_info("Thời gian bắt đầu không để trống");
		
	}else if(lydost == "")
	{
		alert_info("Lý do không để trống");
		
    }else if(tansuatst == "")
	{
		alert_info("Tần suất không để trống");
		
    }else if(motast == "")
	{
		alert_info("Mô tả không để trống");
		
    }
    else{
		// //Biến JSON chứa data
			 var datasend = {
				 event:"insert",
				 mast: mast,
				 tenst: tenst,
                 theloaist: theloaist,
                 thoigianbdst: thoigianbdst,
                 lydost: lydost,
                 tansuatst: tansuatst,
                 tinhcachst: tinhcachst,
                 username: username,
                 motast: motast
			 }
	 
			 //Gọi api truyền dữ liệu
			 queryDataPostJSon("apiPHP/sothich.php", datasend, function(res) {
				console.log(res);
				if(res["insert"]==1){
					alert_success("Thêm thành công");
	 
					builddssothich(sothich_current,recordSothich);
					
					$(".txtmasothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txttensothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txttgbdsothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txtlydosothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txttssothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txtmotasothich").val(""); //Lấy giá trị từ người dùng nhập trên form
				}else
				{
					alert_success("Thêm không thành công");
				}
			 });
		 }	
});

// gọi khi chỉ cần load là hiện dữ liệu
builddssothich(0, 5);

function builddssothich(page, record) {
   
	var dataSend;
	var user = localStorage.getItem("username");
	
	if(user == "admin") {
		dataSend = {
			event: "getSothich",
			page: page,
			record: record
		}
	} else {
		dataSend = {
			event: "getSothichwithUser",
			page: page,
			record: record,
			username: user
		}
	}
    
    $(".list-sothich").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/sothich.php",dataSend,function (res) {

            $(".list-sothich").html("");
		   buildHTMLSothichData(res);
		   
	});	
}

//Lấy database
function buildHTMLSothichData(res) {
   if(res.total==0){
	    $(".list-sothich").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resallsothich=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    //stt=printSTT(recordtheloai,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr data-mast="' + list.mast + '" data-name="'+list.tenst+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.mast+'</td>'+
			'<td>' + list.tensothich+'</td>'+
            '<td>' + list.tentl+'</td>'+
            '<td>' + list.thoigianbdst+'</td>'+	
            '<td>' + list.lydost+'</td>'+	
            '<td>' + list.tansuatst+'</td>'+	
			'<td>' + list.tentinhcach+'</td>'+			
            '<td>' + list.tenuser+'</td>'+	
			'<td>' + list.motast+'</td>'+
					
			'<td class="click_sothich"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-sothich").html(html)
    }
    buildSlidePage($(".page-number"),5,res.page,res.totalpage); //chuyển trang
   }
}

//Các nút chuyển trang
$(".page-number").on('click','button', function() {
    sothich_current=$(this).val();
    builddssothich(sothich_current, recordSothich); 
});

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-sothich").on('click',".click_sothich",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	
	$(".txtmasothich").val(resallsothich[vt].mast); //Lấy giá trị từ người dùng nhập trên form
    $(".txttensothich").val(resallsothich[vt].tensothich); 
    $(".select-theloai").val(resallsothich[vt].theloaist);
    $(".txttgbdsothich").val(resallsothich[vt].thoigianbdst); 
    $(".txtlydosothich").val(resallsothich[vt].lydost); 
    $(".txttssothich").val(resallsothich[vt].tansuatst);
    $(".select-tinhcach").val(resallsothich[vt].tinhcachst);
    $(".select-user").val(resallsothich[vt].username);
    $(".txtmotasothich").val(resallsothich[vt].motast); 
});

// Thể loại
// gọi khi chỉ cần load là hiện dữ liệu, 
builddstheloai(0, 100);

function builddstheloai(page, record) {
   
    var dataSend={
		event:"getTheloai",
		page:page,
        record:record
    }
    
    $(".select-theloai").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/theloai.php",dataSend,function (res) {

            $(".select-theloai").html("");
		   buildHTMLTheloaiData(res);
		   
	});
	
}

//Thể loại
function buildHTMLTheloaiData(res) {
	if(res.total==0){
		 $(".select-theloai").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.matl + '">' + list.tentl+ '</option>';
		 $(".select-theloai").html(html); // hiện thị nội dung vào cái class mình chọn
	 }
	}
 }


 // Tính cách
// gọi khi chỉ cần load là hiện dữ liệu, 
builddstinhcach(0, 100);

function builddstinhcach(page, record) {
   
    var dataSend={
		event:"getTinhcach",
		page:page,
        record:record
    }
    
    $(".select-tinhcach").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/tinhcach.php",dataSend,function (res) {

            $(".select-tinhcach").html("");
		   buildHTMLTinhcachData(res);
		   
	});
	
}

//Tinhcach
function buildHTMLTinhcachData(res) {
	if(res.total==0){
		 $(".select-tinhcach").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.matinhcach + '">' + list.tentinhcach+ '</option>';
		 $(".select-tinhcach").html(html); // hiện thị nội dung vào cái class mình chọn
	 }
	}
 }

 // Người dùng
// gọi khi chỉ cần load là hiện dữ liệu, 
builddstuser(0, 8);

function builddstuser(page, record) {
   
    var dataSend={
		event:"getUser",
		page:page,
        record:record
    }
    
    $(".select-user").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/user.php",dataSend,function (res) {

            $(".select-user").html("");
		   buildHTMLUserData(res);
		   
	});
}

//Người dùng
function buildHTMLUserData(res) {
	if(res.total==0){
		 $(".select-user").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.username + '">' + list.tenuser+ '</option>';
		 $(".select-user").html(html); // hiện thị nội dung vào cái class mình chọn
	 }
	}
 }

 //Làm lại
$(".btn_lamlaist").click(function(){
    resetViewFormSothich();
})
	
//Hàm reset lại input botbox bắt sự kiện
function resetViewFormSothich(){
	$(".txtmasothich").val(""); //Lấy giá trị từ người dùng nhập trên form
    $(".txttensothich").val(""); //Lấy giá trị từ người dùng nhập trên form
    $(".select-theloai").val(""); 
    $(".txttgbdsothich").val(""); //Lấy giá trị từ người dùng nhập trên form
    $(".txtlydosothich").val(""); //Lấy giá trị từ người dùng nhập trên form
    $(".txttssothich").val(""); //Lấy giá trị từ người dùng nhập trên form
    $(".select-tinhcach").val("");
    $(".select-user").val("");
    $(".txtmotasothich").val(""); //Lấy giá trị từ người dùng nhập trên form
}

//Sửa sở thích
$(".btn_suasothich").click(function(){
	 
	//Lấy giá trị từ form
	var mast=$(".txtmasothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tenst=$(".txttensothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var theloaist=$(".select-theloai").val(); //Lấy giá trị từ người dùng nhập trên form
    var thoigianbdst=$(".txttgbdsothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var lydost=$(".txtlydosothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tansuatst=$(".txttssothich").val(); //Lấy giá trị từ người dùng nhập trên form
    var tinhcachst=$(".select-tinhcach").val(); //Lấy giá trị từ người dùng nhập trên form
    var username=$(".select-user").val(); //Lấy giá trị từ người dùng nhập trên form
    var motast=$(".txtmotasothich").val(); //Lấy giá trị từ người dùng nhập trên form

	bootbox.confirm("Bạn có chắc sửa mã " + mast + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updatest",
				 mast: mast,
				 tenst: tenst,
                 theloaist: theloaist,
                 thoigianbdst: thoigianbdst,
                 lydost: lydost,
                 tansuatst: tansuatst,
                 tinhcachst: tinhcachst,
                 motast: motast
			}
			//alert_info("Sửa thành công");
			queryDataPostJSon("apiPHP/sothich.php", data, function(res) {
				if(res.updatest == true) {
					alert_success("Sửa thành công.");
					builddssothich(sothich_current, recordSothich);

					$(".txtmasothich").val(""); //Lấy giá trị từ người dùng nhập trên form
                    $(".txttensothich").val(""); 
                    $(".txttgbdsothich").val(""); 
                    $(".txtlydosothich").val(""); 
                    $(".txttssothich").val(""); 
                    $(".txtmotasothich").val(""); 
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Bắt sự kiện nút xóa
$(".btn_xoasothich").click(function(){
	var mast=$(".txtmasothich").val();

	bootbox.confirm("Bạn có chắc xóa mã " + mast + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				mast: mast
			}
			queryDataPostJSon("apiPHP/sothich.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddssothich(sothich_current, recordSothich);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
});

buildUserDropdown();

