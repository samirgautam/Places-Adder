const uuid = require('uuid');

const HttpError = require("../models/http-error");



const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
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
  const {title, description} = req.body;
  const placeId = req.params.pid;

  const updatedPlace = DUMMY_PLACES.find(p => p.id === placeId);
  const placeIndex = DUMMY_PLACES.findIndex(p=> p.id === placeId );
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place : updatedPlace});
};

const deletePlace = (req,res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;