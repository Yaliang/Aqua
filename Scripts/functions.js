/*
 * Author: Yaliang Wang
 * Last update: Sep 29, 2014, 5:25 PM
 *
 */
$(document).ready(function(){
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

function playAudio(source,time) {		// function to create audio element after time (ms) delay, HTML5 required, doesn't work on iOS
	var myPlayer = $("#jquery_jplayer_0");
	myPlayer.jPlayer('play');
	// for case MP3
	var t =  setTimeout(function() {	// callback function to create the element and autoplay the source media
		myPlayer.jPlayer("setMedia", {
			mp3: source
		});

		myPlayer.jPlayer('play');
	}, time);
}

function showTimer() {				// function to make animation and show the interface to setting time
	$("#home").slideUp();
	$("#name").animate({
		fontSize: '30px'
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
			$("#restSecs").text(("0"+secs.toString().slice(-2));
			restTimeCountDown();
		} else if (mins>0) {
			mins = mins-1;
			$("#restMins").text(("0"+mins.toString().slice(-2));
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
		$("#secondColon").fadeOut(100);
		$("#secondColon").fadeIn(100);
		secondTwinkle();
	},1000);
}

function timerStart() {				//function to start the timer
	var napTime = ($('#hours').val()*60+$('#mins').val()*1)*60;
	var napSecs = napTime % 60;
	var napMins = napTime % 3600;
	var napHours = Math.floor( napTime / 3600);
	$("#name").animate({
		fontSize: '100px'
	},500);
	$("#timer").hide();
	$("#restTime").show();
	$("#restHours").text(("0"+napHours.toString()).slice(-2));
	$("#restMins").text(("0"+napMins.toString()).slice(-2));
	$("#restSecs").text(("0"+napSecs.toString()).slice(-2))
	restTimeCountDown();
	secondTwinkle();
}
