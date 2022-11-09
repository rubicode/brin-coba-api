var express = require('express');
var router = express.Router();
var { ObjectId } = require('mongodb');

module.exports = function (db) {
  const collection = db.collection('users');

  router.get('/', async function (req, res, next) {
    try {
      const users = await collection.find({}).toArray();
      res.json(users)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  router.get('/:id', async function (req, res, next) {
    try {
      const user = await collection.findOne({ _id: ObjectId(req.params.id) })
      res.json(user)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  router.post('/', async function (req, res, next) {
    try {
      const { email, name } = req.body

      const user = await collection.insertOne({ email, name });
      res.json(user)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  router.put('/:id', async function (req, res, next) {
    try {
      const { email, name } = req.body

      const user = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: { email, name } });
      res.json(user)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  router.delete('/:id', async function (req, res, next) {
    try {
      const user = await collection.deleteOne({ _id: ObjectId(req.params.id) });
      res.json(user)
    } catch (e) {
      console.log(e)
      res.send(e)
    }
  });

  return router;
}
