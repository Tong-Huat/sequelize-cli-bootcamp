/* eslint-disable max-len */
import db from './models/index.mjs';

const [, , action, ...args] = process.argv;

if (action === 'create') {
  db.Trip.create({
    name: process.argv[3],
  })
    .then((trip) => {
      console.log('trip created');
      console.log(trip);
    })
    .catch((error) => console.log(error));
}

if (action === 'add-attrac') {
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  })
    .then((returnedTrip) => db.Attraction.create({
      name: process.argv[4],
      trip_id: returnedTrip.id,
    }))
    .then((returnedAttraction) => {
      console.log('Attraction added');
      console.log(returnedAttraction.id, 'returned Attraction ID');
      console.log(returnedAttraction.trip_id, 'returned Attraction trip id');
    })
    .catch((error) => {
      console.log(error);
    });
}

if (action === 'trip') {
  db.Trip.findOne({
    where: {
      name: process.argv[3],
    },
  })
    .then((trip) => trip.getAttractions())
    .then((tripAttractions) => console.log(tripAttractions.map((tripAttraction) => tripAttraction.name)))
    .catch((error) => console.log(error));
}
