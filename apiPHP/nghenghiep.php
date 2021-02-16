<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
	case "insert":
        $mann=$_POST['mann'];
        $tennn=$_POST['tennn'];     

        $sql="INSERT INTO `nghenghiep` (mann,tennn)
        VALUES('".$mann."','".$tennn."')";
      
       
        if (mysqli_query($conn, $sql)) { 
            $res[$event] = 1; //insert thanh cong
        } else {
            $res[$event] = 0; //insert that bai
        }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;
	case "delete":
        $mann=$_POST['mann'];

        $sql="DELETE FROM `nghenghiep` WHERE mann='".$mann."'";
       
        mysqli_query($conn, $sql);

        if(mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
	case "updatenn":
        $mann=$_POST['mann'];
        $tennn=$_POST['tennn'];
       

        $sql="UPDATE  `nghenghiep` SET tennn='".$tennn."' WHERE mann='".$mann."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

        //Lấy data lên bảng
    case "getNghenghiep":	
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select * from nghenghiep ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['mann'];
            $usertemp['mann']=$rows['mann'];
            $usertemp['tennn']=$rows['tennn'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from nghenghiep"); // Điều kiện
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
		 break;
		default:
        # code...
        break;
}
?>

