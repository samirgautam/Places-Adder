const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Dharahara Tower',
        description: 'One of the beautiful landmarks',
        location: {
            lat : 27.7004757,
            lng : 85.312657,
        },
        address : 'Sundhara Rd, Kathmandu',
        creator : 'u1'
    }
];

router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    res.json({place});
});

module.exports = router;