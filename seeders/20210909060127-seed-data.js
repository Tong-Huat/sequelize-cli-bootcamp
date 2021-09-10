module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tripList = [
      {
        name: 'Christmas PH',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'New Year PH',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const trips = await queryInterface.bulkInsert(
      'trips',
      tripList,
      { returning: true },
    );

    const categoryList = [
      {
        name: 'museum',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'nature',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    const categories = await queryInterface.bulkInsert(
      'categories',
      categoryList,
      { returning: true },
    );

    const attractionsList = [
      {
        name: 'Sentosa',
        trip_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        category_id: 1,
      },
      {
        name: 'ECP',
        trip_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        category_id: 1,
      },
    ];

    const attractions = await queryInterface.bulkInsert(
      'attractions',
      attractionsList,
      { returning: true },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('trips', null, {});
    await queryInterface.bulkDelete('attractions', null, {});
  },
};
