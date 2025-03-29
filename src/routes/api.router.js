import { Router } from "express";
import { passportCall } from '../passport/passportCall.js'
import * as apiController from '../controllers/api.controller.js';
import passport from "passport";

const apiRouter = Router();

apiRouter.get('/session/current', passportCall('jwt'), apiController.profile);

export default apiRouter