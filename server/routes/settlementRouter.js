import express from 'express';
import { check } from 'express-validator';
import {
  persistGroupSettlements,
  deleteSettlement,
  deleteAllGroupSettlements,
} from '../controllers/settlementController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';

const router = express.Router();

// Persist all settlements for a group
router.post('/:groupCode', persistGroupSettlements);

// Delete single settlement
router.delete('/:settlementId', deleteSettlement);

// Delete all settlements for a group
router.delete('/debug/:groupCode', deleteAllGroupSettlements);

export default router;
