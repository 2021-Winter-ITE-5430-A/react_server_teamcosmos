const express = require('express');
// const uuid = require('uuid');
const auth = require('../../middleware/auth');
 
let Template = require('../../models/Template');

const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const templates = await Template.find();
    res.send(templates);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).send('template not found');
    }
    res.send(template);
  } catch (err) {
    res.status(500).send('Server error');
  }
});
// validation ..
router.post(
  '/',
  auth,
  [
    check('resumeUrl', 'resumeUrl is required').not().isEmpty(),
    check('coverLetterUrl', 'coverLetterUrl is required').not().isEmpty(),
    check('cvType', 'cvType should be longer than 5 char').isLength({
      min: 5,
  }),

  ],
   async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const newTemplate = new Template({
      user: req.user.id,
      resumeUrl : req.body.resumeUrl,
      coverLetterUrl : req.body.coverLetterUrl,
      cvType: req.body.cvType,
      date: req.body.date
    });

    const result = await newTemplate.save();

    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.body.id);
    if (!template) {
      return res.status(404).json({ msg: 'Template not found' });
    }
    const result = await Template.findByIdAndDelete(req.body.id);
    res.send(result);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.put('/', auth, async (req, res) => {
  try {
    const template = await Template.findById(req.body.id);
    if (!template) {
      return res.status(404).json({ msg: 'Template not found' });
    }
 
    template.user = req.user.id,
    template.resumeUrl = req.body.resumeUrl;
    template.coverLetterUrl  = req.body.coverLetterUrl;
    template.cvType = req.body.cvType;
    template.date = req.body.date ? req.body.date: Date.now();

    await template.save();
    res.send(template);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;