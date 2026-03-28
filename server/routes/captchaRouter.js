import express from 'express';
import { verifyCaptcha } from '../controllers/captchaController.js';

// TODO: Delete Captcha related code
const router = express.Router();

router.post('/verify-captcha', verifyCaptcha);

export default router;
