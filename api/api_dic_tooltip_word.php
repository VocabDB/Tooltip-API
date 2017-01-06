<?php
ini_set('display_errors',1); 
error_reporting(E_ALL); 
header('Content-Type: application/json; charset=UTF-8'); 

// http://appsmithing.com/dic/api/api_dic_tooltip_word.php?q=Manager&slang=en&tlang=ko&d=0

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


function Show_website_word($word,$tlang)
{
			$url = '';
			switch ($tlang) {
				case 'ar' : $url = "http://hamariweb.com/dictionaries/arabic-english-dictionary.aspx?eu=".$word; break;
				case 'bg' : $url = "http://kbedic.sourceforge.net/cgi-bin/obedic.cgi?word=".$word."&translate=Translate&encin=windows-1251&encout=windows-1251"; break;
				case 'cs' : $url = "http://slovnik.seznam.cz/en-cz/word/?q=".$word."&id=TZBrio3OvzY="; break;
				case 'de' : $url = "http://www.dict.cc/?s=".$word; break;
				case 'el' : $url = "http://www.babylon.com/definition/".$word."/Greek"; break; 
				case 'es' : $url = "http://www.spanishdict.com/translate/".$word; break;
				case 'fa' : $url = "http://www.farsidic.com/en/Lang/EnFa/".$word; break;
				case 'fr' : $url = "http://www.larousse.fr/dictionnaires/anglais-francais/".$word; break;
				case 'hi' : $url = "http://hindi-english.org/index.php?input=".$word."&trans=Translate&direction=AU";break;
				case 'hr' : $url = "http://www.dict.com/Croatian-English/".$word; break;
				case 'hu' : $url = "http://angol-magyar-szotar.hu/".$word.".html"; break;
				case 'id' : $url = "http://kamusbahasainggris.org/kamusbahasainggris.php?k=".$word."&e=Inggris+ke+Indonesia"; break;
				case 'it' : $url = "http://dictionary.reverso.net/english-italian/".$word; break;
				case 'ja' : $url = "http://www.weblio.jp/content/".$word; break; //"http://dictionary.goo.ne.jp/leaf/ej3/34633/m0u/".$word;
				case 'ko' : $url = "http://small.dic.daum.net/search.do?q=".$word; break; 
				case 'ms' : $url = "http://www.kamus.com/eng-may/".$word; break;
				case 'pl' : $url = "http://en.bab.la/dictionary/english-polish/".$word; break;
				case 'pt' : $url = "http://michaelis.uol.com.br/moderno/ingles/index.php?lingua=ingles-portugues&palavra=".$word; break;
				case 'ro' : $url = "http://hallo.ro/search.do?l=en&type=both&query=".$word."&d=en"; break;
				case 'ru' : $url = "http://translate.academic.ru/".$word."/ru/"; break;
				case 'sv' : $url = "http://folkets-lexikon.csc.kth.se/folkets/folkets.en.html#lookup&".$word; break;
				case 'ta' : $url = "http://www.tamildict.com/english.php?action=search&word=".$word; break;
				case 'th' : $url = "http://dict.longdo.com/search/".$word; break;
				case 'tl' : $url = "https://www.tagalog-dictionary.com/search?word=".$word; break;
				case 'tr' : $url = "http://tureng.com/search/".$word; break;
				case 'uk' : $url = "http://www.englishukrainiandictionary.com/en/dictionary-english-ukrainian/".$word; break;
				case 'vi' : $url = "http://vdict.com/".$word.",1,0,0.html"; break;  //http://v2.vdict.com/arrest,1,0,0.html
				case 'zh-CN' : $url = "http://www.iciba.com/".$word; break; // 'http://www.baidu.com/from=844b/s?word='.$word.'&ts=8532172&sa=ih_1&ms=1&ss=01';break; //
				case 'zh-TW' : $url = "http://cdict.net/?q=".$word; break; 
//*****************************************************************************				
				case 'fi' : $url = "http://www.suomienglantisanakirja.fi/english.php#/".$word; break;	
				case 'da' : $url = "https://en-da.dict.cc/?s=".$word; break;
//*****************************************************************************					
				default : $url = Dict_Url_word_us($word); break; //en 포함
			}
	return $url;
}

