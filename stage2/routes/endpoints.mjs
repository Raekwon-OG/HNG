import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.get("/", async (req,res) => {
//   res.send("Welcome")
// })
// This section will help you get a single record by id
router.get("", async (req, res) => {
  let {user_id, name} = req.query
  user_id = Math.abs(Number(user_id))
  let collection = await db.collection("person");
  // if (typeof(name) == 'string' || typeof(user_id) == 'number') {
  console.log(name, user_id)
  collection.createIndex({ "user_id": 1 }, { unique: true })
  let query = name ? {"name":name}: {"user_id":user_id};
  let result = await collection.findOne(query)

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
  // } else {
  //   res.send("Query parameters should be string or numbers. Please try again")
  // }
});

router.post("/", async (req, res) => {
    let {user_id, name} = req.query
    user_id = Math.abs(Number(user_id))
    if (user_id){
      let object_id = new ObjectId(user_id);
      let collection = await db.collection("person");
      if (name){
      let new_record = await collection.insertOne({
        "_id":object_id, 
        "user_id":user_id, 
        "name":name});
      res.send(new_record).status(204);
      } else{
        res.send("Please provide name of user to be created ")
      }
    } else{
      res.send("Please provide an integer value for the 'user_id' parameter")
    }
  });

  router.put("/:user_id", async(req,res) =>{
    const query = { _id: new ObjectId(req.params.user_id) };
    const updates =  {
        name: req.query.name,
    };
    let collection = await db.collection("person");
    let result = await collection.replaceOne(query, updates);
    res.send(result).status(200);

  })

  router.patch("/:user_id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.user_id) };
    const updates =  {
      $set: {
        name: req.query.name,
      }
    };
    let collection = await db.collection("person");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  });


  router.delete("/:user_id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.user_id) };
    const collection = db.collection("person");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

  export default router;