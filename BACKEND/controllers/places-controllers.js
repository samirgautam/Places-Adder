const uuid = require('uuid');
const {validationResult} = require('express-validator');

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require('../models/place');


let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Dharahara Tower",
    description: "One of the beautiful landmarks",
    location: {
      lat: 27.7004757,
      lng: 85.312657
    },
    address: "Sundhara Rd, Kathmandu",
    creator: "u1",
  },
];

const getPlaceById =async (req, res, next) => {
  const placeId = req.params.pid;
let place; 
  try{
     place =await Place.findById(placeId);
  }catch(err){
    const error = new HttpError('Something went wrong, could not find a place',500);
    return next(error);
  };

  if (!place) {
    const error = HttpError("Could not find a place for the provided id.", 404);
    return next(error);
  }
  res.json({ place : place.toObject( {getters: true}) });
};

//function getPlaceById(){...}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
 let places;
  try{
     places = await Place.find({creator : userId});
  } catch(err) {
   const error =  new HttpError("Fetching places failed, please try again later",500);
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }
  res.json({ places : places.map(place => place.toObject({getters : true })) });
};

const createPlace = async (req, res, next) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()){
  console.log(errors);
  // throw new HttpError('Invalid inputs passed, please check your data.', 422); can't use throw with async
  return next(new HttpError('Invalid inputs passed, please check your data.', 422));

 }

const {title , description, address , creator } = req.body;
 let coordinates;
 try {
  coordinates = await getCoordsForAddress(address);
 } catch(error) {
    return next(error);
 }

  const createdPlace = new Place({
    title,
    description,
    address,
    location : coordinates,
    image : 'https://lh5.googleusercontent.com/p/AF1QipPgW0AOExVH8BdTdrQwT5cQXiLOAP1BiRlbCTfN=w408-h540-k-no',
    creator
  });

  // DUMMY_PLACES.push(createdPlace); 
  try {
    await createdPlace.save();

  }catch(err){
    const error = new HttpError(
      "Creating Place Failed. Please Try Again !", 500
    )
    return next(error);
  }

  res.status(201).json({place : createdPlace});
}

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    throw new HttpError('Invalid inputs passed,please check your data', 422);
  }
  const {title, description} = req.body;
  const placeId = req.params.pid;

  const updatedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  const placeIndex = DUMMY_PLACES.findIndex(p=> p.id === placeId );
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place : updatedPlace});
};

const deletePlace = (req,res, next) => {
  const placeId = req.params.pid;
  if(!DUMMY_PLACES.find(p => p.id === placeId)){
    throw new HttpError("could not find a place for that id",404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message : 'Deleted Place. '});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;