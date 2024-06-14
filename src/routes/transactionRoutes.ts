import { Router } from 'express';
import { fundAccount, transferFunds, withdrawFunds } from '../controllers';

const router = Router();

router.post('/fund', fundAccount);
router.post('/transfer', transferFunds);
router.post('/withdraw', withdrawFunds);

export default router;
