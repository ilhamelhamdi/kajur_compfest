const ClientError = require("../exceptions/ClientError")
const BalanceService = require("../services/BalanceService")
const balanceService = new BalanceService()

const getBalanceHandler = async (req, res) => {
  let balance
  try {
    // Fetching data
    balance = await balanceService.getBalance()

    response = {
      status: "success",
      message: "Balance was successfully fetched.",
      ...balance
    }
    res.status(200).json(response)
  } catch (e) {
    response = {
      status: "fail",
      message: e.message
    }
    res.status(400).json(response)
  }
}

const putBalanceHandler = async (req, res) => {
  let { action, amount } = { ...req.body }
  const updatedAt = new Date()
  let currBalance = (await balanceService.getBalance()).balance
  // amount = parseInt(amount)
  // currBalance = parseInt(currBalance)
  let modBalance = currBalance

  try {
    // Action Validation
    if (action === 'withdraw') {
      if (currBalance < amount) throw new ClientError('Total amount exceeds the balance!', 400)
      modBalance = currBalance - amount
    }
    if (action === 'add') {
      modBalance = currBalance + amount
    }

    // Adding to DB
    const result = await balanceService.updateBalance({ balance: modBalance, updatedAt })
    if (result.modifiedCount === 0) throw new Error(`Action (${action}) was fail.`)

    const response = {
      status: "success",
      message: `Action (${action}) was success.`,
    }
    res.status(201).json(response)
  } catch (e) {
    const response = {
      status: "fail",
      message: e.message
    }
    res.status(e.statusCode || 500).json(response)
  }
}


module.exports = { getBalanceHandler, putBalanceHandler }