<?php
ini_set('display_startup_errors',1);
ini_set('display_errors',1); 
error_reporting(E_ALL); 
header('Content-Type: application/json; charset=UTF-8'); 

//http://www.appsmithing.com/dic/api/api_dic_tooltip_text.php?q=many%20economists%20to%20be%20the%20worst%20financial%20crisis%20since%20the%20Great%20Depression&engin=1&slang=en&tlang=ko&level=21&apikey=8888&space_cnt=12&d=0


function disp_means($means) {
      $ss = $means;
      for ($j=2 ; $j<6 ; ++$j ) {		
		 $num = ' '.(string) $j.'.';
		 $str = '<br />'.$num;
		 $ss = str_replace($num,$str,$ss);
	  } 
	return $ss;
}

function disp_means_arabic($means)
{
		$ss = $means;
		for ($j=1 ; $j<6 ; ++$j ) {		
				$num = $j.'.';
				$str = '<br />'.$num;
				$ss = str_replace($num,'; ',$ss);					
		}
		$ss = ltrim($ss,';');

	return $ss;
}

function fill_space($word) 
{

	$max = strlen($word);
	$num =17;
	$loop=$num-$max;
	$str ='';
	if ($max < $num) 
	for ($i=0; $i<$loop;$i++) { 
	   $str .= '&nbsp;';
	}
	return $word.$str;
}		


function add_text_ad($result_msg) 
{	

//***********  Tooltip Advertize Area ***************//
		require_once 'ad/api_tooltip_ad.php';
//*********************************************//	
	  //logo part
		if ($tooltip_ad <> '') {
			$ad_div_front = "<a href='".$tooltip_url."' class='ajax_ad' target='_blank'><img src='".$tooltip_ad."' title='".$tooltip_url_hint."' /></a>"." |";
		} else {
			$ad_div_front = "<a href='".$tooltip_url_voca."' class='ajax_ad' target='_blank'><img src='".$tooltip_ad_voca."' title='".$tooltip_url_hint_voca."' /></a>"." |";
		}
		$ad_div_front = "|".$ad_div_front; 	

		
	 // end part of AD
		if ($ad == 1) {
			$ad_div_bottom = "<div style='width:100%; margin-top:12px; float:left;'>";
			if ($tooltip_ad_trans_image=='n') {
				$ad_div_bottom .= "<a href='".$tooltip_url_word."' target='_blank'>".'<img src="'.$tooltip_ad_word.'" border="0" title="'.$tooltip_url_hint_word.'" /></a>';

			} else {
				$ad_div_bottom .=$tooltip_ad_trans;  
			}
			$ad_div_bottom .= "</div>";
		} else $ad_div_bottom ='';

	return $ad_div_front.$result_msg.$ad_div_bottom; 
}

function print_wordlist_PC($word,$cnt,$tlang) 
{
	global $G_path_dn_image,$G_path_audio;
 
		$max_word = sizeof($word);
		$dict = '';  $k=0;

		for ($i=0; $i<$max_word;$i++) { 
			if ($word[$i]['voca'] <> '') {
				if ($k== 1) { $bg_color = 'white'; $k =0; } else { $bg_color = '#F6F6F6'; $k =1;}
				$audio_word = $G_path_audio.addslashes(str_replace(" ","%20",$word[$i]['voca']));
				if ($cnt ==1) {
					$dict .=fill_space($word[$i]['voca']).' '.$word[$i]['means'].' ('.$word[$i]['part'].' - '.$word[$i]['level'].")&nbsp;&nbsp;";
				} else { 

					$dict .="<tr height='50px' bgcolor='$bg_color'><td style='width:20%; padding-left:10px;'><span class='word_circle'></span><a href=\"javascript:audio_play_tooltip('$audio_word',0)\">";
					$dict .="<span class='ajax_list_word'>".$word[$i]['voca']."</span></a></td><td width='60%'><span class='ajax_list_means'>";
					$meaning = $word[$i]['means'];
/* 					if ($tlang=='ar' or $tlang=='fa') {
						$meaning = disp_means_arabic($word[$i]['means']);
					} else {
						$meaning = $word[$i]['means'];
					} */
					$dict .= $meaning."</span></td><td width='20%'><span><small>".$word[$i]['part']." - ".$word[$i]['level']."</small>";
 					if ($word[$i]['means'] <> '')  {
						$dict .= "<span class='tooltip_dn'><img onclick='save_word(this,1)' src='".$G_path_dn_image."' /></span>";
					} 

					$dict .= "</span></td></tr>";

				}
			}
		} 
		if ($dict!='')	$dict = result_print($dict,$cnt);
		return $dict;
}

