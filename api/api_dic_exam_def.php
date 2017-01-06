<?php
ini_set('display_errors',1); 
error_reporting(E_ALL);
header('Content-Type: application/json; charset=UTF-8');

// http://www.appsmithing.com/dic/api/api_dic_exam_def.php?q=arrest&level=22&mod=2&tlang=ko&d=1

	if ( !isset($_SERVER['HTTP_USER_AGENT']) ) {   // access from web browser not server.
		exit ("<h2>403 Forbidden this access </h2>"); 
	}
	
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
		exit ('Access is forbidden. 4010 - Nothing text.'); 
	}
	
	$word  = stripslashes(trim(strip_tags($_REQUEST['q'])));
	$level = ( isset($_REQUEST['level']) ? $_REQUEST['level'] : 21 );
	$mod   = ( isset($_REQUEST['mod']) ? $_REQUEST['mod'] : 0 );	
	$tlang = ( isset($_REQUEST['tlang']) ? $_REQUEST['tlang'] : '' );
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 );

	require_once '../commonUtils/setting_config.php';
	
	$ACCESS_TOKEN_PARAMETERS = array( 
		"q"=>$word, 
		"level"=>$level,
		"tlang"=>$tlang,	
		"mod"=>$mod, // type of definition, example and synonym
		"d"=>$direction
	); 
	
	$data_string = '';
	foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
	$data_string = rtrim($data_string, '&');
	
	$ch = curl_init($get_exam_def_url);  // api_dic_exam_def_curl.php
	curl_setopt($ch, CURLOPT_POST, count($data_string));
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(
					'x-voca-apikey: '. $apikey,
					'charset=UTF-8' ,
					'Content-Length: ' . strlen($data_string))
	); 

	$result_api = curl_exec($ch);
	curl_close($ch); 
	if (!$result_api) {
		echo "No result";
	} else {
//print_r($result_api);	

		$result_api = json_decode($result_api);
	
		require_once '../Print_defintion.php';
		Print_def_contents($result_api,$direction,$tlang); 			
	}

?>