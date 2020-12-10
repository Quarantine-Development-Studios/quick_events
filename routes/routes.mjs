import express from 'express';
const router = express.Router();
import database from '../controllers/database.mjs';

router.get('/test-case', database.testCase);

router.get('/firebaseConfig-apiKey', database.getFirebaseApiKey);

router.get('/firebase-createEntry', database.createEntry);
router.get('/firebase-removeEntry', database.removeEntry);


export default router;