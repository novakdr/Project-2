// JAVASCRIPT SERVER STUFF AND ALL THAT MAGIC GOES HERE
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app); 

app.listen(PORT, () => {
    console.log("👽 app is listening on port: " + PORT);
})