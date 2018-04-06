# chitchat-api

Chat application: API

## DB Migrations

1.  shell

```
psql -d ${username}
```

2.  psql

```sql
CREATE USER chitchat WITH PASSWORD 'secret';
CREATE DATABASE chitchat WITH OWNER chitchat;
GRANT ALL PRIVILEGES ON DATABASE chitchat to chitchat;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO chitchat;
```

3.  [db-migrate](https://github.com/db-migrate/node-db-migrate) module is used for dealing with database migrations

* default config path: `./database.json`
* default environment: `dev`
* `db-migrate` expects the following environment variables to be defined:
  * `DB_HOST`
  * `DB_DATABASE`
  * `DB_USER`
  * `DB_PASSWORD`

4.  `Create`, `Up` & `Down` DB migrations:

```
npm run db-create-migration ${migration_name}
NODE_ENV=${ENV} npm run db-migrate
NODE_ENV=${ENV} npm run db-rollback
```

_For more info about DB migrations see `db-migrate` [documentation](https://db-migrate.readthedocs.io)_

## Tests

```
npm run test
```

Tests are implemented using [Mocha](https://mochajs.org) test framework and [should.js](http://shouldjs.github.io) BDD assertion library.

Repository tests use [ephemeralpg](http://ephemeralpg.org) (can be installed with `brew install ephemeralpg`).
