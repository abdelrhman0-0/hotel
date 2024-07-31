const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASS,
  {
    host: process.env.MYSQL_BASE_DOMAIN,
    port: process.env.MYSQL_DB_PORT,
    dialect: "mysql",
    logging: false,
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  }
);

module.exports = { sequelize };
