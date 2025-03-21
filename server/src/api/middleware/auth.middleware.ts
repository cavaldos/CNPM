import admin from 'firebase-admin';
import { Request, Response, NextFunction } from "express";
import { initializeApp } from 'firebase-admin/app';
import serviceAccount from '../../../firebase.json';
import dotenv from 'dotenv';
dotenv.config();


declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        [key: string]: any;
      };
    }
  }
}

try {
  initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

const verifyIdToken = async (idToken: string): Promise<string> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    console.error('Token verification error:', error);
    throw new Error('Unauthorized: Invalid token');
  }
};



const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      throw new Error('No token provided');
    }
    const uid = await verifyIdToken(idToken);
    req.user = { uid }; 
    console.log('User authenticated. UID:', uid);
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : 'Unauthorized'
    });
  }
};

export { verifyIdToken };

export default authMiddleware;