import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const signupRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        // getting emial and password from front end
        const {email, password} = req.body;

        // new user using the data
        const startingInfo = {
            hairColor: '',
            favFood: '',
            bio: ''
        };

        // getting db
        const db = getDbConnection('react-auth-db');

        // checking if this new user is not present in the db
        // equivalent of SELECT statement in a table in a MySQL database 
        const user = await db.collection('users').findOne({email});

        if(user){
            // 409 - conflict error code
            res.sendStatus(409); 
        }

        // encrypt password before saving it to db
        const passwordHash = await bcrypt.hash(password, 10);        

        // insertOne() - To insert a record(or document as it is called in MongoDB), into a collection
        const result = await db.collection('users').insertOne({
            email: email,
            password: passwordHash,
            info: startingInfo,
            isVerified: false
        });
        const { insertedId } = result;

        // generate JSON Web Token
        jwt.sign({
            id: insertedId,
            email: email,
            info: startingInfo,
            isVerified: false
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '2d'
        }, 
        (error, token) => {
            if(error){
                return res.status(500).send(error);
            }
            return res.status(200).json({token});
        });
    }
}