const {Router} = require('express');
const router = new Router();
const Goods = require('../models/Goods');
const {Types} = require('mongoose');

// root - /api/goods

router.get('/', async (req, res) => {
  try {
    const goods = await Goods.find();
    res.json(goods);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.post('/', async (req, res) => {
  try {
    const {name, purchase, sell, category} = req.body;
    const good = new Goods({
      name,
      purchasePrice: purchase,
      sellingPrice: sell,
      category: Types.ObjectId(category)
    });
    good.save();
    res.status(201).json(good);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.put('/', async (req, res) => {
  try {
    const {_id, name, purchase, sell, category} = req.body;
    const good = await Goods.findById(_id);
    console.log(category)
    good.name = name;
    good.purchasePrice = purchase;
    good.sellingPrice = sell;
    good.category = category === 'Without category' ? null : Types.ObjectId(category);
    good.save();
    res.status(201).json(good);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const good = await Goods.findOneAndDelete({_id: req.params.id});
    res.json(good);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

router.get('/inCategory/:catId', async (req, res) => {
  try {
    let goods;
    if (req.params.catId === 'null') {
      goods = await Goods.find({category: null});
    } else {
      goods = await Goods.find({category: req.params.catId});
    }
    res.json(goods);
  } catch (e) {
    res.status(500).json({message: `Something go wrong, please try again later. ${e.message}`});
  }
});

module.exports = router;
