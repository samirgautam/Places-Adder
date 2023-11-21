import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import './placeForm.css';

const Dummy_Places = [
  {
    id: "p1",
    title: "Dharahara Tower",
    description:
      "Dharahara in Kathmandu was the tallest building in Nepal and the second such tower built by Bhimsen Thapa. ",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/DHARAHARA_TOWER.jpg/800px-DHARAHARA_TOWER.jpg",
    address: "P826+3VR, Sundhara Rd, Kathmandu 44600",
    location: {
      lat: 27.7004751,
      lng: 85.3123657,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Dharahara Tower",
    description:
      "Dharahara in Kathmandu was the tallest building in Nepal and the second such tower built by Bhimsen Thapa. ",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/DHARAHARA_TOWER.jpg/800px-DHARAHARA_TOWER.jpg",
    address: "P826+3VR, Sundhara Rd, Kathmandu 44600",
    location: {
      lat: 27.7004751,
      lng: 85.3123657,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = Dummy_Places.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place! </h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="element"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText = "Please enter a valid title."
        onInput = {()=> {}}
        value = {identifiedPlace.title}
        valid = {true}
      />
        <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText = "Please enter a valid description (min 5 characters) ."
        onInput = {()=> {}}
        value = {identifiedPlace.description}
        valid = {true}
      />
      <Button type= "submit" disabled = {true}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
