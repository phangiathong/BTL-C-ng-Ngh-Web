<?php
require_once("server.php");
$event=$_POST['event'];

//test dung GET
//truyen len dung POST

switch ($event) {
	
	case "insert":
        $tenuser=$_POST['tenuser'];
        $namsinhuser=$_POST['namsinhuser'];
        $sdtuser=$_POST['sdtuser']; 
        $nghenghiepuser=$_POST['nghenghiep']; 
        $hocvanuser=$_POST['hocvanuser'];    
        $diachiuser=$_POST['diachiuser'];   
        $gioitinhuser=$_POST['gioitinhuser'];    
        $username=$_POST['username']; 
        $passworduser=$_POST['passworduser'];     

        $sql="INSERT INTO `users` (tenuser,namsinhuser,sdtuser,diachiuser,gioitinhuser,hocvan,nghenghiep,username,passworduser)
        VALUES('".$tenuser."','".$namsinhuser."','".$sdtuser."','".$diachiuser."','".$gioitinhuser."','".$hocvanuser."','".$nghenghiepuser."','".$username."','".$passworduser."')";
      
       
        if (mysqli_query($conn, $sql)) { 
            $res[$event] = 1; //insert thanh cong
        } else {
            $res[$event] = 0; //insert that bai
        }
        
        echo json_encode($res); // trả về client ["inserttl";1] ->TC, ["inserttl":0]->TB
        mysqli_close($conn);
        break;
	case "delete":
        $username=$_POST['username'];

        $sql=   "DELETE FROM `users` 
                 WHERE username='".$username."'";
       
        mysqli_query($conn, $sql);

        if(mysqli_affected_rows($conn)) {
            $res[$event] = true;
        } else {
            $res[$event] = false;
        }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;
        
	case "updateuser":
        $username=$_POST['username'];
        $tenuser=$_POST['tenuser'];
        $namsinhuser=$_POST['namsinhuser'];
        $sdtuser=$_POST['sdtuser'];
        $nghenghiepuser=$_POST['nghenghiep'];
        $hocvanuser=$_POST['hocvanuser'];
        $diachiuser=$_POST['diachiuser'];
        $gioitinhuser=$_POST['gioitinhuser'];
        $passworduser=$_POST['passworduser'];
       

        $sql=   "UPDATE  `users` 
                SET tenuser='".$tenuser."', namsinhuser='".$namsinhuser."', sdtuser='".$sdtuser."',nghenghiep='".$nghenghiepuser."',hocvan='".$hocvanuser."',diachiuser='".$diachiuser."',gioitinhuser='".$gioitinhuser."',passworduser='".$passworduser."'
                WHERE username='".$username."'";
       
            if (mysqli_query($conn, $sql)) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        
        echo json_encode($res);
        mysqli_close($conn);
        break;

        
    case "getUser":	// của admin
		$mang=array();
        $record=(int)$_POST['record'];
        $page=(int)$_POST['page'];
        
		$vt=$page*$record;
        $limit='limit '.$vt.' , '.$record;
        $sql=mysqli_query($conn,"select users.*,nghenghiep.tennn, hocvan.tenhv from users,nghenghiep, hocvan where users.nghenghiep = nghenghiep.mann and users.hocvan = hocvan.mahv ".$limit); // seletct *
		while($rows=mysqli_fetch_array($sql))
        {
            $id=$rows['username'];
                $usertemp['username']=$rows['username'];
                $usertemp['tenuser']=$rows['tenuser'];
                $usertemp['namsinhuser']=$rows['namsinhuser'];
                $usertemp['sdtuser']=$rows['sdtuser'];
                $usertemp['nghenghiep']=$rows['tennn'];
                $usertemp['nghenghiepuser']=$rows['nghenghiep'];
                $usertemp['hocvan']=$rows['tenhv'];
                $usertemp['mahv']=$rows['hocvan'];
                $usertemp['diachiuser']=$rows['diachiuser'];
                $usertemp['gioitinhuser']=$rows['gioitinhuser'];
                $usertemp['password']=$rows['passworduser'];
            
            $mang[$id]=$usertemp;
        }
        $rs=mysqli_query($conn,"select COUNT(*) as 'total' from users"); // Điều kiện
        $row=mysqli_fetch_array($rs);
        $jsonData['total'] =(int)$row['total'];
		$jsonData['totalpage'] =ceil($row['total']/$record);
	    $jsonData['page'] =(int)$page;
        $jsonData['items'] =$mang;
		
        echo json_encode($jsonData);
		mysqli_close($conn);
         break;
         
         case "getUserlocal":	// get theo user
            $mang=array();
            $record=(int)$_POST['record'];
            $page=(int)$_POST['page'];
            $username=$_POST['user'];

            $vt=$page*$record;
            $limit='limit '.$vt.' , '.$record;
            $sql=mysqli_query($conn,
            "select users.*, hocvan.tenhv, nghenghiep.tennn from  users, nghenghiep, hocvan
            where users.hocvan = hocvan.mahv AND users.nghenghiep= nghenghiep.mann  and users.username='".$username."' ".$limit); // seletct *
            while($rows=mysqli_fetch_array($sql))
            {
                $id=$rows['username'];
                $usertemp['username']=$rows['username'];
                $usertemp['tenuser']=$rows['tenuser'];
                $usertemp['namsinhuser']=$rows['namsinhuser'];
                $usertemp['sdtuser']=$rows['sdtuser'];
                $usertemp['nghenghiep']=$rows['tennn'];
                $usertemp['nghenghiepuser']=$rows['nghenghiep'];
                $usertemp['hocvan']=$rows['tenhv'];
                $usertemp['mahv']=$rows['hocvan'];
                $usertemp['diachiuser']=$rows['diachiuser'];
                $usertemp['gioitinhuser']=$rows['gioitinhuser'];
                $usertemp['password']=$rows['passworduser'];
                           
                
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

