# chitchat-api
Chat application: API

## DB Migrations

1. shell

  ```
  psql -d ${username}
  ```

2. psql

  ```sql
  create database chitchat;
  create role chitchat with password 'secret';
  grant all privileges on database chitchat to chitchat;
  ```

3. [db-migrate](https://github.com/db-migrate/node-db-migrate) module is used for dealing with database migrations

  - default config path: `./database.json`
  - default environment: `dev`
  - `db-migrate` expects the following environment variables to be defined:
    - `DB_HOST`
    - `DB_DATABASE`
    - `DB_USERNAME`
    - `DB_PASSWORD`

4. `Create`, `Up` & `Down` DB migrations:

  ```
  npm run db-create-migration ${migration_name}
  NODE_ENV=${ENV} npm run db-migrate
  NODE_ENV=${ENV} npm run db-rollback
  ```

*For more info about DB migrations see `db-migrate` [documentation](https://db-migrate.readthedocs.io)*
