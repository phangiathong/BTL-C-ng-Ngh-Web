var resallUser;
var recordUser = 2;
var user_current = 0; //Trang Đầu tiên

//class là dấu chấm, ID là dấu #
$(".btn_themuser").click(function(){
	
	//Lấy giá trị từ form
	//var mauser=$(".txtmauser").val(); //Hàm val mà không có truyền tham số đầu vào thì lấy giá trị từ field
	var tenuser=$(".txttenuser").val(); //Lấy giá trị từ người dùng nhập trên form
	var namsinhuser=$(".txtnamsinhuser").val(); //Lấy giá trị từ người dùng nhập trên form
	var sdtuser=$(".txtsdtuser").val(); //Lấy giá trị từ người dùng nhập trên form
	var nghenghiepuser=$(".select-nghenghiep").val(); //Lấy giá trị từ người dùng nhập trên form
	var hocvanuser=$(".select-hocvan").val(); //Lấy giá trị từ người dùng nhập trên form
    var diachiuser=$(".txtdiachiuser").val(); //Lấy giá trị từ người dùng nhập trên form
	var gioitinhuser=$(".txtgioitinhuser").val(); //Lấy giá trị từ người dùng nhập trên form
	var username=$(".txtusername").val(); //Lấy giá trị từ người dùng nhập trên form
	var passworduser=$(".txtpassworduser").val(); //Lấy giá trị từ người dùng nhập trên form
	
	 if(tenuser == "")
	{
		alert_info("Tên không để trống");
		
	}else if(namsinhuser == "" || checkDate(namsinhuser))
	{
		alert_info("Năm sinh không hợp lệ"); 												 
	}else if(sdtuser == "" || sdtuser.length != 10 || isNumber(sdtuser) == false ){//Phải 10 số mới hợp lệ
		alert_info("Số điện thoại không hợp lệ");
	}else if(username == "")
	{
		alert_info("Tên đăng nhập không để trống");
		
	}else if(passworduser == "")
	{
		alert_info("Mật khẩu không để trống");
		
	}else{
		//Nếu tất cả đúng sẽ chạy xuống đây
		//Biến JSON chứa data
		var datasend = {
			event:"insert",
			tenuser: tenuser,
			namsinhuser: namsinhuser,
			sdtuser: sdtuser,
			nghenghiep: nghenghiepuser,
			hocvanuser: hocvanuser,
			diachiuser: diachiuser,
			gioitinhuser: gioitinhuser,
			username: username,
			passworduser: passworduser
		}

		//Gọi api truyền dữ liệu
		queryDataPostJSon("apiPHP/user.php", datasend, function(res) {
		   console.log(res);
		   if(res["insert"]==1){
			   alert_success("them thanh cong");

			   builddsuser(user_current, recordUser);
			   
			   //$(".txtmauser").val(""); //hàm vall có tham số đầu vào thì gán giá trị cho cái text field mình muốn
			   $(".txttenuser").val(""); //
			   $(".txtnamsinhuser").val(""); //
			   $(".txtsdtuser").val(""); //
			   $(".txtusername").val(""); //
			   $(".txtpassworduser").val(""); //
		   }else
		   {
			   alert_success("Thêm thành công");
		   }
		});
	}
});

