<?php
	$apikey = "";

	if( required_param( array('q','slang','tlang','tooltip_d') ) )
	{
		echo 'Access Denied';
		exit();
	}
	
	$ACCESS_TOKEN_PARAMETERS = array(
	"q"=> $_POST['q'],
	"slang"=> $_POST['slang'], 
	"tlang"=> $_POST['tlang'],
	"level"=> ( isset($_POST['level']) ? $_POST['level'] : 21 ),
	"save_word" => ( isset($_POST['save_word']) ? $_POST['save_word'] : 0 ), //1 to activate save word in tooltip
	);
	$data_string = json_encode($ACCESS_TOKEN_PARAMETERS);

	$data_string = '';
	foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
	rtrim($data_string, '&');

	$case = "";
	switch($_POST['tooltip_d']){
		case 'word': 
			$link = "http://appsmithing.com/v2_api/api_tooltip_word_htmlreturn.php";
			break;
		case 'text':
			$link = "http://appsmithing.com/v2_api/api_tooltip_text_htmlreturn.php";
			break;
	}
	
	// echo $link;exit();
	
	$ch = curl_init($link);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	
	curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
		'x-voca-apikey: ' . $apikey,
		'charset=UTF-8' ,
		'Content-Length: ' . strlen($data_string))
	); 
	$result_api = curl_exec($ch);
	curl_close($ch);
	echo $result_api;
	
	/*
	|	required_param function
	|	returns false if all required parameters are meta
	|	returns true if something is missing on required 
	*/
	function required_param($arr)
	{
		foreach($arr as $v)
		{
			if( !isset($_REQUEST[$v]) )
			{
				return true;
			}
		}
		return false;
	}
?>