import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of all the records.
router.get("/", async (req, res) => {
    let collection = await db.collection(process.env.REACT_APP_COLLECTION2_NAME);
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// Get a single record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection(process.env.REACT_APP_COLLECTION2_NAME);
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

export default router;