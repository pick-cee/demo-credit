import { Router } from 'express';
import { fundAccount, transferFunds, withdrawFunds } from '../controllers';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/fund', verifyToken, fundAccount);
router.post('/transfer', verifyToken, transferFunds);
router.post('/withdraw', verifyToken, withdrawFunds);

export default router;
