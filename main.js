var obj = require ('./data.js');


var kelvinToFahrenheit  = function ( temperature ) {

	return Math.floor ((temperature - 273.15 ) * 1.8 + 32);
};

var degreesToDirection = function ( degrees ) {

	if ((degrees > 340) || (degrees <= 25)) {
		return "N";
	};

	if (degrees < 70) {
		return "NE";
	};

	if (degrees < 115) {
		return "E";
	};

	if (degrees < 160) {
		return "SE";
	};

	if (degrees < 205) {
		return "S";
	};

	if (degrees < 250) {
		return "SW";
	};

	if (degrees < 295) {
		return "W";
	};

	return "NW";	
}

var average = function ( base, property) {
	var total = 0;
	total = obj.list.reduce (function (a, b) {
		return a + b[base][property];
	}, 0);

	return Math.floor(total/obj.list.length);

};

var modeOfWeather = function () {
	//This is where I will calculate the mode.
	var modeCount = 0;
	var modeValue;

	obj.list.forEach (function (x) {
		var total = 0;

		obj.list.forEach ( function (y) {
			if (x.weather[0].description == y.weather[0].description) {
				total++;
			}

		});

		if(total > modeCount) {
			//  We found a new mode
			modeCount = total;
			modeValue = x.weather[0].description;

		}

	});

	return modeValue;
}

var detail = function ( city_info ) {

	console.log (city_info.name + " =================");
	console.log ("   " + city_info.weather[0].description);
	console.log ("   Temp: " + kelvinToFahrenheit(city_info.main.temp) );
	console.log ("   Lo: " + kelvinToFahrenheit(city_info.main.temp_min)
				 + ", Hi: " 
				 +  kelvinToFahrenheit(city_info.main.temp_max));

	console.log ("   Humidity: " + city_info.main.humidity +"%");
	console.log ("   Wind: " + city_info.wind.speed + " MPH " 
					+ degreesToDirection (city_info.wind.deg) );
	console.log ("===============================")

 };

var storeAverages = function ( ) {
	var avgBlock = {};
	avgBlock.weather = [{}];
	avgBlock.main = {};
	avgBlock.wind = {};

	avgBlock.weather[0].description = modeOfWeather();
	avgBlock.name = "Average";
	avgBlock.main.temp = average ("main", "temp");
	avgBlock.main.temp_min = average ("main", "temp_min");
	avgBlock.main.temp_max = average ("main", "temp_max");
	avgBlock.main.humidity = average ("main", "humidity");
	avgBlock.wind.speed = 	average ("wind", "speed");
	avgBlock.wind.deg = 	average ("wind", "deg");

	return avgBlock;
};


(function () { 
	obj.list.sort ( function (a, b) {
 		if ( a.name > b.name )  {
 			return 1;
 		} else if (a.name < b.name)  {
 			return -1;
 		}

 		return 0;
 	}).forEach(detail);

	detail ( storeAverages());

})();
