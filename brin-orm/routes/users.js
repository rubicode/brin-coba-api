var express = require('express');
var router = express.Router();
const { User, Todo, sequelize } = require('../models/index')

router.get('/', async function (req, res, next) {
  try {
    const users = await User.findAll({
      include: [{
        model: Todo
      }]
    })
    res.json(users)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await User.findByPk(req.params.id)
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { name } = req.body

    const user = await User.create({ name });
    res.json(user)
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { name } = req.body
    const data = await User.update({
      name
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
    const user = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
});

module.exports = router;
