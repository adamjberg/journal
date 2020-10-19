const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
const moment = require("moment");
const bodyParser = require("body-parser");

dotenv.config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

run();

async function run() {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  console.log(`Connected to ${dbName}`);

  const app = express();
  app.use(bodyParser);

  app.get("/", async function (req, res) {
    const currentDateString = moment().format("YYYY-MM-DD");

    const note = await db
      .collection("notes")
      .findOne({ date: currentDateString });
    return res.json(note);
  });

  app.post("/", async function (req, res) {
    const currentDateString = moment().format("YYYY-MM-DD");

    const note = await db
      .collection("notes")
      .updateOne(
        { date: currentDateString },
        { body: req.body.body },
        { upsert: true }
      );
    return res.json(note);
  });

  app.listen(3000);
}
