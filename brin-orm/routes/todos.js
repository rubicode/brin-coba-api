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
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { title, executor } = req.body
    const todo = await Todo.create({ title, executor })
    res.json(todo)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

// router.put('/:id', async function (req, res, next) {
//   try {
//     const { email, name } = req.body

//     const todo = await Todo.findByIdAndUpdate(req.params.id, { email, name }, { new: true })
//     res.json(todo)
//   } catch (e) {
//     console.log(e)
//     res.send(e)
//   }
// });

// router.delete('/:id', async function (req, res, next) {
//   try {
//     const todo = await Todo.findByIdAndRemove(req.params.id);
//     res.json(todo)
//   } catch (e) {
//     console.log(e)
//     res.send(e)
//   }
// });

module.exports = router;
