const router = require('express').Router();
const roleController = require('../controllers/role.controller');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(roleMiddleware(['ADMIN']));

// CRUD operations with roles
router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.get('/:title', roleController.getRoleByTitle);
router.put('/:title', roleController.updateRole);
router.delete('/:title', roleController.deleteRole);

// operating with user's roles
router.post('/add/:userId', roleController.addRole);
router.post('/remove/:userId', roleController.removeRole);

module.exports = router;
