const request = require("request");

function geocode(address, callback) {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidWRnY29kZXIiLCJhIjoiY2thczRhdm9pMGJtaTJ5bW9uNTEwcjYxaiJ9.byizcvmW1KqoIXG7ydaPww&limit=1`;

  request.get(geocodeURL, (error, response) => {
    const data = response && JSON.parse(response.body);

    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (data.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        placeName: data.features[0].place_name,
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
      });
    }
  });
}

module.exports = geocode;
