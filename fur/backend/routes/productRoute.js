import express from 'express';
import {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
    addReview,
    likeReview,
    updateProduct // Import the new update function
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const productRouter = express.Router();

// Admin product routes
productRouter.post('/add', adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }
]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.put('/update/:id', adminAuth, updateProduct); // ✅ NEW: Update route

// Public product routes
productRouter.get('/list', listProducts);
productRouter.post('/single', singleProduct);

// User review routes
productRouter.post('/reviews/add', authUser, upload.single('reviewImage'), addReview);
productRouter.post('/reviews/like', authUser, likeReview);

export default productRouter;
