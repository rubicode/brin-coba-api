var express = require('express');
var router = express.Router();
const User = require('../models/User')

router.get('/', async function (req, res, next) {
  try {
    const users = await User.find({}).populate('todos')
    res.json(users)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { email, name } = req.body

    const user = await User.create({ email, name });
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { email, name } = req.body

    const user = await User.findByIdAndUpdate(req.params.id, { email, name }, { new: true })
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

module.exports = router;
