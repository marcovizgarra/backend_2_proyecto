import { Router } from "express";
import * as apiController from '../controllers/api.controller.js';
import jwtAuth from "../middlewares/jwt/jwtAuth.js";

const apiRouter = Router();

apiRouter.get('/session/current', jwtAuth, apiController.profile);

export default apiRouter