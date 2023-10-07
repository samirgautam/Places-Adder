import React from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";

const UserPlaces = props => {
    const Dummy_Places = [
        {
            id : 'p1',
            title: 'Dharahara Tower',
            description: 'Dharahara in Kathmandu was the tallest building in Nepal and the second such tower built by Bhimsen Thapa. ',
            imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/DHARAHARA_TOWER.jpg/800px-DHARAHARA_TOWER.jpg',
            address: 'P826+3VR, Sundhara Rd, Kathmandu 44600',
            location : {
                lat: 27.7004751,
                lng: 85.3123657 
            },
            creator : 'u1'
        },
        {
            id : 'p2',
            title: 'Dharahara Tower',
            description: 'Dharahara in Kathmandu was the tallest building in Nepal and the second such tower built by Bhimsen Thapa. ',
            imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/DHARAHARA_TOWER.jpg/800px-DHARAHARA_TOWER.jpg',
            address: 'P826+3VR, Sundhara Rd, Kathmandu 44600',
            location : {
                lat: 27.7004751,
                lng: 85.3123657 
            },
            creator : 'u2'
        }
    ];
    const userId = useParams().userId;
    const loadedPlaces = Dummy_Places.filter(place=>place.creator === userId);
    return <PlacesList items = {loadedPlaces}/> ;
};

export default UserPlaces;