/* eslint-disable prefer-const */
import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

// import model functions
import initTripModel from './trip.mjs';
import initAttractionModel from './attraction.mjs';
import initCategoryModel from './category.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

let sequelize = new Sequelize(config);

db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.Category.hasMany(db.Attraction);
db.Attraction.belongsTo(db.Category);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
