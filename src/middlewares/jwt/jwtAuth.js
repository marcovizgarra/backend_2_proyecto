import jsonWebToken from 'jsonwebtoken';
import 'dotenv/config'

const SECRET_KEY = process.env.SECRET_KEY

const jwtAuth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.render('unauthorized', { message: 'Token inválido' });
    }

    jsonWebToken.verify(token, SECRET_KEY,(error, decoded) => {
        if(error) {
            return res.redirect('unauthorized');
        }

        console.log(decoded.email);        

        req.user = decoded;
        next();
    });
}

export default jwtAuth;