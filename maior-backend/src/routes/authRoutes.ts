import express, { Router, Request, Response } from 'express';
import { signup, login } from '../controllers/authContoller';

const router: Router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

router.post('/signup', async (req: Request, res: Response) => {
  await signup(req, res);
});

export default router;