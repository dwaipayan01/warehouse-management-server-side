const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express());
app.get("/", (req, res) => {
    res.send("My assignment is ready");
});
app.listen(port, () => {
    console.log("Listening to port,", port);
})