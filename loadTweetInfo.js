const ISO6391 = require('iso-639-1');
console.log(ISO6391.getName('en'));
var parameters = location.search.substring(1).split("&");
var query = parameters[0].split("=")[1];
var page = parameters[1].split("=")[1];
var resultNum = parameters[2].split("=")[1];

var xmlhttp = new XMLHttpRequest();
var url = "https://disinformation-api.dpccdn.net/v1/search?query=" + query + "&page=" + page;

xmlhttp.open("GET", url, true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
    console.log(xmlhttp.status);
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	var myArr = JSON.parse(this.responseText);
        var finalResult = myArr.results[resultNum];

        var followers = finalResult.followers;
        var language = finalResult.language;
        var likes = finalResult.likes;
        var location = finalResult.location;
        var retweets = finalResult.retweets
        var screen_name = finalResult.screen_name;
        var text = finalResult.text;
        if (screen_name.length == 64){
                screen_name = "Private User"; }
        else{
            screen_name = "@" + screen_name
        }

        if(location == null){
            location = "Not available"
        }


        out = '<tr><td align="center" colspan="2"  style = "padding-top: 15px; padding-bottom:15px; padding-left:12px; padding-right:12px; border-radius:38px;" bgcolor="#0032a3"; >'
        + '<font size = "5.5" face = "tahoma" color = white><b>' + text
        + '</b></font></td></tr><tr><td style = "padding-top: 30px;"><font size = "5" face = "tahoma" color = "#0032a3"> Username: '
        + '</font></td><td style = "padding-top: 30px;"><font size = "5" face = "tahoma" color = "#0032a3">' + screen_name 
        + '</font></td></tr><tr><td><font size = "5" face = "tahoma" color = "#0032a3">Likes: '
        + '</font></td><td><font size = "5" face = "tahoma" color = "#0032a3">' + likes 
        + '</font></td></tr><tr><td><font size = "5" face = "tahoma" color = "#0032a3">Followers: '
        + '</font></td><td><font size = "5" face = "tahoma" color = "#0032a3">' + followers
        + '</font></td></tr><tr><td><font size = "5" face = "tahoma" color = "#0032a3">Retweets: '
        + '</font></td><td><font size = "5" face = "tahoma" color = "#0032a3">' + retweets
        + '</font></td></tr><tr><td><font size = "5" face = "tahoma" color = "#0032a3">Language: '
        + '</font></td><td><font size = "5" face = "tahoma" color = "#0032a3">' + ISO6391.getName(language) 
        + '</font></td></tr><tr><td><font size = "5" face = "tahoma" color = "#0032a3">Location: '
        + '</font></td><td><font size = "5" face = "tahoma" color = "#0032a3">' + location
        + '</font></td></tr></font>';

        document.getElementById("table1").innerHTML += out;
    }
}