const request = require("request");

function forecast(lat, long, callback) {
  const weatherURL = `http://api.weatherstack.com/current?access_key=857059cba0f73a450e261a16cf4b7fad&query=${lat},${long}`;

  request.get(weatherURL, (error, response) => {
    const data = response && JSON.parse(response.body);

    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (data.error) {
      callback(data.error.info, undefined);
    } else {
      callback(undefined, {
        temp: data.current.temperature,
        description: data.current.weather_descriptions[0],
        location: `${data.location.name} , ${data.location.region}`,
      });
    }
  });
}

module.exports = forecast;
