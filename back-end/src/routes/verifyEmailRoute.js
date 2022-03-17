import {getDbConnection} from '../db';
import {ObjectID} from 'mongodb';
import jwt from 'jsonwebtoken';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        // get verificationString from the body
        const {verificationString} = req.body;

        // find the user who has this verificationString
        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').findOne({verificationString});

        if(!result) res.status(401).json({messgae: 'The email verifictaion code is incorrect'});

        const {_id: id, email, info} = result;

        // update this user's isVerified flag as true in DB
        await db.collection('users').updateOne({_id: ObjectID(id)}, {
            $set: {
                isVerified: true
            }
        });

        // new token for the updated user
        jwt.sign(
            {id, email, isVerified: true, info},
            process.env.JWT_SECRET,
            {expiresIn: '2d'},
            (error, token) => {
                if(error){
                    return res.sendStatus(500);
                }
                res.status(200).json({token});
            }
        );
    }
}