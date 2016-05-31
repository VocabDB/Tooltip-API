<?php
ini_set('display_errors',1); 
error_reporting(E_ALL);
header('Content-Type: application/json; charset=UTF-8');

// http://appsmithing.com/dic/api/api_dic_trans.php?q=Forbidden this access&tlang=ko&slang=en&engin=0
	
// call from api_dic_tooltip_text.php
//function translation_word($apikey,$search,$engin,$slang,$tlang,$level,$translation_url,$d) {
	if ($_SERVER['HTTP_USER_AGENT']) {   // access from web browser not server.
		exit ("<h2>403 Forbidden this access </h2>"); 
	}
	
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
			exit ('Access is forbidden. 4010 - Nothing text.'); 
	}
	
		$ACCESS_TOKEN_PARAMETERS = array(
			"q"=>$word,
			"engin"=>$engin,
			"slang"=>$slang,
			"tlang"=>$tlang,
			"level"=>$level,
			"d"=>$d
		); 

		if ($engin==0) {
			$bing_notallow_list = array('hy', 'tl', 'ka', 'ta');
			if (in_array($tlang,$bing_notallow_list)) {
				exit("<p class='ajax_means_trans'>MS Bing is not support this language.</p>"); //'MS Bing is not support this language.';
			}
		}
		$data_string = '';
		foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
		$data_string = rtrim($data_string, '&');
		
		$ch = curl_init($translation_url);
		curl_setopt($ch, CURLOPT_POST, count($data_string));
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);		
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
						'x-voca-apikey: '. $apikey,
						'charset=UTF-8' ,
						'Content-Length: ' . strlen($data_string))
		); 


		$trans = curl_exec($ch);
		curl_close($ch);
		
		if ($trans == '') {
			//$trans = $translation_url.'?'.$data_string;
		} else {
			$trans= trim($trans);
		}

		$trans ="<p class='ajax_means_trans'>".$trans."</p>";

?>