<?php
	$apikey = 'smith2';    // client's apikey
	$max_length = 500;  // input length Max 500 in browser's address space.

	$default_url = "http://www.appsmithing.com/v2_dic/";   
	//$default_url = "http://www.vocabdb.com/v2_voca/";
	
	$get_text_url       = $default_url."api_dic_tooltip_text.php";
	$get_word_url       = $default_url."api_dic_tooltip_word.php";
	$get_request_url    = $default_url."api_dic_request_word.php";


	$get_exam_def_url   	 = $default_url."api_dic_exam_def.php";
	$get_exam_def_trans_url  = $default_url."api_dic_exam_def_trans.php";
	
	$vocaDB_dic_url = $default_url."api_dic_vocadb.php";
	
//*************************** call from Print_vocaDB.php and /api/api_dic_tooltip_text.php for translation ************//	
	$want_pay_translation = false;   //   function Trans_dictionary($cont,$search)
	$get_trans_url 	= "api_dic_tooltip_pay_trans.php";
	$translation_url	= $default_url."api_translation.php";	
//*********************************************************************************************************************//

	
	$simple_print = false;  // method to print list in api_dic_tooltip_text.php
	
?>