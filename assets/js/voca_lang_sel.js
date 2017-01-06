var input_langselect = $('.vocadb_lang_select');
var input_hidden = $("#tlang");
var lang_list = new Array('ar', 'hy', 'bn', 'bg', 'zh-CN', 'zh-TW', 'hr', 'cs', 'da', 'nl', 'en', 'tl', 'fi', 'fr', 'ka', 'de', 'el', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'ms', 'no', 'fa', 'pl', 'pt', 'ro', 'ru', 'sl', 'es', 'sv', 'ta', 'th', 'tr', 'uk', 'vi');

var iconStyle = 'normal';
var voca_scripts = document.getElementsByTagName('script');
for( k in voca_scripts )
{
	if( typeof(voca_scripts[k]) == 'object' )
	{
		if( voca_scripts[k].hasAttribute('icon-style') )
		{
			iconStyle = voca_scripts[k].getAttribute('icon-style')
		}
	}
}

// var flagslang = '<div id="lang_select_languages"> <div class="language-selector-box-wrapper"> <div class="vocadb_container-fluid un-voca"> <div class="voca_row voca_div1"> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ar"> <span class="voca_flag_20 flag_ar_20"></span> <span class="text_lang">Arabic</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hy"> <span class="voca_flag_20 flag_hy_20"></span> <span class="text_lang">Armenian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="bn"> <span class="voca_flag_20 flag_bn_20"></span> <span class="text_lang">Bengali</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="bg"> <span class="voca_flag_20 flag_bg_20"></span> <span class="text_lang">Bulgarian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="zh-CN"> <span class="voca_flag_20 flag_zh-CN_20"></span> <span class="text_lang">‪简体中文</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="zh-TW"> <span class="voca_flag_20 flag_zh-TW_20"></span> <span class="text_lang">‪繁體中文</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hr"> <span class="voca_flag_20 flag_hr_20"></span> <span class="text_lang">Croatian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="cs"> <span class="voca_flag_20 flag_cs_20"></span> <span class="text_lang">Czech</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="da"> <span class="voca_flag_20 flag_da_20"></span> <span class="text_lang">Danish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="nl"> <span class="voca_flag_20 flag_nl_20"></span> <span class="text_lang">Dutch</span></div> </div> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="en"> <span class="voca_flag_20 flag_en_20"></span> <span class="text_lang">English</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="tl"> <span class="voca_flag_20 flag_tl_20"></span> <span class="text_lang">Filipino</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fi"> <span class="voca_flag_20 flag_fi_20"></span> <span class="text_lang">Finnish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fr"> <span class="voca_flag_20 flag_fr_20"></span> <span class="text_lang">French</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ka"> <span class="voca_flag_20 flag_ka_20"></span> <span class="text_lang">Georgian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="de"> <span class="voca_flag_20 flag_de_20"></span> <span class="text_lang">German</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="el"> <span class="voca_flag_20 flag_el_20"></span> <span class="text_lang">Greek</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hi"> <span class="voca_flag_20 flag_hi_20"></span> <span class="text_lang">Hindi</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hu"> <span class="voca_flag_20 flag_hu_20"></span> <span class="text_lang">Hungarian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="id"> <span class="voca_flag_20 flag_id_20"></span> <span class="text_lang">Indonesian</span></div> </div> </div> <div class="voca_row voca_div1"> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="it"> <span class="voca_flag_20 flag_it_20"></span> <span class="text_lang">Italian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ja"> <span class="voca_flag_20 flag_ja_20"></span> <span class="text_lang">Japanese</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ko"> <span class="voca_flag_20 flag_ko_20"></span> <span class="text_lang">Korean</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ms"> <span class="voca_flag_20 flag_ms_20"></span> <span class="text_lang">Malay</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="no"> <span class="voca_flag_20 flag_no_20"></span> <span class="text_lang">Norwegian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fa"> <span class="voca_flag_20 flag_fa_20"></span> <span class="text_lang">Persian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="pl"> <span class="voca_flag_20 flag_pl_20"></span> <span class="text_lang">Polish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="pt"> <span class="voca_flag_20 flag_pt_20"></span> <span class="text_lang">Portuguese</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ro"> <span class="voca_flag_20 flag_ro_20"></span> <span class="text_lang">Romanian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ru"> <span class="voca_flag_20 flag_ru_20"></span> <span class="text_lang">Russian</span></div> </div> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="sl"> <span class="voca_flag_20 flag_sl_20"></span> <span class="text_lang">Slovenian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="es"> <span class="voca_flag_20 flag_es_20"></span> <span class="text_lang">Spanish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="sv"> <span class="voca_flag_20 flag_sv_20"></span> <span class="text_lang">Swedish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ta"> <span class="voca_flag_20 flag_ta_20"></span> <span class="text_lang">Tamil</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="th"> <span class="voca_flag_20 flag_th_20"></span> <span class="text_lang">Thai</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="tr"> <span class="voca_flag_20 flag_tr_20"></span> <span class="text_lang">Turkish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="uk"> <span class="voca_flag_20 flag_uk_20"></span> <span class="text_lang">Ukrainian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="vi"> <span class="voca_flag_20 flag_vi_20"></span> <span class="text_lang">Vietnamese</span></div> </div><input style="z-index:1001" type="checkbox" onchange="reverse_lang(this)" id="voca_reverse_tlang"/> <label for="voca_reverse_tlang"> Reverse</label> </div> <span id="lang_close" onclick="close_flags()">&times;</span> </div> </div> </div>';

