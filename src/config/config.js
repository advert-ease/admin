
const dbconfig = {
    db: {
    host: 'bae-tech.c5622sm42c2m.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'pvl_2024Bae',
    database: 'advertease',
      connectTimeout: 60000
      
    },
    listPerPage: 10,
  };
module.exports = dbconfig;

require('dotenv').config
/*
module.exports = {
  HOST: process.env.dbEndpoint,
  USER: process.env.dbUsername,
  PASSWORD: process.env.dbPassword,
  DB: process.env.databaseName,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  // for production
  // logging: false,
  // logger: false
}
*/


module.exports = {
  DB: 'advertease',
  USER: 'admin',
  PASSWORD: 'pvl_2024Bae',
  HOST: 'bae-tech.c5622sm42c2m.ap-south-1.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};