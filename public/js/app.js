//Client side JS
//Runs in the browser
//This is the front end of our app. Thus we cannot use node modules.

const weatherForm = document.querySelector("form");

//grab the paragraph elements
const errorP = document.getElementById("error");
const locationP = document.getElementById("location");
const tempP = document.getElementById("temp");
const descP = document.getElementById("description");
const pressureP = document.getElementById("pressure");
const humidityP = document.getElementById("humidity");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addressInput = e.target.children[0].value;

  errorP.innerText = "Loading...";
  locationP.innerText = "";
  tempP.innerText = "";
  descP.innerText = "";
  pressureP.innerText = "";
  humidityP.innerText = "";

  fetch(`/weather?address=${addressInput}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        errorP.innerText = data.error;
      } else {
        console.log(data);
        locationP.innerText = `Location = ${data.location}`;
        tempP.innerText = `Temp = ${data.temp} C`;
        descP.innerText = `Description = ${data.description}`;
        pressureP.innerText = `Pressure = ${data.pressure}`;
        humidityP.innerText = `Humidity = ${data.humidity}`;
        errorP.innerText = "";
      }
    });
});
