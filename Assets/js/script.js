$(document).ready(function(){
	//FCC Stream Info and Status API Call
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/streams/freecodecamp",
    headers: {
      "Client-ID" : "7lgjinf4ptd5ijyo7n1nswp6gx926x"
    },
    success: function(data1) {
      if(data1.stream===null) {
			$("#fccStatus").html("Free Code Camp is Currently Offline!");
		} else {
			$("#fccStatus").html("Free Code Camp is Currently Online!");
		}
    }
   });

  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
    headers: {
      "Client-ID": "7lgjinf4ptd5ijyo7n1nswp6gx926x"
    },
    success: function(data2) {
      for (var i = 0; i< data2.follows.length; i++) {
        //gets displayName
        var displayName = data2.follows[i].channel.display_name;
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;

        if (logo==null) {
          logo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
        }

        if (status==null) {
          status ="<p>404 Not Found</p>";
        }
$('#followerInfo').prepend("<div class = 'result row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class ='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
      }
    }
  });

  var deletedFollowers = ['brunofin','comster404'];
  for (var i = 0; i < deletedFollowers.length; i++) {
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
      headers: {
        "Client-ID": "7lgjinf4ptd5ijyo7n1nswp6gx926x"
      },
      error: function(data3) {
        var logo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
        var displayName = data3.statusText;
        console.log(data3.statusText);
        var status = data3.status;
        $('#followerInfo').prepend("<div class = 'result row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class ='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
      }

    });
  }
    });