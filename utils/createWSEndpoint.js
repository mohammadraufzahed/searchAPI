const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

// Creating an instance of the browser and saving the browser Endpoint in the JSON file.
async function createWSEndpoint() {
  // Path of the cache folder
  const cachPath = path.normalize(__dirname + "/../.cach");
  // Creating an instance of the browser
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: cachPath,
    args: [
      "--disable-canvas-aa", // Disable antialiasing on 2d canvas
      "--disable-2d-canvas-clip-aa", // Disable antialiasing on 2d canvas clips
      "--disable-gl-drawing-for-tests", // BEST OPTION EVER! Disables GL drawing operations which produce pixel output. With this the GL output will not be correct but tests will run faster.
      "--disable-dev-shm-usage", // ???
      "--no-zygote", // wtf does that mean ?
      "--use-gl=desktop", // better cpu usage with --use-gl=desktop rather than --use-gl=swiftshader, still needs more testing.
      "--enable-webgl",
      "--hide-scrollbars",
      "--mute-audio",
      "--no-first-run",
      "--disable-infobars",
      "--disable-breakpad",
      //'--ignore-gpu-blacklist',
      "--no-sandbox", // meh but better resource comsuption
      "--disable-setuid-sandbox", // same
    ],
  });
  // Grabbing the browser endpoint
  const browserEndpoint = await browser.wsEndpoint();
  // Saving the endpoint in the JSON file.
  fs.writeFileSync(
    path.normalize(__dirname + "/../wsEndpoint.json"),
    JSON.stringify({ wsEndpoint: browserEndpoint }),
    {
      encoding: "utf-8",
      flag: "w+",
    }
  );
  // Disconnecting from the browser
  await browser.disconnect();
}

module.exports = createWSEndpoint;
