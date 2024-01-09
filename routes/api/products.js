const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(productController.getALlProducts)
    .post(verifyRoles(rolesList.Admin), productController.createNewProduct)
    .put(verifyRoles(rolesList.Admin), productController.updateProduct)
    .delete(verifyRoles(rolesList.Admin), productController.deleteProduct);

router.route('/:id')
    .get(productController.getProduct);

module.exports = router;