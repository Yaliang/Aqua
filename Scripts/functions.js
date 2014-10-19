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

	var myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [
		{
			title:"Cro Magnon Man",
			artist:"The Stark Palace",
			mp3:"./Content/song/silence01.mp3"
		},
		{
			title:"Cro Magnon Man",
			artist:"The Stark Palace",
			mp3:"./Content/song/ts_music.mp3"
		}
	], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "js",
		supplied: "webmv, ogv, m4v, oga, mp3",
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true
	});

	// hide the player
	$("#jquery_jplayer_N").css("height","0px");
});

function playAudio(source) {		// function to play audio element after time (ms) delay, HTML5 required
	$("#jquery_jplayer_N").jPlayer('play');
}

function showTimer() {				// function to make animation and show the interface to setting time
	$("#home").slideUp();
	$("#name").animate({
		fontSize: '66px',
		fontSize: '23vw'
	},500);
	$("#timer").show();
        $("#op-group").hide();
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
	playAudio('./Content/ts_music.mp3');
	var napTime = mins*60;
	var napSecs = napTime % 60;
	var napMins = Math.floor( napTime / 60) % 60;
	var napHours = Math.floor( napTime / 3600);
	$("#name").animate({
		fontSize: '100px',
		fontSize: '31vw'
	},500);
	$("#timer").show();
	$("#restTime").show();
        $("#op-group").hide();
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
    $("#op-group").hide();
}

function hidesettings(){
	var buttonOpArray = ["#op1","#op2","#op3","#op4","#op5","#op6","#op7"];
    $("#timer").show();
    $("#home").hide();
    $("#restTime").hide();
    $("#settings").show();
    $("#set").hide();
    $("#op-group").show();
    
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