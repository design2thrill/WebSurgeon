/************************************************************
** DocumentName: sampleJquery.js
** Author      : Mahesh Sreedharan
** Version     : 1.2
** Date        : 4/12/2014
** Description : Enables integration with backend server
                 through Json read and implements frontend
                 dragndrop web UI.
*************************************************************/                 
$(document).ready(function(){

jQuery.ajaxSetup({async:false});

var selectCore = ' ';

changeCore('B');

var session = {"orsl":[]};

$.getJSON("ab.json", 'limit=10', preprocessOR);

function preprocessOR(data) {

var sessLen = data.orsl.length;

for(i=0;i<sessLen;i++) {
session.orsl.push({"Core":""+data.orsl[i].Core+"","Num": ""+data.orsl[i].Num+"", "Surgeon": ""+data.orsl[i].Surgeon+"","CRNA1":""+data.orsl[i].CRNA1+"", "CRNA2":""+data.orsl[i].CRNA2+"","CRNA1_Status":""+data.orsl[i].CRNA1_Status+"","CRNA2_Status":""+data.orsl[i].CRNA2_Status+"","Proc":""+data.orsl[i].Proc+"","Time":""+data.orsl[i].Time+""});
};
};

processOR(session);

function processOR(data){
var i=0; 
var sessLen = data.orsl.length;

	for(i=0;i<sessLen;i++) {

		var infoHTML = '';
		var crHTML = '';
		var cr2HTML = '';

		$('.div2').removeClass('dummy1');
		$('.div3').removeClass('dummy2');

		

		if (data.orsl[i].Core == selectCore) { //if stmt alpha
			infoHTML += '<div class="divParent">';
			infoHTML += '<div class="div1">'+ data.orsl[i].Num + '</div> ';
			infoHTML += '<div class="div2 dummy1"></div>';
			infoHTML += '<div class="div3 dummy2"></div>';
			infoHTML += '<div class="div4">' + data.orsl[i].Proc + '</div>';
			infoHTML += '<div class="div5">' + data.orsl[i].Surgeon + '</div>';
			infoHTML += '<div class="div6">' + data.orsl[i].Time + '</div>';
			infoHTML += '</div>';
		
	
			if (infoHTML != '') {
		        $('#orContainer').append(infoHTML);
			};

			if (data.orsl[i].CRNA1 != "" ) {  // if stmt beta
				crHTML += '<li class="touchable">' + data.orsl[i].CRNA1 + '</li>';
			
				if (crHTML != '') {
				$('ul').append(crHTML);
	  			};
		
				$('.dummy1').text(data.orsl[i].CRNA1);
				$('.dummy2').text(data.orsl[i].CRNA2);

				var dumPos = $("div.div1:contains(" + data.orsl[i].Num + ")").position();
				var dumtop = dumPos.top;
				var dumleft = dumPos.left + 52;
				$("li.touchable:contains(" + data.orsl[i].CRNA1 + ")").css({'position':'absolute','height':'20px','width':'135px','top':dumtop,'left':dumleft,'background-color':'rgba(0,128,255,'+0+')'});

				$("li.touchable:contains(" + data.orsl[i].CRNA1 + ")").addClass('dummydrop');
			
				if (data.orsl[i].CRNA1_Status == 'Active' ) {  //if stmt zeta
					$("div.div2:contains(" + data.orsl[i].CRNA1 + ")").css({'background-color':'#0080FF','color':'rgba(255,255,255,'+0+')'});			
				}
				else if (data.orsl[i].CRNA1_Status == 'Break' ) {
					$("div.div2:contains(" + data.orsl[i].CRNA1 + ")").css({'background-color':'#F88379','color':'rgba(255,255,255,'+0+')'});
				}

				else if (data.orsl[i].CRNA1_Status == 'BreakGiven' ) {
					$("div.div2:contains(" + data.orsl[i].CRNA1 + ")").css({'background-color':'#C19A6B','color':'rgba(255,255,255,'+0+')'});
				}; //end of if stmt zeta

		
			}; // end of if stmt beta


			if (data.orsl[i].CRNA2 != "" ) {  // if stmt delta
				cr2HTML += '<li class="touchable">' + data.orsl[i].CRNA2 + '</li>';
			
				if (cr2HTML != '') {
				$('ul').append(cr2HTML);
	  			};
		
				$('.dummy2').text(data.orsl[i].CRNA2);

				var dumPos1 = $("div.div1:contains(" + data.orsl[i].Num + ")").position();
				var dumtop1 = dumPos1.top;
				var dumleft1 = dumPos1.left + 188;
				$("li.touchable:contains(" + data.orsl[i].CRNA2 + ")").css({'position':'absolute','height':'20px','width':'135px','top':dumtop1,'left':dumleft1,'background-color':'rgba(0,128,255,'+0+')'});

				$("li.touchable:contains(" + data.orsl[i].CRNA2 + ")").addClass('dummydrop');
			
				$("div.div3:contains(" + data.orsl[i].CRNA2 + ")").css({'background-color':'#0080FF','color':'rgba(255,255,255,'+0+')'});			
				
		
			}; // end of if stmt delta


		}; // end of if stmt alpha

	}; //end of for()
	

}; //end of processOR()



$(".touchable").mobDraggable();

function changeCore(a) {
	selectCore = a;

}; // end of changeCore()


function saveSession(session) {
var hex='';
var rgb='';
var sessLen = session.orsl.length;

	$('.div1').each(function(i,obj) {

		for(j=0;j<sessLen;j++) { 

			if(session.orsl[j].Num == $(this).text() ){

				session.orsl[j].CRNA1 = $(obj).siblings('.div2').text();
				session.orsl[j].CRNA2 = $(obj).siblings('.div3').text();
				rgb = $(obj).siblings('.div2').css('background-color').match(/\d+/g);
				
				hex = '#'+ Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);

				if (hex == '#080ff') {session.orsl[j].CRNA1_Status = 'Active';};
				if (hex == '#f88379') {session.orsl[j].CRNA1_Status = 'Break';};
				if (hex == '#c19a6b') {session.orsl[j].CRNA1_Status = 'BreakGiven';};
			};

		}; //end for()

	}); //end each()

}; //end saveSession()



function removeORLIST() {

$("#orContainer > div:not(#orHeader)").remove();

$('.dummydrop').remove();

};

$("div.coreName:contains(B)").bind("touchstart",function(){
	saveSession(session);
	removeORLIST();	
	changeCore('B');
	processOR(session);
	$(this).css({'background-color':'#50C878','font-weight':'bold'});
	$("div.coreName:contains(C)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(D)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(GI)").css({'background-color':'#d2d2d2','font-weight':'normal'});

});

$("div.coreName:contains(C)").bind("touchstart",function(){

	saveSession(session);
	removeORLIST();	
	changeCore('C');
	processOR(session);
	$(this).css({'background-color':'#50C878','font-weight':'bold'});
	$("div.coreName:contains(B)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(D)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(GI)").css({'background-color':'#d2d2d2','font-weight':'normal'});
});

$("div.coreName:contains(D)").bind("touchstart",function(){

	saveSession(session);
	removeORLIST();	
	changeCore('D');
	processOR(session);
	$(this).css({'background-color':'#50C878','font-weight':'bold'});
	$("div.coreName:contains(C)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(B)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(GI)").css({'background-color':'#d2d2d2','font-weight':'normal'});
});

$("div.coreName:contains(GI)").bind("touchstart",function(){

	saveSession(session);
	removeORLIST();	
	changeCore('GI');
	processOR(session);
	$(this).css({'background-color':'#50C878','font-weight':'bold'});
	$("div.coreName:contains(C)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(D)").css({'background-color':'#d2d2d2','font-weight':'normal'});
	$("div.coreName:contains(B)").css({'background-color':'#d2d2d2','font-weight':'normal'});
});




});


