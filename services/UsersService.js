const { db, client } = require("./_db")
const usersCollection = db.collection('users')

class UsersService {

  async addUser(data) {
    let id
    try {
      await client.connect()
      console.log("Connected successfully to DB");
      id = (await usersCollection.insertOne(data)).insertedId
    } catch (e) {
      console.log(e);
    } finally {
      await client.close()
    }
    return id
  }

  async getUserById(userId) {
    let user
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Connected successfully to DB");

      const query = { userId }
      const options = {}

      const cursor = await usersCollection.find(query, options)
      await cursor.forEach(res => { user = res })

    } catch (e) {
      console.log(e);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    return user
  }
}

module.exports = UsersService