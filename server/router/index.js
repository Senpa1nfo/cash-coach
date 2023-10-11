const Router = require('express').Router;
const UserController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 16}),
    UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/link', UserController.sendLink);
router.post('/add', UserController.add);
router.post('/edit', UserController.edit);
router.post('/delete', UserController.delete);
router.get('/generate-list', UserController.generate_list);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.users);

module.exports = router;