function print_wordlist_Mobile($word,$cnt,$tlang) 
{
	global $G_path_dn_image,$G_path_audio;
		$max_word = sizeof($word);
		$dict = ''; $k=0;
		 	
		for ($i=0; $i<$max_word;$i++) { 
			if ($word[$i]['voca'] <> '') {
				if ($k == 1) { $bg_color = 'white'; $k =0; } else { $bg_color = '#F6F6F6'; $k =1;}
				$audio_word = $G_path_audio.addslashes(str_replace(" ","%20",$word[$i]['voca']));
				if ($cnt ==1) {
					$dict .=fill_space($word[$i]['voca']).' '.$word[$i]['means'].' ('.$word[$i]['part'].' - '.$word[$i]['level'].")&nbsp;&nbsp;";
				} else {
					
					$dict .="<tr height='50px' bgcolor='$bg_color'><td style='width:100%; padding-left:10px;'><span class='word_circle'></span><a href=\"javascript:audio_play_tooltip('$audio_word',0)\">";
					$dict .="<span class='ajax_list_word'>".$word[$i]['voca']."</span></a>&nbsp;&nbsp;";
					$dict .="<small>-&nbsp;&nbsp;".$word[$i]['part']." (".$word[$i]['level'].")</small>";
					
					$dict .="<br><span class='ajax_list_means_mobile'>";
					$meaning = $word[$i]['means'];
					if ($tlang=='ar' or $tlang=='fa') {
						$meaning = disp_means_arabic($word[$i]['means']);
					} else {
						$meaning = $word[$i]['means'];
					}
					$dict .= $meaning;
					if ($word[$i]['means'] <> '') {
						$dict .= "<span class='tooltip_dn'><img onclick='save_word(this,1)' src='".$G_path_dn_image."' width='20' height='25' /></span>"; 
					}

					$dict .="</span></td></tr>";
			
				}
			}
		} 
		if ($dict != '')	$dict = result_print($dict,$cnt);
		return $dict;
}


function result_print($dict,$cnt) {
	$div = '';
	if ($cnt == 1) $div = $dict;
	else $div ="<div style='background:#fff; width:100%'><table cellpadding='0' cellspacing='0' width='100%'><tbody>".$dict."</tbody></table></div>";
	$dict =$div;
	return $dict;
}

