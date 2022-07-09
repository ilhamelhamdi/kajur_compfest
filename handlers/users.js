const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ClientError = require("../exceptions/ClientError")
const ServerError = require('../exceptions/ServerError')
const UsersService = require('../services/UsersService')
const NotFoundError = require("../exceptions/NotFoundError")

const userService = new UsersService()

const register = async (req, res) => {
  const { userId, name, password } = { ...req.body }

  try {
    // Validate userId
    if (userId.length !== 5) throw new ClientError('Invalid Id', 401)
    const numbers = userId.split('')
    const left = numbers
      .slice(0, 3)
      .reduce((total, n) => (total + parseInt(n)), 0)
    const right = parseInt(numbers
      .slice(3, 5)
      .join(''))
    if (left !== right) throw new ClientError('Invalid Id', 401)

    // Check if userId is registered
    let isRegistered = (await userService.getUserById(userId)) !== undefined
    if (isRegistered) throw new ClientError('User ID has been registered', 400)

    const data = {
      userId,
      name,
      password: await bcrypt.hash(password, 7)
    }

    // Add user to DB
    const _id = await userService.addUser(data)

    // Check user adding process
    if (!_id) throw new ServerError('Server: Failed to add user')

    const response = {
      status: 'success',
      message: 'User was successfully registered.'
    }
    res.status(201).json(response)

  } catch (e) {
    const response = {
      status: 'fail',
      message: e.message
    }
    res.status(e.statusCode || 500).json(response)
  }
}

const login = async (req, res) => {
  const { userId, password } = { ...req.body }

  try {
    // Checking if userId is registered
    const user = await userService.getUserById(userId)
    const isRegistered = user !== undefined
    if (!isRegistered) throw new NotFoundError('User not found.')

    // Comparing passwords
    const passIsValid = await bcrypt.compare(password, user.password)
    if (!passIsValid) throw new ClientError('Invalid password.', 401)

    // Signing token with userId
    const token = await jwt.sign({
      userId: user.userId
    }, process.env.JWT_SECRET)

    const response = {
      status: 'success',
      message: 'Login successful',
      body: {
        accessToken: token,
        user: {
          userId: user.userId,
          name: user.name
        }
      }
    }
    res.status(200).json(response)
  } catch (e) {
    const response = {
      status: 'fail',
      message: e.message
    }
    res.status(e.statusCode || 500).json(response)
  }
}

const UserHandler = { register, login }

module.exports = UserHandler