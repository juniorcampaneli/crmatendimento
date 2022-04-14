require('dotenv').config()

params = {
  env: process.env.NODE_OPTIONS,
  login: process.env.USER_CELEPAR,
  password: process.env.PASS_CELEPAR,
  key_token: process.env.TOKEN_KEY
}

module.exports = params