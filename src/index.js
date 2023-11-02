const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const resources = JSON.parse(fs.readFileSync(`${__dirname}/data/resources.json`));

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());




// /resources endpoint with a category query parameter
app.get("/resources", (req, res) => {
  const { category } = req.query;
  
  const filteredResources = resources.filter(resource => {
    return category ? resource.category === category : true;
  });

  res.status(200).json(filteredResources);
});




// /resources/sort endpoint with sortBy query parameter
app.get("/resources/sort", (req, res) => {
  const { sortBy } = req.query;

  if (sortBy === "name") {
    // Sort resources by name in ascending order
    resources.sort((a, b) => a.name.localeCompare(b.name));
  }

  res.status(200).json(resources);
});





// /resources/group endpoint
app.get("/resources/group", (req, res) => {
  const groupedResources = {};

  resources.forEach(resource => {
    if (groupedResources[resource.category]) {
      groupedResources[resource.category].push(resource);
    } else {
      groupedResources[resource.category] = [resource];
    }
  });

  res.status(200).json(groupedResources);
});






const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = { app, server }; // Export both app and server