// xuất thông báo khi thao tác thất bại

//Mes -  Một mô tả của người dùng có thể đọc được.
function alert_error(mes) {
	bootbox.alert({
		size: "small",
		title: "Thất bại",
		message: mes,
		callback: function(){ /* your callback code */ } //Callback là một hàm sẽ được thực hiện sau khi một hàm khác đã thực hiện xong
	})
}
  
 
  //Xuất thông báo khi thao tác thánh công
  //Callback là một cách để đảm bảo code nhất định không thực thi cho đến khi code khác thực hiện xong.
function alert_success(mes, callback) {
  	bootbox.alert({
		size:"small",
		title: "Thành công",
		message: mes,
		callback: callback
	});
}
  
  //xuất thông báo hiển thị thông tin
function alert_info(mes) {
  	bootbox.alert({
		size:"small",
		title: "Thông báo",
		message:mes,
		callback:function(){/*your callback cođe*/}
	});
  }
  
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
	 
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function queryDataPostJSon(url,dataSend,callback){
	$.ajax({
		   type:'POST', //Kiểu gửi lên server. Dùng Post bảo mật dữ liệu
		   url: url, //Đường dẫn tới file api
		   data: dataSend, //Data từ phía người dùng gửi lên theo kiểu cấu trúc Json
		   async: true, //Thực hiện nhiều công việc cùng 1 lúc. còn sync thực hiện từng việc 1
		   dataType: 'json', //Kiểu dữ liệu gửi lên
		   success: callback // callback gọi lại hàm khác
	});
}

//Hàm lấy ngày tháng năm sinh
function checkDate(strDate) {
    var comp = strDate.split('/')
    var d = parseInt(comp[0], 10)
    var m = parseInt(comp[1], 10)
    var y = parseInt(comp[2], 10)
    var date = new Date(y,m-1,d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
      return true
    }
    return false
}

function buildSlidePage(obj,codan,pageActive,totalPage) {
    var html="";
    pageActive=parseInt(pageActive);
    for(i = 1 ; i <= codan; i++) {
        if(pageActive - i < 0) break;
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">'+(pageActive-i+1)+'</button>'+html;
	}
	
    if(pageActive > codan){
        html='<button type="button" class="btn btn-outline btn-default" value="'+(pageActive-i)+'">...</button>'+html;
    }
    html+='<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="'+pageActive+'">'+(pageActive+1)+'</button>';
    for(i = 1 ; i <= codan; i++){
        if(pageActive + i >= totalPage) break;
        html=html+'<button  type="button" class="btn btn-outline btn-default" value="'+(pageActive+i)+'">'+(pageActive+i+1)+'</button>';
	}
	
    if(totalPage-pageActive>codan+1){
        html=html+'<button type="button" value="'+(pageActive+i)+'" class="btn btn-outline btn-default">...</button>';
    }
    obj.html(html);
}

//hàm in số thứ tự page 1234...
function printSTT(record, pageCurr) {
  if((pageCurr + 1) == 1) {
      return 1;
  }else {
      return record * (pageCurr + 1) - (record - 1);
  }
}

// Phân quyền, phải đăng nhập mới được sử dụng
function buildUserDropdown() { 
  var user = localStorage.getItem("username");
  var nameUser = localStorage.getItem("tenuser");

  if(user == undefined || user == null || user == "") {
      location.href = "./login.html";
  } else {
      $(".display").css({'display': 'block'});
      $(".username").html(nameUser);
  }	
};

// Kiểm tra trên trang chủ.
function checkUser() {
  var user = localStorage.getItem("username");
  var nameUser = localStorage.getItem("tenuser");

  if(user) {
      $(".display").css({'display': 'block'});
      $(".username").html(nameUser);
  }	
}

function logout() {
  localStorage.removeItem("username");
  localStorage.removeItem("tenuser");

  location.href = "login.html";
}

$(".btn-logout").click(function(){
  logout();
})