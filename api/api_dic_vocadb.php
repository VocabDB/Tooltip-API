<?php
		if ($len> $max_length ) {
			$search = substr($search,0,$max_length);
			echo "<div class='trans_count_small'> * Text is limited ". $max_length.".</div>";
		}

		$ACCESS_TOKEN_PARAMETERS = array(
			"slang"=>$slang, 
			"tlang"=>$tlang, 
			"q"=>$search,
			"level"=>$level,
			"d"=>$direction
		); 

		$data_string = '';
		foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
		$data_string = rtrim($data_string, '&');
		
//echo $data_string.'**************';	
		$ch = curl_init($vocaDB_dic_url);     
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
		$result = json_decode($result_api);
		
/* 	check JSON Result, this function run over 5.3 version of PHP
		if (!Check_JSON())	{
			echo "<div style='margin:100px; text-align:center;'>Check out result. Contact call center.</div>";
		} else {} 
*/

 //print_r( json_decode( $result_api ) ); exit();
			if (!$result_api) {
				echo "<div style='margin:100px; text-align:center;'><br>Return value is nothing or failed.</div>";
			} else {
			
				require_once 'Print_vocaDB.php';
				Print_contents($result,$slang,$tlang,$direction,$search);
			}

?>
