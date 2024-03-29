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
  const storageRef = ref(storage, uuidv4());
  const metadata = {
    contentType: imageData.mimetype,
  };
  const snapshot = await uploadBytesResumable(storageRef, imageData.buffer, metadata);
  const imageUrl = await getDownloadURL(snapshot.ref);
  return imageUrl;
};

export default uploadImage;
