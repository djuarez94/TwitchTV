$(document).ready(function(){
	//FCC Stream Info and Status API Call
	var url = "https://api.twitch.tv/kraken/streams/freecodecamp";

	$.getJSON(url,function(data1){
		if(data1.stream===null) {
			$("#fccStatus").html("Free Code Camp is Currently Offline!");
		} else {
			$("#fccStatus").html("Free Code Camp is Currently Online!");
		}
	});
});