const uuid = require('uuid');
const {validationResult} = require('express-validator');

const HttpError = require("../models/http-error");



let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Dharahara Tower",
    description: "One of the beautiful landmarks",
    location: {
      lat: 27.7004757,
      lng: 85.312657,
    },
    address: "Sundhara Rd, Kathmandu",
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place });
};

//function getPlaceById(){...}

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
 const errors = validationResult(req);
 if(!errors.isEmpty()){
  console.log(errors);
  throw new HttpError('Invalid inputs passed, please check your data.', 422);
 }

  const {title , description , coordinates , address , creator } = req.body;
  const createdPlace = {
    id : uuid.v4(),
    title,
    description,
    coordinates,
    address,
    creator
  };

  DUMMY_PLACES.push(createdPlace); 

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