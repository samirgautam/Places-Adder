const fs = require('fs');
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads', 'images')));

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin' , '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE'
  );
  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);


app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file) {
      fs.unlink(req.file.path, (err) => {
        console.log(err);
      });
  }
  if (req.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured !" });
});


mongoose
.connect('mongodb+srv://sam:sam123@cluster0.geehfle.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
  app.listen(5000);
})
.catch(err => {
  console.log(err);
}); 
