const { db, client } = require("./_db");

const balance = db.collection("balance")

const getBalanceModel = async () => {
  let data

  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const options = {
      projection: { _id: 0, balance: 1, updatedAt: 1 }
    }
    const cursor = balance.find({}, options)
    await cursor.forEach(item => data = item)

  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return data
}

const putBalanceModel = async (data) => {
  let result
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected successfully to DB");

    const filter = {};
    const updateDoc = {
      $set: data,
    };

    result = await balance.updateOne(filter, updateDoc);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

  return result
}

module.exports = { getBalanceModel, putBalanceModel }