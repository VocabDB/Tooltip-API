// This is tooltip.js for Dictionary Clone
var sel_txt_color = '#F5FDC8';
function tooltip_direction() {
		var but_dir = 0;
		if( $('#input_direction').length )
		{
			but_dir = $('#input_direction').val();
		} else if (Mobile) {
			but_dir = 1; 
		}
		return but_dir; 
}

function tooltip_request(str,slang,tlang,space_cnt,engin, audio) {
/* 
var scripts = $('script[src*="voca_tooltip.js"]')[0].src.split('/');
var tolink = '';
for(var i=0;i <= scripts.length-4; i++){tolink += scripts[i]+'/';}
 */
var xmlhttp;
var level = getSelectedVal('input_level');
var direction = 1;

	if(document.getElementById('input_direction'))
		direction = document.getElementById('input_direction').value;

	if (window.XMLHttpRequest)  {
		xmlhttp=new XMLHttpRequest();
	} else  {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4)
		{
			isrunning = false;
		}
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			
			vocaDBmean=Extract_audio_word(xmlhttp.responseText);
			var but_dir = tooltip_direction();
			var txt_close = '<span class="close btn" onclick="remove_layer()"><i class="icon-remove"></i></span>';
			var drag_div = "<div id='drag_div' onmousedown='mouseclick_mobilelayer(event)' onmouseup='voca_mobile_layer_move=false' onmouseout='voca_mobile_layer_move=false' onmousemove='dragin(event)'></div>";
			if (space_cnt > 1) {
				str = str.substr(0,70)+'...';
				document.getElementById('vocaDB_layer').innerHTML = vocaDBmean[1]+drag_div+txt_close+"<span class='ajax_source'>"+str+"</span><br />"+vocaDBmean[2];
			} else {
				document.getElementById('vocaDB_layer').innerHTML = vocaDBmean[1]+drag_div+txt_close+vocaDBmean[2];
			}
			var tooltipdn_y = $('.ajax_ad').css('height').replace(/[^-\d\.]/g, '') - 35;
			if(tooltipdn_y < 10){tooltipdn_y = 10;}
				
			window.getSelection().removeAllRanges();
		}
	}

	if (space_cnt == 1 && slang=='en') { 
		msg =  "api/api_dic_tooltip_word.php?slang="+slang+"&tlang="+tlang+"&q="+str+'&d='+direction;  
	} else {
		msg =  "api/api_dic_tooltip_text.php?q="+encodeURI(str, 'UTF-8')+'&engin='+engin+'&slang='+slang+'&tlang='+tlang+'&level='+level+'&space_cnt='+space_cnt+'&d='+direction;
	}
	
	xmlhttp.open("post",msg,true);
	xmlhttp.send();
}

