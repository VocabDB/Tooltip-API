<?php
	$nation_array = array( 'ko', 'ar', 'ja', 'zh-CN', 'zh-TW');
	if ($slang != 'en') $sl = $slang;	
	else	$sl = $tlang;

	if ($sl=='zh-CN') $sl='zh_CN';
	elseif ($sl=='zh-TW') $sl='zh_TW';
		
	if (!in_array($sl, $nation_array, true)) $sl = 'en'; 
	
	$msg_ar = array('نحن بحاجة إلى مشاركتكم لهذه الكلمة'=>'1','تاريخ تحسين قاموس'=>'2',"Non-English word's length must have mininum 6 bytes (2 letters)"=>'3'); 
	$msg_ko = array('신규단어를 만들어 주세요'=>'1','사용자 참여단어'=>'2','최소 2자 이상이여야 합니다.'=>'3'); 
	$msg_en = array('We need your participation for this word'=>'1','Join Dictionary Improvement'=>'2',"Non-English word's length must have mininum 6 bytes (2 letters)"=>'3');
	$msg_zh_CN = array('我们需要您的参与这个词'=>'1','加入词典改进'=>'2',"Non-English word's length must have mininum 6 bytes (2 letters)"=>'3');
	$msg_zh_TW = array('我們需要您的參與這個詞'=>'1','加入詞典改進'=>'2',"Non-English word's length must have mininum 6 bytes (2 letters)"=>'3');
	$msg_ja = array('私たちは、この言葉のためのあなたの参加を必要とします'=>'1','辞書改善に参加'=>'2',"Non-English word's length must have mininum 6 bytes (2 letters)"=>'3');

	try {
		$G_message = ${'msg_'.$sl} ; 
	} catch (Exception $e) {
		echo 'Caught exception in MSG: ',  $e->getMessage(), "\n";
	}	

?>
