<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
	case "insert":
        $mahv=$_POST['mahv'];
        $tenhv=$_POST['tenhv'];       

        $sql="INSERT INTO `hocvan` (mahv,tenhv)
        VALUES('".$mahv."','".$tenhv."')";
      
       
        if (mysqli_query($conn, $sql)) { 
            $res[$event] = 1; //insert thanh cong
        } else {
            $res[$event] = 0; //insert that bai
        }
        
        echo json_encode($res); // trả về client ["inserttl";1] ->TC, ["inserttl":0]->TB
        mysqli_close($conn);
        break;
	case "delete":
        $mahv=$_POST['mahv'];

        $sql="DELETE FROM `hocvan` WHERE mahv='".$mahv."'";
       
        mysqli_query($conn, $sql);

        if(mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
	case "updatehv":
        $mahv=$_POST['mahv'];
        $tenhv=$_POST['tenhv'];
       

        $sql="UPDATE  `hocvan` SET tenhv='".$tenhv."' WHERE mahv='".$mahv."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

        //Lấy data lên bảng
    case "getHocvan":	
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select * from hocvan ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['mahv'];
            $usertemp['mahv']=$rows['mahv'];
            $usertemp['tenhv']=$rows['tenhv'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from hocvan"); // Điều kiện
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

