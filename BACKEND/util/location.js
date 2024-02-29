// const API_KEY = 'AIzaslhfakjshyeankjshlkjfhlkjsah';

const HttpError = require("../models/http-error");

async function getCoordsForAddress(address) {
    return {
        lat : 27.7004757,
        lng: 85.312657
    };
}
// async function getCoordsForAddress (address){
//     const response = await axios.get (
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
//     );
//     const data = response.data;

//     if(!data || data.status === 'ZERO_RESULTS'){
//         const error = new HttpError('Could not find the location for the specified address', 422);
//         throw error;

//     }

//     const coordinates = data.results[0].geometry.location;

//     return coordinates;
// }

module.exports = getCoordsForAddress;