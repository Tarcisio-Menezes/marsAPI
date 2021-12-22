module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Favorites',
      [{
        id: 1,
        image_path: 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG',
        rover: 'Curiosity',
        camera: 'FHAZ',
        landing: '2012/08/06',
        launch: '2011/11/26',
        published: new Date('2011-08-01T19:58:00.000Z'),
        updated: new Date('2011-08-01T19:58:00.000Z'),
        user_id: 1,
      },
      {
        id: 2,
        image_path: 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG',
        rover: 'Curiosity',
        camera: 'FHAZ',
        landing: '2012/08/06',
        launch: '2011/11/26',
        published: new Date('2011-09-01T19:58:00.000Z'),
        updated: new Date('2011-10-01T19:58:00.000Z'),
        user_id: 2,
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Favorites', null, {});
  },
};
