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
