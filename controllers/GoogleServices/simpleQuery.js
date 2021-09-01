const nextPage = require("../../utils/nextPage");
const connectToEndpoint = require("./../../utils/connectToEndpoint");

// simpleQuery Worker
async function simpleQueryWorker(req, res) {
  // Get the data
  const { query, page } = req.body;
  // Generate the URL
  let url = new URL("https://google.com/search");
  url.searchParams.set("q", query);
  if (nextPage(page) != 0) {
    url.searchParams.set("start", nextPage(page));
  }
  // Connect to the browser
  const browser = await connectToEndpoint();
  // Create the new page
  const browserPage = await browser.newPage();
  // Configure the page
  browserPage.setRequestInterception(true);
  // Limiting the requests
  browserPage.on("request", (req) => {
    if (
      req.resourceType() === "image" ||
      req.resourceType() === "media" ||
      req.resourceType() === "stylesheet" ||
      req.resourceType() === "script" ||
      req.resourceType() === "preflight" ||
      req.resourceType() === "font" ||
      req.resourceType() === "cspviolationreport" ||
      req.resourceType() === "fetch"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });
  // Navigation to the url
  await browserPage.goto(url.href, { waitUntil: "domcontentloaded" });
  // collect the required data
  const results = await browserPage.evaluate((browserPage) => {
    // Main Array for returing the data
    let resultsArray = [];
    // Grabbing the search results
    const searchResults = document.querySelectorAll("div.g");
    // Iterates over the search results and extract the information from the DOM
    for (const item of searchResults) {
      const title = item.querySelector("h3").textContent.trim();
      const url = item.querySelector("a").href.trim();
      let description;
      // Try to get the description
      // Sometimes it failed.
      try {
        description = item
          .querySelector("div > div > div:nth-child(1) >span")
          .textContent.trim();
      } catch (error) {
        description = "";
      }
      // Pushing the data to the array
      resultsArray.push({
        title: title,
        description: description,
        url: url,
      });
    }
    // Return the array
    return resultsArray;
  });
  // Close the page
  await browserPage.close();
  // Return the results
  res.send(results);
}

module.exports = simpleQueryWorker;
