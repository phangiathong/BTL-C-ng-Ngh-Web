$(".btn_login").click(function() {
    var username = $(".txt-username").val(); //Lấy dử liệu từ field
    var password = $(".txt-password").val();

    if(username == "")  // check form
	{
		alert_error("Tên đăng nhập không được để trống");
	}else if(password == "")
	{
        alert_error("Password không được để trống");
    }else{
        var dataSend = { //Tạo data biến kiểu JSON có chứa dữ liệu để gửi phía backend
            event: "login",
            username: username,
            password: password
        };

        queryDataPostJSon("apiPHP/login/php", dataSend, function(data) {
            if(data.event==1){
                if ($(".remember").is(':checked')) {
                    localStorage.setItem("remmemberBS", true);
                }
                localStorage.setItem("username", data.items.username); //Set dữ liệu người dùng vào localstỏage, người dùng nào đăng nhập lấy người dùng đo
                localStorage.setItem("tenuser", data.items.tenuser);

                location.href ="index.html"; // đưa người dùng về trang chủ để sử dụng web
            }else // Nếu sai thì đăng nhập lại
            {
                alert("tài khoản chưa đúng");
                $(".txt-username").val("");
                $(".txt-password").val("");
            }
        });
    }
		
});