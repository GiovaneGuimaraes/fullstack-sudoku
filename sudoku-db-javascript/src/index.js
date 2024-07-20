const sequelize = require('../config/db');

(async () => {
    const Models = require('./models');
    await sequelize.sync();
})();

module.exports = sequelize;

