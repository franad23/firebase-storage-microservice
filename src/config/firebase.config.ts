import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (imageData) => {
  const blob = new Blob([imageData.buffer], { type: imageData.mimetype });
  const file = new File([blob], imageData.fieldname, { type: imageData.mimetype });
  const storageRef = ref(storage, uuidv4());
  const snapshot = await uploadBytesResumable(storageRef, file);
  const imageUrl = await getDownloadURL(snapshot.ref);
  return imageUrl;
};

export default uploadImage;