$.fn.mobDraggable = function() {
  var offset = null;
  var hex = null;
  var a1 = 0;
  var b1 = 0;


var start = function(e) {
    var orig = e.originalEvent;
    var pos = $(this).position();
    offset = {
      x: orig.changedTouches[0].pageX - pos.left,
      y: orig.changedTouches[0].pageY - pos.top
  };
	a1=0;
        var hgt = $(this).height();
	if(hgt <25) {
	var varY = pos.top;
	var yLimit = $("#orContainer div:nth-child(2)").position().top;
	a1 = Math.round((varY - yLimit)/75) + 2;
	b1=pos.left;
	};

}; //End Start()


var moveMe = function(e) {
    e.preventDefault();

    var orig = e.originalEvent;
    var Pos = $(this).position()
    var varX = Pos.left;
    var varY = Pos.top;
    var hgt = $(this).height();
    var string = $(this).text();

    $(this).css("position","absolute");

    $(this).css({
      top: orig.changedTouches[0].pageY - offset.y,
      left: orig.changedTouches[0].pageX - offset.x
    }); //End CSS


	if(varX<=25) {
		$(this).css({ left: orig.changedTouches[0].pageX - offset.x +25});

	};

	if(varX>=450) {
		$(this).css({ left: 325});
	};

	if(varY<=1) {
		$(this).css({ top: 3});
	};

	if(varY>=700) {
		$(this).css({ top: 447});
	};


	if (hgt<25) {
		$(this).css({'background-color':'#0080FF','color':'white'});
		$("div.div2:contains("+string+")").css({'background-color':'white'});
		$("div.div2:contains("+string+")").text("");

		$("div.div3:contains("+string+")").css({'background-color':'white'});
		$("div.div3:contains("+string+")").text("");
	};

}; //End moveMe

var endMe = function(e) {
    e.preventDefault();
    var orig = e.originalEvent;

    var hgt = $(this).height();
    var Pos = $(this).position();
    var varX = Pos.left;
    var varY = Pos.top;

	if(varX<=25) {
	      $(this).css({ left: 26});

    	};

	if(varX>=450) {
      		$(this).css({ left: 325});
    	};

   	if(varY<=1) {
      		$(this).css({ top: 3});
    	};

	if(varY>=700) {
      		$(this).css({ top: 447});
    	};

	var posLimit = $("#orContainer").position();
	var xLimit = posLimit.left;
	var yLimit = $("#orContainer div:nth-child(2)").position().top;
	var a = Math.round((varY - yLimit)/75) + 2;

	if ( ((varX >= xLimit + 30 - 173) && hgt > 25) || ((varX >= xLimit + 30 - 173) && hgt < 25 && (varX>b1||varX<b1)) ) {

		var string = $(this).text();
		
		if(!$.trim( $("div#orContainer div:nth-child("+a+") div:nth-child(2)").html() ).length) {

			var left = $("div#orContainer div:nth-child("+a+") div:nth-child(2)").position();
			var lef = left.left;
			var topp = left.top;
			$(this).css({'height':'20px', 'width':'135px'});
			
			$(this).addClass('dummydrop');				

			$("div#orContainer div:nth-child("+a+") div:nth-child(2)").html(string);

			$("div.div2:contains("+string+")").css({'background-color':'#0080FF','color':'rgba(255,255,255,'+0+')'});
			$(this).css('left',lef);
			$(this).css('top',topp);
			$(this).css('background-color','rgba(0,128,255,'+0+')');

			var rgb1 = $("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color').match(/\d+/g);
			var hex1 = '#'+ Number(rgb1[0]).toString(16) + Number(rgb1[1]).toString(16) + Number(rgb1[2]).toString(16);

			if (hex1 == "#c19a6b") { //If Lion then change back to blue
				$("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color','#0080ff');
			};

			$('.chngStat').hide();
		}

		else if(!$.trim( $("div#orContainer div:nth-child("+a+") div:nth-child(3)").html() ).length) { //if stmt deuce

			var left = $("div#orContainer div:nth-child("+a+") div:nth-child(3)").position();
			var lef = left.left;
			var topp = left.top;

			$(this).addClass('dummydrop');

			$(this).css({'height':'20px', 'width':'135px'});
			$("div#orContainer div:nth-child("+a+") div:nth-child(3)").html(string);
			$("div.div3:contains("+string+")").css({'background-color':'#0080FF','color':'rgba(255,255,255,'+0+')'});
			$(this).css('left',lef);
			$(this).css('top',topp);
			$(this).css('background-color','rgba(0,128,255,'+0+')');

			var rgb = $("div#orContainer div:nth-child("+a+") div:nth-child(2)").css('background-color').match(/\d+/g);
			var hex = '#'+ Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);

			if (hex == "#f88379") {  //If Red then change to Lion color

				$("div#orContainer div:nth-child("+a+") div:nth-child(2)").css('background-color','#c19a6b');
			};

			if(a1!=0) {  //if stmt love
			   var rgb1 = $("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color').match(/\d+/g);
			   var hex1 = '#'+ Number(rgb1[0]).toString(16) + Number(rgb1[1]).toString(16) + Number(rgb1[2]).toString(16);
		
			   if (hex1 == "#c19a6b") { //If Lion then change back to blue
				$("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color','#0080ff');

			   };
			};// end if stmt love
		
		//$('.chngStat').hide();

		}; //end if stmt deuce

	}

	else if (varX < 126) {

		$(this).removeClass('dummydrop');

		$(this).css({'width':'173px','height':'50px','position':'relative','top':'1px','left':'1px'});

		var rgb = $("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color').match(/\d+/g);
		var hex = '#'+ Number(rgb[0]).toString(16) + Number(rgb[1]).toString(16) + Number(rgb[2]).toString(16);

		if (hex == "#c19a6b") { //If Lion then change back to blue
		$("div#orContainer div:nth-child("+a1+") div:nth-child(2)").css('background-color','#0080ff');
		};

		$('.chngStat').show();
	};

}; //End endMe()

  
$('ul').delegate('li','touchstart',start);
$('ul').delegate('li','touchmove',moveMe);
$('ul').delegate('li','touchend',endMe);

}; //End plugin


/*
We have the following lists:

touches: A list of information for every finger currently touching the screen
targetTouches: Like touches, but is filtered to only the information for finger touches that started out within the same node
changedTouches: A list of information for every finger involved in the event (see below) To better understand what might be in these lists, let’s go over some examples quickly
They vary in the following pattern:

When I put a finger down, all three lists will have the same information. It will be in changedTouches because putting the finger down is what caused the event
When I put a second finger down, touches will have two items, one for each finger. targetTouches will have two items only if the finger was placed in the same node as the first finger. changedTouches will have the information related to the second finger, because it’s what caused the event
If I put two fingers down at exactly the same time, it’s possible to have two items in changedTouches, one for each finger
If I move my fingers, the only list that will change is changedTouches and will contain information related to as many fingers as have moved (at least one).
When I lift a finger, it will be removed from touches, targetTouches and will appear in changedTouches since it’s what caused the event
Removing my last finger will leave touches and targetTouches empty, and changedTouches will contain information for the last finger*/

