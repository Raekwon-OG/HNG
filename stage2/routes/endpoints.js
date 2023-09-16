import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a single record by id
router.get("/api/:user_id", async (req, res) => {
  let {user_id, name} = req.params
  let collection = await db.collection("records");
  if (typeof(user_id) === String || typeof(user_id) === Number) {
  let query = {_id: new ObjectId(user_id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
  } else {
    res.send("Query parameters should be string or numbers. Please try again")
  }
});

router.post("/api", async (req, res) => {
    let {user_id, name} = req.params
    let collection = await db.collection("records");
    let result = await collection.insertOne(req.params);
    res.send(result).status(204);
  });