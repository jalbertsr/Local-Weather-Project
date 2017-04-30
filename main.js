var API_KEY = "aa9e51cab827acedaef9a4ea719b2953";
var unit = false;
var wdata;

function convertTemp(currentTemp, unit){
  var result=0;
  if(unit){
    result = (Math.round(currentTemp*1.8))+32;
    return result+"\t Fº";
  }
  else{
    return currentTemp+"\t Cº";
  }
}

        
function putData(wdata,unit){
  var currentLocation = wdata.name;
  var descriptWeather = wdata.weather[0].description;
  var currentTemp = (convertTemp(wdata.main.temp,unit));
  var maxTemp = (convertTemp(wdata.main.temp_max,unit));
  var minTemp = (convertTemp(wdata.main.temp_min,unit));
  var humidty = wdata.main.humidity;
  var icon = wdata.weather[0].icon;

  var icoSrc = "http://openweathermap.org/img/w/"+icon+".png"

  $("#location").html(currentLocation);
  $("#ctemp").html(currentTemp);
  $("#maxMin").html("Min/Max Temperature:\t"+minTemp + "/" + maxTemp);
  $("#description").html("Current Weather:\t"+descriptWeather);
  $("#humidity").html("Humidity:\t" + humidty +"%");


  $("#location").prepend('<img src="' + icoSrc +'"/>')
  
  console.log(icon);
  
  switch(icon){
    case '01d':
    case '01n':
    case '02d':
    case '02n':
        $('body').css('background-image','url("http://il9.picdn.net/shutterstock/videos/3422942/thumb/1.jpg")');
        break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
    case '50d':
    case '50n': 
        $('body').css('background-image','url("http://i.imgur.com/pxCpaA2.jpg")');
        break;
    case '09d':
    case '09n':
    case '10d':
    case '10n':
        $('body').css('background-image','url("http://www.pixelstalk.net/wp-content/uploads/2016/04/Pictures-images-rain-wallpapers.jpg")');
        break;
    case '11d':
    case '11n':
        $('body').css('background-image','url("http://cdn.wallpapersafari.com/11/25/qluDPB.jpg")');
        break;
    case '13d':
    case '13n':
        $('body').css('background-image','url("http://wallpaper-gallery.net/images/snow-wallpaper/snow-wallpaper-6.jpg")');
        break;
             }
}        

$(function(){
  var location;
  
  $.getJSON('https://ipinfo.io', function(data){
    location = data.loc.split(",");
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+location[0]+"&lon="+location[1]+"&APPID="+API_KEY, function(wdata){
      console.log(wdata);
      
      putData(wdata, unit);
      
      $("#target").click(function(){
        unit = !unit;
        
        putData(wdata, unit);
        })
      })
   })
})