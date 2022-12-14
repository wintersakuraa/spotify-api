const router = require('express').Router();
const songController = require('../controllers/song.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.use(authMiddleware);
router.use(roleMiddleware(['ARTIST']));

// CRUD operations with songs
router.post('/', roleMiddleware(['ARTIST']), songController.createSong);
router.get('/', songController.getAllSongs);
router.get('/:id', songController.getSongById);
router.put('/:id', roleMiddleware(['ARTIST']), songController.updateSong);
router.delete('/:id', roleMiddleware(['ARTIST']), songController.deleteSong);

// operations with playlists and songs
router.post('/add-to-playlist/:songId', songController.addSongToPlaylist);
router.post('/remove-from-playlist/:songId', songController.removeSongFromPlaylist);

module.exports = router;
