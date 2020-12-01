import {Router} from 'express'
const router = Router()
import {authJwt, verifySignup} from '../middlewares'

import * as userCtrl from '../controllers/users.controller';

router.get('/',[authJwt.verifyToken, authJwt.isModerator], userCtrl.getUsers)
//router.get('/', userCtrl.getUsers)

router.post('/', [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userCtrl.createUser)

export default router;