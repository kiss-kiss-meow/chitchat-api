const should = require('should')
const { initDB, transactionBegin, transactionRollback } = require('./test.util')
const User = require('model/user.model')
const UserRepository = require('repository/user.repository')

describe('User repository test', () => {
  let dbPool = null
  let dbClient = null
  let userRepository = null

  before('DB initialization', () => {
    dbPool = initDB()
  })

  beforeEach('Transaction begin', () =>
    transactionBegin(dbPool).then(client => {
      dbClient = client
      userRepository = UserRepository.create(dbClient, { User })
    })
  )

  afterEach('Transaction rollback', () => transactionRollback(dbClient))

  describe('UserRepository static methods', () => {
    it('should has factory method create', () => {
      UserRepository.create.should.be.a.Function()
      userRepository.should.be.instanceof(UserRepository)
    })
  })

  describe('UserRepository.getUserByEmail test', () => {
    it('should return user by email', () => {
      const testSet = [
        ['email1@gmail.com', 1, 'email1@gmail.com', 'hash1'],
        ['email2@gmail.com', 2, 'email2@gmail.com', 'hash2'],
        ['email3@gmail.com', 3, 'email3@gmail.com', 'hash3'],
      ]

      let tests = testSet.map(([emailParam, id, email, passwordHash]) =>
        userRepository.getUserByEmail(emailParam).then(user => {
          user.id.should.be.exactly(id)
          user.email.should.be.exactly(email)
          user.passwordHash.should.be.exactly(passwordHash)
        })
      )

      return Promise.all(tests)
    })
  })

  describe('UserRepository.checkEmailExists test', () => {
    it('should return true (users with given emails exist)', () => {
      const testSet = ['email1@gmail.com', 'email2@gmail.com', 'email3@gmail.com']
      let tests = testSet.map(email =>
        userRepository.checkEmailExists(email).then(exists => {
          exists.should.be.true()
        })
      )

      return Promise.all(tests)
    })

    it("should return false (users with given emails don't exist", () => {
      const testSet = ['non-existing1@gmail.com', 'non-existing2@gmail.com', 'non-existing3@gmail.com']
      let tests = testSet.map(email =>
        userRepository.checkEmailExists(email).then(exists => {
          exists.should.be.false()
        })
      )

      return Promise.all(tests)
    })
  })

  describe('UserRepository.saveUser test', () => {
    it('should save user into DB', () => {
      const testUser = {
        email: 'test1111@gmail.com',
        passwordHash: 'hash1111',
      }

      return userRepository.saveUser(testUser).then(user => {
        user.should.be.not.null()
        user.should.be.instanceof(User)
        user.id.should.be.not.null()
        user.id.should.be.a.Number()
        user.email.should.be.exactly(testUser.email)
        user.passwordHash.should.be.exactly(testUser.passwordHash)
      })
    })

    it("should raise an exception (user's email should be unique)", () => {
      const existingUser = {
        email: 'email1@gmail.com',
        passwordHash: 'hash1',
      }

      return should.throws(userRepository.saveUser(existingUser))
    })
  })
})
