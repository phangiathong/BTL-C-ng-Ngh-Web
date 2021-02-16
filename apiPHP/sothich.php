<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
	case "insert":
        $mast=$_POST['mast'];
        $tenst=$_POST['tenst'];
        $theloaist=$_POST['theloaist'];    
        $thoigianbdst=$_POST['thoigianbdst'];
        $lydost=$_POST['lydost'];
        $tansuatst=$_POST['tansuatst'];
        $tinhcachst=$_POST['tinhcachst']; 
        $username=$_POST['username'];
        $motast=$_POST['motast']; 

        $sql="INSERT INTO `sothich` (mast, tensothich, theloaist, thoigianbdst, lydost, tansuatst, motast, username, tinhcachst)
        VALUES('".$mast."','".$tenst."','".$theloaist."','".$thoigianbdst."','".$lydost."','".$tansuatst."','".$motast."','".$username."','".$tinhcachst."')";
      
        if (mysqli_query($conn, $sql)) { 
            $res[$event] = 1; //insert thanh cong
        } else {
            $res[$event] = 0; //insert that bai
        }
        
        echo json_encode($res); 
        mysqli_close($conn);
        break;
	case "delete":
        $mast=$_POST['mast'];

        $sql="DELETE FROM `sothich` WHERE mast='".$mast."'";
       
        mysqli_query($conn, $sql);

        if(mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

	case "updatest":
        $mast=$_POST['mast'];
        $tenst=$_POST['tenst'];
        $theloaist=$_POST['theloaist'];    
        $thoigianbdst=$_POST['thoigianbdst'];
        $lydost=$_POST['lydost'];
        $tansuatst=$_POST['tansuatst'];
        $tinhcachst=$_POST['tinhcachst']; 
        $motast=$_POST['motast']; 
       
        $sql="UPDATE  `sothich` SET tensothich='".$tenst."', theloaist='".$theloaist."',thoigianbdst='".$thoigianbdst."',lydost='".$lydost."',tansuatst='".$tansuatst."',tinhcachst='".$tinhcachst."',motast='".$motast."'  WHERE mast='".$mast."'";
        mysqli_query($conn, $sql);
            if (mysqli_affected_rows($conn)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

        //Lấy data lên bảng
    case "getSothich":	// get tất cả
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,
        "select sothich.*, users.tenuser, tinhcach.tentinhcach, theloai.tentl from sothich, users ,tinhcach, theloai
        where sothich.username = users.username AND sothich.tinhcachst = tinhcach.matinhcach AND theloai.matl = sothich.theloaist ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['mast'];
            $usertemp['mast']=$rows['mast'];
            $usertemp['tensothich']=$rows['tensothich'];
            $usertemp['tentl']=$rows['tentl'];
            $usertemp['thoigianbdst']=$rows['thoigianbdst'];
            $usertemp['lydost']=$rows['lydost'];
            $usertemp['tansuatst']=$rows['tansuatst'];
            $usertemp['tinhcachst']=$rows['tinhcachst'];            
            $usertemp['username']=$rows['username'];
            $usertemp['motast']=$rows['motast'];
            $usertemp['tenuser']=$rows['tenuser'];
            $usertemp['tentinhcach']=$rows['tentinhcach'];
            $usertemp['theloaist']=$rows['theloaist'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sothich"); // Điều kiện
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
         break;
         
        case "getData":	// get tất cả của admin
            $mang=array();
            $record=(int)$_POST['record'];
            $page=(int)$_POST['page'];

            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,
            "select sothich.*, users.*, tinhcach.*, theloai.*, hocvan.tenhv, nghenghiep.tennn from sothich, users ,tinhcach, theloai, hocvan, nghenghiep
            where sothich.username = users.username AND sothich.tinhcachst = tinhcach.matinhcach AND theloai.matl = sothich.theloaist and users.hocvan = hocvan.mahv and users.nghenghiep = nghenghiep.mann ".$limit); // seletct *

            while($rows=mysqli_fetch_array($sql))
            {
                $id=$rows['mast'];
                $usertemp['mast']=$rows['mast'];
                $usertemp['tensothich']=$rows['tensothich'];
                $usertemp['tentl']=$rows['tentl'];
                $usertemp['motast']=$rows['motast'];
                $usertemp['tenuser']=$rows['tenuser'];
                $usertemp['tentinhcach']=$rows['tentinhcach'];
                $usertemp['sdt']=$rows['sdtuser'];
                $usertemp['namsinh']=$rows['namsinhuser'];
                $usertemp['diachi']=$rows['diachiuser'];
                $usertemp['gioitinh']=$rows['gioitinhuser'];
                $usertemp['hocvan']=$rows['tenhv'];
                $usertemp['nghenghiep']=$rows['tennn'];
                $usertemp['tentl']=$rows['tentl'];  
                $usertemp['lydo']=$rows['lydost'];
                $usertemp['tansuat']=$rows['tansuatst'];    
                $usertemp['thoigianbdst']=$rows['thoigianbdst'];         
     
                $mang[$id]=$usertemp;
            }
            $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sothich"); // Điều kiện
            $row=mysqli_fetch_array($rs);
            $jsonData['total'] =(int)$row['total'];
            $jsonData['totalpage'] =ceil($row['total']/$record);
            $jsonData['page'] =(int)$page;
            $jsonData['items'] =$mang;
            
            echo json_encode($jsonData);
            mysqli_close($conn);
             break;

             case "getSothichwithUser":	// get theo user
                $mang=array();
                $record=(int)$_POST['record'];
                $page=(int)$_POST['page'];
                $username=$_POST['username'];

                $vt=$page*$record;
                $limit='limit '.$vt.' , '.$record;
                $sql=mysqli_query($conn,
                "select sothich.*, users.tenuser, tinhcach.tentinhcach, theloai.tentl from sothich, users ,tinhcach, theloai
                where sothich.username = users.username AND sothich.tinhcachst = tinhcach.matinhcach AND theloai.matl = sothich.theloaist and sothich.username='".$username."' ".$limit); // seletct *
                while($rows=mysqli_fetch_array($sql))
                {
                    $id=$rows['mast'];
                    $usertemp['mast']=$rows['mast'];
                    $usertemp['tensothich']=$rows['tensothich'];
                    $usertemp['tentl']=$rows['tentl'];
                    $usertemp['thoigianbdst']=$rows['thoigianbdst'];
                    $usertemp['lydost']=$rows['lydost'];
                    $usertemp['tansuatst']=$rows['tansuatst'];
                    $usertemp['tinhcachst']=$rows['tinhcachst'];            
                    $usertemp['username']=$rows['username'];
                    $usertemp['motast']=$rows['motast'];
                    $usertemp['tenuser']=$rows['tenuser'];
                    $usertemp['tentinhcach']=$rows['tentinhcach'];
                    $usertemp['theloaist']=$rows['theloaist'];
                    
                    $mang[$id]=$usertemp;
                }
                $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sothich"); // Điều kiện
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

