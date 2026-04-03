import express from 'express';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js'; // Import the admin middleware
import { 
    placeOrder, 
    verifyOrder, 
    userOrders,
    listOrders,     // Import admin function
    updateStatus    // Import admin function
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// --- User Facing Routes ---
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorders", authUser, userOrders);

// --- Admin Facing Routes ---
orderRouter.get('/list', adminAuth, listOrders);
orderRouter.post('/status', adminAuth, updateStatus);

export default orderRouter;