function save_word(e,num)
{
	var word='';
	var mean='';
	if (num ==0 ) {
		// console.log( $(e) );
		word = $(e).parent('.voca_save_word').siblings('.ajax_word').text().replace(/\(.*/,'').trim();
		mean = $(e).parent('.voca_save_word').siblings('.ajax_means').text().trim();
	} else {
		word = $(e).closest('tr').find('.ajax_list_word').text().replace(/\(.*/,'').trim();
		mean = $(e).closest('tr').find('.ajax_list_means').text().trim();
	}

	if(word != '' && mean != '')
	{
		save_localstorage(word,mean);
		alert( word + " saved" );
	}
}

function audio_play_tooltip(word_audio) {
var sound_word;
var IE = /*@cc_on!@*/false; 
var voca_audio = word_audio.toLowerCase();

		sound_word = voca_audio.trim()+'.mp3';

		if (!IE)  {
			var audio = new Audio(sound_word);
			audio.play();
		} else {	
			document.all.voca_sound.src= sound_word;
		}
}
		
function Extract_audio_word(msg) {
    var res = msg.split("|");

    return res; 
}

function getSelectedVal(objID) {
	var tmpObj = document.getElementById(objID);
	if(tmpObj)
	{
		if(tmpObj.value)
		{
			return tmpObj.value;
		}
	}
	else
	{
		if( objID == 'slang' )
			return 'en';
		else if( objID == 'input_level' )
			return 21;
		else if ( objID == 'tlang' )
			return 'ko';
	}
}


function remove_layer() {
	$("#vocaDB_layer").remove();
	$("#vocadb_pop_up").css('display','none');
	$("#voca_tooltip").css('display','none');
	$("#vocadb_drag_layer").css('display','none');
}

function vocaDBlayer(searchword,e) {
		var engin=1;
		var maxword = 150;
		
		var slang  = getSelectedVal('slang'); 
		var space_cnt=0;

		var audio = false;
		var but_dir = tooltip_direction();
		remove_layer();
		var search_Word = searchword;
		if(!search_Word)
		{
			return false;
		}

        search_Word = search_Word.replace(/[\.\*\?;!()\+,\[:\]<>^_`\[\]{}~\\\/\"\=]/g, " "); 
        search_Word = search_Word.replace(/\s+/g, " ");
		search_Word = search_Word.replace(/’s/g, " ");
		search_Word = search_Word.replace(/'s/g, " "); 
		search_Word = search_Word.trim();
	
        if (search_Word != null && search_Word.replace("/\s/g", "").length > 1) {

			if ($("#vocaDB_layer").length == 0) {
				var tlang = 'en';
				if(document.getElementById('tlang'))
					tlang = document.getElementById('tlang').value;		
				var title = 'detail more';
				

				space_cnt = search_Word.split(/[ -]/).length;
				
				if (Mobile && but_dir==1) device = '_mobile'; else device = ''; 
				
				var image_loc = 'http://vocabdb.com/images/';
				
				var loading_img = "<img id='vocadb_loading_img' src='"+image_loc+"loading.gif'/>";
				
				if (space_cnt <= 1) {
					vocaDB_div ="<div id='vocaDB_layer' class='un-voca voca_only"+device+"'>"+loading_img+"</div>";		
				} else {
					if (!Mobile) {
						vocaDB_div ="<div id='vocaDB_layer' class='un-voca voca_trans"+device+"'>"+loading_img+"</div>";
					} else {
						vocaDB_div ="<div id='vocaDB_layer' class='un-voca voca_trans"+device+"'></div>";
					}

				}

				$('body').append(vocaDB_div);
				var this_font = Nation_font(tlang);
				$('#vocaDB_layer').css('font-family',this_font);
		
				if (space_cnt > maxword) { 
					search_Word =  search_Word.substr(0,maxword-1);
				} else {
					tooltip_request(search_Word,slang,tlang,space_cnt,engin,audio);
				}
			}
		
			
			$("#vocaDB_layer").map(function() {
			
				if (Mobile && but_dir==1) 
				{
					var y = window.pageYOffset + 72
					if(screen.width < 400 ) 
						$(this).css({'left' : 0, 'top' : y });
					else 
					{
						var myleft = (screen.width - 400) / 2;
						$(this).css({'left' : myleft+'px', 'top' : y });
					}
				}
				else 
				{
					y = e.pageY-10; 
					if (space_cnt <= 1) 
					{
						y = y+25;
						if($(window).width()/2 < e.pageX)
							x = e.pageX - 250;
						else
							x = e.pageX-50;
					}
					else 
					{
						x='20%';
					}
					$(this).css({'left' : x,'top' : y});
				}
			});

		
        } 
	};
 
function search_vocaDB( areaClass,  target, audio) {
	document.body.setAttribute('spellcheck', false); 
	var openPopup_Ad = function() {
			window.open("");
    };
	
	var openPopup = function(search_Word) {
		
        var searchUrl;
		var tlang  = document.getElementById('tlang').value;
		var level = getSelectedVal('input_level');
		var slang  = getSelectedVal('source_lang'); 
        searchUrl = "../search.php?level="+level+"&seldic=0&slang="+slang+"&&tlang="+tlang+"&q=" + search_Word;  

        if (target =='new')  {
        	window.open(searchUrl, 'voca_DB');
        } else {
            if (target == "self") {
                window.location.href = searchUrl;
            } else {
				window.open(searchUrl, target, "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=915,height=760,top=300,left=300");
			}
        } 
    };
	var image_loc = 'http://vocabdb.com/images/';
	
	var popup_vocadb = '<div id="vocadb_pop_up" unselectable="on"><ul><li class="logo_img"><span><img src="'+image_loc+'logo_icon_white.png"/></span></li><li id="special_border_vocadb"> &nbsp; </li><li><span class="context_change" data-color="FFC7D3" style="background-color:#FFC7D3;"></span></li><li><span class="context_change" data-color="E6FFC7" style="background-color:#E6FFC7"></span></li><li><span class="context_change" data-color="C7ECFF" style="background-color:#C7ECFF"></span></li><li><span class="context_change" data-color="FFECB8" style="background-color:#FFECB8"></span></li></ul></div>';
	$('body').append(popup_vocadb);
	var voca_tooltip_donotclose = false;

	var area;
	if( areaClass.charAt(0) != '.' || areaClass.charAt(0) != '#' )
	{
		area = "." + areaClass;
	}
	else if ( areaClass )
	{
		area = areaClass;
	}
	else
	{
		area = "body";
	}
	
	var gettext = '';
	if(Mobile)
	{
		var selectionEndTimeout = '',clicked = false;
		
		
		$(area).on('click',function(e){
			if( isrunning ){isrunning = false;return false; }
			isrunning = true;
			
			if( check_unvoca() ){return false;}
			if( e.target.className.match('voca-text-wrap') )
			{
				remove_layer();
				return false;
			}
			
			var selected_text = detectSelectedText(e);
			if(typeof(selected_text) == 'object')
			{
				var clicked_gettext = selected_text['text'];
				var range = selected_text['range'];
				if(clicked_gettext != '')
				{
					if (window.getSelection && document.createRange) {
						var sel = window.getSelection();
						sel.addRange(range);
					}
					highlight('#F5FDC8');
					vocaDBlayer(clicked_gettext,e);
					clicked = true;
				}
				hidemenu_();
			}
			else
			{
				isrunning = false;
			}
		});
		document.addEventListener("selectionchange", function (e) {
			if (selectionEndTimeout) {
				clearTimeout(selectionEndTimeout);
			}
			selectionEndTimeout = setTimeout(function () {
				if( check_unvoca() ){gettext = '';return false;}
				selectionEndTimeout = '';
				var selected_text = getSelectedText(e);
				gettext = selected_text;
				if( gettext != '' && clicked == false)
				{
					showmenu_(e);
				}
				else
				{
					hidemenu_();
				}
				clicked = false;
			}, 500);
		}, true);
	}
	else
	{
		$(area).dblclick(function(e){
			if( isrunning ){ isrunning = false;return false; }
			isrunning = true;
			
			if( check_unvoca() ){return false;}
			if( e.target.className.match('voca-text-wrap') )
			{
				return false;
			}
			hidemenu_();
			gettext = getSelectedText();
			//change_color(sel_txt_color);  // Never use it. occured a bug on input or textbox.			
			vocaDBlayer(gettext,e);
		});
		$(area).mouseup(function(e){	
			if( check_unvoca() ){return false;}
			gettext = getSelectedText();
			if(gettext != '')
			{
				showmenu_(e);
			}
			else if(voca_tooltip_donotclose)
			{
				hidemenu_();
				voca_tooltip_donotclose = false;
			}
			else
			{
				hidemenu_();
				remove_layer();
			}
		});
		$(area).on("mousedown","#vocaDB_layer",function(){
			voca_tooltip_donotclose = true;
		});
	}
	
	var selected_start=0,selected_finsh=0,selected_node;
	function showmenu_( e )
	{
		var selection = getORange();
		if( selection.anchorNode.parentNode.className.match('voca-text-wrap') )
		{
			return false;
		}
		
		var selected_txt = selection.getRangeAt(0);
		var oRange = selected_txt.getBoundingClientRect();
		var posX = (((oRange.right - oRange.left)/2)+oRange.left)-120;
		
		var scrollY = (window.scrollY) ? window.scrollY : document.documentElement.scrollTop;
		var posY = oRange.bottom + 30 + scrollY;
		if(posX < 0)
		{
			posX = 10;
		}
 		$('#vocadb_pop_up').css({
			'display' : 'block',
			'top' : posY,
			'left' : posX //e.pagex
		});
		selected_start = selected_txt.startOffset;
		selected_finsh = selected_txt.endOffset;
		selected_node = selection.anchorNode;
		gettext = getSelectedText();

	}
	
	function hidemenu_()
	{
		$('#vocadb_pop_up').css('display','none');
		gettext = '';
	}
	
	$('#vocadb_pop_up').on('click',function(e){
		hidemenu_();
	});
	$('#vocadb_pop_up .logo_img').on('click',function(e){
		change_color(sel_txt_color);
		vocaDBlayer(gettext,e);
		hidemenu_();
	});
	$('#vocadb_pop_up .context_change').on('click',function(e){
		gettext = getSelectedText();

		var color = '#' + $(this).attr('data-color');
		change_color(color);
		window.getSelection().removeAllRanges();
	});
	
	function change_color(color)
	{
		highlight(color);
	}
	function check_unvoca()
	{
		if( $(getORange().anchorNode ).parents().hasClass('un-voca') )
		{
			window.getSelection().removeAllRanges();
			return true;
		}
	}
}

function save_localstorage(txt,mean)
{
	if(!window.localStorage[txt] && mean != '')
	{
		window.localStorage[txt] = mean;
	}
}

function save_localstorage_color( bookname,txt,color,page_num ) {
	var stored_words = get_localstorage_tooltip(bookname);
	var means = '';
	var new_word = {};
		new_word[txt] = {
		'color': color,
		'page_num': page_num
	};
	
	var not_same_word = true;
	for (var key in stored_words)
	{
		if( txt == key )
		{
			not_same_word = false;
			stored_words[key].color = new_word.color;
		}
	}
	
	if( not_same_word )
	{
		stored_words[txt] = new_word;
	}
	if(window.localStorage)
	{
		window.localStorage[bookname] = JSON.stringify(stored_words);
	}
}

function get_localstorage_tooltip(bookname) {
	var stored_words = [];
	if(localStorage != null)
	{
		if(localStorage[bookname]){
			stored_words = JSON.parse(localStorage[bookname]);
		}
	}
	return stored_words;
}


function tooltip_trans_site(engin,slang,tlang,Trans) {
	var vUrl = '';
 
	if (engin == 0) {
		if (tlang == 'zh-CN') {
			tlang = 'zh-CHS';
		} else if(tlang == 'zh-TW' ) {
			tlang = 'zh-CHT';
		} 
		vUrl = 'http://www.bing.com/translator/default.aspx?'+'from='+slang+'&to='+tlang+'&text='+encodeURI(Trans);
//alert(vUrl);		
	} else {
		vUrl = 'http://translate.google.com/#'+slang+'/'+tlang+'/'+encodeURI(Trans);
	}
	if (/mobile/i.test(navigator.userAgent)) {  window.location.assign(vUrl); } 
	else  { window.open(vUrl); }
}

function makeEditableAndHighlight(colour) {
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
}

function highlight(colour) {
    var range, sel;
    if (window.getSelection) {
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
}

function getORange()
{
	if(window.getSelection)
        return window.getSelection();
    else if(document.getSelection)
        return document.getSelection();
    else if(document.selection)
        return document.selection;
    return "";
}	

function getSelectedText(){
    if(window.getSelection())
        return window.getSelection().toString();
    else if(document.getSelection)
        return document.getSelection();
    else if(document.selection)
        return document.selection.createRange().text;
    return "";
}

function detectSelectedText(e){
	var t = '';
	s = window.getSelection();
	if ( s.rangeCount > 0 ) {
		var range = s.getRangeAt(0);
		var node = s.anchorNode;
		var focusSet = s.focusOffset;
		while (range.toString().indexOf(' ') != 0 && range.startOffset > 0) {
			range.setStart(node, (range.startOffset - 1));
		}

		var i = 1;
		if (range.startOffset == 0)
		{
			i = 0;
		}
		range.setStart(node, range.startOffset + i);
		while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length) {
			range.setEnd(node, range.endOffset + 1);
		}
		
			if( range.toString().charAt(range.toString().length-1) ==' ' )
			{
				range.setEnd(node, range.endOffset - 1);
			}
			if( range.toString().charAt(0) == ' ' )
			{
				range.setStart(node, (range.startOffset + 1));
				while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '' && range.endOffset < node.length) {
					range.setEnd(node, range.endOffset + 1);
				}
				if( range.toString().charAt(range.toString().length-1) ==' ' )
				{
					range.setEnd(node, range.endOffset - 1);
				}
			}
		t = range.toString().trim();

		var toreturn = new Object();
		toreturn['text'] = t;
		toreturn['range'] = range;
		return toreturn;
	}
	return 'nope';
}

var voca_mobile_layer_move = false,voca_layer_transcheck = false;
var voca_mobile_layer_left = 0,voca_mobile_layer_top = 0;
function dragin(e)
{	
	var w = e.target.clientWidth;
	var x = 4 + (window.innerWidth/100 * 1.7);
	if(voca_layer_transcheck) {x=1;}
	
 	if(voca_mobile_layer_move)
	{
		$('#vocaDB_layer').css({
			'position': 'absolute',
			'top': (e.pageY - 0 ) - (e.target.clientHeight -(e.target.clientHeight - voca_mobile_layer_top)) +'px',
			'left': (e.pageX - x ) - (e.target.clientWidth -( e.target.clientWidth - voca_mobile_layer_left)) +'px'
		});
		voca_tooltip_donotclose = true;
	}
}

function mouseclick_mobilelayer(e)
{
	voca_tooltip_donotclose = true;
	voca_mobile_layer_move=true;
	
	voca_mobile_layer_left = e.offsetX;
	voca_mobile_layer_top = e.offsetY;

	if( e.target.offsetParent.className == 'voca_trans' ){voca_layer_transcheck = true;}else{voca_layer_transcheck = false;}
}


function checkMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
function Nation_font(tlang)
{
	var font_array = {"ar":"Tahoma", "hy":"Arial,Tahoma,Verdana,sans-serif", "bn":"TonnyBanglaMJ, SolaimanLipi, Times, serif", "bg":"Times New Roman", "zh-CN":'"microsoft yahei", simhei, arial, sans-serif', "zh-TW":'"PT Mono",Courier,"微軟正黑體","Microsoft JhengHei"', "hr":"Arial,Tahoma,Verdana,sans-serif", "cs":'"Arial CE",Arial,"Helvetica CE",Helvetica,helvetica,sans-serif', "da":"Arial,Tahoma,Verdana,sans-serif", "nl":"Arial,Tahoma,Verdana,sans-serif", "en":"sans-serif", "tl":"Arial,Verdana,Tahoma", "fi":"Arial,Tahoma,Verdana,sans-serif", "fr":'Arial,"Trebuchet MS",Helvetica,sans-serif', "ka":"Arial,Tahoma,Verdana,sans-serif", "de":"arial,helvetica,sans-serif", "el":'arial, helvetica, lucida sans, "arial unicode ms", "code2000", verdana, sans-serif', "hi":"Verdana,Arial,Helvetica", "hu":"Verdana, Arial, Helvetica, sans-serif", "id":"Verdana, Georgia, Arial, sans-serif", "it":"Arial", "ja":"游ゴシック, 'Yu Gothic', YuGothic, 'Lucida Grande', 'ヒラギノ角ゴ ProN W3', HiraKakuProN-W3, 'ヒラギノ角ゴ Pro W3', HiraKakuPro-W3, メイリオ, Meiryo,  'ＭＳ Ｐゴシック', 'MS PGothic'", "ko":"'Malgun Gothic','맑은 고딕','Apple SD Gothic Neo',AppleGothic,Dotum,'돋움',Arial,sans-serif", "ms":"verdana, arial, helvetica, sans-serif", "no":"rial,Tahoma,Verdana,sans-serif", "fa":"Helvetica,Tahoma,Sans-Serif,'Segoe UI'", "pl":'"Helvetica Neue", Helvetica, Arial, sans-serif', "pt":"Verdana, arial, Helvetica, sans-serif", "ro":"'Roboto', sans-serif", "ru":"Helvetica, Arial, Tahoma, sans-serif", "sl":"Arial,Tahoma,Verdana,sans-serif", "es":"Helvetica Neue,Helvetica,Arial,sans-serif", "sv":"verdana, arial", "ta":"Arial,Tahoma,Verdana", "th":"Arial,Helvetica,sans-serif", "tr":'Segoe UI,Lucida Grande,DejaVu Sans,"Helvetica Neue",Helvetica,Arial,sans-serif', "uk":"arial, helvetica, sans-serif", "vi":"Arial,Helvetica,sans-serif"};
	var result = "Arial";
	if(tlang in font_array)
	{
		result = font_array[tlang]
	}
	return result;
}
var Mobile = checkMobile();
var isrunning = false;