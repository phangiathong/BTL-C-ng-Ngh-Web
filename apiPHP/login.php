<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

//Viết theo cấu trúc switch case. Bắt case nào sẽ thực hiện case đó
switch ($event) {
	case "login":
        $u=$_POST['username']; //Lấy giá trị từ 2 field người dùng gửi lên
        $p=$_POST['password']; 
         

        $sql=mysqli_query($conn,"select username,passworduser, tenuser from users where username='".$u."' and passworduser='".$p."'");
        
        $t = ''; //empty string
        
        
        while($rows = mysqli_fetch_array($sql))
        {
            
            $usertemp['username']=$rows['username'];
            $usertemp['passworduser']=$rows['passworduser'];
            $usertemp['tenuser']=$rows['tenuser'];

            $t=$rows['username'];
        }
        
            if($t!=''){ 
                $jsonData["event"] =1;
                $jsonData["items"] =$usertemp; //trả về username, password
            
                echo json_encode($jsonData); // xuất ra
            }
            else{
                $jsonData["event"] =0;
                //$jsonData["items"] =$usertemp;
            
                echo json_encode($jsonData);
            }

            mysqli_close($conn); // Đóng kết nối
        break;
}
?>