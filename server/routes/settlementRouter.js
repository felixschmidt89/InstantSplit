import express from 'express';
import {
  persistGroupSettlements,
  deleteSettlement,
  deleteAllGroupSettlements,
  getAllGroupSettlements,
} from '../controllers/settlementController.js';

const router = express.Router();

router.post('/', persistGroupSettlements);

router.delete('/', deleteSettlement);

router.delete('/:groupCode', deleteAllGroupSettlements);

router.get('/:groupCode', getAllGroupSettlements);

export default router;
