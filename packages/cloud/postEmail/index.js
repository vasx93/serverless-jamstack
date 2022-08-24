const MongoClient = require('mongodb').MongoClient;

async function main(args) {
  const uri = process.env.DB_URL;
  const dbName = process.env.DB_NAME;

  let client = new MongoClient(uri);

  let newEmail = args.email;
  try {
    await client.connect();
    await client.db(dbName).collection('email_lists').insertOne({ subscriber: newEmail });
    console.log(`added ${newEmail} to database.`);
    return { statusCode: 200 };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      body: { error: 'There was a problem adding the email address to the database.' },
    };
  } finally {
    await client.close();
  }
}

module.exports.main = main;
