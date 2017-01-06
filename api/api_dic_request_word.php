<?php
ini_set('display_errors',1); 
error_reporting(E_ALL); 

	if (!$_SERVER['HTTP_USER_AGENT']) {   // access from web browser. server has no value false
		exit ("<h2>403 Forbidden this access </h2>"); 
	}
	
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
			exit ('Access is forbidden. 4010 - Nothing text.'); 
	}
	

	$word = stripslashes(trim(strip_tags($_REQUEST['q'])));	
	$means = $_REQUEST["means"];
	$pos   = $_REQUEST["pos"];
	$email = $_REQUEST["email"];
	$tlang = $_REQUEST["tlang"];
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 );
	
	$scode = verfiy_googleresponse($_REQUEST["g-recaptcha-response"]);

	if (trim($word) == '' and !$scode ) {
		$meg = "Check Secure code or a request word.";
	} else {

		require_once '../commonUtils/setting_config.php';

		$ACCESS_TOKEN_PARAMETERS = array(
			"q"=>$word,
			"means"=>$means,
			"pos"=>$pos,
			"email"=>$email,
			"tlang"=>$tlang,
			"d"=>$direction
		); 
		
		$data_string = '';
		foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
		$data_string = rtrim($data_string, '&');
		
//echo $get_request_url.'?'.$data_string.'&apikey='.$apikey;

		$ch = curl_init($get_request_url);
		
		curl_setopt($ch, CURLOPT_POST, count($data_string));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
						'x-voca-apikey: '. $apikey,
						'charset=UTF-8' ,
						'Content-Length: ' . strlen($data_string))
		); 

		$result_api = curl_exec($ch);
		curl_close($ch);
	
		if ($result_api) {
			$meg = " Thank you so much. We will review your word ASAP."; 
		} else { 
			$meg = "Something went wrong. Please try again later"; 
		}
	} 
	echo "<script>history.go(-1); alert('".$meg."')</script>";


function verfiy_googleresponse($response)
{
	$data_string = '';
	$ACCESS_TOKEN_PARAMETERS = array(
		"secret" => "6LfVwx0TAAAAACKBmtaSCkosH5I6jzd-flikwLbq",
		"response" => $response
	);
	
	foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) 
	{ 
		$data_string .= $key.'='.$value.'&'; 
	}
	rtrim($data_string, '&');
	
	$ch = curl_init("https://www.google.com/recaptcha/api/siteverify");
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	$result = curl_exec($ch);
	curl_close($ch);
	// return $result["success"];
	return json_encode($result);
}
?>