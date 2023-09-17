import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// router.get("/", async (req,res) => {
//   res.send("Welcome")
// })
// This section will help you get a single record by id or name
router.get("", async (req, res) => {
  let {user_id, name} = req.body
  user_id = Math.abs(Number(user_id))
  let collection = await db.collection("person");
  if (user_id || name) {
    collection.createIndex({ "user_id": user_id }, { unique: true })
    let query = name ? {"name":name}: {"user_id":user_id};
    let result = await collection.findOne(query)

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } else {
    res.send("<h2><center>Welcome !</center></h2> <br> Find out more about this API here: <a href='https://github.com/Raekwon-OG/track-backend/tree/main/stage2#crud-api-guide'> <b>API README.md</b> </a>")
  }
});

router.post("/", async (req, res) => {
    let {user_id, name} = req.body
    user_id = Math.abs(Number(user_id))
    if (user_id){
      let object_id = new ObjectId(user_id);
      let collection = await db.collection("person");
      if (name){
        let new_record = await collection.insertOne({
          "_id":object_id, 
          "user_id":user_id, 
          "name":name});
      collection.createIndex({ "user_id": user_id }, { unique: true })
      res.send(new_record).status(204);
      } else {
        res.send("Please provide name of user to be created ")
      }
    } else{
      res.send("Please provide an integer value for the 'user_id' parameter")
    }
  });

  router.put("/:user_id", async(req,res) =>{
    let query = {"user_id":Math.abs(Number(req.params.user_id))};
    const updates =  {
        user_id: Math.ceil((Math.random() * 100)),
        name: req.body.name
    };
    let collection = await db.collection("person");
    let result = await collection.replaceOne(query, updates);
    res.send(result).status(200);

  })

  router.patch("/:user_id", async (req, res) => {
    let query = {"user_id":Math.abs(Number(req.params.user_id))};
    const updates =  {
      $set: {
        name: req.body.name,
      }
    };
    let collection = await db.collection("person");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  });


  router.delete("/:user_id", async (req, res) => {
    let user_id = Math.abs(Number(req.params.user_id))
    let query = {"user_id":user_id};
    const collection = db.collection("person");
    let result = await collection.deleteOne(query);
  
    res.send(result).status(200);
  });

  export default router;