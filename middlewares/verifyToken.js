const jwt = require('jsonwebtoken')
const UsersService = require('../services/UsersService')

const userService = new UsersService()

const verifyToken = async (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    const callbackVerify = async (err, decoded) => {
      if (err) {
        res.status(500).send({
          status: 'fail',
          message: err.message
        })
      }
      const user = await userService.getUserById(decoded.userId)
      if (!user) {
        const response = {
          status: 'fail',
          message: 'Unauthorized access.'
        }
        res.status(403).send(response)
      } else {
        next()
      }
    }

    jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.JWT_SECRET,
      callbackVerify
    )

  } else {
    const response = {
      status: 'fail',
      message: 'Unauthorized access.'
    }
    res.status(403).send(response)
    console.log('does not have jwt auth');
  }
}

module.exports = verifyToken