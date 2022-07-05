const { ObjectId } = require("mongodb");
const { db, client } = require("./_db");


const items = db.collection("items")

const getAllItemsModel = async ({ sortName, sortDate, name }) => {
  let data = []

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const query = {}
    const options = {
      sort: {}
    }

    if (sortDate) {
      options.sort.updatedAt = (sortDate === 'oldest') ? 1 : -1
    }
    if (sortName) {
      options.sort.name = (sortName === 'desc') ? -1 : 1
    }


    const cursor = items.find(query, options)
    await cursor.forEach(item => data.push(item))

  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return data
}

const getItemByIdModel = async (id) => {
  let data = null
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const query = { _id: ObjectId(id) }
    const options = {}

    const cursor = items.find(query, options)
    await cursor.forEach(item => { data = item })

  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return data
}

const postItemModel = async (data) => {
  let id
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    id = (await items.insertOne(data)).insertedId
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return id
}

const putItemModel = async (id, data) => {
  let result
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const filter = { _id: ObjectId(id) };
    const options = {};
    const updateDoc = {
      $set: data,
    };

    result = await items.updateOne(filter, updateDoc, options);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return result
}

const deleteItemModel = async (id) => {
  let result
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const query = { _id: ObjectId(id) };
    result = await items.deleteOne(query);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return result
}

module.exports = { getAllItemsModel, getItemByIdModel, postItemModel, putItemModel, deleteItemModel }