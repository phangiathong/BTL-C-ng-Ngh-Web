<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
	case "insert":
        $matinhcach=$_POST['matinhcach'];
        $tentinhcach=$_POST['tentinhcach'];       

        $sql="INSERT INTO `tinhcach` (matinhcach,tentinhcach)
        VALUES('".$matinhcach."','".$tentinhcach."')";
      
       
        if (mysqli_query($conn, $sql)) { 
            $res[$event] = 1; //insert thanh cong
        } else {
            $res[$event] = 0; //insert that bai
        }
        
        echo json_encode($res); // trả về client ["inserttl";1] ->TC, ["inserttl":0]->TB
        mysqli_close($conn);
        break;
	case "delete":
        $matinhcach=$_POST['matinhcach'];

        $sql="DELETE FROM `tinhcach` WHERE matinhcach='".$matinhcach."'";
       
        mysqli_query($conn, $sql);

        if(mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
	case "updatetinhcach":
        $matinhcach=$_POST['matinhcach'];
        $tentinhcach=$_POST['tentinhcach'];
       

        $sql="UPDATE  `tinhcach` SET tentinhcach='".$tentinhcach."' WHERE matinhcach='".$matinhcach."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

        //Lấy data lên bảng
    case "getTinhcach":	
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select * from tinhcach ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['matinhcach'];
            $usertemp['matinhcach']=$rows['matinhcach'];
            $usertemp['tentinhcach']=$rows['tentinhcach'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from tinhcach"); // Điều kiện
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

