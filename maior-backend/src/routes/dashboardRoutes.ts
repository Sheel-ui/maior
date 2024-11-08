import { Router, Request, Response } from "express";
import ensureAuthenticated from "../middleware/authMiddleware";
import { getAccountId, getGraphData } from "../controllers/chartController";

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
		await getGraphData(req, res, "bar");
	}
);

router.get(
	"/line",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getGraphData(req, res, "line");
	}
);

router.get(
	"/time-series",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getGraphData(req, res, "time-series");
	}
);



export default router;
