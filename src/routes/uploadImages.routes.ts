import { Router } from 'express';
import { uploadImageToFirebase } from '../controllers/uploadImages.controllers';

const router = Router();

router.post('/', uploadImageToFirebase);

export default router;
