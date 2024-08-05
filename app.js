const express = require('express');
const app = express();

//cors eeror handler
const cors=require("./middleware/cors")
app.use(cors);

const db = require('./data/database');

//This is a function that parses data present in json format
app.use(express.json());


const routes=require("./routes/route");
app.use("/",routes)

app.use(function (error, req, res, next) {
  console.log(error.message)
  res.status(500).json({
    message: 'Something went wrong!',
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Connecting to the database failed!');
  });