function print_idiomlist_PC($word,$cnt,$tlang) 
{
		global $G_path_dn_image,$G_path_audio;
		
		$max_idiom = sizeof($word);
		$tra=''; $k=1; // 추출된 이디움 리스트
		
		for ($i=0; $i<$max_idiom;$i++) { 
			if (isset($word[$i]['idiom']) and $word[$i]['idiom'] <> '') {
				if ($k == 1) { $bg_color = 'white'; $k =0; } else { $bg_color = '#F6F6F6'; $k =1;}
				$audio_word = $G_path_audio.addslashes(str_replace(" ","%20",$word[$i]['idiom']));
				if ($cnt ==1) {
					$tra .=fill_space($word[$i]['idiom']).' '.$word[$i]['means'].' ('.$word[$i]['level'].")&nbsp;&nbsp;";	
				} else {

					$tra .="<tr height='50px' bgcolor='$bg_color'><td width='30%'>&nbsp;&nbsp;<span class='word_circle'></span>&nbsp;<a href=\"javascript:audio_play_tooltip('$audio_word',0)\">";
					$tra .="<span class='ajax_list_word'>".$word[$i]['idiom']."</span></a></td><td width='50%'>";
					$tra .="<span class='ajax_list_means'>";
					if ($tlang=='ar' or $tlang=='fa') {
						$meaning = disp_means_arabic($word[$i]['means']);
					} else {
						$meaning = $word[$i]['means'];
					}
					$tra .= $meaning;
					$tra .= "</span></td><td width='20%'><small>".$word[$i]['level']."</small>";
 					if ($word[$i]['idiom'] <> '')  {
						$tra .= "<span class='tooltip_dn'><img onclick='save_word(this,1)' src='".$G_path_dn_image."'  width='20' height='25' /></span>"; 
					}	

					$tra .= "</span></td></tr>";					

				}
			}
		}
		return $tra;
}

function print_idiomlist_Mobile($word,$cnt,$tlang) 
{
	global $G_path_dn_image,$G_path_audio;

		$max_idiom = sizeof($word);
		$tra=''; $k=1;
		for ($i=0; $i<$max_idiom;$i++) { 
			if ($word[$i]['idiom'] <> '') {
				if ($k == 1) { $bg_color = 'white'; $k =0; } else { $bg_color = '#F6F6F6'; $k =1;}
				$audio_word = $G_path_audio.addslashes(str_replace(" ","%20",$word[$i]['idiom']));
				if ($cnt ==1) {
					$tra .=fill_space($word[$i]['idiom']).' '.$word[$i]['means'].' ('.$word[$i]['level'].")&nbsp;&nbsp;";	
				} else {
					$tra .="<tr height='50px' bgcolor='$bg_color'><td style='width:100%; padding-left:10px;'><span class='word_circle'></span><a href=\"javascript:audio_play_tooltip('$audio_word',0)\">";
					$tra .="<span class='ajax_list_word'>".$word[$i]['idiom']."</span></a>&nbsp;&nbsp;";
					$tra .="<small>-&nbsp;&nbsp;(".$word[$i]['level'].")</small><br />&nbsp;";
					$tra .="<span class='ajax_list_means_mobile'>";
					if ($tlang=='ar' or $tlang=='fa') {
						$meaning = disp_means_arabic($word[$i]['means']);
					} else {
						$meaning = $word[$i]['means'];
					}
					$tra .= $meaning;
				
 					if ($word[$i]['idiom'] <> '') {
						$tra .= "<span class='tooltip_dn'><img onclick='save_word(this,1)' src='".$G_path_dn_image."' width='20' height='25' /></span>";  
					} 

					$tra .="</span></td></tr>";					

				}
			}
		}
		return $tra;
}

function print_result_api_text($api_array,$word,$cnt,$direction,$tlang)
{
	global $G_path_tooltip,$G_path_dn_image;
		$G_path_dn_image = $G_path_tooltip.'assets/images/dn_won.png';
		
		$tra = ''; $dict='';
		$word_array = $api_array['contents']['words']['relative_words'];
		if ($word_array <> '') {
			if ($direction==0) $dict = print_wordlist_PC($word_array,$cnt,$tlang) ;
			else $dict = print_wordlist_Mobile($word_array,$cnt,$tlang) ;
		}
		$word_array = $api_array['contents']['idioms']['relative_idioms'];
		if ($word_array <> '') {		
			if ($direction==0) $tra = print_idiomlist_PC($word_array,$cnt,$tlang) ;
			else $tra = print_idiomlist_Mobile($word_array,$cnt,$tlang) ;
		}
		$word_array='';
		$div='';
		if ($tra !='') {
 			if ($cnt == 1) {
					$div.= $tra;
			} 	else {
				$la="<br /><br /><span style='padding-left:10px; backgroud:#fff;'><small>* Relative Idioms</small><br /></span>";
				$div .=$la."<div style='backgroud:#fff; width:100%'><table cellpadding='0' cellspacing='0' width='100%'><tbody>".$tra."</tbody></table></div>";
			}
			$tra =$div;
		}		
		

		return $dict.$tra;
}


