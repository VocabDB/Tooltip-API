<?
ini_set('display_errors',1); 
error_reporting(E_ALL);
// http://www.vocabdb.com/dic/api_tooltip_ad_change.php?ad=1
// 1 means to set display advertizement after tooltip service.
// There is detail ad in api_tooltip_ad.php

	$ad = $_REQUEST['ad'];
	$filename = 'api_tooltip_ad.php';
	$file = fopen($filename,"r");
	$list= fread($file,filesize($filename));

	fclose($file);
 
	$Fname = $filename;
	$position  = strpos($list,'$ad=');
	$pre= substr($list,0,$position);
	$after = substr($list,$position+5,100000);
	$list=$pre.'$ad='.$ad.$after; 
		
		
		if (file_put_contents($Fname ,$list)) echo "Changed AD setting : ";
		else echo  "Failed AD setting ";

?>
