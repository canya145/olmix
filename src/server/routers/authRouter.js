const {Router} = require('express');
const {users} = require('../controllers');

const authRouter = Router();

authRouter.post('/register', users.register);

module.exports = authRouter;
