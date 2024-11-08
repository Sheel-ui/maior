import { Router, Request, Response } from "express";
import ensureAuthenticated from "../middleware/authMiddleware";
import { getAccountId, getBarData } from "../controllers/chartController";

const router: Router = Router();

router.get(
	"/accountId",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getAccountId(req, res);
	}
);

router.get(
	"/bar",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getBarData(req, res);
	}
);

export default router;
