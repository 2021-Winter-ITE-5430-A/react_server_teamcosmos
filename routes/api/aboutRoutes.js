const express = require('express');
// const uuid = require('uuid');
const auth = require('../../middleware/auth');
 
let About = require('../../models/About');

const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const abouts = await About.find();
    res.send(abouts);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).send('about not found');
    }
    res.send(about);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// validation ..
router.post(
  '/',
  auth,
  [
    check('title', 'title is required').not().isEmpty(), 
    check('history', 'history is required').not().isEmpty(), 
    check('services', 'services should be longer than 5 char').isLength({
      min: 5,
  }),

  ],
   async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newAbout = new About({
      user: req.user.id,
      title:  req.body.title,
      history : req.body.history, 
      services: req.body.services,
      date: req.body.date
    });

    const result = await newAbout.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const about = await About.findById(req.body.id);
    if (!about) {
      return res.status(404).json({ msg: 'About not found' });
    }
    const result = await About.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const about = await About.findById(req.body.id);
    if (!about) {
      return res.status(404).json({ msg: 'About not found' });
    }
 
    about.user = req.user.id,
    about.title = req.body.title; 
    about.history = req.body.history; 
    about.services = req.body.services;
    about.date = req.body.date ? req.body.date: Date.now();

    await about.save();
    res.send(about);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;