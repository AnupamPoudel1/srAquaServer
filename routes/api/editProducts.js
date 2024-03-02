const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(productController.createNewProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

router.route('/:id')
    .get(productController.getProduct);

module.exports = router;