var express = require('express');
var router = express.Router();
const { User, Todo } = require('../models/index')

router.get('/', async function (req, res, next) {
  try {
    const todos = await Todo.findAll({
      include: [{
        model: User
      }]
    })
    res.json(todos)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const todo = await Todo.findByPk(req.params.id)
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { title, executor } = req.body
    const todo = await Todo.create({ title, executor })
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { title, complete } = req.body
    const data = await Todo.update({
      title,
      complete
    }, {
      where: {
        id: req.params.id
      },
      returning: true,
      plain: true
    })
    res.json(data[1] ? data[1] : data)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const todo = await Todo.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
});

module.exports = router;