function Dict_Url_word_us($word)
{
	global $Nation;
	$cnt = substr_count($word," ");
				if ($cnt == 0) {
					$url = "http://wordnetweb.princeton.edu/perl/webwn?s=".$word;
				} else {
					$url= "http://www.wordreference.com/en".$Nation."/".$word;
				}
	return $url;
}

function comment_language($num)
{
	global $G_message;

	$msg = '';
	$j = array_search($num,$G_message); //array_search 결과값(index, key)가 reture 됨.
	if ($j <> false ) 	$msg = $j;

	return $msg;
}

function Request_meaing_word($url,$word,$slang,$tlang)
{	
		global $G_message;
		
		$wordnet_url = "http://wordnetweb.princeton.edu/perl/webwn?s=".$word;
		$wordnet = "<button class='button_request_web_ajax' onmousedown='request_meaning(".'"'.$word.'"'.")' onclick=\"javascript:window.open('".$wordnet_url."'".")\">WordNet</button>";
		$go_url = "<button class='button_request_dic_ajax' onmousedown='request_meaning(".'"'.$word.'"'.")' onclick=\"javascript:window.open('".$url."'".")\">Dict</button>";
		$str = "<br>";
		$comment = 'Join Dictionary Improvement ';
		$str .= "<div class='no_meaning_ajax'>".$comment.$wordnet.$go_url."<button class='button_request_ajax' onmousedown='request_meaning(\"".$word."\")'>Fill up</button>";
		$str .= "</div>";
	
		return $str;
}


function Print_No_result($word,$slang,$tlang)
{

		$url = Show_website_word($word,$tlang);
		$str = "<span class='ajax_word'>".$word."</span><br>";
		$str .= Request_meaing_word($url,$word,$slang,$tlang);
		return $str;
}

function print_result_word_ajax($api_array,$word_source,$slang,$tlang) 
{
	global $G_path_tooltip, $G_path_audio,$G_path_small_image;
	require_once '../commonUtils/setting_vocadb.php';
	
			$search_result = "<span class='ajax_word'>".$api_array['word']['voca']."</span><span class='ajax_pos'>(";

			if ($tlang=='ar' or $tlang=='fa') {
				$meaning = disp_means_arabic($api_array['word']['means']);
			} else {
				$meaning = disp_means($api_array['word']['means']);
			}
			if ($word_source <> '' and $api_array['word']['voca'] <> $word_source) {
				if (ucfirst($api_array['word']['voca']) <> $word_source) {  // lcfirst() can be over 5.4 version of PHP
					$search_result .= $word_source.', ';   // 원본 출력
				} 
			}

			// 임시로 레벨 space제거, 아랍권 언어 때문. DB level 변경하면 제거함. (json_db)
			$search_result .= $api_array['word']['part'];
			
			if($tlang <> $slang) { 
				$s=str_replace(" ","",$api_array['word']['level']); 
				$search_result .= " - ".$s.")";
			} else { $search_result .=')'; }  //en-en 인경우 레벨 제거
			$search_result .= '</span>';

			$audio_word = $G_path_audio.$api_array['word']['voca'];			
			$search_result .= "<span class='voca_sound_word' ><a href='javascript:audio_play_tooltip(\"".$audio_word."\",0)'><img src='".$G_path_audio_image."' border='0' /></a></span>";
// 		Save a word.
			$save_word = true;  // 검색한 단어를 저장하기 위함.	
			if ($meaning <> '' and $save_word) {
			
				$search_result .= "<span class='voca_save_word' ><img onclick='save_word(this,0)' src='".$G_path_dn_image."' border='0' /></span>";	//
			}
			
			if ($api_array['word']['image'] <> '') { 
				$search_result .='<div class="voca_word_img"><img src="'.$G_path_small_image.$api_array['word']['image'].'.jpg'.'"></div>';
			} 


			
			$search_result .= "<br /><div class='ajax_means'>".$meaning."</div>";

		return $search_result;

}


