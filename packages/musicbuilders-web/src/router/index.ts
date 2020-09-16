import Express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import TeamRouter from "./team";
import { authenticate } from "../middleware/auth";

const router: Express.Router = Express.Router();

router.use("/user", UserRouter);
router.use("", AuthRouter);
router.use("/team", authenticate, TeamRouter);

export default router;