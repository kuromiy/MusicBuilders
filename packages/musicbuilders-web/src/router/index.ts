import Express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import TeamRouter from "./team";
import HomeRouter from "./home";
import { authenticate } from "../middleware/auth";

const router: Express.Router = Express.Router();

router.use("/user", UserRouter);
router.use("", AuthRouter);
router.use("/team", authenticate, TeamRouter);
router.use("/home", authenticate, HomeRouter);

export default router;