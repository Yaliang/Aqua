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
	var t = setTimeout(function() {
		if (mins>0) {
			mins = mins-1;
			$("#mins").text(mins.toString());
			restTimeCountDown();
		} else if (hours>0) {
			hours = hours-1;
			$("#hours").text(hours.toString());
			$("#mins").text("60");
			restTimeCountDown();
		}
	},60*1000);
}

function timerStart() {				//function to start the timer
	$("#timer").slideUp();
	$("#restTime").show();
	$("#restHours").text($("#hours").val());
	$("#restMins").text($("#mins").val());
	restTimeCountDown();
}
