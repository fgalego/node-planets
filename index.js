const { parse } = require("csv-parse");
// File system module:
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// Provide us an event emitter
fs.createReadStream("kepler_data.csv")
  // connect readable stream source to a readable stream destination
  .pipe(
    parse({
      // We want to treat lines that start with "#" character as comments
      comment: "#",
      // Return each row in our CSV file as a JS object with key value pairs, rather than as just an array
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
    // Push the data that comes in and store it in the "results" array
    // results.push(data);
  })
  //   Respond to our error event, which give us this error object in our callback function
  .on("error", (err) => {
    console.log(err);
  })
  //   Print the results that we received
  .on("end", () => {
    // Map function takes a callback that for each item in that array processes it and returns a new value for that item:
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });

// parse();
