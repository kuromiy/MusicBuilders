import Express from "express";

const authenticate = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  if (req.session?.userid) return next();
  return res.redirect("http://localhost:3000/music-builders/login");
};

export { authenticate };
