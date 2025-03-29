import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { userDao } from "../dao/user.dao.js";
import dotenv from 'dotenv/config'

const extractFromCookies = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['token']
    }
    return token
};

const strategyCookiesConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([extractFromCookies]),
    secretOrKey: process.env.SECRET_KEY
};

const verifyTokenCookies = async (jwt_payload, done) => {
    if(!jwt_payload) 
        return done(null, false, { messsage: 'Usuario inexistente' });

    return done(null, jwt_payload)
};

const cookiesStrategy = new JwtStrategy(strategyCookiesConfig, verifyTokenCookies);

passport.use('jwt', cookiesStrategy);