const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.DB_URL;
  const dbName = process.env.DB_NAME;

  let client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();

    const inventory = await client.db(dbName).collection('available_coffees').find().toArray();

    console.log(inventory);
    return {
      statusCode: 200,
      body: inventory,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: { error: 'Problem with getting data' },
    };
  } finally {
    await client.close();
  }
}

module.exports.main = main;
