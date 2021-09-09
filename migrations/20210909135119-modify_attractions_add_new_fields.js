module.exports = {
  up: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'attractions',
      'category_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    ),
  ]),

  down: async (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('category_id'),
  ]),
};
