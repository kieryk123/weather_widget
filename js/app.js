var request = new XMLHttpRequest();

request.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?id=756135&APPID=a5f75eaf1905f8b2375a0ba961f96e5e');

request.onload = function() {
	var data = JSON.parse(request.responseText);

	getTemp(data);
	getPressure(data);
	getHumidity(data);
	getClouds(data);
	getDesc(data);
	getCity(data);
	getIcon(data);
	getDate();
};

request.onerror = function() {
	alert('Connection Error');
}

request.send();


// pobierz temperaturę
function getTemp(place) {
	var block = document.getElementById('temp');
	var temp = place.list[0].main.temp - 273.15;
	temp = temp.toFixed(0) + '°';

	return block.textContent = temp;
}


// pobierz ciśnienie
function getPressure(place) {
	var block = document.getElementById('pressure');
	var pressure = place.list[0].main.pressure;
	pressure = pressure.toFixed(0) + ' hPa';

	return block.textContent = pressure;
}


// pobierz wilgotność
function getHumidity(place) {
	var block = document.getElementById('humidity');
	var humidity = place.list[0].main.humidity;
	humidity += '%';

	return block.textContent = humidity;
}


// pobierz zachmurzenie
function getClouds(place) {
	var block = document.getElementById('clouds');
	var clouds = place.list[0].clouds.all;
	clouds += '%';

	return block.textContent = clouds;
}


// pobierz opis
function getDesc(place) {
	var block = document.getElementById('description');
	var desc = place.list[0].weather[0].description;

	return block.textContent = desc;
}


// pobierz miasto
function getCity(place) {
	var block = document.getElementById('city');
	var name = place.city.name;
	var country = place.city.country;
	name += ', ' + country;

	return block.textContent = name;
}


// pobierz miasto
function getIcon(place) {
	var block = document.getElementById('weather-img');
	var type; // przechowuje kod ikony
	var icon = place.list[0].weather[0].icon;

	// ustawia idpowiedni obrazek w zależności od kodu ikony
	switch (icon) {
		case '01d':
		case '01n':
			type = '01';
			break;

		case '02d':
		case '02n':
			type = '02';
			break;

		case '03d':
		case '03n':
		case '04d':
		case '04n':
			type = '03';
			break;

		case '09d':
		case '09n':
		case '10d':
		case '10n':
			type = '09';
			break;

		case '13d':
		case '13n':
			type = '13';
			break;

		case '50d':
		case '50n':
			type = '50';
			break;
	}

	// przechowuje znacznik <IMG>, czyli element wyjściowy
	var img = '<img src="img/' + type + '.png" class="img-responsive">';

	return block.innerHTML = img;
}


// pobiera aktualny dzien i miesiac
function getDate() {
	var dayBlock = document.getElementById('day'),
			monthBlock = document.getElementById('month'),
			months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
	 		date = new Date,
			day = date.getDate(),
			month = months[date.getMonth()];

	dayBlock.textContent = day;
	monthBlock.textContent = month;
}
