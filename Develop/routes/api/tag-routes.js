const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
   // attributes: ['id','tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findAll({
    where:  {
      id: req.params.id
    },
   // attributes: ['id','tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.update({tag_name: req.body.tag_name}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.create({tag_name: req.body.tag_name},{where: {id: req.params.id}}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id: req.params.id}}).then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.status(500).json("Internal server error")
  })
});

module.exports = router;
