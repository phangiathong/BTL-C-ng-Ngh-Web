var resallNghenghiep;
var recordNghenghiep = 2;
var nghenghiep_current = 0;

$(".btn_themnn").click(function(){
	
	//Lấy giá trị từ form
	var mann=$(".txtmann").val(); //Lấy giá trị từ người dùng nhập trên form
    var tennn=$(".txttennn").val(); //Lấy giá trị từ người dùng nhập trên form
	
	if(mann == "" || mann.length != 3) //kiểm tra form dữ liệu không bị sai
	{
		alert_info("Mã phải là 3 kí tự");
	}else if(tennn == "")
	{
		alert_info("Tên không để trống");
		
	}else{
		//Biến JSON chứa data
			 var datasend = {
				 event:"insert",
				 mann: mann,
				 tennn: tennn
			 }
	 
			 //Gọi api truyền dữ liệu
			 queryDataPostJSon("apiPHP/nghenghiep.php", datasend, function(res) {
				console.log(res);
				if(res["insert"]==1){
					alert_success("Thêm thành công");
	 
					builddsnghenghiep(nghenghiep_current,recordNghenghiep);
					
					$(".txtmann").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttennn").val(""); //Lấy giá trị từ người dùng nhập trên form
				}else
				{
					alert_success("Thêm thành công");
				}
			 });
		 }	
});

// gọi khi chỉ cần load là hiện dữ liệu
builddsnghenghiep(nghenghiep_current, recordNghenghiep);

function builddsnghenghiep(page, record) {
   
    var dataSend={
		event:"getNghenghiep",
		page:page,
        record:record
    }
    
    $(".list-nghenghiep").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/nghenghiep.php",dataSend,function (res) {

            $(".list-nghenghiep").html("");
		   buildHTMLNghenghiepData(res);
	});
	
}
//Lấy database
function buildHTMLNghenghiepData(res) {
   if(res.total==0){
	    $(".list-nghenghiep").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resallNghenghiep=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    //stt=printSTT(recordtheloai,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr data-mann="' + list.mann + '" data-name="'+list.tennn+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.mann+'</td>'+
			'<td>' + list.tennn+'</td>'+	
			'<td class="click_them_nghenghiep"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-nghenghiep").html(html)
    }
    buildSlidePage($(".page-numbernn"),5,res.page,res.totalpage); //chuyển trang
   }
}

//Các nút chuyển trang
$(".page-numbernn").on('click','button', function() {
    nghenghiep_current=$(this).val();
    builddsnghenghiep(nghenghiep_current, recordNghenghiep); 
});

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-nghenghiep").on('click',".click_them_nghenghiep",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	console.log(vt);
	
	$(".txtmann").val(resallNghenghiep[vt].mann);
	$(".txttennn").val(resallNghenghiep[vt].tennn);
});

//Sửa nghề nghiệp
$(".btn_suann").click(function(){
	 
	var mann=$(".txtmann").val();
	var tennn=$(".txttennn").val();

	bootbox.confirm("Bạn có chắc sửa mã " + mann + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updatenn",
				mann: mann,
				tennn: tennn
			}
			//alert_info("Sửa thành công");
			queryDataPostJSon("apiPHP/nghenghiep.php", data, function(res) {
				if(res.updatenn == true) {
					alert_success("Sửa thành công.");
					builddsnghenghiep(nghenghiep_current, recordNghenghiep);

					$(".txtmann").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttennn").val("");
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Bắt sự kiện nút xóa
$(".btn_xoann").click(function(){
	var mann=$(".txtmann").val();

	bootbox.confirm("Bạn có chắc xóa mã " + mann + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				mann: mann
			}

			queryDataPostJSon("apiPHP/nghenghiep.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddsnghenghiep(nghenghiep_current, recordNghenghiep);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Làm lại
$(".btn_lamlainn").click(function(){
    resetViewFormNghenghiep();
})

//Hàm reset lại input botbox bắt sự kiện
function resetViewFormNghenghiep(){
	$(".txtmann").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txttennn").val(""); // Lấy giá trị từ người dùng nhập trên form
	//$(".txtdiachiuser").val("") // Lấy giá trị từ người dùng nhập trên form
}

buildUserDropdown();