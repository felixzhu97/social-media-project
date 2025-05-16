import express from 'express';
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController';

const router = express.Router();

// 创建订单
router.post('/:userId', createOrder);

// 获取用户订单列表
router.get('/user/:userId', getUserOrders);

// 获取订单详情
router.get('/:id', getOrderById);

// 更新订单状态
router.put('/:id/status', updateOrderStatus);

// 取消订单
router.post('/:id/cancel', cancelOrder);

export default router;
