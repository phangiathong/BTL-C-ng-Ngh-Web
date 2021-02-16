var resallHocvan;
var recordHocvan = 2;
var hocvan_current = 0;

$(".btn_themhv").click(function(){
	
	//Lấy giá trị từ form
	var mahv=$(".txtmahv").val(); //Lấy giá trị từ người dùng nhập trên form
	var tenhv=$(".txttenhv").val(); //Lấy giá trị từ người dùng nhập trên form
	
	if(mahv == "" || mahv.length != 2) //kiểm tra form dữ liệu không bị sai
	{
		alert_info("Mã phải là 2 kí tự");
	}else if(tenhv == "")
	{
		alert_info("Tên không để trống");
		
	}else{
		//Biến JSON chứa data
			 var datasend = {
				 event:"insert",
				 mahv: mahv,
				 tenhv: tenhv
			 }
	 
			 //Gọi api truyền dữ liệu
			 queryDataPostJSon("apiPHP/hocvan.php", datasend, function(res) {
				console.log(res);
				if(res["insert"]==1){
					alert_success("Thêm thành công");
	 
					builddsHocvan(hocvan_current,recordHocvan);
					
					$(".txtmahv").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttenhv").val(""); //Lấy giá trị từ người dùng nhập trên form
				}else
				{
					alert_success("Thêm thành công");
				}
			 });
		 }	
});

// gọi khi chỉ cần load là hiện dữ liệu
builddsHocvan(0, 2);

function builddsHocvan(page, record) {
   
    var dataSend={
		event:"getHocvan",
		page:page,
        record:record
    }
    
    $(".list-hocvan").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/hocvan.php",dataSend,function (res) {

            $(".list-hocvan").html("");
		   buildHTMLHocvanData(res);
		   

	});
	
}
//Lấy database
function buildHTMLHocvanData(res) {
   if(res.total==0){
	    $(".list-hocvan").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resallHocvan=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    //stt=printSTT(recordtheloai,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr data-mahv="' + list.mahv + '" data-name="'+list.tenhv+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.mahv+'</td>'+
			'<td>' + list.tenhv+'</td>'+		
			'<td class="click_them_hocvan"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-hocvan").html(html)
    }
    buildSlidePage($(".page-numberhv"),5,res.page,res.totalpage); //chuyển trang
   }
}

//Các nút chuyển trang
$(".page-numberhv").on('click','button', function() {
    hocvan_current=$(this).val();
    builddsHocvan(hocvan_current, recordHocvan); 
});

//Sửa học vấn
$(".btn_suahv").click(function(){
	 
	var mahv=$(".txtmahv").val();
	var tenhv=$(".txttenhv").val();

	bootbox.confirm("Bạn có chắc sửa mã " + mahv + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updatehv",
				mahv: mahv,
				tenhv: tenhv
			}
			//alert_info("Sửa thành công");
			queryDataPostJSon("apiPHP/hocvan.php", data, function(res) {
				if(res.updatehv == true) {
					alert_success("Sửa thành công.");
					builddsHocvan(hocvan_current, recordHocvan);

					$(".txtmahv").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttenhv").val("");
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-hocvan").on('click',".click_them_hocvan",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	console.log(vt);
	
	$(".txtmahv").val(resallHocvan[vt].mahv);
	$(".txttenhv").val(resallHocvan[vt].tenhv);
});

//Làm lại
$(".btn_lamlaihv").click(function(){
    resetViewFormHocvan();
})

//Hàm reset lại input botbox bắt sự kiện
function resetViewFormHocvan(){
	$(".txtmahv").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txttenhv").val(""); // Lấy giá trị từ người dùng nhập trên form
	//$(".txtdiachiuser").val("") // Lấy giá trị từ người dùng nhập trên form
}

//Bắt sự kiện nút xóa
$(".btn_xoahv").click(function(){
	var mahv=$(".txtmahv").val();

	bootbox.confirm("Bạn có chắc xóa mã " + mahv + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				mahv: mahv
			}

			queryDataPostJSon("apiPHP/hocvan.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddsHocvan(hocvan_current, recordHocvan);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

buildUserDropdown();