// $('body').append(flagslang);
$(document).ready(function(){
	initialize_lang( input_langselect );
	// $('body').append(flagslang);
});

//set image flag on button, then set on input-hidden

//voca_reverse_tlang
function reverse_lang( e , dunhide )
{
	// console.log( e.checked );
	var temp = '';
	var checking = 0;
	if(e.checked)
	{
		temp = $('#slang').val();
		$('#slang').val( $('#tlang').val() );
		$('#tlang').val( temp );
		// input_langselect.popover('hide');
		checking = 1;
	}
	else
	{
		temp = $('#slang').val();
		$('#slang').val( $('#tlang').val() );
		$('#tlang').val( temp );
		// input_langselect.popover('hide');
		checking = 0;
	}
	
	lang_setCookie_reverse(checking);
	if(!dunhide)
	{
		setTimeout(function() { input_langselect.popover('hide'); }, 100);
	}
	// console.log( 'tlang = '+$('#tlang').val() + ' slang =' + $('#slang').val() );
	// input_langselect.popover('hide');
	// $('#voca_reverse_tlang').checked = true;
}
//voca_reverse_tlang
function set_flag( tlang )
{
	if( iconStyle == 'mini' )
	{
		$('.elem_holder').html( "<span class='voca_flag_20 flag_"+tlang+"_20'></span>" );
	}
	else
	{
		$('.elem_holder').html( "<span class='voca_flag_35 flag_"+tlang+"_35'></span>" );
	}
	
	input_hidden.val( tlang );
	$('#slang').val( 'en' );
	lang_setCookie( tlang );
}


//Cookies
function lang_setCookie(cvalue)
{
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "voca_web_tlang = " + cvalue + "; " + expires;
}
function lang_setCookie_reverse(cvalue)
{
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = "voca_web_reverse = " + cvalue + "; " + expires;
}
function lang_readCookie() {
    var nameEQ = "voca_web_tlang=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "undefined";
}
function lang_readCookie_reverse() {
    var nameEQ = "voca_web_reverse=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "undefined";
}

//Browser language
function get_browserlang()
{
	var language = window.navigator.userLanguage || window.navigator.language;
	var tlang = language.split("-");

	if(tlang[0] == 'zh')
	{
		return language;
	}
	else
	{
		return tlang[0];
	}
}

