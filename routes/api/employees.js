const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const rolesList = require('../../config/rolesList');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeController.getAllEmployee)
    .post(verifyRoles(rolesList.Admin, rolesList.User), employeeController.createNewEmployee)
    .put(verifyRoles(rolesList.Admin, rolesList.User), employeeController.updateEmployee)
    .delete(verifyRoles(rolesList.Admin), employeeController.deleteEmployee);

router.route('/:id')
    .get(employeeController.getEmployee);

module.exports = router;