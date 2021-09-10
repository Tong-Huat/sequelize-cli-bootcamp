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
    .then(db.Category.findOne({
      where: {
        name: process.argv[5],
      },
    }))
    // .then((returnedTrip, returnedCategory) => db.Attraction.create({
    //   name: process.argv[4],
    //   trip_id: returnedTrip.id,
    //   category_id: returnedCategory.id,
    // }))
    .then((returnedAttraction, returnedCategory) => {
      console.log('Attraction added');
      console.log(returnedAttraction.id, 'returned Attraction ID');
      console.log(returnedAttraction.trip_id, 'returned Attraction trip id');
      // console.log('Category added');
      // console.log(returnedCategory.id, 'returned Category ID');
      // console.log(returnedCategory.trip_id, 'returned Category trip id');
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

if (action === 'add-category') {
  db.Category.create({
    name: process.argv[3],
  })
    .then((category) => {
      console.log('category created');
      console.log(category);
    })
    .catch((error) => console.log(error));
}
