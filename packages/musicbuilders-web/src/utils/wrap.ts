import Express from "express";

interface PromiseRequestHandler {
  (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<any>;
}

const wrap = (fn: PromiseRequestHandler): Express.RequestHandler => {
  return (req: Express.Request, res: Express.Response, next: Express.NextFunction) => fn(req, res, next).catch(next);
};

export { wrap };
