const router = require('express').Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

// User
router.get('/', userController.getUser);
router.put('/', userController.updateUser);

// Admin
router.get('/all', roleMiddleware(['ADMIN']), userController.getAllUsers);

module.exports = router;
