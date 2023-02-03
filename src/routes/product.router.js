const express = require("express");
const { body, validationResult } = require('express-validator');
const { addProductValidation } = require("../validations/validator");

const router  = express.Router();

const productController = require("../controllers/productController");



router.get('/', productController.index);

router.get('/:id', productController.singleProduct);

//Add Product
router.post('/add', addProductValidation(), productController.addProduct);
//router.post('/add', productController.validate('addProductValidation'), productController.addProduct);

//Update Product
router.post('/:id', productController.validate('productFields'), productController.updateProduct);

//Delete Product
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;