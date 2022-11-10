var express = require('express');
var router = express.Router();
const User = require('../models/User')
const { Response, isTokenValid, secretKey } = require('../helpers/util')
const jwt = require('jsonwebtoken');

router.get('/', async function (req, res, next) {
  try {
    const users = await User.find({}).populate('todos')
    res.json(new Response(users))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const { email, password, name } = req.body

    const user = await User.create({ email, password, name });
    res.status(201).json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    const { email, name } = req.body

    const user = await User.findByIdAndUpdate(req.params.id, { email, name }, { new: true })
    res.status(201).json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(new Response(user))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
});

router.post('/signin', async function (req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user.comparePassword(password)) {
      return res.json(new Response({ message: "password doesn't match" }, false))
    }

    // create token
    user.token = jwt.sign({ userid: user._id, email: user.email }, secretKey);
    await user.save()

    res.json(new Response({
      email: user.email,
      name: user.name,
      token: user.token
    }))
  } catch (e) {
    console.log('gagal tambah user', e)
    res.status(500).json(new Response(e, false))
  }
});

router.post('/signout', async function (req, res, next) {
  const token = req.headers.authorization;

  if (token && token.split(' ')[1]) {
    const pureToken = token.split(' ')[1]

    try {
      const result = jwt.verify(pureToken, secretKey)
      const user = await User.findById(result.userid)
      user.token = null
      await user.save()
      res.json(new Response({ message: "signout success" }, true))
    } catch (e) {
      res.json(new Response({ message: 'token invalid' }, false))
    }
  } else {
    res.json(new Response({ message: 'token invalid' }, false))
  }
});

module.exports = router;
