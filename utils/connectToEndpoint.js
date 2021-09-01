const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Connect to the browser endpoint
async function connectToEndpoint() {
  // Read the endpoint
  const endpointPath = path.normalize(__dirname + "/../wsEndpoint.json");
  const wsEndpoint = JSON.parse(
    fs.readFileSync(endpointPath, {
      flag: "r",
      encoding: "utf-8",
    })
  );
  console.log(wsEndpoint.wsEndpoint);
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint.wsEndpoint,
    });
    return browser;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
module.exports = connectToEndpoint;
