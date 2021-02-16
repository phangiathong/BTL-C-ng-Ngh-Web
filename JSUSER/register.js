//Nút đăng ký
$(".btn_dangky").click(function(){
	
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
		alert_info("Username không để trống");
		
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
			   
			   location.href="login.html";

		   }else
		   {
			   alert_success("Đăng ký không thành công.");
		   }
		});
    }
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
    
    //Xoay nhỏ để biểu thị đang load data
    $(".select-nghenghiep").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/nghenghiep.php",dataSend,function (res) {

            $(".select-nghenghiep").html(""); // Dùng để show dữ liệu ra field html
		   buildHTMLNghenghiepData(res);
		   
	});
	
}

//Nghề nghiệp
function buildHTMLNghenghiepData(res) { //Hiện thị ra html
	if(res.total==0){
		 $(".select-nghenghiep").html("Chưa có nội dung");
		 
	} else {  
	 var data = res.items;
	
	 var html='';
	 for (item in data) {
		 var list=data[item];
	   
		 html=html +
			 '<option  value="' + list.mann + '">' + list.tennn+ '</option>';
		 $(".select-nghenghiep").html(html); // hiện thị nội dung vào cái class mình chọn,biến html sau khi thay đổi
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