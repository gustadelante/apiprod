import {Router} from 'express'
const router = Router()

import * as productsCtrl from '../controllers/products.controller'
import {authJwt} from '../middlewares'

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct)

router.get('/', authJwt.verifyToken, productsCtrl.getProducts)

router.get('/:productId',authJwt.verifyToken, productsCtrl.getProductById)

router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.updateProductById)

router.delete('/:productId', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.deleteProductById)

/*
router.post('/', productsCtrl.createProduct)

router.get('/', productsCtrl.getProducts)

router.get('/:productId', productsCtrl.getProductById)

router.put('/:productId',  productsCtrl.updateProductById)

router.delete('/:productId', productsCtrl.deleteProductById)
*/

export default router;