//initial function
function initialize_lang( input_langselect )
{
	var is_touch_device = "ontouchstart" in window;
	// console.log(is_touch_device);
	input_langselect.on('click',function(e){
		e.preventDefault();
		// console.log('clicked @ ini');
	});
	input_langselect.append('<div class="elem_holder"><span class="voca_flag_35"></span></div> ');
	//popover from bootstrap
	input_langselect.popover({
		animation: true,
		container: 'body',
		template: '<div class="special-class popover"  role="tooltip" style="color: black;"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
		content: '<div class="language-selector-box-wrapper"> <div class="vocadb_container-fluid un-voca"> <div class="voca_row voca_div1"> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ar"> <span class="voca_flag_20 flag_ar_20"></span> <span class="text_lang">Arabic</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hy"> <span class="voca_flag_20 flag_hy_20"></span> <span class="text_lang">Armenian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="bn"> <span class="voca_flag_20 flag_bn_20"></span> <span class="text_lang">Bengali</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="bg"> <span class="voca_flag_20 flag_bg_20"></span> <span class="text_lang">Bulgarian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="zh-CN"> <span class="voca_flag_20 flag_zh-CN_20"></span> <span class="text_lang">Simplified<!--‪简体中文--></span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="zh-TW"> <span class="voca_flag_20 flag_zh-TW_20"></span> <span class="text_lang">Traditional<!--‪繁體中文--></span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hr"> <span class="voca_flag_20 flag_hr_20"></span> <span class="text_lang">Croatian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="cs"> <span class="voca_flag_20 flag_cs_20"></span> <span class="text_lang">Czech</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="da"> <span class="voca_flag_20 flag_da_20"></span> <span class="text_lang">Danish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="nl"> <span class="voca_flag_20 flag_nl_20"></span> <span class="text_lang">Dutch</span></div> </div> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="en"> <span class="voca_flag_20 flag_en_20"></span> <span class="text_lang">English</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="tl"> <span class="voca_flag_20 flag_tl_20"></span> <span class="text_lang">Filipino</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fi"> <span class="voca_flag_20 flag_fi_20"></span> <span class="text_lang">Finnish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fr"> <span class="voca_flag_20 flag_fr_20"></span> <span class="text_lang">French</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ka"> <span class="voca_flag_20 flag_ka_20"></span> <span class="text_lang">Georgian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="de"> <span class="voca_flag_20 flag_de_20"></span> <span class="text_lang">German</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="el"> <span class="voca_flag_20 flag_el_20"></span> <span class="text_lang">Greek</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hi"> <span class="voca_flag_20 flag_hi_20"></span> <span class="text_lang">Hindi</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="hu"> <span class="voca_flag_20 flag_hu_20"></span> <span class="text_lang">Hungarian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="id"> <span class="voca_flag_20 flag_id_20"></span> <span class="text_lang">Indonesian</span></div> </div> </div> <div class="voca_row voca_div1"> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="it"> <span class="voca_flag_20 flag_it_20"></span> <span class="text_lang">Italian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ja"> <span class="voca_flag_20 flag_ja_20"></span> <span class="text_lang">Japanese</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ko"> <span class="voca_flag_20 flag_ko_20"></span> <span class="text_lang">Korean</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ms"> <span class="voca_flag_20 flag_ms_20"></span> <span class="text_lang">Malay</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="no"> <span class="voca_flag_20 flag_no_20"></span> <span class="text_lang">Norwegian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="fa"> <span class="voca_flag_20 flag_fa_20"></span> <span class="text_lang">Persian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="pl"> <span class="voca_flag_20 flag_pl_20"></span> <span class="text_lang">Polish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="pt"> <span class="voca_flag_20 flag_pt_20"></span> <span class="text_lang">Portuguese</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ro"> <span class="voca_flag_20 flag_ro_20"></span> <span class="text_lang">Romanian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ru"> <span class="voca_flag_20 flag_ru_20"></span> <span class="text_lang">Russian</span></div> </div> <div class="voca_row voca_div3 voca_div2"> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="sl"> <span class="voca_flag_20 flag_sl_20"></span> <span class="text_lang">Slovenian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="es"> <span class="voca_flag_20 flag_es_20"></span> <span class="text_lang">Spanish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="sv"> <span class="voca_flag_20 flag_sv_20"></span> <span class="text_lang">Swedish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="ta"> <span class="voca_flag_20 flag_ta_20"></span> <span class="text_lang">Tamil</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="th"> <span class="voca_flag_20 flag_th_20"></span> <span class="text_lang">Thai</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="tr"> <span class="voca_flag_20 flag_tr_20"></span> <span class="text_lang">Turkish</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="uk"> <span class="voca_flag_20 flag_uk_20"></span> <span class="text_lang">Ukrainian</span></div> <div class="flags_on_click" onmousedown="flags_on_clicked(this)" data-value="vi"> <span class="voca_flag_20 flag_vi_20"></span> <span class="text_lang">Vietnamese</span></div> </div><input style="z-index:1001" type="checkbox" onchange="reverse_lang(this,0)" id="voca_reverse_tlang"/> <label for="voca_reverse_tlang"> Reverse</label> </div> <span id="lang_close" onclick="close_flags()">&times;</span> </div> </div>',
		placement: 'auto bottom',
		html: true,
		trigger: is_touch_device ? "manual" : "click"
	});
	input_langselect.popover().click(function(e) {
		input_langselect.popover('toggle');
	});
	
	$(window).resize(function () {
		input_langselect.popover('hide').blur();
	});
	
	input_langselect.popover().on('shown.bs.popover', function() { 
		//voca_reverse_tlang
		var lang_reverse = lang_readCookie_reverse();
		if( lang_reverse != "undefined" )
		{
			console.log(lang_reverse);
			if( lang_reverse == 1 )
				document.getElementById("voca_reverse_tlang").checked = true;
			reverse_lang( document.getElementById( 'voca_reverse_tlang' ),1 );
		}
		// if( $('#slang') && $('#tlang') )
		// {
			// if( $('#slang').val() != 'en' && $('#tlang').val() == 'en' )
				// $('#voca_reverse_tlang').prop("checked", true);
		// }

	});
	
	var lang_cookie = lang_readCookie();
	if( lang_cookie != "undefined" )
	{
		set_flag(lang_cookie);
	}
	else
	{
 		var lang = get_browserlang();
		if( lang_checkifexist(lang) )
		{
			set_flag( lang );
		}
		else
		{
			set_flag( 'en' );
		} 
	}
	
}

