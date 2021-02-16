var resallTinhcach;
var recordTinhcach = 3;
var tinhcach_current = 0;


$(".btn_themtinhcach").click(function(){
	
	//Lấy giá trị từ form
	var matinhcach=$(".txtmatinhcach").val(); //Lấy giá trị từ người dùng nhập trên form
	var tentinhcach=$(".txttentinhcach").val(); //Lấy giá trị từ người dùng nhập trên form
	
	if(matinhcach == "" || matinhcach.length != 2) //kiểm tra form dữ liệu không bị sai
	{
		alert_info("Mã phải là 2 kí tự");
	}else if(tentinhcach == "")
	{
		alert_info("Tên tính cách không để trống");
		
	}else{
		//Biến JSON chứa data
			 var datasend = {
				 event:"insert",
				 matinhcach: matinhcach,
				 tentinhcach: tentinhcach
			 }
	 
			 //Gọi api truyền dữ liệu
			 queryDataPostJSon("apiPHP/tinhcach.php", datasend, function(res) {
				console.log(res);
				if(res["insert"]==1){
					alert_success("Thêm thành công");
	 
					builddsTinhcach(tinhcach_current,recordTinhcach);
					
					$(".txtmatinhcach").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttentinhcach").val(""); //Lấy giá trị từ người dùng nhập trên form
				}else
				{
					alert_success("Thêm thành công");
				}
			 });
		 }	
});

// gọi khi chỉ cần load là hiện dữ liệu
builddsTinhcach(tinhcach_current,recordTinhcach);

function builddsTinhcach(page, record) {
   
    var dataSend={
		event:"getTinhcach",
		page:page,
        record:record
    }
    
    $(".list-tinhcach").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/tinhcach.php",dataSend,function (res) {

            $(".list-tinhcach").html("");
		   buildHTMLTinhcachData(res);
	});
	
}
//Lấy database
function buildHTMLTinhcachData(res) {
   if(res.total==0){
	    $(".list-tinhcach").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resallTinhcach=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    stt=printSTT(recordTinhcach,currentpage); // thứ tự 1234...
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr data-matinhcach="' + list.matinhcach + '" data-name="'+list.tentinhcach+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.matinhcach+'</td>'+
			'<td>' + list.tentinhcach+'</td>'+		
			'<td class="click_sua_tinhcach"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-tinhcach").html(html)
    }
    buildSlidePage($(".page-numbertc"),5,res.page,res.totalpage); //chuyển trang
   }
}

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-tinhcach").on('click',".click_sua_tinhcach",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	console.log(vt);
	
	$(".txtmatinhcach").val(resallTinhcach[vt].matinhcach);
	$(".txttentinhcach").val(resallTinhcach[vt].tentinhcach);
});

//Các nút chuyển trang
$(".page-numbertc").on('click','button', function() {
    tinhcach_current=$(this).val();
    builddsTinhcach(tinhcach_current, recordTinhcach); 
});

//Sửa tính cách
$(".btn_suatinhcach").click(function(){
	 
	var matinhcach=$(".txtmatinhcach").val();
	var tentinhcach=$(".txttentinhcach").val();

	bootbox.confirm("Bạn có chắc sửa mã " + matinhcach + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updatetinhcach",
				matinhcach: matinhcach,
				tentinhcach: tentinhcach
			}
			//alert_info("Sửa thành công");
			queryDataPostJSon("apiPHP/tinhcach.php", data, function(res) {
				if(res.updatetinhcach == true) {
					alert_success("Sửa thành công.");
					builddstheloai(tinhcach_current, recordTinhcach);

					$(".txtmatinhcach").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttentinhcach").val("");
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Làm lại
$(".btn_lamlaitinhcach").click(function(){
    resetViewFormTinhcach();
})

//Hàm reset lại input botbox bắt sự kiện
function resetViewFormTinhcach(){
	$(".txtmatinhcach").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txttentinhcach").val(""); // Lấy giá trị từ người dùng nhập trên form
	//$(".txtdiachiuser").val("") // Lấy giá trị từ người dùng nhập trên form
}

//Bắt sự kiện nút xóa
$(".btn_xoatinhcach").click(function(){
	var matinhcach=$(".txtmatinhcach").val();

	bootbox.confirm("Bạn có chắc xóa mã " + matinhcach + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				matinhcach: matinhcach
			}

			queryDataPostJSon("apiPHP/tinhcach.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddsTinhcach(tinhcach_current, recordTinhcach);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

buildUserDropdown();





