const { ObjectId } = require("mongodb");
const { db, client } = require("./_db");


const itemsCollection = db.collection("items")

class ItemsService {

  async getAllItems({ sortName, sortDate, name }) {
    let items = []
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      let query = {}
      const options = {
        sort: {},
        projection: { desc: 0 }
      }

      // Applying filter
      if (sortDate) {
        options.sort.updatedAt = (sortDate === 'oldest') ? 1 : -1
      }
      if (sortName) {
        options.sort.name = (sortName === 'desc') ? -1 : 1
      }
      if (name) {
        itemsCollection.createIndex({ name: "text" })
        query = { $text: { $search: name } }
      }

      // Fetching data from DB
      const cursor = await itemsCollection.find(query, options)
      await cursor.forEach(res => items.push(res))

    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }

    return items
  }

  async getItemById(id) {
    let item
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      const query = { _id: ObjectId(id) }
      const options = {
        projection: {}
      }

      const cursor = await itemsCollection.find(query, options)
      await cursor.forEach(res => { item = res })

    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return item
  }

  async addItem(data) {
    let id
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      id = (await itemsCollection.insertOne(data)).insertedId
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return id
  }

  async updateItem(id, data) {
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

      result = await itemsCollection.updateOne(filter, updateDoc, options);
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return result
  }

  async deleteItem(id) {
    let result
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      const query = { _id: ObjectId(id) }

      result = await itemsCollection.deleteOne(query)
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return result
  }
}

module.exports = ItemsService