var bookname = 'VocaEB__Book_Name';
var isMobile = isMobile();
var fn_hider = 'onmousedown="hidetooltip()"';
// if(isMobile)
// {
	// fn_hider = '';
// }
var localStorage_tooltip = '<div id="voca_tooltip" '+fn_hider+'><div id="text_holder"></div></div>';
document.write(localStorage_tooltip);
// var selector = 'website';//website or ebook
// var array_color = ['#FFC7D3','#E6FFC7','#C7ECFF','#FFECB8'];
// var default_color = array_color[2];



function isMobile() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}


function get_localstorage() { //localStorage.clear();
	var stored_words = {};
	for (var key in window.localStorage)
	{
		if( typeof(localStorage[key]) == 'string' && !key.match('VocaEB__') )
		{
			stored_words[key] = localStorage[key];
		}
	}
	return stored_words;
}

function custom_sort() {
	var sorter = Object.keys( get_localstorage() );
	// console.log(sorter);
	sorter.sort(function(a, b){
		return b.split(" ").length - a.split(" ").length; // ASC -> a - b; DESC -> b - a
	});
	return sorter;
}
function change_color_text(oContainer) {
	// var oContainer = '.vocaDB';
	var stored_words = get_localstorage();
	var colored_word = [];
	var sorter = custom_sort();
	// console.log(sorter);
	for (var key in sorter)
	{
		// console.log(colored_word);
		var clearVal = true;
		for(var i=0;i<colored_word.length;i++)
		{
			if( colored_word[i].match(sorter[key].trim()) )
			{
				clearVal = false;
				// console.log('found ' + sorter[key]);
			}
		}
		if(clearVal)
		{
			var html = $(oContainer+':contains(\''+sorter[key]+'\')').html();
			var local_content = stored_words[sorter[key]] ;
			// var color = default_color;
			var meaning = local_content;
			meaning = addBreak(meaning);
			if(html)
			{	
				var event_ = 'onmouseover="showtooltip(event,this,\''+meaning+'\')"';
				var re= new RegExp(sorter[key]+'?' + '(?=[^<>]*(<|$))', 'gi');
				
				html = html.replace(re,'<span class="voca-text-wrap" '+event_+' >'+sorter[key]+'</span> ');
				
				$(oContainer+':contains(\''+sorter[key]+'\')').html(html);
				
				colored_word.push(sorter[key]);
			}
		}
	}
}

var disable_tooltip = true;
function showtooltip(e,a,mean) {
	e.stopPropagation();
	if(disable_tooltip)
	{
		var rect = a.getBoundingClientRect();
		var tooltip = document.getElementById('voca_tooltip');
		if(isMobile)
		{
			tooltip.style.width = '100%';
			tooltip.style.position = 'fixed';
			tooltip.style['border-radius'] = '0px';
			tooltip.style['min-height'] = '4em';

			if( e.clientY < window.innerHeight/2 )
			{
				tooltip.style.top = 'auto';
				tooltip.style.bottom = 0;
			}
			else
			{
				tooltip.style.bottom = 'auto';
				tooltip.style.top = 0;
			}
			tooltip.style.left = 0;
		}
		else
		{
			tooltip.style.top = rect.bottom + window.scrollY +2 + 'px';
			tooltip.style.left = (rect.left - 20) + 'px';
		}
		document.getElementById('text_holder').innerHTML = mean;
		
		tooltip.style.display = 'inline-block';
	}
}
function hidetooltip() {
	document.getElementById('voca_tooltip').style.display = 'none';
}
function edit_text(e) {
	disable_tooltip = false;
	console.log(e.target.onclick);//.target.offsetParent.children[0]
	var text_holder = e.target.previousElementSibling;
	text_holder.innerHTML = '<input class="local_edit_text" type="text" value="'+text_holder.textContent+'"/>';
}
function finish_edit_text(e) {
	console.log(e);
	disable_tooltip = true;
}

