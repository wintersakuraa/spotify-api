const router = require('express').Router();
const albumController = require('../controllers/album.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['ARTIST']), albumController.createAlbum);
router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);
router.put('/:id', roleMiddleware(['ARTIST']), albumController.updateAlbum);
router.delete('/:id', roleMiddleware(['ARTIST']), albumController.deleteAlbum);
router.get('/songs/:id', albumController.getSongsFromAlbum);

module.exports = router;
