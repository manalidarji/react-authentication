import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';
import { sendEmail } from '../util/sendEmail';
import { v4 as uuid } from 'uuid';

export const signupRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        // getting email and password from front end
        const {email, password} = req.body;

        // new user using the data
        const startingInfo = {
            hairColor: '',
            favFood: '',
            bio: ''
        };

        // getting db
        const db = getDbConnection('react-auth-db');

        // checking if this new user is not present in the db equivalent of SELECT statement in a table in a MySQL database 
        const user = await db.collection('users').findOne({email});

        // if user found then send 409 - conflict error code 
        if(user) res.sendStatus(409);

        // encrypt password before saving it to db
        const passwordHash = await bcrypt.hash(password, 10); 
        
        // generate unique verification string each time new user would be signing up
        const verificationString = uuid();

        // insertOne() - To insert a record(or document as it is called in MongoDB), into a collection
        const result = await db.collection('users').insertOne({
            email: email,
            passwordHash: passwordHash,
            info: startingInfo,
            isVerified: false,
            verificationString
        });
        const { insertedId } = result;

        sendEmail({
            to: email, // this will be email address of the user whose email we are trying to verify
            from: process.env.FROM_EMAIL, // sender email that we set up in 'single sender' of 'sendGrid' web app
            subject: 'Please verify your email',
            text: `
                Thanks for signing up! To verify your email, click here:
                http://localhost:3000/verify-email/${verificationString}`
        })
        .then(() => {})
        .catch(error => {
            console.log(error);
            res.sendStatus(500);
        })

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