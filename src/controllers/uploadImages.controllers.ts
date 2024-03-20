import { Request, Response } from 'express';
import multer from 'multer';
import uploadImage from '../config/firebase.config';

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = file?.originalname?.split('.').pop().toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
      callback(null, true);
    } else {
      callback(new Error('Solo se permiten imágenes JPEG, JPG y PNG'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
const uploadSingleImage = upload.single('image');

const uploadImageToFirebase =  (req: Request, res: Response) => {
  uploadSingleImage(req, res, async (err: unknown) => {
    if (err) {
      console.error('Error al cargar la imagen:', err);
      return res.status(500).send({
        success: false,
        message: 'Error al cargar la imagen.',
      });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).send({
        success: false,
        message: 'No se ha encontrado ninguna imagen.',
      });
    }
    const imageUrl = await uploadImage(req.file);
    return res.status(200).send({ success: true, imageUrl });
  });
};

export {
  uploadImageToFirebase,
};
