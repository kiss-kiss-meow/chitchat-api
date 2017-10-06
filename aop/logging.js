const good = require('good')

const options = {
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', error: '*', response: '*' }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
    fileReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ ops: '*', error: '*', log: '*' }],
      },
      {
        module: 'good-squeeze',
        name: 'SafeJson',
      },
      {
        module: 'rotating-file-stream',
        args: [
          'api.log',
          {
            path: './logs',
            size: '10M', // rotate every 10 MegaBytes written
            interval: '1d', // rotate daily
            compress: true, // compress rotated files
          },
        ],
      },
    ],
  },
}

const init = ({ server }) =>
  new Promise((resolve, reject) => {
    server.register(
      {
        register: good,
        options,
      },
      err => {
        if (err) reject(err)
        resolve()
      }
    )
  })

module.exports = {
  init,
}