function Google_MS_trans_button($slang,$tlang,$vExam) 
{
	global $G_path_tooltip;
	$trans = "<div class='ajax_trans_site'><a onclick=\"tooltip_trans_site(0,'".$slang."','".$tlang."','".addslashes($vExam)."')\" style='cursor:pointer;'><img src='".$G_path_tooltip."images/t_ms_m.png' title='MS Bing'></a><a onclick=\"tooltip_trans_site(1,'".$slang."','".$tlang."','".addslashes($vExam)."')\" style='cursor:pointer;'><img src='".$G_path_tooltip."images/t_g_m.png' title='Google'></a></div>";
	return $trans;
}

	// echo "access test local";exit();
	//$word = trim(stripslashes(strip_tags($_REQUEST['q'])));
	$word  = ( isset($_REQUEST['q']) ? trim(stripslashes(strip_tags($_REQUEST['q']))) : '' );	
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
			exit ( '||Access is forbidden. 4010 - Nothing text.'); 
	} 

/*  	$tlang = $_REQUEST['tlang']; //target language 
	$slang = $_REQUEST['slang']; //source language 		
	$engin = ( isset($_REQUEST['engin']) ? $_REQUEST['engin'] : 1 );
	$level = ( isset($_REQUEST['level']) ? $_REQUEST['level'] : 21 );
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 );
	$wordcount = $_REQUEST['space_cnt'];
	 */

	$tlang = ( isset($_REQUEST['tlang']) ? $_REQUEST['tlang'] : '' );  //target language
	$slang = ( isset($_REQUEST['slang']) ? $_REQUEST['slang'] : '' ); //source language
	$engin = ( isset($_REQUEST['engin']) ? $_REQUEST['engin'] : 1 );	
	$level = ( isset($_REQUEST['level']) ? $_REQUEST['level'] : 21 );	// none user in tooltip_word
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 );
	$wordcount =  ( isset($_REQUEST['space_cnt']) ? $_REQUEST['space_cnt'] : 1 ); 
	
	require_once '../commonUtils/setting_config.php';
	 
	$ACCESS_TOKEN_PARAMETERS = array(
		"slang"=>$slang, 
		"tlang"=>$tlang, 
		"q"=>$word,
		"level"=>$level,
		"d"=>$direction		
	); 



	
	$data_string = '';
	foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
	$data_string = rtrim($data_string, '&');

	$ch = curl_init($get_text_url);
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

	
	$trans = '';
	if (!$result_api) {
		$result_api = 'Access fail : '.$direction.' / '.$wordcount."<br>".$word; 
	} else {
		if ($slang <> $tlang) {

			if ($want_pay_translation) {
		//**************************** paid function *********************
				 require_once 'api_dic_tooltip_pay_trans.php';  //$get_trans_url
				// $trans = translation_word($apikey,$word,$engin,$slang,$tlang,$level,$get_trans_url,$direction);			 
		//**************************** paid function *********************
			} else {
					$trans = Google_MS_trans_button($slang,$tlang,$word); // 번역 결과	
			} 
		} else {
				$trans =  "<br />";
		}
		
		$result = json_decode($result_api,true);
		require_once '../commonUtils/setting_vocadb.php';
	

		$api_text= print_result_api_text($result,$word,$wordcount,$direction,$tlang); 
		
		$result='';
		$result_api = "<div class='ajax_table_inner'>".$api_text .'</div>' ;
		


	}		
		
	
	echo add_text_ad($trans.$result_api);
	
?>