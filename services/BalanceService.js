const { db, client } = require("./_db");
const balanceCollection = db.collection("balance")


class BalanceService {
  constructor() {
    this._balance = {}
  }

  async getBalance() {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      const options = {
        projection: { _id: 0, balance: 1, updatedAt: 1 }
      }
      const cursor = await balanceCollection.find({}, options)
      await cursor.forEach(item => this._balance = item)

    } catch (e) {
      console.log(e.message);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return this._balance
  }

  async updateBalance(data) {
    let result
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      const filter = {};
      const updateDoc = {
        $set: data,
      };

      result = await balanceCollection.updateOne(filter, updateDoc);
      console.log('Update Balance');
    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return result
  }
}


module.exports = BalanceService