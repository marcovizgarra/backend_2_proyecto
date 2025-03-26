import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config'
import passport from 'passport';
import { Strategy as JWtStrategy } from 'passport-local';

const SECRET_KEY = process.env.SECRET_KEY

// passport.use(
//     new JWtStrategy(
//         { secretOrKey: SECRET_KEY, }
//     )
// )