// $(document).on('mouseover','.voca-text-wrap',function(e){
	// $(this).children('.voca-tooltip').html($(this).attr('data-trans')).css('display','inline-block');
// }).on('mouseout','.voca-text-wrap',function(e){
	// $(this).children('.voca-tooltip').html($(this).attr('data-trans')).css('display','none');
// });

function setLocalStorage(){
 	var words = ["global financial crisis","financial crisis","financial", "recession", "crunch","cell","arrest","concerned","bailout","Bailout of banks","credit crunch","often called","sound like","no longer"];
	var means = ["체포 재정검거","재정검거", "재정의, 자금의", "1. 체포, 검거 2. 체포하다, 검거하다 3. 억류하다", "1. 위기(의), 중대한 2. 오독오독 깨물다, 저벅저벅 밟다 3. (구어) 핵심, 결정적시기","세포","1. 체포, 검거 2. 체포하다, 검거하다 3. 억류하다","1. 걱정하는, 염려하는 2. 관심을 갖는","1. 탈출 2. (경제) 구제, 기업구제","구제금융","1. 신용경색 2. 신용규제","1. (종종) 흔히 ~로 불리는 2. ~로 알려진","~처럼 들리다","더 이상 ~하지 않다"];
	
	//coloring, not yet finished
	// var new_word = {};
	// for (i = 0; i < words.length; i++) {
		// new_word[ words[i] ] = {
			// 'page_num': '1'
		// };
	// }
	// window.localStorage[bookname] = JSON.stringify(new_word);
	//end coloring

	for (i = 0; i < words.length; i++) {
		window.localStorage[words[i]] = means[i];
	}
}

function addBreak(str) 	{
	if (typeof str != "string")
		return "";
		
		var ret = str;
		var res = str.substr(0, 2);
		if (res=="1.") {
			for(var i=2; i<6; i++)
			ret = ret.split(i+".").join("<br/>"+i + "." );
		}
		return ret;
}
//End LocalStorage
//###########################################################################################
//LocalStorage management
$('.fill-vocadb').one('click',function(e){
	e.preventDefault();
	change_color_text('.vocaDB');
	$( '#bb-bookblock' ).bookblock();
});

$('.fill-local').on('click',function(e){
	e.preventDefault();
	setLocalStorage();
	console.log('saved');
	$('.fill-local').css('display','none');
});

function showLocalStorage()
{
	var stored_value = get_localstorage();
	$("#table_lsdata").empty();
	$("#table_lsdata").append('<tr class="t-header"><td class="t-key">Word</td><td class="t-meaning">Meaning</td><td class="t-options">Options</td></tr>');
	var i = 0;
	for (var key in stored_value)
	{
		i ++;
		var meaning = stored_value[key];
		
		var bgcolor = "bgcolor='#F6F6F6'";
		if( i%2==0)
		{
			bgcolor = "bgcolor='white'";
		}
		var data = "<tr "+bgcolor+" class='t-cell' id='t" + i  + "' voca-key='" + key + "'><td class='t-key'><div class='local_circle'></div> <a href=\"javascript:audio_play('" + key + "',0)\" title=''>" + key + "</a></td><td class='t-meaning'>" + meaning + "</td><td class='t-options'><input type='button' value='Edit' class='t-btn-edit' data-target='t" + i + "'></input> <input type='button' value='Delete' class='t-btn-delete' data-target='t" + i + "'></input> <input style='display: none' type='button' value='Submit' class='t-btn-submit' data-target='t" + i + "'></input></td></tr>";
//$('#result').append(data);
		$("#table_lsdata").append(data);
	}

	$('.t-btn-delete').click(function(){
		var id = $(this).attr("data-target");
		var key = $("#" + id + " td").parent().attr('voca-key');
	
		var r = confirm("Are you sure you want to delete \""+key+"\"?");
		
		if(r)
		{
			window.localStorage.removeItem(key);
			$("#" + id).remove();
		}
	});
	
	$('.t-btn-edit').click(function(){
		var id = $(this).attr("data-target");
		var key = $("#" + id + " td").parent().attr('voca-key');
		// console.log(key);

		var mylocal = get_localstorage();
		var	meaning = mylocal[key];

		// console.log(key);
		$("#edit_word_key").attr("value", key);
		$("#edit_word_meaning").val(meaning);
		$(".popup-edit-word").show();

	});
	
	$('.t-btn-submit').click(function(){
		var id = $(this).attr("data-target");
		var key_old = $("#" + id + "_key").attr("value");
		var key = $("#" + id + "_key").val();
		var meaning = $("#" + id + "_meaning").val();
		
		window.localStorage.removeItem(key_old);
		window.localStorage.setItem(key,meaning);
		
		$("#" + id + " .t-key").html(key);
		
		$("#" + id + " .t-meaning").html(meaning);
		
		$("#" + id + " .t-options .t-btn-submit").hide();
		$("#" + id + " .t-options .t-btn-delete").show();
		$("#" + id + " .t-options .t-btn-edit").show();
	});
	
	$('#t-new').click(function(){
		$("#new_word_key").text("");
		$("#new_word_meaning").text("");
		$(".popup-new-word").show();
		
		showLocalStorage();
	});
	
	$(".popup").fadeIn(500);
	
$(".popup-close").click(function(){
	$(".popup").fadeOut(500);
	$(".popup-new-word").hide();
	$(".popup-edit-word").hide();
});
$(".popup-close-bottom").click(function(){
	$(".popup").fadeOut(500);
	$(".popup-new-word").hide();
	$(".popup-edit-word").hide();
});

}//END showlocal

