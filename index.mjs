/* eslint-disable max-len */
import { Sequelize } from 'sequelize';
import db from './models/index.mjs';

const { Op } = Sequelize;

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

// node index.mjs add-attrac "Christmas PH" "Art Science Museum" museum
// attraction id, name, trip_id, category_id
let tripId;
let catId;

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
    .then((returnedTrip, returnedCategory) => db.Attraction.create({
      name: process.argv[4],
      trip_id: returnedTrip.id,
      category_id: returnedCategory.id,
    }))
    .then((returnedAttraction, returnedCategory) => {
      console.log('Attraction added');
      console.log(returnedAttraction.id, 'returned Attraction ID');
      console.log(returnedAttraction.trip_id, 'returned Attraction trip id');
      console.log('Category added');
      console.log(returnedCategory.id, 'returned Category ID');
      console.log(returnedCategory.trip_id, 'returned Category trip id');
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

if (action === 'category-trip')
{
  const tripName = process.argv[3];
  const catName = process.argv[4];
  // node index.mjs category-trip "Christmas PH" museum
  // get all attractions in trip with given category

  db.Trip.findOne({
    where: {
      name: tripName,
    },
  })
    .then(({ dataValues }) => {
      console.log('result from trip', dataValues);
      tripId = dataValues.id;
      return db.Category.findOne({
        where: {
          name: catName,
        },
      });
    }).then(({ dataValues }) => {
      console.log('result from category', dataValues);
      catId = dataValues.id;

      return db.Attraction.findAll({
        where: {
          category_id: catId,
          trip_id: tripId,
        },
      });
    })
    .then((attractions) => {
      console.log('Attraction found', attractions.map((attr) => attr.dataValues.name));
    })
    .catch((error) => {
      console.log(error);
    });
}

// node index.mjs category-attractions <CATEGORY>
if (action === 'category-attractions') {
  const catName = process.argv[3];
  db.Category.findOne({
    where: {
      name: catName,
    },
  }).then(({ dataValues }) => {
    catId = dataValues.id;
    return db.Attraction.findAll({
      where: {
        category_id: catId,
      },
    });
  }).then((attractions) => {
    // get the trips
    const tripIds = attractions.map((attr) => attr.dataValues.trip_id);
    console.log('tripids', tripIds);
    return db.Trip.findAll({
      where: {
        id: {
          [Op.or]: tripIds,
        },
      },
    });
  }).then((trips) => {
    console.log(trips.map((trip) => trip.name));
  })
    .catch((err) => console.error(err));
}
