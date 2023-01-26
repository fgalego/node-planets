const { parse } = require("csv-parse");
// File system module:
const fs = require("fs");

const results = [];

function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED";
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
    // Push the data that comes in and store it in the "results" array
    results.push(data);
  })
  //   Respond to our error event, which give us this error object in our callback function
  .on("error", (err) => {
    console.log(err);
  })
  //   Print the results that we received
  .on("end", () => {
    console.log(results);
    console.log("done");
  });

// parse();
