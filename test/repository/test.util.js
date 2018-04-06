const shell = require('shelljs')
const fs = require('fs')
const { Pool, Client } = require('pg')

const startEphemeralDB = () => {
  console.log('== Ephemeral DB start ==')
  const result = shell.exec('pg_tmp -t -w 60 -o "-N 11"')
  if (!result.stdout === 0) throw new Error('DB init failed!')

  console.log('\n== Ephemeral DB STARTED ==\n')
  return result.stdout
}

const runDBMigrations = dbUrl => {
  console.log('== Running DB migrations ==')
  const result = shell.exec(`NODE_ENV=dev DATABASE_URL=${dbUrl} node node_modules/db-migrate/bin/db-migrate up`)
  if (!result.stdout === 0) throw new Error('DB migrations failed!')

  console.log('== DB migrations DONE ==\n')
  return result.stdout
}

const populateDB = dbUrl => {
  console.log('== Populating DB ==')
  const sql = fs.readFileSync('./test/resources/db/populate.db.sql').toString()
  const client = new Client({ connectionString: dbUrl })
  client.connect()

  return client.query(sql).then(res => {
    client.end()
    console.log('== Populating DB DONE ==\n')
    return res.rows
  })
}

const initDB = () => {
  const dbUrl = startEphemeralDB()
  runDBMigrations(dbUrl)
  populateDB(dbUrl)

  return new Pool({ connectionString: dbUrl })
}

const transactionBegin = dbPool => dbPool.connect().then(dbClient => dbClient.query('BEGIN').then(() => dbClient))
const transactionRollback = dbClient => dbClient.query('ROLLBACK').then(() => dbClient.release())

module.exports = {
  initDB,
  transactionBegin,
  transactionRollback,
}
