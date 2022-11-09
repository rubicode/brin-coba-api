var express = require('express');
var router = express.Router();
const Todo = require('../models/Todo')
const User = require('../models/User')

router.get('/', async function (req, res, next) {
  try {
    const todos = await Todo.find({}).populate('executor')
    res.json(todos)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id)
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { title,userid } = req.body
    const user = await User.findById(userid);
    const todo = await Todo.create({ title, executor: user });
    user.todos.push(todo._id)
    await user.save()
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { email, name } = req.body

    const todo = await Todo.findByIdAndUpdate(req.params.id, { email, name }, { new: true })
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const todo = await Todo.findByIdAndRemove(req.params.id);
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

module.exports = router;
