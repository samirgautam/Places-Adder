import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found ! Want to add some ?</h2>
          <button>Add new Place !</button>
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
          image={place.imageUrl}
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
