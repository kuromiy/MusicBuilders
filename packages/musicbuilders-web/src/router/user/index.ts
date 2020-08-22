import Express from "express";

const router: Express.Router = Express.Router();

router.get("/register", (req: Express.Request, res: Express.Response) => {
  return res.render("user/register");
});

export default router;