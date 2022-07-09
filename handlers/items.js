const NotFoundError = require("../exceptions/NotFoundError")
const ItemsService = require('../services/ItemsService')

const itemsService = new ItemsService()

const getAllItemsHandler = async (req, res) => {
  let items, response
  const sortName = req.query.sort_name
  const sortDate = req.query.sort_date
  const name = req.query.name
  try {
    // Fetching data
    items = await itemsService.getAllItems({ sortName, sortDate, name })

    response = {
      status: "success",
      message: "Item was successfully fetched.",
      body: { items }
    }
    res.status(200).json(response)
  } catch (e) {
    response = {
      status: "fail",
      message: "Item was failed to be fetched."
    }
    res.status(400).json(response)
  }
}

const getItemByIdHandler = async (req, res) => {
  const id = req.params.id

  try {
    // Fetching and Checking data on DB
    const item = await itemsService.getItemById(id)
    if (item === null) throw new NotFoundError("Id is not found.")

    // Sending response
    const response = {
      status: "success",
      message: "Item was successfully fetched.",
      body: item
    }
    res.status(200).json(response)
  }

  catch (e) {
    const response = {
      status: "fail",
      message: e.message
    }
    res.status(e.statusCode | 500).json(response)
  }
}

const postItemHandler = async (req, res) => {
  const { name, img, desc, price } = { ...req.body }
  const createdAt = new Date()
  const updatedAt = createdAt

  // Data Validation

  // Uploading Image & getting img_url

  // Adding to DB
  try {
    const id = await itemsService.addItem({
      name, img, desc, price, createdAt, updatedAt
    })

    const response = {
      status: "success",
      message: "Item was successfully added.",
      body: { _id: id }
    }
    res.status(201).json(response)
  } catch (e) {
    const response = {
      status: "fail",
      message: e.message
    }
    res.status(400).json(response)
  }
}

const putItemHandler = async (req, res) => {
  const id = req.params.id
  const { name, img_url, desc, price } = { ...req.body }
  const updatedAt = new Date()

  // Data Comparasion & Validation

  // Img

  try {
    const data = { name, img_url, desc, price, updatedAt }
    const result = await itemsService.updateItem(id, data)

    if (result.matchedCount === 0) throw new NotFoundError('Id was not found')

    // Sending response
    const response = {
      status: "success",
      message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    }
    res.status(200).json(response)
  }

  catch (e) {
    const response = {
      status: "fail",
      message: e.message
    }
    res.status(e.statusCode || 500).json(response)
  }
}

const deleteItemHandler = async (req, res) => {
  const id = req.params.id

  try {
    // Deleting item on DB
    const result = await itemsService.deleteItem(id)
    if (result.deletedCount === 0) throw new NotFoundError("Item not found.")

    // Sending response
    const response = {
      status: "success",
      message: `Total ${result.deletedCount} item was successfully deleted.`
    }
    res.status(200).json(response)
  }

  catch (e) {
    const response = {
      status: "fail",
      message: e.message
    }
    res.status(e.statusCode).json(response)
  }
}

module.exports = { postItemHandler, getAllItemsHandler, getItemByIdHandler, putItemHandler, deleteItemHandler }