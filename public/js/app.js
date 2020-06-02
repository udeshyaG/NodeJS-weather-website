//Client side JS
//Runs in the browser

const weatherForm = document.querySelector("form");

//grab the paragraph elements
const errorP = document.getElementById("error");
const locationP = document.getElementById("location");
const tempP = document.getElementById("temp");
const descP = document.getElementById("description");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const addressInput = e.target.children[0].value;

  errorP.innerText = "Loading...";
  locationP.innerText = "";
  tempP.innerText = "";
  descP.innerText = "";

  fetch(`/weather?address=${addressInput}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        errorP.innerText = data.error;
      } else {
        locationP.innerText = `Location = ${data.location}`;
        tempP.innerText = `Temp = ${data.temp} C`;
        descP.innerText = `Description = ${data.description}`;
        errorP.innerText = "";
      }
    });
});