const config = require("config");

module.exports = {
  "type": config.get("db.type"),
  "host": config.get("db.host"),
  "port": config.get("db.port"),
  "username": config.get("db.username"),
  "password": config.get("db.password"),
  "database": config.get("db.database"),
  "schema": config.get("db.schema"),
  "entities": ["src/db/entity/**/*.ts"],
  "migrations": ["src/db/migration/**/*.ts"],
  "synchronize": false,
  "logging": true,
  "cli": {
    "entitiesDir": "src/db/entity",
    "migrationsDir": "src/db/migration"
  }
}