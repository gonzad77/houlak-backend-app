import { Router } from 'express';
import  { getAlbums } from '../controllers/albums';

const router = Router();

router.get('/', getAlbums );

export default router;