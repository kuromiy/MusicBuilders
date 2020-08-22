import Express from "express";
import UserRouter from "./user";

const router: Express.Router = Express.Router();

router.use("/user", UserRouter);

export default router;