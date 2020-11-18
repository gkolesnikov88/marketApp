const {Router} = require('express');
const router = new Router();
const Categories = require('../models/Categories');

router.get('/', async (req, res) => {
  try {
    const categories = await Categories.find();
    res.json(categories);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.post('/', async (req, res) => {
  try {
    const {name} = req.body;
    const category = new Categories({name});
    category.save();
    res.status(201).json(category);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    res.json(category);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Categories.findOneAndDelete({_id: req.params.id});
    res.json(category);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

module.exports = router;
