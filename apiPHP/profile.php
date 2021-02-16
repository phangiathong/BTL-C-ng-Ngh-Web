<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
    case "getUserlocal":	
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
        $user=$_POST['user'];

		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select users.*,nghenghiep.tennn from users,nghenghiep where users.nghenghiep = nghenghiep.mann and users.username='".$user."' ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['username'];
            $usertemp['username']=$rows['username'];
            $usertemp['tenuser']=$rows['tenuser'];
            $usertemp['namsinhuser']=$rows['namsinhuser'];
            $usertemp['sdtuser']=$rows['sdtuser'];
            $usertemp['nghenghiep']=$rows['nghenghiep'];
            $usertemp['hocvan']=$rows['hocvan'];
            $usertemp['diachiuser']=$rows['diachiuser'];
            $usertemp['gioitinhuser']=$rows['gioitinhuser'];
            $usertemp['tennghenghiep']=$rows['tennn'];
            
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

