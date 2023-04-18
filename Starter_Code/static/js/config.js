// // API key 6581708e1fmshd5c5cf3a0d95bbbp1bad2bjsn690eae7c6160
// var apiKey = '6581708e1fmshd5c5cf3a0d95bbbp1bad2bjsn690eae7c6160';
// var url = 'national-weather-service.p.rapidapi.com' + apiKey;

// d3.json(url).then(function(data) {
//   // process the GeoJSON data
// });
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6581708e1fmshd5c5cf3a0d95bbbp1bad2bjsn690eae7c6160',
		'X-RapidAPI-Host': 'national-weather-service.p.rapidapi.com'
	}
};

fetch('https://national-weather-service.p.rapidapi.com/zones/%7Btype%7D/%7BzoneId%7D/forecast', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));