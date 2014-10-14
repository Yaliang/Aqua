/*
 * Author: Yaliang Wang
 * Last update: Sep 30, 2014, 13:25
 *
 */
$(document).ready(function(){
	if (localStorage["ops"] == undefined) {
		var ops = ["#op1","#op3"];
		localStorage["ops"]=JSON.stringify(ops);
	}
	var ops = JSON.parse(localStorage["ops"]);
	$("#op-group").children().each(function() {
		$(this).hide();
	})
	for (var i = 0; i < ops.length; i++) {
		$("#set > #set-group >"+ops[i]).addClass("active");
		$("#op-group > "+ops[i]).show();
	};

	$("#jquery_jplayer_0").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3: "http://m.onlineclock.net/silent.mp3"
			});
		},
		swfPath: "./Scripts",
		solution: "flash, html",
		supplied: "mp3",
		loop: true
	});
});

function playAudio(source,time) {		// function to play audio element after time (ms) delay, HTML5 required
	var myPlayer = $("#jquery_jplayer_0");
	myPlayer.jPlayer('play');
	// for case MP3
	var t =  setTimeout(function() {	// switch the media source
		myPlayer.jPlayer("setMedia", {
			mp3: source
		});

		myPlayer.jPlayer('play');
	}, time);
}

function showTimer() {				// function to make animation and show the interface to setting time
	$("#home").slideUp();
	$("#name").animate({
		fontSize: '66px',
		fontSize: '23vw'
	},500);
	$("#timer").show();
}

function restTimeCountDown() {			// function to count down the rest time
	var hours = parseInt($("#restHours").text());
	var mins = parseInt($("#restMins").text());
	var secs = parseInt($("#restSecs").text());
	var t = setTimeout(function() {
		if (secs>0) {
			secs = secs-1;
			$("#restSecs").text(("0"+secs.toString()).slice(-2));
			restTimeCountDown();
		} else if (mins>0) {
			mins = mins-1;
			$("#restMins").text(("0"+mins.toString()).slice(-2));
			$("#restSecs").text("59");
			restTimeCountDown();
		} else if (hours>0) {
			hours = hours-1;
			$("#restHours").text(("0"+hours.toString()).slice(-2));
			$("#restMins").text("59");
			$("#restSecs").text("59");
			restTimeCountDown();
		}
	},1000);
}

function secondTwinkle() {			// function to twinkle the colon every second
	var t = setTimeout(function() {
		$("#secondColon0").fadeOut(100);
		$("#secondColon0").fadeIn(100);
		$("#secondColon1").fadeOut(100);
		$("#secondColon1").fadeIn(100);
		secondTwinkle();
	},1000);
}

function countdownStart(mins) {				//function to start countdown
	playAudio('./Content/ts_music.mp3',mins*60*1000);
	var napTime = mins*60;
	var napSecs = napTime % 60;
	var napMins = Math.floor( napTime / 60) % 60;
	var napHours = Math.floor( napTime / 3600);
	$("#name").animate({
		fontSize: '100px',
		fontSize: '31vw'
	},500);
	$("#timer").hide();
	$("#restTime").show();
	$("#restHours").text(("0"+napHours.toString()).slice(-2));
	$("#restMins").text(("0"+napMins.toString()).slice(-2));
	$("#restSecs").text(("0"+napSecs.toString()).slice(-2))
	restTimeCountDown();
	secondTwinkle();
}
function revealSettings(){
    $("#timer").hide();
    $("#home").hide();
    $("#restTime").hide();
    $("#settings").hide();
    $("#set").show();
}

function hidesettings(){
	var buttonOpArray = ["#op1","#op2","#op3","#op4","#op5","#op6","#op7"];
    $("#timer").show();
    $("#home").hide();
    $("#restTime").hide();
    $("#settings").show();
    $("#set").hide();
    var newOps = [];
    for (var i = 0; i < buttonOpArray.length; i++) {
    	if ($("#set > #set-group >"+buttonOpArray[i]).hasClass("active")) {
    		$("#op-group > "+buttonOpArray[i]).show();
    		newOps.push(buttonOpArray[i]);
    	} else {
    		$("#op-group > "+buttonOpArray[i]).hide();
    	}
    };
    localStorage['ops']=JSON.stringify(newOps);
}