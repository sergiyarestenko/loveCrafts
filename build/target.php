<?
if($_POST){
   echo json_encode($_POST['email']);
}else{
    print '<div style="font-size:24px; margin:50px auto; text-align: center;"><p>Probably, Javascript is turned off in your browser</p><br><a href="index.html">back to previous page
</a></div>';
}