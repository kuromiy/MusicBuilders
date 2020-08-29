import Express from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";

const router: Express.Router = Express.Router();

router.use("/user", UserRouter);
router.use("", AuthRouter);

export default router;