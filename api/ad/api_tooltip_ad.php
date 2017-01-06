<?php
//***********  Tooltip 광고 영역 ***************//
//
//*********************************************//
$Url_ad = 'images/';
$tooltip_ad_voca = $Url_ad.'tooltip_ad.png';  // api/ad/images/ full name을 주어야 한다. book xml에서 에러 발생함
$tooltip_url_voca = 'http://www.vocabdb.com/Main';  //광고주 웹사이트
$tooltip_url_hint_voca = 'vocaDB'; 
$ad=0;

if ($ad==1) {
		$tooltip_ad =  $Url_ad.'tooltip_ad.png';  // full name을 주어야 한다. 
		$tooltip_url = 	'http://www.vocabdb.com/Main';  //광고주 웹사이트
		$tooltip_url_hint = 'vocaDB';
	// for a word
		$tooltip_ad_word =  $Url_ad.'tooltip_ad_word.png';  // full name을 주어야 한다. 
		$tooltip_url_word = 	'https://www.goobne.co.kr/menu/menu.htm';  //광고주 웹사이트
		$tooltip_url_hint_word = '굽네치킨';
	// for text
		$tooltip_ad_trans_image='y';  // y or n   image, iframe 등 다양하게 활용한다.
		$tooltip_ad_trans = "<iframe id='banner_main' width='100%' src='http://ar.donga.com/RealMedia/ads/adstream_sx.ads/www.gamedonga.co.kr/sub@Top1' frameborder='0' scrolling='no' framespacing='0' hspace='0' marginheight='0' marginwidth='0' vspace='0' allowTransparency='true'></iframe>";  
		$tooltip_url_trans = 'https://www.goobne.co.kr/menu/menu.htm'; //광고주 웹사이트
		$tooltip_url_hint_trans = '굽네치킨'; 

}  else {

		$tooltip_ad = '';  // full name을 주어야 한다. book xml에서 에러 발생함
		$tooltip_url = 	'';  //광고주 웹사이트
		$tooltip_url_hint = '';

		$tooltip_ad_word = '';  // full name을 주어야 한다. book xml에서 에러 발생함
		$tooltip_url_word = '';  //광고주 웹사이트
		$tooltip_url_hint_word = '';

		$tooltip_ad_trans_image='n';
		$tooltip_ad_trans = '';  // full name을 주어야 한다. book xml에서 에러 발생함
		$tooltip_url_trans = '';  //광고주 웹사이트
		$tooltip_url_hint_trans = '';

} 
?>
