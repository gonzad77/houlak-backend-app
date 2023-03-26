import { Router } from 'express';
import  { spotifyAuthorize, getAccessToken } from '../controllers/auth';

const router = Router();

router.get('/', spotifyAuthorize)
router.get('/callback', getAccessToken)

export default router;