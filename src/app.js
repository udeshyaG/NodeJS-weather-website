const path = require("path");
const express = require("express"); //this gives us a function
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express(); //generate a new application

//Define paths for express config
const pathname = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//For handlebars : dynamic render
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(pathname));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Churpee Johl",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "The Best about title ",
    name: "Alec Baldwin",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "The best Help title",
    msg: "That is a stupid question",
    name: "Donald Duck",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Please enter an address",
    });
  } else {
    const { address } = req.query;

    geocode(address, (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(
        latitude,
        longitude,
        (error, { temp, description, location } = {}) => {
          if (error) {
            return res.send({ error });
          }

          res.send({
            temp,
            description,
            location: placeName,
          });
        }
      );
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "The best Error page in the world",
    msg: "Help article not found",
    name: "Robert De Niro",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "The best 404 page in the world",
    msg: "This page does not exist bro",
    name: "Harry Gabbard",
  });
});

app.listen(3000, () => console.log("Server started on port 3000"));
