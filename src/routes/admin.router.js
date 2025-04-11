import { Router } from "express";
import jwtAuth from "../middlewares/jwt/jwtAuth.js";

const adminRouter = Router();

// adminRouter.get('/session/current', jwtAuth);

export default adminRouter;