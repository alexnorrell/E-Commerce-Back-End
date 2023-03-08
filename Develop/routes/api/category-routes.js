const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
     include: [
       {
         model: Product,
         attributes: ['id','product_name', 'price', 'stock', 'category_id']
       }
     ]
   }).then((data)=>{
     res.json(data)
   }).catch((err)=>{
     res.status(500).json("Internal server error")
   })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id','product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
  },{where:{id: req.params.id}}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where:{
      id: req.params.id
    }
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

module.exports = router;
