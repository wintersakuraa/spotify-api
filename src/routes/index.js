const router = require('express').Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const roleRouter = require('./role.route');
const playlistRouter = require('./playlist.route');
const albumRouter = require('./album.route');
const songRouter = require('./song.route');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/playlist', playlistRouter);
router.use('/album', albumRouter);
router.use('/song', songRouter);

module.exports = router;
