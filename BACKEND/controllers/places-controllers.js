const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

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

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = HttpError("Could not find a place for the provided id.", 404);
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

//function getPlaceById(){...}

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    // throw new HttpError('Invalid inputs passed, please check your data.', 422); can't use throw with async
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPgW0AOExVH8BdTdrQwT5cQXiLOAP1BiRlbCTfN=w408-h540-k-no",
    creator,
  });

  // DUMMY_PLACES.push(createdPlace);
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating Place Failed. Please Try Again !",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed,please check your data", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

// const deletePlace = async (req, res, next) => {
//   const placeId = req.params.pid;
//   let place;
//   try {
//     place = await Place.findById(placeId);
//   } catch (err) {
//     const error = new HttpError(
//       "something went wrong, could not delete place.",
//       500
//     );
//     return next(error);
//   }
//   try {
//     await place.remove();
//   res.status(200).json({ message: "Deleted Place. " });
//   } catch (err) {
//     const error = new HttpError(
//       "something went wrong , could not delete place.",
//       500
//     );
//     return next(error);
//   }

// };
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  try {
    const result = await Place.deleteOne({ _id: placeId });
    if (result.deletedCount === 0) {
      throw new HttpError("Place not found.", 404);
    }
    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (err) {
    const error = err instanceof HttpError ? err : new HttpError("Something went wrong, could not delete place.", 500);
    return next(error);
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
