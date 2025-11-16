<?php
//connection variable
$conn = mysql_connect("localhost","root","","eventlog");

if($conn){
    echo"Connection";
}else{
    echo "failed";
}

?>