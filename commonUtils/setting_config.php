<?php

	$apikey = 'ADD YOU API KEY HERE';
	$max_length = 500;  // input length Max 500 in browser's address space.  /// vcoa.js check_length() 


 	$default_url = "http://www.vocadb.com/v2_dic/";  


	$get_text_url       = $default_url."api_dic_tooltip_text.php";
	$get_word_url       = $default_url."api_dic_tooltip_word.php";
	$get_request_url    = $default_url."api_dic_request_word.php";

	$get_exam_def_url   	 = $default_url."api_dic_exam_def.php";
	$get_exam_def_trans_url  = $default_url."api_dic_exam_def_trans.php";
	
	$vocaDB_dic_url = $default_url."api_dic_vocadb.php";
	
//*************************** call from Print_vocaDB.php and /api/api_dic_tooltip_text.php for translation ************//	
	$want_pay_translation = false;   //   function Trans_dictionary($cont,$search)
	$get_trans_url 	  = "api_dic_tooltip_pay_trans.php";
	$translation_url  = $default_url."api_translation.php";	
//*********************************************************************************************************************//

	
?>