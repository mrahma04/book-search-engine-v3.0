const jwt = require('jsonwebtoken');
require('dotenv').config()
// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows a token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim()
      console.log('RAW TOKEN EXTRACTED FROM REQ HEADER AUTHORIZATION \n', token)
    }

    // if no token, return request object as is
    if (!token) {
      // console.log('NO TOKEN!')
      return req
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration })
      console.log('TOKEN DECODED AND ADDED TO REQ.USER \n', data)
      req.user = data
    } catch {
      console.log('Invalid token')
    }

    // return updated request object
    return req
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};