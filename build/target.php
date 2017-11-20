<?
if($_POST){
   echo json_encode($_POST['email']);
}else{
    print '<div style="font-size:24px; margin:50px auto;text-align:  center;"><a href="index.html">back to form page
</a></div>';
}