function print_AD($word, $means) {
//***********  Tooltip 광고 영역 ***************//
		require_once 'ad/api_tooltip_ad.php';
//*********************************************//	
/* 		$audio_word = $audio_path.$word;
		$tooltip_AD_MSG = "<a href='".$tooltip_url_voca."' class='ajax_ad' target='_blank'><img src='".$tooltip_image_ad.$tooltip_ad_voca."' title='".$tooltip_url_hint_voca."'></a>"." |";
	
		return $audio_word."|".$tooltip_AD_MSG.$search_result; */
		$tooltip_result = "<a href='".$tooltip_url."' target='_blank'><img src='".$tooltip_ad."' border='0' title='".$tooltip_url_hint."' /></a>"." |";
//전면 광고		
		$ad_div ='';
		$audio_path = 'http://www.vocadb.co.kr/dic_media/audio/usw/';
		$audio_word = $audio_path.$word;
		if ($tooltip_ad_word <> '')
			$ad_div = "<div style='width:100%;backgroud:#fff; margin-bottom:5px; zindex:100;'><a href='".$tooltip_url_word."' target='_blank'><img src='".$tooltip_ad_word."' border='0' title='".$tooltip_url_hint_word."' /></a></div>";
		if ($tooltip_ad <> '') {
			$tooltip_result = "<a href='".$tooltip_url."'  class='ajax_ad' target='_blank'><img src='".$tooltip_ad."' title='".$tooltip_url_hint."' border='0' /></a>"." |";
		} else {
			$tooltip_result = "<a href='".$tooltip_url_voca."'  class='ajax_ad' target='_blank'><img src='".$tooltip_ad_voca."' title='".$tooltip_url_hint_voca."' border='0' /></a>"." |";
		}

		$result = $audio_word."|".$tooltip_result.$search_result.$ad_div;	
		return $result; 
}

function add_text_ad($result_msg) 
{

//***********  Tooltip 광고 영역 ***************//
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
				$ad_div_bottom .=$tooltip_ad_trans;  // iframe 등
			}
			$ad_div_bottom .= "</div>";
		} else $ad_div_bottom ='';

	return $ad_div_front.$result_msg.$ad_div_bottom; 
}
//////////////////////////////////////////////////////////////////////////
	if (!$_SERVER['HTTP_USER_AGENT']) {
		echo "<h2>403 Forbidden this access </h2>"; 
		exit; 
	}
	if (!isset($_REQUEST['q']) && empty($_REQUEST['q'])) { 
			echo '||<div class="ajax_means">Access is forbidden. 4010 - Nothing text.</div>'; 
			exit ; 
	} 
  	

	
 	$word  = ( isset($_REQUEST['q']) ? trim(stripslashes(strip_tags($_REQUEST['q']))) : '' );
	$tlang = ( isset($_REQUEST['tlang']) ? $_REQUEST['tlang'] : 'en' );  //target language
	$slang = ( isset($_REQUEST['slang']) ? $_REQUEST['slang'] : 'en' ); //source language
//	$level = ( isset($_REQUEST['level']) ? $_REQUEST['level'] : 21 );	// none user in tooltip_word
	$direction =  ( isset($_REQUEST['d']) ? $_REQUEST['d'] : 0 ); 

/*  		$result_api = '<div class="ajax_means">'.$word.' <br>Language Problem : Slang='.$slang.' / '.'Tlang= '.$tlang.'</div>';
		echo add_text_ad($result_api);
		exit; */
		
	if ($tlang =="" or $slang=="") {
		$result_api = '<div class="ajax_means">Language Problem : Slang='.$slang.' / '.'Tlang= '.$tlang.'</div>';
		echo add_text_ad($result_api);
		exit;
	}
	if (strlen(trim($word)) < 3) {
		$result_api = '<div class="ajax_means">Shorted text : '.$word.'</div>';
	} else {
		
			require_once '../commonUtils/setting_config.php';
			
			$ACCESS_TOKEN_PARAMETERS = array(
				"slang"=>$slang, 
				"tlang"=>$tlang, 
				"q"=>$word,
				"d"=>$direction
			); 


			$data_string = '';
			foreach($ACCESS_TOKEN_PARAMETERS as $key=>$value) { $data_string .= $key.'='.$value.'&'; }
			$data_string = rtrim($data_string, '&');


			$ch = curl_init($get_word_url);
	
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
//print_r($result_api);
			if (!$result_api) {
				$result_api = '<div class="ajax_means">Access fail </div>';
			} else {
				
				$api = json_decode($result_api,true);
					
				if ($api['type'] > 0 and $api['contents'] > 0) {
					$api_array = $api['contents'];
			
					$result_api = print_result_word_ajax($api_array,$word,$slang,$tlang);
				} else {
					echo $word.$slang.$tlang;
print_r($result_api);						
					$result_api =Print_No_result($word,$slang,$tlang);
				} 
			}
	} 

	echo add_text_ad($result_api);

?>