//Sửa user
$(".btn_suauser").click(function(){
	// alert_info("Sửa thành công");
	var username=$(".txtusername").val();
	var tenuser=$(".txttenuser").val();
	var namsinhuser=$(".txtnamsinhuser").val();
	var sdtuser=$(".txtsdtuser").val();
	var nghenghiepuser=$(".select-nghenghiep").val();
	var hocvanuser=$(".select-hocvan").val();
	var diachiuser=$(".txtdiachiuser").val();
	var gioitinhuser=$(".txtgioitinhuser").val();
	var passworduser=$(".txtpassworduser").val();

	bootbox.confirm("Bạn có chắc sửa mã " + username + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updateuser",
				username: username,
				tenuser: tenuser,
				namsinhuser: namsinhuser,
				sdtuser: sdtuser,
				nghenghiep: nghenghiepuser,
				hocvanuser: hocvanuser,
				diachiuser: diachiuser,
				gioitinhuser: gioitinhuser,				
				passworduser: passworduser
			}

			queryDataPostJSon("apiPHP/user.php", data, function(res) {
				if(res.updateuser == 1) {
					alert_success("Sửa thành công.");
					builddsuser(user_current, recordUser);

					 //Lấy giá trị từ người dùng nhập trên form
					$(".txttenuser").val("");
					$(".txtnamsinhuser").val("");
					$(".txtsdtuser").val("");
					$(".txtusername").val("");
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Bắt sự kiện nút xóa
$(".btn_xoauser").click(function(){
	var username=$(".txtusername").val();

	bootbox.confirm("Bạn có chắc xóa mã " + username + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				username: username
			}

			queryDataPostJSon("apiPHP/user.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddsuser(user_current, recordUser);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Làm lại
$(".btn_lamlaiuser").click(function(){
    resetViewFormUser();
})
	
//Hàm reset lại input botbox bắt sự kiện
function resetViewFormUser(){
	$(".txtusername").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txttenuser").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txtnamsinhuser").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txtsdtuser").val("") // Lấy giá trị từ người dùng nhập trên form
 //$(".txtdiachiuser").val("") // Lấy giá trị từ người dùng nhập trên form
}

// gọi khi chỉ cần load là hiện dữ liệu
builddsuser(user_current, recordUser);

function builddsuser(page, record) {
   var user = localStorage.getItem("username"); // Lấy tài khoản trên local về
   var dataSend;

   if(user=="admin"){  //Nếu là admin thì gửi data theo admin
	 dataSend={
		event:"getUser",
		page:page,
        record:record
    }
   }else{ // Nếu không phải thì gửi data qua người dùng
	 dataSend={
		event:"getUserlocal",
		page:page,
		record:record,
		user:user
    }
   }
    $(".list-user").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/user.php",dataSend,function (res) {

            $(".list-user").html("");
		   buildHTMLUserData(res);
		   
	});
	
}

//Lấy database
function buildHTMLUserData(res) { // Hiện thị ra màn hình
   if(res.total==0){
	    $(".list-user").html("Chưa có nội dung");
		
   } else {  
    var data = res.items;
   
    resallUser=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    //stt=printSTT(recordUser,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr  data-username="' + list.username + '" data-name="'+list.tenuser+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.username+'</td>'+	
			'<td>' + list.tenuser+'</td>'+	
			'<td>' + list.namsinhuser+'</td>'+
			'<td>' + list.sdtuser+'</td>'+
			'<td>' + list.nghenghiep+'</td>'+
			'<td>' + list.hocvan+'</td>'+
			'<td>' + list.diachiuser+'</td>'+
			'<td>' + list.gioitinhuser+'</td>'+		
			'<td class="click_sua_user"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-user").html(html)
    }
    buildSlidePage($(".page-number"), 5, res.page, res.totalpage); //chuyển trang
   }
}

//Các nút chuyển trang
$(".page-number").on('click','button', function() {
    user_current=$(this).val();
    builddsuser(user_current, recordUser); 
});

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-user").on('click',".click_sua_user",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	console.log(vt);
	
	$(".txtusername").val(resallUser[vt].username);
	$(".txttenuser").val(resallUser[vt].tenuser);
	$(".txtnamsinhuser").val(resallUser[vt].namsinhuser);
	$(".txtsdtuser").val(resallUser[vt].sdtuser);
	$(".select-nghenghiep").val(resallUser[vt].nghenghiepuser);
	$(".select-hocvan").val(resallUser[vt].mahv);
	$(".txtdiachiuser").val(resallUser[vt].diachiuser);
	$(".txtgioitinhuser").val(resallUser[vt].gioitinhuser);	
	$(".txtpassworduser").val(resallUser[vt].password);	
});

// Nghề nghiệp
// gọi khi chỉ cần load là hiện dữ liệu, 
builddsnghenghiep(0, 100);

function builddsnghenghiep(page, record) {
   
    var dataSend={
		event:"getNghenghiep",
		page:page,
        record:record
    }
    
    $(".select-nghenghiep").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/nghenghiep.php",dataSend,function (res) {

            $(".select-nghenghiep").html("");
		   buildHTMLNghenghiepData(res);
		   
	});
	
}

//Nghề nghiệp
function buildHTMLNghenghiepData(res) {
	if(res.total==0){
		 $(".select-nghenghiep").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.mann + '">' + list.tennn+ '</option>';
		 $(".select-nghenghiep").html(html); // hiện thị nội dung vào cái class mình chọn
	 }
	}
 }

 //Built học vấn
 // gọi khi chỉ cần load là hiện dữ liệu, học vấn
builddshocvan(0, 100);

function builddshocvan(page, record) {
   
    var dataSend={
		event:"getHocvan",
		page:page,
        record:record
    }
    
    $(".select-hocvan").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/hocvan.php",dataSend,function (res) {

            $(".select-hocvan").html("");
		   buildHTMLHocvanData(res);
		   
	});
	
}

//Lấy database
function buildHTMLHocvanData(res) {
	if(res.total==0){
		 $(".select-hocvan").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.mahv + '">' + list.tenhv+ '</option>';
		 $(".select-hocvan").html(html)
	 }
	}
 }



buildUserDropdown();