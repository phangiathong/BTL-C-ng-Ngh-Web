var resallTheloai;
var recordTheloai = 3;
var theloai_current = 0;


$(".btn_themtl").click(function(){
	
	//Lấy giá trị từ form
	var matl=$(".txtmatl").val(); //Lấy giá trị từ người dùng nhập trên form
	var tentl=$(".txttentl").val(); //Lấy giá trị từ người dùng nhập trên form
	
	if(matl == "" || matl.length != 2) //kiểm tra form dữ liệu không bị sai
	{
		alert_info("Mã phải là 2 kí tự");
	}else if(tentl == "")
	{
		alert_info("Tên không để trống");
		
	}else{
   //Biến JSON chứa data
		var datasend = {
			event:"insert",
			matl: matl,
			tentl: tentl,
		}

		//Gọi api truyền dữ liệu
		queryDataPostJSon("apiPHP/theloai.php", datasend, function(res) {
		   console.log(res);
		   if(res["insert"]==1){
			   alert_success("Thêm thành công");

			   builddstheloai(theloai_current, recordTheloai); // Không cần load, tự hiện
			   
			   $(".txtmatl").val(""); //Lấy giá trị từ người dùng nhập trên form
			   $(".txttentl").val(""); //Lấy giá trị từ người dùng nhập trên form
		   }else
		   {
			   alert_success("Thêm thành công");
		   }
		});
	}	
});

// gọi khi chỉ cần load là hiện dữ liệu
builddstheloai(theloai_current, recordTheloai);

function builddstheloai(page, record) {
   
    var dataSend={
		event:"getTheloai",
		page:page,
        record:record
    }
    
    $(".list-theloai").html("<img src='images/input-spinner.gif' width='5px' height='5px'/>");
  
    queryDataPostJSon("apiPHP/theloai.php",dataSend,function (res) {

            $(".list-theloai").html("");
		   buildHTMLTheloaiData(res);
		   
	});
	
}
//Lấy database
function buildHTMLTheloaiData(res) {
   if(res.total==0){
	    $(".list-theloai").html("Chưa có nội dung");
		
   }else{  
    var data = res.items;
   
    resallTheloai=data;
	var stt=1;
    var currentpage=parseInt(res.page);
    //stt=printSTT(recordtheloai,currentpage);
    var html='';
	var vt=0;
    for (item in data) {
        var list=data[item];
      
        html=html +
            '<tr data-matl="' + list.matl + '" data-name="'+list.tentl+'" data-vt="' + item + '">' +
			
            '<td>' + stt + '</td>' +
			'<td>' + list.matl+'</td>'+
			'<td>' + list.tentl+'</td>'+		
			'<td class="click_sua_theloai"><i class="fa fa-eye"></i></td>'+
            '</tr>';
        stt++;
		vt++;
        $(".list-theloai").html(html)
    }
    buildSlidePage($(".page-numbertl"),5,res.page,res.totalpage); //chuyển trang
   }
}

//Các nút chuyển trang
$(".page-numbertl").on('click','button', function() {
    theloai_current=$(this).val();
    builddstheloai(theloai_current, recordTheloai); 
});

//Sửa thể loại
$(".btn_suatl").click(function(){
	 
	var matl=$(".txtmatl").val();
	var tentl=$(".txttentl").val();

	bootbox.confirm("Bạn có chắc sửa mã " + matl + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "updatetl",
				matl: matl,
				tentl: tentl
			}
			//alert_info("Sửa thành công");
			queryDataPostJSon("apiPHP/theloai.php", data, function(res) {
				if(res.updatetl == true) {
					alert_success("Sửa thành công.");
					builddstheloai(theloai_current, recordTheloai);

					$(".txtmatl").val(""); //Lấy giá trị từ người dùng nhập trên form
					$(".txttentl").val("");
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

//Bắt sự kiện trên icon, nhấp vô mắt sẽ hiện thông tin lên field
$(".list-theloai").on('click',".click_sua_theloai",function(){
	
	var vt=$(this).parents("tr").attr("data-vt");
	console.log(vt);
	
	$(".txtmatl").val(resallTheloai[vt].matl);
	$(".txttentl").val(resallTheloai[vt].tentl);
});

//Làm lại
$(".btn_lamlaitl").click(function(){
    resetViewFormTheloai();
})

//Hàm reset lại input botbox bắt sự kiện
function resetViewFormTheloai(){
	$(".txtmatl").val(""); // Lấy giá trị từ người dùng nhập trên form
	$(".txttentl").val(""); // Lấy giá trị từ người dùng nhập trên form
	//$(".txtdiachiuser").val("") // Lấy giá trị từ người dùng nhập trên form
}

//Bắt sự kiện nút xóa
$(".btn_xoatl").click(function(){
	var matl=$(".txtmatl").val();

	bootbox.confirm("Bạn có chắc xóa mã " + matl + " hàng này không ?", function(result) {
		if(result == true) {
			var data = {
				event: "delete",
				matl: matl
			}

			queryDataPostJSon("apiPHP/theloai.php", data, function(res) {
				if(res.delete == true) {
					alert_success("Xoá thành công.");
					builddstheloai(theloai_current, recordTheloai);
				} else {
					alert_error("Something wrong !");
				}
			});
		}
	});
})

buildUserDropdown();

