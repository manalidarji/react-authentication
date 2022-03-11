import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const loginRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        // getting email and password from front end
        const {email, password} = req.body;

        // getting db
        const db = getDbConnection('react-auth-db');

        // checking if this new user is not present in the db equivalent of SELECT statement in a table in a MySQL database 
        const user = await db.collection('users').findOne({email});

        // if no user found then send 401 - unauthorized 
        if(!user) res.sendStatus(401);

        // compare user input password with db passwordHash
        const isCorrect = await bcrypt.compare(password, user.passwordHash);

        // remove passwordHash from object for jwt
        delete user.passwordHash;

        if(isCorrect){
            // generate JSON Web Token
            jwt.sign(
                user, 
                process.env.JWT_SECRET, 
                { expiresIn: '2d' },
                (err, token) => {
                    (err) ? res.sendStatus(500).json(err) : res.sendStatus(200).json(token);
                });
        }else{
            // if password doesn't match then send 401 - unauthorized 
            res.sendStatus(401);
        }
    }
}