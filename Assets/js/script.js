// $(document).ready(function(){
// 	//FCC Stream Info and Status API Call
// 	var url = "https://api.twitch.tv/kraken/streams/freecodecamp";
//
// 	$.getJSON(url,function(data1){
// 		if(data1.stream===null) {
// 			$("#fccStatus").html("Free Code Camp is Currently Offline!");
// 		} else {
// 			$("#fccStatus").html("Free Code Camp is Currently Online!");
// 		}
// 	});
// });

$(document).ready(function(){
  var following = [];
	//FCC Stream Info and Status API Call
	var url = "https://api.twitch.tv/kraken/streams/freecodecamp";

	// $.getJSON(url,function(data1){
	// 	if(data1.stream===null) {
	// 		$("#fccStatus").html("Free Code Camp is Currently Offline!");
	// 	} else {
	// 		$("#fccStatus").html("Free Code Camp is Currently Online!");
	// 	}
	// });
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers: {
      "Client-ID" : "7lgjinf4ptd5ijyo7n1nswp6gx926x"
    },
    success: function(data1) {
      console.log(data1);
    }
  });

  //Updates followers
  var followerURL = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/";
  $.getJSON(followerURL, function(data2){
    for (var i=0; i < data2.follows.length; i++) {
      var displayName = data2.follows[i].channel.display_name;
      following.push(displayName);
    }
    following.push('comster404');
    following.push('brunofin');
    following.push('ESL_SC2');

    for (var i=0; i<following.length; i++) {
      var url2 ='https://api.twitch.tv/kraken/streams/' + following[i] + '/?callback=?';

      $.getJSON(url2).done(function(data3){
        var logo;
        var status;
        var name;
        if(data3.error){
          logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
          name = data3.message;
          status = data3.error;
          $('#followerInfo').prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class ='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
        }
        if(data3.stream===null) {
          $.getJSON(data3._links.channel,function(data5){
            status = "OFFLINE";
            logo= data5.logo;
            name= data3.display_name;
            if(logo===null) {
              logo= 'http://web.vmc3.com/projects/bufs/branch/marines/logo/NoLogo.jpg'
            }
            $('#followerInfo').prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class ='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
          })
        }
      });
    }
    for (var i=0; i<following.length; i++){
      var onlineURL = "https://api.twitch.tv/kraken/streams/" + following[i];
      $.getJSON(onlineURL, function(data4){
        var logo= data4.stream.channel.logo;
        if(logo===null) {
              logo= 'http://web.vmc3.com/projects/bufs/branch/marines/logo/NoLogo.jpg'
            }
        var status = data4.stream.channel.status;
        var name = data4.stream.channel.display_name;

        $('#followerInfo').prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class ='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
      });
    }
  });
});