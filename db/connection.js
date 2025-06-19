const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: "postgresql://_8842518966f103dd:_2b08d100ab8dbb22c2cac53c40ccd0@primary.database--bgf22tdmnjfd.addon.code.run:5432/_e16ec68b90a7?sslmode=require"

});

module.exports = pool;