function hide_word()
{
	$(".popup-close").trigger('click');
}


$(document).ready(function(){
	if(isMobile)
	{
		$('.popup-show').css('display','none');
	}
	$('#edit_word_cancel').click(function(){
		$(".popup-edit-word").hide();
	});
	$('#new_word_cancel').click(function(){
		$(".popup-new-word").hide();
	});
	$('#new_word_save').click(function(){
		var key = $("#new_word_key").val();
		var meaning = $("#new_word_meaning").val();
		
		window.localStorage[key] = meaning;

		showLocalStorage();
		$(".popup-new-word").hide();
		//showResults(2);
	});
	
	$('#edit_word_save').click(function(){
		var key = $("#edit_word_key").attr("value");
		var key_new = $("#edit_word_key").val();
		
		var meaning = $("#edit_word_meaning").val();
		
		if (key != key_new)
			delete localStorage[key];
		window.localStorage[key_new] = meaning;
		
		showLocalStorage();
		$(".popup-edit-word").hide();
		
		//showResults(2);
	});



	$(".popup-show").click(function(){
		// $(".popup").fadeIn(500);
		showLocalStorage()
	});

	if( Object.keys(get_localstorage()).length > 0 )
	{
		$('.fill-local').css('display','none');
	}
	
	$('#search_word_key').keyup(function(){
		var key = $('#search_word_key').val();
		if (key.length == 0)
		{
			$("#table_lsdata .t-cell .t-key").parent('tr').css("display","table-row");
		}
		$("#table_lsdata .t-cell .t-key:not(:voca_contains('" + key + "'))").parent('tr').css("display","none");
		$("#table_lsdata .t-cell .t-key:voca_contains('" + key + "')").parent('tr').css("display","table-row");

	});
	$("#search").append('<input type="button" id="t-new" value="Add new"/>');
});

$(document).on('keyup',function(evt) {
    if (evt.keyCode == 27) {
        $(".popup").fadeOut(500);
		$(".popup-new-word").hide();
		$(".popup-edit-word").hide();
    }
});


$.expr[":"].voca_contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
		var result = true;
		var keys = $(elem).text().toUpperCase();
		var s = arg.toUpperCase();
		for (var i = 0; i < s.length; i++) {
			if( keys.indexOf(s.charAt(i)) < 0 )
			{
				result = false;
			}
		}
		return result;
    };
});