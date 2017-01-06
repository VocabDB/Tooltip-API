<?php
ini_set('display_errors',1); 
error_reporting(E_ALL);
header('Content-Type: application/json; charset=UTF-8'); 

	if (!$_SERVER['HTTP_USER_AGENT']) {   // access from web browser not server.
		exit ("<h2>403 Forbidden this access </h2>"); 
	}
	
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
			exit ('Access is forbidden. 4010 - Nothing text.'); 
	}
	
	$word = stripslashes(trim(strip_tags($_REQUEST['q'])));		
	$engin  =  ( isset($_REQUEST['engin']) ? $_REQUEST['engin'] : 1 );  // 0 is Google, 1 is MS
	$tlang  = $_REQUEST['tlang']; 
	$mod 	= $_REQUEST['mod']; //type
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 );
	if ($tlang =='en')  {
		exit ('Can not translate same language.'); 
	}
	if ($engin==0) {
		$bing_notallow_list = array('hy', 'tl', 'ka', 'ta');
		if (in_array($tlang,$bing_notallow_list)) {
			exit("MS Bing is not support this language."); 
		}
	}
	
	require_once '../commonUtils/setting_config.php';
	$ACCESS_TOKEN_PARAMETERS = array(
		"q"=>$word,
		"engin"=>$engin,
		"tlang"=>$tlang,
		"mod"=>$mod,
		"d"=>$direction
	); 
 

	$data_string = '';
	foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
	$data_string = rtrim($data_string, '&');

	$ch = curl_init($get_exam_def_trans_url);
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
		echo "Access Failed.";

	} else {
		$result = json_decode($result_api);

		if (isset($result->type) and isset($result->contents)) {
			$cont = $result->contents;
			if ($result->type >= 0 and $result->contents > '0') {
					echo $result->contents;
			} else {
			 
				echo "No Result. (".$result->type.' / '.$result->contents.' '.$data_string.')';
			}
		} else {
 //print_r($result);
			Message_notfound('Can not Print contents (illegal format). Please contact us vocadb@gmail.com');
			echo "<br>".$data_string."(".$result->type.' / '.$result->contents.')';
		}
	}

// No result due to input error
function Message_notfound($mess)
{
	echo $mess;
}

function Message_error($mess)
{
	switch ($mess) {
		case '0'  : Message_notfound('Empty input'); break;  // (0,0)
		case '-1' : Message_notfound('No authority'); break;
		case '-2' : Message_notfound("Non-English word's length must have mininum 6 bytes (2 letters) for example"); break;	
		case '-3' : Message_notfound('A restricted word of input word in non-English'); break;	
		case '-4' : Message_notfound('No result from server'); break;
		default   : Message_notfound('Something Wrong.'); break;
	}
}

function Message_Access_error($result)
{
	$mess = $result->contents;

	switch ($mess) {
		case '-1' : Message_notfound('Access Denied: Wrong APIkey -1'); break;  // Header apikey error
		case '-2' : Message_notfound("Apikey Error -2"); break;	
		case '-3' : Message_notfound('Paramenters Error -3'); break;	
		case '-4' : Message_notfound('MS Bing is not support this language.'); break;	
		default   : Message_notfound('Security Problem. ('.$result->type.' / '.$mess.')'); break;
	}
}
	
?>