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

router.get(
	"/total-spend/month",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getGraphData(req, res, "total-spend/month");
	}
);

router.get(
	"/total-spend/week",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		await getGraphData(req, res, "total-spend/week");
	}
);

router.get(
	"/category/:id",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		await getGraphData(req, res, `category/${id}`);
	}
);


router.get(
	"/channel/:id",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		await getGraphData(req, res, `channel/${id}`);
	}
);

router.get(
	"/word/:id",
	ensureAuthenticated,
	async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		await getGraphData(req, res, `word/${id}`);
	}
);


export default router;
