import express from 'express';
import {
  persistGroupSettlements,
  deleteSettlement,
  deleteAllGroupSettlements,
} from '../controllers/settlementController.js';

const router = express.Router();

// Persist all settlements for a group
router.post('/', persistGroupSettlements);

// Delete single settlement
router.delete('/', deleteSettlement);

// Delete all settlements for a group
router.delete('/:groupCode', deleteAllGroupSettlements);

export default router;
