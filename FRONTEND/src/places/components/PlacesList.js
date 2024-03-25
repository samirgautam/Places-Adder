import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";
import Button from "../../shared/components/FormElements/Button";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found ! Want to add some ?</h2>
          <Button to = "/places/new">Add new Place !</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="places-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          description={place.description}
          address={place.address}
          coordinates={place.location}
          creatorId={place.creator}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
