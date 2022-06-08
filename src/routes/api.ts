import { Router } from 'express';
import {privateRoute} from '../config/passport'

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping)
router.get('/dia', ApiController.dia)

router.post('/register', ApiController.register);
router.post('/login', ApiController.login);

router.get('/list',privateRoute, ApiController.list);//rota privada



export default router;