const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Categories not found' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Category not found' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Category creation failed' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, { where: { id: req.params.id } });
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    res.status(500).json({ message: 'Category update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      res.status(404).json({ message: 'id not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category' });
  }
});

module.exports = router;
