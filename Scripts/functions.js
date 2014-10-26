/*
 * Author: Yaliang Wang
 * Last update: Sep 30, 2014, 13:25
 *
 */

var myPlaylist;
$(document).ready(function(){
	if (localStorage["ops"] == undefined) {
		var ops = ["#op1","#op3"];
		localStorage["ops"]=JSON.stringify(ops);
	}
        if (localStorage["song"] == undefined) {
                var song = ["Happy"];
                localStorage["song"]=JSON.stringify(song);
        }
	var ops = JSON.parse(localStorage["ops"]);
        var song = JSON.parse(localStorage["song"]);
	$("#op-group").children().each(function() {
		$(this).hide();
	})
	for (var i = 0; i < ops.length; i++) {
		$("#set > #set-group >"+ops[i]).addClass("active");
		$("#op-group > "+ops[i]).show();
	};
        $("#set > #song-group > #"+song).addClass("active");

	myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [
		{
			title:"ZZZ nap sleeping",
			artist:"ZZZ nap",
			mp3:"./Content/song/silence10.mp3",
			poster:"./pics/sheep.png"
		}
	], {
		playlistOptions: {
			enableRemoveControls: true
		},
		swfPath: "Script",
		supplied: "webmv, ogv, m4v, oga, mp3",
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true
	});

	// hide the player
	$("#jquery_jplayer_N").css({
		"height":"0px",
		"width":"0px"
	});
	$("#jp_poster_0").css({
		"height":"0px",
		"width":"0px"
	});
});

function playAudio(source,mins) {		// function to play audio element after time (ms) delay, HTML5 required
       if (mins === 1) {
            myPlaylist.setPlaylist([{
                title:"ZZZ nap sleeping",
		artist:"ZZZ nap",
		mp3:"./Content/song/silence01.mp3"
            }]);
        } else {
            for (var i=0; i<mins/10-1; i++) {
                    myPlaylist.add({
                            title:"ZZZ nap sleeping",
                            artist:"ZZZ nap",
                            mp3:"./Content/song/silence10.mp3"
                    });
            }
        }
	myPlaylist.add({
		title:"Beautiful Eyes",
		artist:"Taylor Swift",
		mp3:source
	});
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

var initialTime;

function restTimeCountDown(napTime) {			// function to count down the rest time
	var t = setTimeout(function() {
            var nowTime = jQuery.now();
            var restTime = napTime - Math.floor((nowTime-initialTime)/1000);
            if (restTime<0)
                restTime = 0;            
            var napSecs = restTime % 60;
            var napMins = Math.floor( restTime / 60) % 60;
            var napHours = Math.floor( restTime / 3600);
            $("#restHours").text(("0"+napHours.toString()).slice(-2));
            $("#restMins").text(("0"+napMins.toString()).slice(-2));
            $("#restSecs").text(("0"+napSecs.toString()).slice(-2));
            secondTwinkle();
            restTimeCountDown(napTime);
            $("#jquery_jplayer_N").jPlayer('play');
	},1000);
}

function secondTwinkle() {			// function to twinkle the colon every second
	$("#secondColon0").fadeOut(100);
	$("#secondColon0").fadeIn(100);
	$("#secondColon1").fadeOut(100);
	$("#secondColon1").fadeIn(100);
}

function countdownStart(mins) {				//function to start countdown
        var song = JSON.parse(localStorage["song"]);
	playAudio('./Content/song/'+song+'.mp3',mins);
	var napTime = mins*60;
	var napSecs = napTime % 60;
	var napMins = Math.floor( napTime / 60) % 60;
	var napHours = Math.floor( napTime / 3600);
        initialTime = jQuery.now();
	$("#name").animate({
		fontSize: '100px',
		fontSize: '31vw'
	},500);
        $("#settings").hide();
	$("#timer").show();
	$("#restTime").show();
        $("#op-group").hide();
	$("#restHours").text(("0"+napHours.toString()).slice(-2));
	$("#restMins").text(("0"+napMins.toString()).slice(-2));
	$("#restSecs").text(("0"+napSecs.toString()).slice(-2))
	restTimeCountDown(napTime);
	secondTwinkle();
}
function revealSettings(){
    $("#timer").hide();
    $("#name").hide();
    $("#home").hide();
    $("#restTime").hide();
    $("#settings").hide();
    $("#set").show();
    $("#op-group").hide();
}

function hidesettings(){
    var buttonOpArray = ["#op0","#op1","#op2","#op3","#op4","#op5","#op6","#op7"];
    var songArray = ["Angry","Calm","Fierce","Happy"];
    $("#timer").show();
    $("#home").show();
    $("#name").show();
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
    for (var i=0; i < songArray.length; i++) {
        if ($("#set > #song-group > #"+songArray[i]).hasClass("active")) {
            localStorage['song']=JSON.stringify(songArray[i]);
            break;
        }
    }
}