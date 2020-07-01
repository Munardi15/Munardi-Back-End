const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/', UserController.allUser);
router.get('/find/:id',UserController.cache, UserController.findUserId);
router.get('/account/:accountNumber',UserController.cache, UserController.findAccountNumber);
router.get('/identity/:identityNumber',UserController.cache, UserController.findIdentityNumber);
router.post('/add', UserController.addUser);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

module.exports = router;


