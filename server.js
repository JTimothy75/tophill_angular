const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "dist/tophillgeohydro")));

const port = process.env.PORT || 3000;

// ROUTES
app.get("/*", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "dist/tophillgeohydro/index.html"));
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
