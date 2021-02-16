<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "datasothich";
$conn = mysqli_connect($hostname, $username, $password,$dbname);

if (!$conn) {
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();
}
// echo 'Kết nối thành công';
mysqli_set_charset($conn,"utf8_general_ci");

?>