function flags_on_clicked (e)
{
	var tlang = $(e).attr('data-value');	
	set_flag( tlang );
	close_flags();
	if( typeof( vocaCloseFlag ) === 'function' )
	{
		vocaCloseFlag(tlang);
	}
	setTimeout(function() { close_flags(); }, 100);
}
function close_flags (){
	$('.special-class.popover').remove();
	input_langselect.popover('hide');
}


function lang_checkifexist( lang )
{
	var bool = false;
	for(var i=0;i<lang_list.length;i++)
	{
		if( lang_list[i] == lang )
		{
			bool = true;
		}
	}
	return bool
}
+function ($) {
'use strict';
var Tooltip = function (element, options) {
this.type       = null
this.options    = null
this.enabled    = null
this.timeout    = null
this.hoverState = null
this.$element   = null
this.inState    = null
this.init('tooltip', element, options)
}
Tooltip.VERSION  = '3.3.6'
Tooltip.TRANSITION_DURATION = 150
Tooltip.DEFAULTS = {
animation: true,
placement: 'top',
selector: false,
template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger: 'hover focus',
title: '',
delay: 0,
html: false,
container: false,
viewport: {
selector: 'body',
padding: 0
}
}
Tooltip.prototype.init = function (type, element, options) {
this.enabled   = true
this.type      = type
this.$element  = $(element)
this.options   = this.getOptions(options)
this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
this.inState   = { click: false, hover: false, focus: false }

if (this.$element[0] instanceof document.constructor && !this.options.selector) {
throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
}
var triggers = this.options.trigger.split(' ')
for (var i = triggers.length; i--;) {
var trigger = triggers[i]

if (trigger == 'click') {
this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
} else if (trigger != 'manual') {
var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
}
}
this.options.selector ?
(this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
this.fixTitle()
}
Tooltip.prototype.getDefaults = function () {
return Tooltip.DEFAULTS
}
Tooltip.prototype.getOptions = function (options) {
options = $.extend({}, this.getDefaults(), this.$element.data(), options)
if (options.delay && typeof options.delay == 'number') {
options.delay = {
show: options.delay,
hide: options.delay
}
}
return options
}
Tooltip.prototype.getDelegateOptions = function () {
var options  = {}
var defaults = this.getDefaults()
this._options && $.each(this._options, function (key, value) {
if (defaults[key] != value) options[key] = value
})
return options
}
Tooltip.prototype.enter = function (obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)
}
if (obj instanceof $.Event) {
self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
}
if (self.tip().hasClass('in') || self.hoverState == 'in') {
self.hoverState = 'in'
return
}
clearTimeout(self.timeout)
self.hoverState = 'in'
if (!self.options.delay || !self.options.delay.show) return self.show()
self.timeout = setTimeout(function () {
if (self.hoverState == 'in') self.show()
}, self.options.delay.show)
}
Tooltip.prototype.isInStateTrue = function () {
for (var key in this.inState) {
if (this.inState[key]) return true
}
return false
}
Tooltip.prototype.leave = function (obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)
}
if (obj instanceof $.Event) {
self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
}
if (self.isInStateTrue()) return
clearTimeout(self.timeout)
self.hoverState = 'out'
if (!self.options.delay || !self.options.delay.hide) return self.hide()
self.timeout = setTimeout(function () {
if (self.hoverState == 'out') self.hide()
}, self.options.delay.hide)
}
Tooltip.prototype.show = function () {
var e = $.Event('show.bs.' + this.type)
if (this.hasContent() && this.enabled) {
this.$element.trigger(e)
var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
if (e.isDefaultPrevented() || !inDom) return
var that = this
var $tip = this.tip()
var tipId = this.getUID(this.type)
this.setContent()
$tip.attr('id', tipId)
this.$element.attr('aria-describedby', tipId)
if (this.options.animation) $tip.addClass('fade')
var placement = typeof this.options.placement == 'function' ?
this.options.placement.call(this, $tip[0], this.$element[0]) :
this.options.placement
var autoToken = /\s?auto?\s?/i
var autoPlace = autoToken.test(placement)
if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
$tip
.detach()
.css({ top: 0, left: 0, display: 'block' })
.addClass(placement)
.data('bs.' + this.type, this)
this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.' + this.type)
var pos          = this.getPosition()
var actualWidth  = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (autoPlace) {
var orgPlacement = placement
var viewportDim = this.getPosition(this.$viewport)
placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
	placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
	placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
	placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
	placement
$tip
.removeClass(orgPlacement)
.addClass(placement)
}
var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
this.applyPlacement(calculatedOffset, placement)
var complete = function () {
var prevHoverState = that.hoverState
that.$element.trigger('shown.bs.' + that.type)
that.hoverState = null
if (prevHoverState == 'out') that.leave(that)
}
$.support.transition && this.$tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete()
}
}
Tooltip.prototype.applyPlacement = function (offset, placement) {
var $tip   = this.tip()
var width  = $tip[0].offsetWidth
var height = $tip[0].offsetHeight
var marginTop = parseInt($tip.css('margin-top'), 10)
var marginLeft = parseInt($tip.css('margin-left'), 10)
if (isNaN(marginTop))  marginTop  = 0
if (isNaN(marginLeft)) marginLeft = 0
offset.top  += marginTop
offset.left += marginLeft
$.offset.setOffset($tip[0], $.extend({
using: function (props) {
$tip.css({
top: Math.round(props.top),
left: Math.round(props.left)
})
}
}, offset), 0)
$tip.addClass('in')
var actualWidth  = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (placement == 'top' && actualHeight != height) {
offset.top = offset.top + height - actualHeight
}
var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)
if (delta.left) offset.left += delta.left
else offset.top += delta.top
var isVertical          = /top|bottom/.test(placement)
var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
}
Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
this.arrow()
.css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
.css(isVertical ? 'top' : 'left', '')
}
Tooltip.prototype.setContent = function () {
var $tip  = this.tip()
var title = this.getTitle()
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
$tip.removeClass('fade in top bottom left right')
}
Tooltip.prototype.hide = function (callback) {
var that = this
var $tip = $(this.$tip)
var e    = $.Event('hide.bs.' + this.type)
function complete() {
if (that.hoverState != 'in') $tip.detach()
that.$element
.removeAttr('aria-describedby')
.trigger('hidden.bs.' + that.type)
callback && callback()
}
this.$element.trigger(e)
if (e.isDefaultPrevented()) return
$tip.removeClass('in')
$.support.transition && $tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete()
this.hoverState = null
return this
}
Tooltip.prototype.fixTitle = function () {
var $e = this.$element
if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
$e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
}
}
Tooltip.prototype.hasContent = function () {
return this.getTitle()
}
Tooltip.prototype.getPosition = function ($element) {
$element   = $element || this.$element
var el     = $element[0]
var isBody = el.tagName == 'BODY'
var elRect    = el.getBoundingClientRect()
if (elRect.width == null) {
elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
}
var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null
return $.extend({}, elRect, scroll, outerDims, elOffset)
}

Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
/* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

}
Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
var delta = { top: 0, left: 0 }
if (!this.$viewport) return delta

var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
var viewportDimensions = this.getPosition(this.$viewport)

if (/right|left/.test(placement)) {
var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
if (topEdgeOffset < viewportDimensions.top) { // top overflow
delta.top = viewportDimensions.top - topEdgeOffset
} else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
}
} else {
var leftEdgeOffset  = pos.left - viewportPadding
var rightEdgeOffset = pos.left + viewportPadding + actualWidth
if (leftEdgeOffset < viewportDimensions.left) { // left overflow
delta.left = viewportDimensions.left - leftEdgeOffset
} else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
}
}

return delta
}
Tooltip.prototype.getTitle = function () {
var title
var $e = this.$element
var o  = this.options

title = $e.attr('data-original-title')
|| (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

return title
}
Tooltip.prototype.getUID = function (prefix) {
do prefix += ~~(Math.random() * 1000000)
while (document.getElementById(prefix))
return prefix
}
Tooltip.prototype.tip = function () {
if (!this.$tip) {
this.$tip = $(this.options.template)
if (this.$tip.length != 1) {
throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
}
}
return this.$tip
}
Tooltip.prototype.arrow = function () {
return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
}
Tooltip.prototype.enable = function () {
this.enabled = true
}
Tooltip.prototype.disable = function () {
this.enabled = false
}
Tooltip.prototype.toggleEnabled = function () {
this.enabled = !this.enabled
}
Tooltip.prototype.toggle = function (e) {
var self = this
if (e) {
self = $(e.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(e.currentTarget, this.getDelegateOptions())
$(e.currentTarget).data('bs.' + this.type, self)
}
}
if (e) {
self.inState.click = !self.inState.click
if (self.isInStateTrue()) self.enter(self)
else self.leave(self)
} else {
self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
}
}
Tooltip.prototype.destroy = function () {
var that = this
clearTimeout(this.timeout)
this.hide(function () {
that.$element.off('.' + that.type).removeData('bs.' + that.type)
if (that.$tip) {
that.$tip.detach()
}
that.$tip = null
that.$arrow = null
that.$viewport = null
})
}
function Plugin(option) {
return this.each(function () {
var $this   = $(this)
var data    = $this.data('bs.tooltip')
var options = typeof option == 'object' && option

if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.tooltip
$.fn.tooltip             = Plugin
$.fn.tooltip.Constructor = Tooltip
$.fn.tooltip.noConflict = function () {
$.fn.tooltip = old
return this
}
}(jQuery);
+function ($) {
'use strict';
var Popover = function (element, options) {
this.init('popover', element, options)
}
if (!$.fn.tooltip) { throw new Error('Popover requires tooltip.js') }
Popover.VERSION  = '3.3.6'
Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
placement: 'right',
trigger: 'click',
content: '',
template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
})
Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

Popover.prototype.constructor = Popover

Popover.prototype.getDefaults = function () {
return Popover.DEFAULTS
}
Popover.prototype.setContent = function () {
var $tip    = this.tip()
var title   = this.getTitle()
var content = this.getContent()
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
$tip.find('.popover-content').children().detach().end()[
this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
](content)

$tip.removeClass('fade top bottom left right in')
if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
}
Popover.prototype.hasContent = function () {
return this.getTitle() || this.getContent()
}
Popover.prototype.getContent = function () {
var $e = this.$element
var o  = this.options

return $e.attr('data-content')
|| (typeof o.content == 'function' ?
o.content.call($e[0]) :
o.content)
}
Popover.prototype.arrow = function () {
return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
}
function Plugin(option) {
return this.each(function () {
var $this   = $(this)
var data    = $this.data('bs.popover')
var options = typeof option == 'object' && option

if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.popover

$.fn.popover             = Plugin;
$.fn.popover.Constructor = Popover;
$.fn.popover.noConflict = function () {
$.fn.popover = old
return this
}
}(jQuery);